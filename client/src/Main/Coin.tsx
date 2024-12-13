import {useLoaderData,useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TrendingDown, TrendingUp} from "lucide-react";
import ArticleCard, {Article} from "@/Main/cards/ArticleCard.tsx";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import SentimentChart from "@/Main/charts/SentimentChart.tsx";
import TechnicalChart from "@/Main/charts/TechnicalChart.tsx";
import BarSentimentChart from "@/Main/charts/BarSentimentChart.tsx";
import {CoinsRow} from "@/Main/explore/columns.tsx";
import {WalletRow} from "@/Main/wallet/columns.tsx";
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {CommentCard, Comment} from "@/Main/cards/CommentCard.tsx";
import GoogleTrendsWidget from "@/Main/charts/GoogleTrendsWidget.tsx";
import { TokenIcon } from '@web3icons/react'

interface LoaderData {
    coin: CoinsRow;
    wallet: WalletRow[];
    articles: { coin: string; article: Article }[];
    comments: {coin: string; comment: Comment}[];
}

// @ts-ignore
export async function loader({params}) {
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
    const responseComments = await fetch(`http://localhost:3000/api/comments/${params.coinId.toUpperCase()}`, {
        credentials: "include", // Ensures cookies are sent with the request
    });
    const resComments = await responseComments.json();

    return {
        coin: resCoin[0],
        wallet: resWallet,
        articles: resNews,
        comments: resComments
    };
}

const sentimentPositiveNegative = (coin : CoinsRow) => {
    const {sentiment} = coin;
    const neg = sentiment.slice(0, 4).reduce((sum, { percentage }) => sum + percentage, 0);
    const neutral = sentiment.slice(4, 6).reduce((sum, { percentage }) => sum + percentage, 0);
    const pos = sentiment.slice(6, 10).reduce((sum, { percentage }) => sum + percentage, 0);
    return {pos, neutral, neg};
}

