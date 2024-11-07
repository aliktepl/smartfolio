import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/user", {
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
        console.error("Error fetching data:", error);
        return null;
    }
}


function Settings() {

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

    return(
        <div className="flex items-center gap-1 m-4">
            Choose Mode: <ModeToggle />
        </div>
    )
}

export default Settings;