import {FaCog, FaSearch, FaSignOutAlt, FaWallet} from 'react-icons/fa';
import {RxDashboard} from "react-icons/rx";
import {NavLink, Outlet, redirect} from "react-router-dom";
import Logo from "../assets/Logo.tsx";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {PanelLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    if (!AuthProvider.isAuthenticated) {
        return redirect("/login");
    }
    return null;
}

function Sidebar() {

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="w-64 bg-background hidden sm:flex border-r">
                <div className="sidebar-content">
                    <div className="flex items-center justify-center h-20">
                        <div className="flex">
                            <Logo></Logo>
                            <h1 className="text-2xl ml-2 font-bold">
                                SmartFolio
                            </h1>
                        </div>
                    </div>
                    <nav className="flex-grow p-4 flex flex-col items-center">
                        <ul className="space-y-4 w-full">
                            <li>
                                <NavLink to={'/'} className={({isActive}) => {
                                    return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                }}>
                                    <RxDashboard className="mr-2"/>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/explore'} className={({isActive}) => {
                                    return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                }}>
                                    <FaSearch className="mr-2"/>
                                    Explore
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/wallet'} className={({isActive}) => {
                                    return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                }}>
                                    <FaWallet className="mr-2"/>
                                    Wallet
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <nav className="p-4 flex flex-col items-center">
                        <ul className="space-y-4 w-full">
                            <li>
                                <NavLink to={'/settings'} className={({isActive}) => {
                                    return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                }}>
                                    <FaCog className="mr-2"/>
                                    Settings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/logout'} className={({isActive}) => {
                                    return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                }}>
                                    <FaSignOutAlt className="mr-2"/>
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                            <div className="sidebar-content">
                                <div className="flex items-center justify-center h-20">
                                    <div className="flex">
                                        <Logo></Logo>
                                        <h1 className="text-2xl ml-2 font-bold">
                                            SmartFolio
                                        </h1>
                                    </div>
                                </div>
                                <nav className="flex-grow p-4 flex flex-col items-center">
                                    <ul className="space-y-4 w-full">
                                        <li>
                                            <NavLink to={'/'} className={({isActive}) => {
                                                return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                            }}>
                                                <RxDashboard className="mr-2"/>
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/explore'} className={({isActive}) => {
                                                return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                            }}>
                                                <FaSearch className="mr-2"/>
                                                Explore
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/wallet'} className={({isActive}) => {
                                                return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                            }}>
                                                <FaWallet className="mr-2"/>
                                                Wallet
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/settings'} className={({isActive}) => {
                                                return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                            }}>
                                                <FaCog className="mr-2"/>
                                                Settings
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/logout'} className={({isActive}) => {
                                                return isActive ? "bg-primary text-foreground rounded-xl" : "text-muted-foreground hover:rounded-xl hover:ring-1 hover:text-foreground"
                                            }}>
                                                <FaSignOutAlt className="mr-2"/>
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                    </SheetContent>
                </Sheet>
                <Outlet/>
            </main>
        </div>
    );
}

export default Sidebar;