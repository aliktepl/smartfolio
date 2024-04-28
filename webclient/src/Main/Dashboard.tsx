import CoinCard from "@/Main/cards/CoinCard.tsx";
import NewsCard from "@/Main/cards/NewsCard.tsx";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";
import WalletCard from "@/Main/cards/WalletCard.tsx";
import {useRouteLoaderData} from "react-router-dom";
import {Coin} from '@/Main/wallet/columns.tsx'


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

    const wallet = useRouteLoaderData("root") as Coin[];

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">
                Welcome, {AuthProvider.user}!
            </h1>
            <h2 className="text-lg text-center mb-4">
                Hottest Right Now!
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {cryptoPrices.map((crypto) => (
                    <CoinCard coin={crypto} key={crypto.symbol} />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="">
                    <h2 className="text-lg text-center mb-4">My Wallet</h2>
                    {wallet.map((asset) => (
                        <WalletCard asset={asset} cryptoPrices={cryptoPrices} key={asset.symbol} />
                    ))}
                </div>
                <div className="">
                    <h2 className="text-lg text-center mb-4">Top News</h2>
                    {news.map((article, index) => (
                        <NewsCard article={article} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;