import CoinCard from "@/Main/cards/CoinCard.tsx";
import NewsCard from "@/Main/cards/NewsCard.tsx";
import {AuthProvider} from "@/Authentication/AuthProvider.tsx";
import WalletCard from "@/Main/cards/WalletCard.tsx";
import {useLoaderData} from "react-router-dom";
import {WalletRow} from '@/Main/wallet/columns.tsx'
import {ModeToggle} from "@/components/mode-toggle.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    return [
        // Should fetch user.
        {name: 'Ethereum', symbol: 'eth', amount: 0.12546, change: -13.4},
        {name: 'Bitcoin', symbol: 'btc', amount: 0.12547, change: -6.0},
        {name: 'Litecoin', symbol: 'ltc', amount: 0.12548, change: 14.25},
        {name: 'Solana', symbol: 'sol', amount: 0.12549, change: -2.0},
        {name: 'Binance Coin', symbol: 'bnb', amount: 0.12543, change: 12.0},
    ]
}

function Dashboard() {

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

    return (
        <div className="p-6">
            <div className='hidden'><ModeToggle/></div>
            <header>
                <h1 className="text-2xl font-bold mb-4">
                    Welcome, {AuthProvider.user}!
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
                    {wallet.map((asset) => (
                        <WalletCard asset={asset} cryptoPrices={cryptoPrices} key={asset.symbol}/>
                    ))}
                </div>
                <div>
                    <h2 className="text-center font-semibold mb-4">Top News</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {news.map((article, index) => (
                            <NewsCard article={article} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;