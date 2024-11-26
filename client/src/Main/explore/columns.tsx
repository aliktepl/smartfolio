import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, TrendingDown, TrendingUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom";

export interface CoinsRow {
    graph: graph[];
    name: string;
    symbol: string;
    change: number;
    tech_info: tech_info
    sentiment: sentiment[];
}

export interface graph {
    time: string;
    price: number;
}

export interface sentiment {
    grade: number;
    percentage: number;
}

export interface tech_info {
    market_cap: number;
    total_supply: number;
    change: number;
    price: number;
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
            // @ts-ignore
            return Object.entries(row.getValue('sentiment')).reduce((maxKey, [key, value]) => {
                // @ts-ignore
                return row.getValue('sentiment')[maxKey] >= value ? maxKey : key;
            }, Object.keys(row.getValue('sentiment'))[0]);
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
    },
]