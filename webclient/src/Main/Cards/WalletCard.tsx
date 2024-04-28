import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";

function WalletCard(asset, cryptoPrices) {
    return (
        <div key={asset.symbol}>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {asset.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>${(asset.amount * cryptoPrices.find((crypto) => crypto.symbol === asset.symbol)?.price).toLocaleString()}</p>
                </CardContent>
                <CardFooter>
                    <p className={`${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default WalletCard;