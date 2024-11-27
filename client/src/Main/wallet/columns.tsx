import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, TrendingDown, TrendingUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Link, useNavigate} from "react-router-dom";
import {tech_info} from "@/Main/explore/columns.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input.tsx";
import React from "react";


export interface WalletRow {
    name: string;
    symbol: string;
    amount: number;
    change: number;
    tech_info: tech_info
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
        id: "actions",
        cell: ({row}) => {
            const [amount, setAmount] = React.useState('');
            const coin = row.original
            const navigate = useNavigate();

            const handleChange = (event: { target: { value: string } }) => {
                const value = event.target.value;
                const isValidFloat = /^(\d+\.?\d*|\.\d*)$/.test(value);
                if (value === '' || isValidFloat) {
                    setAmount(value);
                }
            };

            const changeCoin = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/wallet/${coin.symbol}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({amount: parseFloat(amount)}), // Send the amount in the body
                    });
                    if (response.ok) {
                        navigate(`/wallet`);
                        setAmount('');
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            };

            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link to={`../${coin.symbol}`}>
                                    View Coin
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <DialogTrigger>Change Amount</DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Insert new amount</DialogTitle>
                            <DialogDescription>
                                How much of the coin is in your wallet?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <Input type="text" id="amount" value={amount} onChange={handleChange}
                                       placeholder="Insert amount" inputMode="numeric"/>
                            </div>
                            <DialogClose asChild>
                                <Button onClick={changeCoin}>
                                    Change
                                </Button>
                            </DialogClose>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        },
    }
]