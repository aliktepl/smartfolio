import './App.css'
import Dashboard from "./Main/Dashboard.tsx";
import Sidebar, {loader as sidebarLoader} from "./Main/Sidebar.tsx";
import {loader as coinLoader} from "./Main/Coin.tsx";
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Login from "./Login/Login.tsx";
import Signup from "./Signup/Signup.tsx";
import Explore from "./Main/Explore.tsx";
import Wallet from "@/Main/wallet/Wallet.tsx"
import Settings from "./Main/Settings.tsx";
import Coin from "./Main/Coin.tsx";
import {AuthProvider} from "./Authentication/AuthProvider.tsx";
import { ThemeProvider } from "@/components/theme-provider"


const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/logout",
        async loader() {
            await AuthProvider.signOut()
            return redirect("/login")
        }
    },

    {
        path: "/",
        id: "root",
        element: <Sidebar/>,
        loader: sidebarLoader,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                index: true,
                element: <Dashboard/>
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
        // UI is flickering when refreshing, FIX THIS
        <ThemeProvider defaultTheme='dark' storageKey="vite-ui-theme">
            <RouterProvider router={router}/>
        </ThemeProvider>
    )
}

export default App
