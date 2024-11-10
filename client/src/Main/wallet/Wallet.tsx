import {columns, WalletRow} from "./columns"
import {DataTable} from "./data-table"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {redirect, useLoaderData, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";

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
            return new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
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
                navigate('/login', {replace: true}); // Redirect to login if unauthorized
            }
        };

        checkAuthStatus().then(() => {
        });
    }, [navigate]);

    async function script() {
        // const getCoin = async () => {
        //     const response = await fetch("http://localhost:3000/api/coins/BTC", {
        //         credentials: "include",
        //     });
        //     const res = await response.json()
        //     console.log("coin: ",res)
        //     return res
        // }
        // await getCoin()

        // const addCoinToWllet = async (amount : number) => {
        //     const response = await fetch("http://localhost:3000/api/wallet/LTC", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         credentials: "include", // Include cookies if necessary for authentication
        //         body: JSON.stringify({ amount: amount }) // Send the amount in the body
        //     });
        //
        //     const res = await response.json();
        //     console.log("wallet data: ", res);
        //     return res;
        // };
        //
        // await addCoinToWllet(12);
//         const deleteWallet = async (id : string) => {
//             const response = await fetch(`http://localhost:3000/api/wallet/${id}`, {
//                 method: "DELETE",
//                 credentials: "include", // Include cookies if necessary for authentication
//             });
//
//             const res = await response.json();
//             console.log("Deleted wallet: ", res);
//             return res;
//         };
//
// // Example usage:
//         await deleteWallet('ETH');
//         const updateWallet = async (id : string, amount : number) => {
//             const response = await fetch(`http://localhost:3000/api/wallet/${id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 credentials: "include", // Include cookies if necessary for authentication
//                 body: JSON.stringify({ amount: amount }) // Send the amount in the body
//             });
//
//             const res = await response.json();
//             console.log("Updated wallet: ", res);
//             return res;
//         };
//
// // Example usage:
//         await updateWallet('BTC', 21)
    }

    const data = useLoaderData() as WalletRow[];
    return (
        <>
            <div className="container mx-auto py-10">
                <div className="hidden"><ModeToggle/></div>
                <DataTable columns={columns} data={data}/>
            </div>
            <Button onClick={script}>Run script</Button>
        </>
    )
}
