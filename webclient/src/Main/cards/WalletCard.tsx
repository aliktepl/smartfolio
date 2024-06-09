import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

function WalletCard({asset, cryptoPrices}) {
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
                        {(asset.amount * cryptoPrices.find((crypto) => crypto.symbol === asset.symbol)?.price).toLocaleString()}$
                    </p>
                    <p className={`${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default WalletCard;