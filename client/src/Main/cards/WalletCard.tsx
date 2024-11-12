import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {WalletRow} from "@/Main/wallet/columns.tsx";
import {TrendingDown, TrendingUp } from "lucide-react";
import {Link} from "react-router-dom";

function WalletCard({coin} : {coin : WalletRow}) {
    return (
        <Link to={coin.symbol}>
        <div className="mb-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {coin.name}
                    </CardTitle>
                    <CardDescription>
                        {coin.symbol.toUpperCase()}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        {coin.amount}{" "}{coin.symbol.toUpperCase()}
                    </p>
                    <div className="inline-flex items-center">
                        <span className={coin.change > 0 ? 'text-green-500' : 'text-red-500'}>
                            {coin.change > 0 ? `+${coin.change}%` : `${coin.change}%`}
                        </span>
                        {coin.change > 0 ? (
                            <TrendingUp className="ml-1 text-green-500"/>
                        ) : (
                            <TrendingDown className="ml-1 text-red-500"/>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
        </Link>
    );
}

export default WalletCard;