import './App.css'
import Dashboard from "./Main/Dashboard.tsx";
import Sidebar from "./Main/Sidebar.tsx"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Login/Login.tsx";
import Signup from "./Signup/Signup.tsx";
import React from "react";
import Explore from "./Main/Explore.tsx";
import Wallet from "./Main/Wallet.tsx";
import Settings from "./Main/Settings.tsx";

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
        path: "/",
        element: <Sidebar/>,
        children: [
            {index:true, element: <Dashboard/>},
            {
                path: "explore",
                element: <Explore />,
            },
            {
                path: "wallet",
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
      <RouterProvider router={router}/>
  )
}

export default App
