import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TrendingUp,TrendingDown} from "lucide-react";
import ArticleCard, {Article} from "@/Main/cards/ArticleCard.tsx";
import { Input } from "@/components/ui/input";
import { SetStateAction, useEffect, useState } from "react";
import SentimentChart from "@/Main/charts/SentimentChart.tsx";
import TechnicalChart from "@/Main/charts/TechnicalChart.tsx";
import {BarSentimentChart} from "@/Main/charts/BarSentimentChart.tsx";
import {CoinsRow} from "@/Main/explore/columns.tsx";
import {WalletRow} from "@/Main/wallet/columns.tsx";

interface LoaderData {
    coin: CoinsRow;
    wallet: WalletRow[];
    articles: { coin: string; article: Article }[];
}

// @ts-ignore
export async function loader({ params }) {
    const responseCoin = await fetch(`http://localhost:3000/api/coins/${params.coinId.toUpperCase()}`, {
        credentials: "include",
    });
    const resCoin = await responseCoin.json();
    const responseWallet = await fetch("http://localhost:3000/api/wallet", {
        credentials: "include", // Ensures cookies are sent with the request
    });
    const resWallet = await responseWallet.json();
    const responseNews = await fetch(`http://localhost:3000/api/articles/${params.coinId.toUpperCase()}`, {
        credentials: "include", // Ensures cookies are sent with the request
    });
    const resNews = await responseNews.json();

    return {
        coin: resCoin[0],
        wallet: resWallet,
        articles: resNews
    };
}

function Coin() {
    const {coin, wallet, articles} = useLoaderData() as LoaderData;
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();
    console.log(coin.graph)

    const hasCoin = wallet.some((item: { symbol: string }) => item.symbol === coin.symbol);

    const sentimentPositiveNegative = () => {
        let neg, pos, neutral: number
        neg=coin.sentiment[0].percentage+coin.sentiment[1].percentage+coin.sentiment[2].percentage+coin.sentiment[3].percentage
        pos=coin.sentiment[6].percentage+coin.sentiment[7].percentage+coin.sentiment[8].percentage+coin.sentiment[9].percentage
        neutral=coin.sentiment[5].percentage+coin.sentiment[6].percentage
        return {pos: pos,neutral: neutral,neg: neg}
    }

    const socialChartData = [
        { sentiment: "positive", entries: parseFloat(String(sentimentPositiveNegative().pos)), fill: "var(--color-positive)" },
        { sentiment: "neutral", entries: parseFloat(String(sentimentPositiveNegative().neutral)), fill: "var(--color-neutral)" },
        { sentiment: "negative", entries: parseFloat(String(sentimentPositiveNegative().neg)), fill: "var(--color-negative)" },
    ];

    const lineChartData = coin.graph
    const barChartData = coin.sentiment

    const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
        const value = event.target.value;
        if (value === '' || parseFloat(value as string) > 0) {
            setAmount(value);
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            const response = await fetch("http://localhost:3000/api/user", {
                credentials: "include",
            });

            if (response.status === 401) {
                navigate('/login', { replace: true });
            }
        };
        checkAuthStatus();
    }, [navigate]);

    const addCoinToWallet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin.symbol}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if necessary for authentication
                body: JSON.stringify({ amount: parseFloat(amount) }), // Send the amount in the body
            });
            if (response.ok) {
                // After adding, update the wallet state to reflect the change
                return navigate(`/${coin.symbol}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const removeCoinFromWallet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin.symbol}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                // After removing, update the wallet state to reflect the change
                return navigate(`/${coin.symbol}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {/*header*/}
            <div className="flex items-center justify-between py-2 px-4">
                <div className="hidden">
                    <ModeToggle />
                </div>
                <h1 className="text-2xl font-bold mb-4">{coin.name}</h1>
                {/*Wallet dialog*/}
                <Dialog>
                    {hasCoin ? (
                        <Button onClick={removeCoinFromWallet} variant="destructive">
                            - Remove From Wallet
                        </Button>
                    ) : (
                        <DialogTrigger>
                            <Button>
                                + Add To Wallet
                            </Button>
                        </DialogTrigger>
                    )}
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Insert amount to add</DialogTitle>
                            <DialogDescription>
                                How much of the coin do you want to add to the wallet?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <Input type="text" id="amount" value={amount} onChange={handleChange} placeholder="Insert amount" inputMode="numeric" />
                            </div>
                            <DialogClose asChild>
                                <Button onClick={addCoinToWallet}>
                                    Add
                                </Button>
                            </DialogClose>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                {/*/Wallet Dialog*/}
            </div>

            {/*Charts*/}
                <div>
                    <div>
                        <div className="grid md:grid-cols-2 h-[375x] space-x-2">
                            <SentimentChart name="Sentiment" pieChartData={socialChartData}/>
                            <BarSentimentChart barChartData={barChartData}/>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 space-x-2">
                        <div className="grid grid-cols-2 grid-rows-4 ml-2 gap-2">
                            <Card>
                                <CardHeader>
                                    <CardDescription>
                                        Price
                                    </CardDescription>
                                    <p className={`${coin.tech_info.change > 0 ? 'flex text-green-500' : 'flex text-red-500'}`}>
                                        {coin.tech_info.price}{coin.tech_info.change > 0 ? <TrendingUp/> :
                                        <TrendingDown/>}
                                    </p>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardDescription>
                                        Market Cap
                                    </CardDescription>
                                    <p className={`${coin.tech_info.change > 0 ? 'flex text-green-500' : 'flex text-red-500'}`}>
                                        {coin.tech_info.market_cap}{coin.tech_info.change > 0 ? <TrendingUp/> :
                                        <TrendingDown/>}
                                    </p>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardDescription>
                                        Total Supply
                                    </CardDescription>
                                    {coin.tech_info.total_supply}
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardDescription>
                                        Change
                                    </CardDescription>
                                    <p className={`${coin.tech_info.change > 0 ? 'flex text-green-500' : 'flex text-red-500'}`}>
                                        {coin.tech_info.change > 0 ? '+' : '-'}{coin.tech_info.change}% {coin.tech_info.change > 0 ?
                                        <TrendingUp/> : <TrendingDown/>}
                                    </p>
                                </CardHeader>
                            </Card>
                            <Card className="col-span-2 row-span-2">
                                <CardHeader>
                                    <CardTitle>Converter</CardTitle>
                                </CardHeader>
                            </Card>
                        </div>
                        {/* Technical Chart Section */}
                        <div className="col-span-2">
                            <TechnicalChart lineChartData={lineChartData}/>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold flex justify-center items-center my-4">
                        Top News
                    </h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4">
                        {articles.length > 0 ? (
                            articles.map((article, index) => (
                                <div key={index} className="p-2">
                                    <ArticleCard article={article.article}/>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center p-4">
                                <p>No available articles</p>
                            </div>
                        )}
                    </div>
                </div>
        </>

    );
}

export default Coin;