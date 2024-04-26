import CoinCard from "./Cards/CoinCard.tsx";
import NewsCard from "./Cards/NewsCard.tsx";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";

function Dashboard() {

    const cryptoPrices = [
        {name: 'Bitcoin', symbol: 'btc', price: 52291, change: 0.25},
        {name: 'Litecoin', symbol: 'ltc', price: 8291, change: 0.25},
        {name: 'Ethereum', symbol: 'eth', price: 28291, change: 0.25},
        {name: 'Solana', symbol: 'sol', price: 14291, change: -0.25},
    ];

    const wallet = [
        {name: 'Ethereum', symbol: 'eth', amount: 0.12543, change: -13.4},
        {name: 'Bitcoin', symbol: 'btc', amount: 0.12543, change: -6.0},
        {name: 'Litecoin', symbol: 'ltc', amount: 0.12543, change: 14.25},
        {name: 'Solana', symbol: 'sol', amount: 0.12543, change: -2.0},
        {name: 'Binance Coin', symbol: 'bnb', amount: 0.12543, change: 12.0},
    ];

    const news = [
        {
            source: 'Bloomberg',
            headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
        },
        {
            source: 'Financial Times',
            headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
        },
        {
            source: 'CNN',
            headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
        },
        {
            source: 'Fox News',
            headline: 'Solana have jumped by 40% over the last two days despite increased threat of hackers.',
        },
    ];

    return (
        <div className="text-white p-6">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {AuthProvider.user}!
            </h1>
            <h2 className="text-lg text-center font-semibold mb-4">
                Hottest Right Now!
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
                {cryptoPrices.map((crypto) => (
                    CoinCard(crypto)
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-4 ">
                    <h2 className="text-lg font-semibold">My Wallet</h2>
                    {wallet.map((asset) => (
                        <div key={asset.symbol} className="bg-gray-800 p-4 shadow rounded">
                            <h3 className="font-semibold">{asset.name}</h3>
                            <p>${(asset.amount * cryptoPrices.find((crypto) => crypto.symbol === asset.symbol)?.price).toLocaleString()}</p>
                            <p className={`${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                            </p>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-4 ">
                    <h2 className="text-lg font-semibold">Top News</h2>
                    {news.map((article, index) => (
                        NewsCard(article, index)
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;