function Coin() {
    const {coin, wallet, articles, comments} = useLoaderData() as LoaderData;
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const hasCoin = wallet.some((item: { symbol: string }) => item.symbol === coin.symbol);

    const socialChartData = [
        {
            sentiment: "positive",
            entries: parseFloat(String(sentimentPositiveNegative(coin).pos)),
            fill: "var(--color-positive)"
        },
        {
            sentiment: "neutral",
            entries: parseFloat(String(sentimentPositiveNegative(coin).neutral)),
            fill: "var(--color-neutral)"
        },
        {
            sentiment: "negative",
            entries: parseFloat(String(sentimentPositiveNegative(coin).neg)),
            fill: "var(--color-negative)"
        },
    ];

    const lineChartData = coin.graph
    const barChartData = coin.sentiment

    const handleChange = (event: { target: { value: string } }) => {
        const value = event.target.value;
        const isValidFloat = /^(\d+\.?\d*|\.\d*)$/.test(value);
        if (value === '' || isValidFloat) {
            setAmount(value);
        }
    };
    const addCoin = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin.symbol}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ amount: parseFloat(amount) }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Add coin error:', error);
                return;
            }
            await response.json();
            navigate(`/${coin.symbol}`);
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    };



    const removeCoin = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin.symbol}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Remove coin error:', error);
                return;
            }
            navigate(`/${coin.symbol}`);
            setAmount('')
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    };


    const [coinAmount, setCoinAmount] = useState<string>('1'); // Default value of 1 for coin
    const [usdAmount, setUsdAmount] = useState<string>(''); // USD amount

    const extractPrice = (price: string | number): number => {
        const priceString = price.toString();
        const numericValue = priceString.replace(/[^0-9.]/g, '');
        return parseFloat(numericValue); // Convert to number
    };

    useEffect(() => {
        // Extract and parse the price
        const price = extractPrice(coin.tech_info.price);
        if (!isNaN(price)) {
            setUsdAmount((parseFloat(coinAmount) * price).toFixed(2)); // USD = coin * price
        } else {
            console.error("Invalid price:", coin.tech_info.price);
        }
    }, [coin.tech_info.price]); // Runs when the price changes

    const handleCoinChange = (event: { target: { value: any } }) => {
        const value = event.target.value;

        // Validate numeric input
        const isValid = /^(\d+\.?\d*|\.\d*)$/.test(value) || value === '';
        if (isValid) {
            setCoinAmount(value);

            // Extract and parse the price
            const price = extractPrice(coin.tech_info.price);
            if (isNaN(price)) {
                console.error("Invalid price:", coin.tech_info.price);
                return;
            }

            // Convert coin to USD
            if (value === '') {
                setUsdAmount('');
            } else {
                setUsdAmount((parseFloat(value) * price).toFixed(2)); // USD = coin * price
            }
        }
    };

    const handleUsdChange = (event: { target: { value: any } }) => {
        const value = event.target.value;

        // Validate numeric input
        const isValid = /^(\d+\.?\d*|\.\d*)$/.test(value) || value === '';
        if (isValid) {
            setUsdAmount(value);

            // Extract and parse the price
            const price = extractPrice(coin.tech_info.price);
            if (isNaN(price)) {
                console.error("Invalid price:", coin.tech_info.price);
                return;
            }

            // Convert USD to coin
            if (value === '') {
                setCoinAmount('');
            } else {
                setCoinAmount((parseFloat(value) / price).toFixed(6)); // coin = USD / price
            }
        }
    };

    return (
        <>
            {/*header*/}
            <div className="flex items-center justify-between py-2 px-4">
                <div className="hidden">
                    <ModeToggle/>
                </div>
                <h1 className="flex text-2xl items-center font-bold mb-4">
                    <TokenIcon symbol={coin.symbol} variant="branded" />
                    {coin.name}
                </h1>
                <Dialog>
                    {hasCoin ? (
                        <Button onClick={removeCoin} variant="destructive">
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
                                <Input type="text" id="amount" value={amount} onChange={handleChange}
                                       placeholder="Insert amount" inputMode="numeric"/>
                            </div>
                            <DialogClose asChild>
                                <Button onClick={addCoin}>
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

            <div className="grid lg:grid-cols-2 h-[375x] space-x-2">
                <SentimentChart name="Sentiment" pieChartData={socialChartData}/>
                <BarSentimentChart barChartData={barChartData}/>
            </div>

            <div className="grid lg:grid-cols-3">
                <div className="grid grid-cols-2 ml-2 gap-1">
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
                                {coin.tech_info.change > 0 ? '+' : ''}{coin.tech_info.change}% {coin.tech_info.change > 0 ?
                                <TrendingUp/> : <TrendingDown/>}
                            </p>
                        </CardHeader>
                    </Card>
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Converter</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="coin">{coin.symbol}</Label>
                                <Input type="text" id="coin" inputMode="numeric" value={coinAmount}
                                       onChange={handleCoinChange}/>
                            </div>
                            <Separator className="my-2"/>
                            <div>
                                <Label htmlFor="usd">USD</Label>
                                <Input type="text" id="usd" inputMode="numeric" value={usdAmount}
                                       onChange={handleUsdChange}/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-2">
                    <TechnicalChart lineChartData={lineChartData}/>
                </div>
            </div>

            {/*News*/}
            <div>
                <h1 className="text-2xl font-bold flex justify-center items-center my-4">
                    Top News
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                    {articles.length > 0 ? (
                        articles.slice(0, 4).map((article, index) => (
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

            <div>
                <h1 className="text-2xl font-bold flex justify-center items-center my-4">
                    Top Comments
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-4">
                    {comments.length > 0 ? (
                        comments.slice(0, 4).map((comment, index) => (
                            <div key={index} className="p-2">
                                <CommentCard comment={comment.comment}/>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center p-4">
                            <p>No available comments</p>
                        </div>
                    )}
                </div>
            </div>
            <Card className="md:h-[350px] h-[300px] m-2">
                <GoogleTrendsWidget keyword={coin.name}/>
            </Card>
        </>
    );
}

export default Coin;
