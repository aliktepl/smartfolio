import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import {Link} from "react-router-dom";


function CoinCard({ coin }) {
    return (
        <Link to={coin.symbol}>
            <Card>
                <CardHeader>
                    <CardTitle>{coin.name}</CardTitle>
                    <CardDescription>{coin.symbol.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{coin.price.toLocaleString()}$</p>
                    <p className={`${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {coin.change > 0 ? '+' : ''}{coin.change.toFixed(2)}%
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CoinCard;