import {WalletRow, columns } from "./columns"
import { DataTable } from "./data-table"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useLoaderData} from "react-router-dom";
import {redirect} from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/users/wallet", {
            credentials: "include", // Ensures cookies are sent with the request
        });

        // Check if the response is unauthorized
        if (response.status === 401) {
            // Redirect to login page or handle unauthorized access
            console.error("Unauthorized access. Redirecting to login...");
            return redirect("/login");
        }
        // Check for other non-success statuses
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        // Parse and return the JSON data
        return await response.json();
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        // Optionally return null or a default fallback object if needed
        return null;
    }
}

export default function Wallet() {
    const data = useLoaderData() as WalletRow[];
    return (
        <div className="container mx-auto py-10">
            <div className="hidden"><ModeToggle/></div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
