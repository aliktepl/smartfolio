import CoinCard from "@/Main/cards/CoinCard.tsx";
import NewsCard from "@/Main/cards/NewsCard.tsx";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";
import WalletCard from "@/Main/cards/WalletCard.tsx";
import {useRouteLoaderData} from "react-router-dom";
import {WalletRow} from '@/Main/wallet/columns.tsx'
import {ModeToggle} from "@/components/mode-toggle.tsx";


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

    const wallet = useRouteLoaderData("root") as WalletRow[];

    return (
        <div className="p-6">
            <div className='hidden'><ModeToggle/></div>
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {AuthProvider.user}!
            </h1>
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