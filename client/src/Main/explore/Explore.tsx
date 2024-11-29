import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect, useLoaderData} from "react-router-dom";
import {DataTable} from "@/Main/wallet/data-table.tsx";
import {CoinsRow, columns} from "@/Main/explore/columns.tsx";
import {WalletRow} from "@/Main/wallet/columns.tsx";

export interface LoaderData {
    coins: CoinsRow[];
    wallet: WalletRow[];
}

export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/coins", {
            credentials: "include"
        });

        // Handle unauthorized status (401)
        if (response.status === 401) {
            console.error("Unauthorized access. Redirecting to login...");
            throw redirect("/login");
        }

        // Handle non-OK responses
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const coins = await response.json();
        const walletRes  = await fetch("http://localhost:3000/api/wallet", {
            credentials: "include"
        })
        const wallet = await walletRes.json();
        return {coins: coins, wallet: wallet};
    } catch (error) {
        console.error("Error fetching coin data:", error);
        return []; // Return empty array in case of error
    }
}

function Explore() {
    const {coins}  = useLoaderData() as LoaderData;

    const coinData: CoinsRow[] = coins.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        change: coin.tech_info.change,
        tech_info: coin.tech_info,
        sentiment: coin.sentiment,
        graph: coin.graph
    }));

    return (
        <div className="container mx-auto py-10">
            <div className="hidden"><ModeToggle /></div>
            <DataTable columns={columns} data={coinData} />
        </div>
    );
}

export default Explore;