import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import {DataTable} from "@/Main/wallet/data-table.tsx";
import {columns, CoinsRow} from "@/Main/explore/columns.tsx";
import {useEffect} from "react";

export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/coins", {
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
            return new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        // Parse and return the JSON data
        return await response.json();
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        // Optionally return null or a default fallback object if needed
        return null;
    }
}

function Explore() {

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

    const data = useLoaderData() as CoinsRow[];
    return (
        <div className="container mx-auto py-10">
            <div className="hidden"><ModeToggle/></div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}

export default Explore;