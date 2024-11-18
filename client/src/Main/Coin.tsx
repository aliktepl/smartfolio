import {useLoaderData, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {TrendingUp} from "lucide-react"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts"
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {SetStateAction, useEffect, useState} from "react";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import SentimentChart from "@/Main/charts/SentimentChart.tsx";

// @ts-ignore
export async function loader({params}) {
    const responseCoin = await fetch(`http://localhost:3000/api/coins/${params.coinId.toUpperCase()}`, {
        credentials: "include",
    });
    const resCoin = await responseCoin.json()
    const responseWallet = await fetch("http://localhost:3000/api/wallet", {
        credentials: "include", // Ensures cookies are sent with the request
    });
    const resWallet = await responseWallet.json()
    return [resCoin, resWallet];
}

const lineChartData = [
    {month: "January", desktop: 186},
    {month: "February", desktop: 305},
    {month: "March", desktop: 237},
    {month: "April", desktop: 73},
    {month: "May", desktop: 209},
    {month: "June", desktop: 214},
]

const lineChartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-blue))",
    },
} satisfies ChartConfig

function Coin() {

    // @ts-ignore
    const [coin, wallet] = useLoaderData()
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const hasCoin = wallet.some((item: { symbol: string; }) => item.symbol === coin[0].symbol);

    const chartData = [
        {sentiment: "positive", entries: parseFloat(coin[0].sentiment.positive), fill: "var(--color-positive)"},
        {sentiment: "neutral", entries: parseFloat(coin[0].sentiment.neutral), fill: "var(--color-neutral)"},
        {sentiment: "negative", entries: parseFloat(coin[0].sentiment.negative), fill: "var(--color-negative)"},
    ]

    const chartConfig = {
        entries: {
            label: "Sentiment",
        },
        positive: {
            label: "Positive",
            color: "hsl(var(--chart-green))",
        },
        neutral: {
            label: "Neutral",
            color: "hsl(var(--chart-grey))",
        },
        negative: {
            label: "Negative",
            color: "hsl(var(--chart-red))",
        },
    } satisfies ChartConfig

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        const value = event.target.value
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
                navigate('/login', {replace: true});
            }
        };
        checkAuthStatus()
    }, [navigate]);

    const addCoinToWallet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin[0].symbol}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if necessary for authentication
                body: JSON.stringify({amount: parseFloat(amount)}) // Send the amount in the body
            });
            if (response.ok) {
                return navigate(`/${coin[0].symbol}`)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const removeCoinFromWallet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin[0].symbol}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (response.ok) {
                return navigate(`/${coin[0].symbol}`);
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
                    <ModeToggle/>
                </div>
                <h1 className="flex-grow text-center">
                    {coin[0].name}
                </h1>
                {/*Wallet dialog*/}
                <Dialog>
                    {hasCoin ?
                        <Button onClick={removeCoinFromWallet} variant='destructive'>
                            - Remove From Wallet
                        </Button> :
                        <DialogTrigger>
                            <Button>
                                + Add To Wallet
                            </Button>
                        </DialogTrigger>}
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Insert amount to add</DialogTitle>
                            <DialogDescription>
                                How much of the coin do you want to add to the wallet?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <Input type="number" id="amount" value={amount} onChange={handleChange}
                                       placeholder="Insert amount"/>
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
            </div>
            {/*charts*/}
            <div className='grid grid-cols-2'>
                <div className='justify-self-center'>
                    <Card className="flex flex-col bg-transparent border-0">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Technical Analysis</CardTitle>
                            <CardDescription>Last 24 hours</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={lineChartConfig}>
                                <LineChart
                                    accessibilityLayer
                                    data={lineChartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false}/>
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel/>}
                                    />
                                    <Line
                                        dataKey="desktop"
                                        type="natural"
                                        stroke="var(--color-desktop)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className='justify-self-center'>
                    <SentimentChart chartData={chartData}/>
                </div>
            </div>
            {/*sentiment breakdown*/}
            <div className={'flex justify-center'}>
                sentiment breakdown
            </div>
        </>
    );
}

export default Coin;