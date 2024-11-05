import Dashboard, {loader as dashboardLoader} from "./Main/Dashboard.tsx";
import Sidebar, {loader as sidebarLoader} from "./Main/Sidebar.tsx";
import Coin, {loader as coinLoader} from "@/Main/Coin.tsx";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Login, {loader as loginLoader} from "@/Login/Login.tsx";
import Explore from "@/Main/Explore.tsx";
import Wallet, {loader as walletLoader} from "@/Main/wallet/Wallet.tsx"
import Settings from "@/Main/Settings.tsx";
import {AuthProvider} from "@/Authentication/AuthProvider.tsx";
import {ThemeProvider} from "@/components/theme-provider"

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
        loader: loginLoader
    },
    {
        path: "/logout",
        async loader() {
            await AuthProvider.signOut()
            await fetch("http://localhost:3000/auth/logout", {
                credentials: "include", // Ensures cookies are sent with the request
            });
            return redirect("/login")
        }
    },
    {
        path: "/",
        id: "root",
        element: <Sidebar/>,
        loader: sidebarLoader,
        children: [
            {
                index: true,
                element: <Dashboard/>,
                loader: dashboardLoader,
            },
            {
                path: ":coinId",
                element: <Coin/>,
                loader: coinLoader
            },
            {
                path: "explore",
                element: <Explore/>,
            },
            {
                path: "wallet",
                id: "wallet",
                element: <Wallet/>,
                loader: walletLoader
            },
            {
                path: "settings",
                element: <Settings/>,
            }
        ]
    }
]);


function App() {
    return (
        <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App
