import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect} from "react-router-dom";

export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/users/wallet", {
            credentials: "include", // Ensures cookies are sent with the request
        });
        if (response.status === 401) {
            return redirect("/login");
        }
        if (!response.ok) {
            return new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        return null;
    }
}


function Settings() {
    return(
        <div className="flex items-center gap-1 m-4">
            Choose Mode: <ModeToggle />
        </div>
    )
}

export default Settings;