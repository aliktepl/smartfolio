import {Link} from "react-router-dom";

function CoinCard(coin) {
    return(
        <Link to={coin.symbol} key={coin.symbol} className="bg-gray-800 p-4 shadow rounded-2xl">
            <h3 className="font-semibold">{coin.name}</h3>
            <p className="text-xl">{coin.price.toLocaleString()}$</p>
            <p className={`${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
            </p>
        </Link>
    )
}

export default CoinCard;