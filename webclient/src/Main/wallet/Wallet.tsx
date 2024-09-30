import {Coin, columns } from "./columns"
import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import {useRouteLoaderData} from "react-router-dom";
import {ModeToggle} from "@/components/mode-toggle.tsx";




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
