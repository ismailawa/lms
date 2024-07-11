"use client"

import { ColumnDef } from "@tanstack/react-table"


export type Payment = {
  id: string
  amount: number
  status: "Premium" | "Basic" | "Free"
  date: string
  name: string
  downloadUrl: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
        return <div className="text-xs font-bold">{row.getValue("name")}</div>
      },
  }, 
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
        return <div className="text-xs font-bold">{row.getValue("date")}</div>
      },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        return <div className="text-xs font-bold">{row.getValue("status")}</div>
      },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-xs font-bold">{formatted}</div>
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Download Invoice",
    cell: ({ row }) => {
      const downloadUrl = row.getValue("downloadUrl");
      return (
        <a
          href={downloadUrl as string}
          download
          className=""
        >
          <img src="/images/invoice.png" alt="" width={20} height={20} />
        </a>
      );
    },
  },
]
