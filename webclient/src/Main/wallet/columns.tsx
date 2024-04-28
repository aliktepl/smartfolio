import { ColumnDef } from "@tanstack/react-table"

export interface Coin {
    name: string;
    symbol: string;
    amount: number;
    change: number;
}

export const columns: ColumnDef<Coin>[] = [
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
        header: "Amount",
    },
    {
        accessorKey: "change",
        header: "Change",
    }
]
