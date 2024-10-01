import {WalletRow, columns } from "./columns"
import {Coin, columns } from "./columns"
import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import {useLoaderData} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";


// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    return [
        {name: 'Ethereum', symbol: 'eth', amount: 0.12546, change: -13.4},
        {name: 'Bitcoin', symbol: 'btc', amount: 0.12547, change: -6.0},
        {name: 'Litecoin', symbol: 'ltc', amount: 0.12548, change: 14.25},
        {name: 'Solana', symbol: 'sol', amount: 0.12549, change: -2.0},
        {name: 'Binance Coin', symbol: 'bnb', amount: 0.12543, change: 12.0},
    ]
}

export default function Wallet() {
    //const data = useRouteLoaderData("root") as Coin[];

    const [data, setData] = useState<Coin[]>([]);

    // Fetch wallet data from the backend
    useEffect(() => {
      fetch("http://localhost:3000/Users/wallet")
        .then((response) => response.json())
        .then((walletData) => setData(walletData))
        .catch((error) => console.error("Error fetching wallet data:", error));
    }, []);

    return (
        <div className="container mx-auto py-10">
            <div className="hidden"><ModeToggle/></div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
