import {Coin, columns } from "./columns"
import { DataTable } from "./data-table"
import {useRouteLoaderData} from "react-router-dom";

export default function Wallet() {
    const data = useRouteLoaderData("root") as Coin[];

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data}/>
        </div>
    )
}
