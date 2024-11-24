import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleCard from "@/Main/cards/ArticleCard.tsx";
import { Input } from "@/components/ui/input";
import { SetStateAction, useEffect, useState } from "react";
import SentimentChart from "@/Main/charts/SentimentChart.tsx";
import TechnicalChart from "@/Main/charts/TechnicalChart.tsx";
import {BarSentimentChart} from "@/Main/charts/BarSentimentChart.tsx";

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
    return [resCoin[0], resWallet, resNews];
}

function Coin() {
    // @ts-ignore
    const [coin, wallet, news] = useLoaderData();

    console.log(coin.graph);

    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const hasCoin = wallet.some((item: { symbol: string }) => item.symbol === coin.symbol);

    const socialChartData = [
        { sentiment: "positive", entries: parseFloat(coin.sentiment.positive), fill: "var(--color-positive)" },
        { sentiment: "neutral", entries: parseFloat(coin.sentiment.neutral), fill: "var(--color-neutral)" },
        { sentiment: "negative", entries: parseFloat(coin.sentiment.negative), fill: "var(--color-negative)" },
    ];

    const lineChartData = coin.graph

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
                <h1>{coin.name}</h1>
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
                                <Input type="number" id="amount" value={amount} onChange={handleChange} placeholder="Insert amount" />
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
                    <div className="grid md:grid-cols-2 space-x-2">
                        <SentimentChart name="Sentiment" pieChartData={socialChartData} />
                        <BarSentimentChart/>
                    </div>
                </div>
                <div className="grid md:grid-cols-4 space-x-2">
                    {/* Card Section */}
                    <div className="flex-none h-full">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Price: {coin.tech_info.price}</p>
                                <p>Market Cap: {coin.tech_info.market_cap}</p>
                                <p>Total Supply: {coin.tech_info.total_supply}</p>
                                <p>Change: {coin.tech_info.change}%</p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Technical Chart Section */}
                    <div className="col-span-3">
                        <TechnicalChart lineChartData={lineChartData} />
                    </div>
                </div>
                <h1 className="flex justify-center">
                    Top news about {coin.name}
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                    {news.map((article, index) => (
                        <div key={index} className="p-2">
                            <ArticleCard article={article.article} />
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

export default Coin;