import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {TrendingDown, TrendingUp } from "lucide-react";
import {Link} from "react-router-dom";
import {WalletData} from "@/Main/wallet/Wallet.tsx";
import {TokenIcon} from "@web3icons/react";

function WalletCard({coin} : {coin : WalletData}) {
    return (
        <Link to={coin.symbol} viewTransition>
            <Card className="hover:scale-105 transition-transform mb-4">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <TokenIcon symbol={coin.symbol} variant="branded" />
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
                        <span className={coin.tech_info.change > 0 ? 'text-green-500' : 'text-red-500'}>
                            {coin.tech_info.change > 0 ? `+${coin.tech_info.change}%` : `${coin.tech_info.change}%`}
                        </span>
                        {coin.tech_info.change > 0 ? (
                            <TrendingUp className="ml-1 text-green-500"/>
                        ) : (
                            <TrendingDown className="ml-1 text-red-500"/>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

export default WalletCard;