import {createBrowserRouter, replace, RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@/components/theme-provider"
import Dashboard, {loader as dashboardLoader} from "./Main/Dashboard.tsx";
import Sidebar, {loader as sidebarLoader} from "./Main/Sidebar.tsx";
import Coin, {loader as coinLoader} from "@/Main/Coin.tsx";
import Login, {loader as loginLoader} from "@/Login/Login.tsx";
import Explore, {loader as exploreLoader} from "@/Main/explore/Explore.tsx";
import Wallet, {loader as walletLoader} from "@/Main/wallet/Wallet.tsx"
import Settings, {loader as settingsLoader} from "@/Main/Settings.tsx";
import axios from "axios";

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
                await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
                localStorage.clear();
                return replace('/login'); // This will handle the redirection
            } catch (err) {
                console.error('Logout failed', err);
                // You may want to handle error here, like returning a response with an error status
                throw new Error('Logout failed');
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
                loader: exploreLoader
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
