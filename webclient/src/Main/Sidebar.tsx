import {FaCog, FaSearch, FaSignOutAlt, FaWallet} from 'react-icons/fa';
import {RxDashboard} from "react-icons/rx";
import {NavLink, Outlet, redirect} from "react-router-dom";
import Logo from "../assets/Logo.tsx";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    if(!AuthProvider.isAuthenticated) {
        return redirect("/login")
    }
    return [
        // Should fetch user.
        {name: 'Ethereum', symbol: 'eth', amount: 0.12546, change: -13.4},
        {name: 'Bitcoin', symbol: 'btc', amount: 0.12547, change: -6.0},
        {name: 'Litecoin', symbol: 'ltc', amount: 0.12548, change: 14.25},
        {name: 'Solana', symbol: 'sol', amount: 0.12549, change: -2.0},
        {name: 'Binance Coin', symbol: 'bnb', amount: 0.12543, change: 12.0},
    ]
}

function Sidebar () {

    return (
        <div className="flex h-screen overflow-hidden bg-muted/40">
            <aside className="w-64 flex-shrink-0 bg-background">
                <div className="sidebar-content">
                    <div className="fixed h-screen w-64 flex flex-col">
                        <div className="flex items-center justify-center h-20">
                            <div className="flex">
                                <Logo></Logo>
                                <h1 className="text-2xl ml-2 font-bold">
                                    SmartFolio
                                </h1>
                            </div>
                        </div>
                        <nav className="flex-grow p-4">
                            <ul className="space-y-4">
                                <li>
                                    <NavLink to={'/'} className={({isActive}) => {
                                        return isActive ? "bg-blue-800 text-white rounded-xl" : "text-[#9E9E9E] hover:ring-1 hover:text-white"
                                    }}>
                                        <RxDashboard className="mr-2"/>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/explore'} className={({isActive}) => {
                                        return isActive ? "bg-blue-800 text-white rounded-xl" : "text-[#9E9E9E] hover:ring-1 hover:text-white"
                                    }}>
                                        <FaSearch className="mr-2"/>
                                        Explore
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/wallet'} className={({isActive}) => {
                                        return isActive ? "bg-blue-800 text-white rounded-xl" : "text-[#9E9E9E] hover:ring-1 hover:text-white"
                                    }}>
                                        <FaWallet className="mr-2"/>
                                        Wallet
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <nav className="p-4">
                            <ul className="space-y-4">
                                <li>
                                    <NavLink to={'/settings'} className={({isActive}) => {
                                        return isActive ? "bg-blue-800 text-white rounded-xl" : "text-[#9E9E9E] hover:ring-1 hover:text-white"
                                    }}>
                                        <FaCog className="mr-2"/>
                                        Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/logout'} className={({isActive}) => {
                                        return isActive ? "bg-blue-800 text-white rounded-xl" : "text-[#9E9E9E] hover:ring-1 hover:text-white"
                                    }}>
                                        <FaSignOutAlt className="mr-2"/>
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet/>
            </main>
        </div>
    );
}

export default Sidebar;