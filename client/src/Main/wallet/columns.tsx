import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";

export interface WalletRow {
    id: number;
    name: string;
    symbol: string;
    amount: number;
    change: number;
}

export const columns: ColumnDef<WalletRow>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "symbol",
        header: "Symbol",
    },
    {
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <div className="">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>

            )
        },
        cell: ({row}) => {
            return <div className="ml-4">{row.getValue("amount")}</div>
        }
    },
    {
        accessorKey: "change",
        header: "Change",
    }
]
