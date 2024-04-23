import {FaCog, FaSearch, FaSignOutAlt, FaWallet} from 'react-icons/fa';
import {RxDashboard} from "react-icons/rx";
import {Link, Outlet} from "react-router-dom";
import Logo from "../assets/Logo.tsx";

function Sidebar () {
    return (
        <div className="app">
            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="fixed bg-sidebar text-white h-screen w-64 flex flex-col">
                        <div className="flex items-center justify-center h-20 border-b border-gray-800">
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
                                    <Link to={'/'}
                                          className="flex items-center text-[#9E9E9E] hover:text-white">
                                        <RxDashboard className="mr-2"/>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/explore'} className="flex items-center text-[#9E9E9E] hover:text-white">
                                        <FaSearch className="mr-2"/>
                                        Explore
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/wallet'} className="flex items-center text-[#9E9E9E] hover:text-white">
                                        <FaWallet className="mr-2"/>
                                        Wallet
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <nav className="p-4 border-t border-gray-800">
                            <ul className="space-y-4">
                                <li>
                                    <Link to='/settings' className="flex items-center text-[#9E9E9E] hover:text-white">
                                        <FaCog className="mr-2"/>
                                        Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/login'} className="flex items-center text-[#9E9E9E] hover:text-white">
                                        <FaSignOutAlt className="mr-2"/>
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <Outlet/>
            </div>
        </div>
    );
}

export default Sidebar;