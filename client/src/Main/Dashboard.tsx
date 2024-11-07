import CoinCard from "@/Main/cards/CoinCard.tsx";
import ArticleCard from "@/Main/cards/ArticleCard.tsx";
import WalletCard from "@/Main/cards/WalletCard.tsx";
import {redirect, useLoaderData, useNavigate, useRouteLoaderData} from "react-router-dom";
import {WalletRow} from '@/Main/wallet/columns.tsx'
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useEffect} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/wallet", {
            credentials: "include", // Ensures cookies are sent with the request
        });
        if (response.status === 401) {
            // Redirect to login page or handle unauthorized access
            return redirect("/login");
        }
        if (!response.ok) {
            return new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated (e.g., by making an API call or checking cookies)
        const checkAuthStatus = async () => {
            const response = await fetch("http://localhost:3000/api/user", {
                credentials: "include",
            });

            if (response.status === 401) {
                navigate('/login', { replace: true }); // Redirect to login if unauthorized
            }
        };

        checkAuthStatus().then(() => {});
    }, [navigate]);

    const cryptoPrices = [
        {name: 'Bitcoin', symbol: 'btc', price: 52291, change: 0.25},
        {name: 'Litecoin', symbol: 'ltc', price: 8291, change: 0.25},
        {name: 'Ethereum', symbol: 'eth', price: 28291, change: 0.25},
        {name: 'Solana', symbol: 'sol', price: 14291, change: -0.25},
    ];

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

    const wallet = useLoaderData() as WalletRow[];
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
                {cryptoPrices.map((crypto) => (
                    <CoinCard coin={crypto} key={crypto.symbol}/>
                ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <h2 className="text-center font-semibold mb-4">My Top Coins</h2>
                    {wallet ? wallet.map((asset) => (
                        <WalletCard asset={asset} key={asset.symbol}/>
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