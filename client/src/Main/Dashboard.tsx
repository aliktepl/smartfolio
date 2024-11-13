import CoinCard from "@/Main/cards/CoinCard.tsx";
import ArticleCard from "@/Main/cards/ArticleCard.tsx";
import WalletCard from "@/Main/cards/WalletCard.tsx";
import {redirect, useLoaderData, useNavigate, useRouteLoaderData} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useEffect} from "react";
import { WalletRow } from "./wallet/columns";
import {CoinsRow} from "@/Main/explore/columns.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    try {
        const walletResponse = await fetch("http://localhost:3000/api/wallet", {
            credentials: "include",
        });
        if (walletResponse.status === 401) {
            return redirect("/login");
        }
        if (!walletResponse.ok) {
            return new Error(`Failed to fetch data: ${walletResponse.status} ${walletResponse.statusText}`);
        }
        const wallet = await walletResponse.json();
        const coinsResponse = await fetch("http://localhost:3000/api/coins", {
            credentials: "include", // Ensures cookies are sent with the request
        });
        if (coinsResponse.status === 401) {
            console.error("Unauthorized access. Redirecting to login...");
            return redirect("/login");
        }
        if (!coinsResponse.ok) {
            return new Error(`Failed to fetch data: ${coinsResponse.status} ${coinsResponse.statusText}`);
        }
        const coins = await coinsResponse.json();
        console.log(coins);
        return [coins, wallet];
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

const news = [
    {
        source: 'Bloomberg',
        time: 'just now',
        headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
    },
    {
        source: 'Financial Times',
        time: 'just now',
        headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
    },
    {
        source: 'CNN',
        time: 'just now',
        headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
    },
    {
        source: 'Fox News',
        time: 'just now',
        headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
    },
];

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const response = await fetch("http://localhost:3000/api/user", {
                credentials: "include",
            });
            if (response.status === 401) {
                navigate('/login', {replace: true});
            }
        };
        checkAuthStatus().then(() => {
        });
    }, [navigate]);

    // @ts-ignore
    const [coins, wallet] = useLoaderData();
    const user = useRouteLoaderData('root') as string

    return (
        <div className="p-6">
            <div className='hidden'><ModeToggle/></div>
            <header>
                <h1 className="text-2xl font-bold mb-4">
                    Welcome, {user}!
                </h1>
            </header>
            <h2 className="text-center font-semibold mb-4">
                Hottest Right Now
            </h2>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
                {coins.map((coin: CoinsRow) => (
                    <CoinCard coin={coin} key={coin.symbol}/>
                ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <h2 className="text-center font-semibold mb-4">My Top Coins</h2>
                    {wallet ? wallet.map((coin: WalletRow) => (
                        <WalletCard coin={coin} key={coin.symbol}/>
                    )) : 'Your wallet is empty'}
                </div>
                <div>
                    <h2 className="text-center font-semibold mb-4">Top News</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {news.map((article, index) => (
                            <ArticleCard article={article} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;