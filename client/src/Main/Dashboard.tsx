import CoinCard from "@/Main/cards/CoinCard.tsx";
import ArticleCard from "@/Main/cards/ArticleCard.tsx";
import WalletCard from "@/Main/cards/WalletCard.tsx";
import {redirect, useLoaderData, useRouteLoaderData} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {WalletRow} from "./wallet/columns";
import {CoinsRow} from "@/Main/explore/columns.tsx";

interface LoaderData {
    coins: CoinsRow[];
    wallet: WalletRow[];
    articles: { coin: string; article: string }[];
}

async function fetchWithRedirect(url: string) {
    const response = await fetch(url, { credentials: "include" });

    // Redirect if unauthorized
    if (response.status === 401) {
        throw redirect("/login");
    }

    // Throw an error for other non-OK statuses
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    // Check for empty response
    const text = await response.text();
    if (!text) {
        console.warn(`Empty response from ${url}`);
        return null; // Handle as empty data
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error(`Invalid JSON from ${url}:`, error);
        throw new Error(`Invalid JSON response from ${url}`);
    }
}


// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    try {
        const [wallet, articles, coins] = await Promise.all([
            fetchWithRedirect("http://localhost:3000/api/wallet"),
            fetchWithRedirect("http://localhost:3000/api/articles"),
            fetchWithRedirect("http://localhost:3000/api/coins"),
        ]);

        return {
            coins: coins || [],
            wallet: wallet || [],
            articles: articles || [],
        };
    } catch (error) {
        console.error("Error fetching data in loader:", error);
        throw error;
    }
}

function Dashboard() {
    const { coins, wallet, articles } = useLoaderData() as LoaderData;
    const user = useRouteLoaderData("root") as string;

    return (
        <div className="p-6">
            <div className="hidden">
                <ModeToggle />
            </div>
            <header>
                <h1 className="text-2xl font-bold mb-4">Welcome, {user}!</h1>
            </header>
            <h2 className="text-center font-semibold mb-4">Hottest Right Now</h2>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 lg:grid-cols-4">
                {coins.slice(0, 4).map((coin) => (
                    <CoinCard coin={coin} key={coin.symbol} />
                ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <div>
                    <h2 className="text-center font-semibold mb-4">My Top Coins</h2>
                    {wallet?.length ? (
                        wallet.map((coin) => <WalletCard coin={coin} key={coin.symbol} />)
                    ) : (
                        <p>Your wallet is empty</p>
                    )}
                </div>
                <div>
                    <h2 className="text-center font-semibold mb-4">Top News</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {articles
                            .filter((article) => article.coin === "CRYPTO")
                            .slice(0, 4)
                            .map((article, index) => (
                                <ArticleCard article={article.article} key={index}/>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;