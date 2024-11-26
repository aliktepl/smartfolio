import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, TrendingDown, TrendingUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx";
import {Link} from "react-router-dom";
import {tech_info} from "@/Main/explore/columns.tsx";

export interface WalletRow {
    name: string;
    symbol: string;
    amount: number;
    change: number;
    tech_info : tech_info
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
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const coin = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link to={`../${coin.symbol}`}>
                                View Coin
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]