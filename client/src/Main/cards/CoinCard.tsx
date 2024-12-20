import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "react-router-dom";
import {TrendingDown, TrendingUp} from "lucide-react";
import {TokenIcon} from "@web3icons/react";

export interface Coin {
    name: string;
    symbol: string;
    sentiment: object;
    tech_info: tech_info
    change: number
}

interface tech_info {
    change: number;
    price: number;
}

function CoinCard({coin} : {coin:Coin}) {
    return (
        <Link to={coin.symbol} viewTransition>
            <Card className="hover:scale-105 transition-transform">
                <CardHeader>
                    <CardTitle className={"flex items-center"}>
                        <TokenIcon symbol={coin.symbol} variant="branded" />
                        {coin.name}
                    </CardTitle>
                    <CardDescription>{coin.symbol.toUpperCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{coin.tech_info.price}</p>
                    <p className={`${coin.tech_info.change > 0 ? 'flex text-green-500' : 'flex text-red-500'}`}>
                        {coin.tech_info.change > 0 ? '+' : ''}{coin.tech_info.change}% {coin.tech_info.change > 0 ? <TrendingUp/> : <TrendingDown/>}
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CoinCard;