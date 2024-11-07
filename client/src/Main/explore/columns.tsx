import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";

export interface CoinsRow {
    name: string;
    symbol: string;
    change: number;
    sentiment: number;
}

export const columns: ColumnDef<CoinsRow>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "symbol",
        header: "Symbol",
    },
    {
        accessorKey: "change",
        header: ({column}) => {
            return (
                <div className="">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Change
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>

            )
        },
        cell: ({row}) => {
            return <div className="ml-4">{row.getValue("change")}</div>
        }
    },
    {
        accessorKey: "sentiment",
        header: "Sentiment",
    }
]