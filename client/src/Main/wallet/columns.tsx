import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TrendingUp, TrendingDown} from "lucide-react";

export interface WalletRow {
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
        header: "1 Day Change",
        cell: ({row}) => {
            // @ts-ignore
            return row.getValue("change") > 0 ? (
                <div className="text-green-500 flex items-center">
                    <span>{row.getValue("change")}%</span>
                    <TrendingUp className="ml-1" />
                </div>
            ) : (
                <div className="text-red-500 flex items-center">
                    <span>{row.getValue("change")}%</span>
                    <TrendingDown className="ml-1" />
                </div>
            );
        }
    }
]