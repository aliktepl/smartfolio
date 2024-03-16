const Dashboard = () => {

    const cryptoPrices = [
        {name: 'Bitcoin', symbol: 'BTC', price: 52291, change: 0.25},
        {name: 'Litecoin', symbol: 'LTC', price: 8291, change: 0.25},
        {name: 'Ethereum', symbol: 'ETH', price: 28291, change: 0.25},
        {name: 'Solana', symbol: 'SOL', price: 14291, change: -0.25},
    ];

    const wallet = [
        {name: 'Ethereum', symbol: 'ETH', amount: 0.12543, change: -13.4},
        {name: 'Bitcoin', symbol: 'BTC', amount: 0.12543, change: -6.0},
        {name: 'Litecoin', symbol: 'LTC', amount: 0.12543, change: 14.25},
        {name: 'Solana', symbol: 'SOL', amount: 0.12543, change: -2.0},
        {name: 'Binance Coin', symbol: 'BNB', amount: 0.12543, change: 12.0},
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
                Welcome, Yoav!
            </h1>
            <h2 className="text-lg font-semibold mb-4">
                Hottest Right Now
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
                {cryptoPrices.map((crypto) => (
                    <div key={crypto.symbol} className="bg-gray-800 p-4 shadow rounded-2xl">
                        <h3 className="font-semibold">{crypto.name}</h3>
                        <p className="text-xl">${crypto.price.toLocaleString()}</p>
                        <p className={`${crypto.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {crypto.change > 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                        </p>
                    </div>
                ))}
            </div>
            <h2 className="text-lg font-semibold mb-4">My Wallet</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                {wallet.map((asset) => (
                    <div key={asset.symbol} className="bg-gray-800 p-4 rounded">
                        <h3 className="font-semibold">{asset.name}</h3>
                        <p>${(asset.amount * cryptoPrices.find((crypto) => crypto.symbol === asset.symbol)?.price).toLocaleString()}</p>
                        <p className={`${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                        </p>
                    </div>
                ))}
            </div>
            <h2 className="text-lg font-semibold mb-4">Top News</h2>
            <div className="grid grid-cols-2 gap-4">
                {news.map((article, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded">
                        <h3 className="font-semibold">{article.source}</h3>
                        <p>{article.headline}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;