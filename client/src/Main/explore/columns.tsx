import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, TrendingDown, TrendingUp} from "lucide-react";
import {Button} from "@/components/ui/button";

export interface CoinsRow {
    name: string;
    symbol: string;
    change: number;
    tech_info: tech_info
    sentiment: object;
}

interface tech_info {
    change: number;
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
                        1 Day Change
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>

            )
        },
        cell: ({row}) => {
            // @ts-ignore
            return row.getValue("change") > 0 ? (
                <div className="text-green-500 flex items-center">
                    <span>{row.getValue("change")}%</span>
                    <TrendingUp className="ml-1"/>
                </div>
            ) : (
                <div className="text-red-500 flex items-center">
                    <span>{row.getValue("change")}%</span>
                    <TrendingDown className="ml-1"/>
                </div>
            );
        }
    },
    {
        accessorKey: "sentiment",
        header: "Sentiment",
        cell: ({row}) => {
            console.log(row.getValue("sentiment"));
            // @ts-ignore
            return Object.entries(row.getValue('sentiment')).reduce((maxKey, [key, value]) => {
                // @ts-ignore
                return row.getValue('sentiment')[maxKey] >= value ? maxKey : key;
            }, Object.keys(row.getValue('sentiment'))[0]);
        }
    }
]