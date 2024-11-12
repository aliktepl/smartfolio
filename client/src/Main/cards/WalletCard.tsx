import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {WalletRow} from "@/Main/wallet/columns.tsx";
import {TrendingDown, TrendingUp } from "lucide-react";

function WalletCard({asset} : {asset : WalletRow}) {
    return (
        <div className="mb-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {asset.name}
                    </CardTitle>
                    <CardDescription>
                        {asset.symbol.toUpperCase()}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        {asset.amount}{" "}{asset.symbol.toUpperCase()}
                    </p>
                    <div className="inline-flex items-center">
                        <span className={asset.change > 0 ? 'text-green-500' : 'text-red-500'}>
                            {asset.change > 0 ? `+${asset.change}%` : `${asset.change}%`}
                        </span>
                        {asset.change > 0 ? (
                            <TrendingUp className="ml-1 text-green-500"/>
                        ) : (
                            <TrendingDown className="ml-1 text-red-500"/>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default WalletCard;