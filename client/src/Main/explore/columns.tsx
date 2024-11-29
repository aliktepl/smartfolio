import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, TrendingDown, TrendingUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Link} from "react-router-dom";
import {TokenIcon} from "@web3icons/react";

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

const sentimentPositiveNegative = (sentiment: Record<string, number>) => {
    let pos = 0, neutral = 0, neg = 0;
    for (const [grade, value] of Object.entries(sentiment)) {
        const gradeNum = parseFloat(grade); // Ensure the grade is treated as a number

        if (gradeNum >= 1 && gradeNum <= 4) {
            neg += value;
        } else if (gradeNum >= 5 && gradeNum <= 6) {
            neutral += value;
        } else if (gradeNum >= 7 && gradeNum <= 10) {
            pos += value;
        }
    }
    return { pos, neutral, neg };
};


export const columns: ColumnDef<CoinsRow>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({row}) => {
            return (
                <span className="flex items-center">
                    <TokenIcon symbol={row.original.symbol} variant="branded" />
                    {row.original.name}
                </span>
            )
        }
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
            return row.getValue("change") >= 0 ? (
                <div className="pl-10 text-green-500 flex items-center">
                    <span>{row.getValue("change")}%</span>
                    <TrendingUp className="ml-1"/>
                </div>
            ) : (
                <div className="pl-8 text-red-500 flex items-center">
                    <span>{row.getValue("change")}%</span>
                    <TrendingDown className="ml-1"/>
                </div>
            );
        }
    },
    {
        accessorKey: "sentiment",
        header: "Sentiment",
        cell: ({ row }) => {
            const { pos, neutral, neg } = sentimentPositiveNegative(row.getValue("sentiment"));
            const maxSentiment = Math.max(pos, neutral, neg);

            // Determine the Tailwind CSS class based on which value is the maximum
            let sentimentClass = '';
            let sentimentText = '';
            if (maxSentiment === pos) {
                sentimentClass = 'text-green-500';
                sentimentText = 'Positive';
            } else if (maxSentiment === neg) {
                sentimentClass = 'text-red-500';
                sentimentText = 'Negative';
            } else if (maxSentiment === neutral) {
                sentimentClass = 'text-gray-500';
                sentimentText = 'Neutral';
            }

            return (
                <div className={`${sentimentClass}`}>
                    {sentimentText}
                </div>
            );
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
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
                            <Link to={`../${row.original.symbol}`}>
                                View Coin
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]