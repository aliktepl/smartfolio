import {columns, WalletRow} from "./columns"
import {DataTable} from "./data-table"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect, useLoaderData} from "react-router-dom";
import {tech_info} from "@/Main/explore/columns.tsx";

export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/wallet", {
            credentials: "include", // Ensures cookies are sent with the request
        });

        if (response.status === 401) {
            // Redirect to login page if user is not authenticated
            return redirect("/login");
        }

        if (!response.ok) {
            // Add more detailed error logging
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        return await response.json(); // Successful data retrieval
    } catch (error) {
        console.error("Error fetching data:", error);
        return redirect("/login"); // Redirect to login on error
    }
}

export interface WalletData {
    name: string;
    symbol: string;
    tech_info: tech_info;
    amount: number;
}

export default function Wallet() {
    const data = useLoaderData() as WalletData[];

    const walletData: WalletRow[] = data.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        tech_info: coin.tech_info,
        change: coin.tech_info.change,
        amount: coin.amount
    }));
    return (
        <>
            <div className="container mx-auto py-10">
                <div className="hidden">
                    <ModeToggle />
                </div>
                <DataTable columns={columns} data={walletData} />
            </div>
        </>
    );
}
