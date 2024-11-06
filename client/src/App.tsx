import Dashboard, {loader as dashboardLoader} from "./Main/Dashboard.tsx";
import Sidebar, {loader as sidebarLoader} from "./Main/Sidebar.tsx";
import Coin, {loader as coinLoader} from "@/Main/Coin.tsx";
import {loader as settingsLoader} from "@/Main/Settings.tsx"
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Login, {loader as loginLoader} from "@/Login/Login.tsx";
import Explore from "@/Main/explore/Explore.tsx";
import Wallet, {loader as walletLoader} from "@/Main/wallet/Wallet.tsx"
import Settings from "@/Main/Settings.tsx";
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
            try {
                await fetch("http://localhost:3000/auth/logout", {
                    credentials: "include"
                });
                return redirect("/login")
            } catch (error) {
                throw redirect('/login')
            }
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
                loader: settingsLoader,
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
