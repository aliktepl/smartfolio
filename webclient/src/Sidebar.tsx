import {FaCog, FaSearch, FaSignOutAlt, FaWallet} from 'react-icons/fa';
import {RxDashboard} from "react-icons/rx";
import Logo from "./assets/Logo.tsx";

const Sidebar = () => {
    return (
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
                        <a href="#" className="flex items-center text-[#9E9E9E] hover:text-white">
                            <RxDashboard className="mr-2"/>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center text-[#9E9E9E] hover:text-white">
                            <FaSearch className="mr-2"/>
                            Explore
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center text-[#9E9E9E] hover:text-white">
                            <FaWallet className="mr-2"/>
                            Wallet
                        </a>
                    </li>
                </ul>
            </nav>
            <nav className="p-4 border-t border-gray-800">
                <ul className="space-y-4">
                    <li>
                        <a href="#" className="flex items-center text-[#9E9E9E]
                        hover:text-white">
                            <FaCog className="mr-2"/>
                            Settings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center text-[#9E9E9E] hover:text-white">
                            <FaSignOutAlt className="mr-2"/>
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;