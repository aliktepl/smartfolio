import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect, useLoaderData} from "react-router-dom";
import {DataTable} from "@/Main/wallet/data-table.tsx";
import {CoinsRow, columns, graph, sentiment, tech_info} from "@/Main/explore/columns.tsx";

export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/coins", {
            credentials: "include", // Ensures cookies are sent with the request
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

        // Return the JSON response as the data for the loader
        return await response.json();
    } catch (error) {
        console.error("Error fetching coin data:", error);
        return []; // Return empty array in case of error
    }
}


// Interface for coin data (Matches with the format returned from the API)
interface CoinData {
    graph: graph[];
    name: string;
    symbol: string;
    change: number;
    tech_info: tech_info
    sentiment: sentiment[];
}

function Explore() {
    const data = useLoaderData() as CoinData[];

    const coinData: CoinsRow[] = data.map((coin) => ({
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