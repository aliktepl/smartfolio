import {Coin, columns } from "./columns"
import { DataTable } from "./data-table"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {useLoaderData} from "react-router-dom";


// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {

    return fetch("http://localhost:3000/Users/wallet")
        .then((response) => response.json())
        .catch((error) => console.error("Error fetching wallet data:", error));
}

export default function Wallet() {
    const data = useLoaderData() as Coin[];
    // const [data, setData] = useState<Coin[]>([]);
    return (
        <div className="container mx-auto py-10">
            <div className="hidden"><ModeToggle/></div>
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
