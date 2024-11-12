import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "react-router-dom";
import {TrendingDown, TrendingUp} from "lucide-react";

export interface Coin {
    name: string;
    symbol: string;
    change: number;
    sentiment: object;
}

function CoinCard({coin} : {coin:Coin}) {
    return (
        <Link to={coin.symbol}>
            <Card>
                <CardHeader>
                    <CardTitle>{coin.name}</CardTitle>
                    <CardDescription>{coin.symbol.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{coin.change}$</p>
                    <p className={`${coin.change > 0 ? 'flex text-green-500' : 'flex text-red-500'}`}>
                        {coin.change > 0 ? '+' : ''}{coin.change}% {coin.change > 0 ? <TrendingUp/> : <TrendingDown/>}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CoinCard;