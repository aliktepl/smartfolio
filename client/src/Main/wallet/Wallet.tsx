import {WalletRow, columns } from "./columns"
import { DataTable } from "./data-table"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useLoaderData, useNavigate} from "react-router-dom";
import {redirect} from "react-router-dom";
import {useEffect} from "react";

// eslint-disable-next-line react-refresh/only-export-components
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
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return await response.json(); // Successful data retrieval
    } catch (error) {
        console.error("Error fetching data:", error);
        return redirect("/login");
    }
}

export default function Wallet() {

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated (e.g., by making an API call or checking cookies)
        const checkAuthStatus = async () => {
            const response = await fetch("http://localhost:3000/api/user", {
                credentials: "include",
            });

            if (response.status === 401) {
                navigate('/login', { replace: true }); // Redirect to login if unauthorized
            }
        };

        checkAuthStatus().then(() => {});
    }, [navigate]);

    const data = useLoaderData() as WalletRow[];
    return (
        <div className="container mx-auto py-10">
            <div className="hidden"><ModeToggle/></div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
