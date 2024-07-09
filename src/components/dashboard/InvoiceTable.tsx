import { Payment, columns } from "@/components/ui/columns-invoice"
import { DataTable } from "@/components/ui/data-table"
import { ArrowBigDown, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "premium",
      name: "Invoice",
      date: "18-20-2019",
      downloadUrl: "/invoices/invoice1.pdf",
    },
    {
        id: "728ed523",
        amount: 300,
        status: "free",
        name: "Invoice",
        date: "18-23-2019",
        downloadUrl: "/invoices/invoice1.pdf",
      },
    // ...
  ]
}

export default async function InvoiceTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 bg-white">
        <div className="flex justify-between">
          <h1 className="text-sm font-bold mb-1 md:mb-2">Billing history</h1>
            <Button
                variant="outline"
                className="w-[130px] justify-between border border-gray-300"
                >
                <ArrowBigDown className="h-4 w-4 shrink-0 opacity-50" />
                Most recent
            </Button>
        </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
