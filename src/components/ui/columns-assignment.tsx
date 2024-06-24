"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type  Input = {
  id: string
  date: string
  name: string
  completedAssignments: number;
  totalAssignments: number;
}
 
export const columns: ColumnDef<Input>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Due date",
  },
  {
    accessorKey: "status",
    header: "Completed",
    cell: ({ row }) => {
      const { completedAssignments, totalAssignments } = row.original;
      return `${completedAssignments}/${totalAssignments}`;
    },
  },
  {   
    accessorKey: "actions",
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              view assignment
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    // You can access the row data using row.original in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API.
  },
]