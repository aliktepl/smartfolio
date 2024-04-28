import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import {Link} from "react-router-dom";


function CoinCard(coin) {
    return (
        <Link to={coin.symbol} key={coin.symbol}>
            <Card>
                <CardHeader>
                    <CardTitle>{coin.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{coin.price.toLocaleString()}$</p>
                </CardContent>
                <CardFooter>
                    <p className={`${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
                    </p>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default CoinCard;