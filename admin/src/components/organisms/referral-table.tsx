import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { TableHeader } from "@/components/molecules/table-header"
import type { Referral } from "@/lib/types/staker"
import LongText from "@/components/long-text.tsx";
import {IconArrowsDownUp} from "@tabler/icons-react";

interface ReferralTableProps {
  data: Referral[]
}

export function RefferalTable({ data }: ReferralTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<Referral>[] = [
    {
      accessorKey: "sn",
      header: "SN",
      enableSorting: true,
      cell: ({ row }) => (
        <span className='max-w-6'>{row.getValue("sn")}</span>
      ),
    },
    {
      accessorKey: "userid",
      header: "User ID",
      enableSorting: false,
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('userid')}</LongText>
      ),
    },
    {
      accessorKey: "wallet",
      header: "Wallet",
      enableSorting: false,
      cell: ({ row }) => (
        <LongText className='max-w-36'>{row.getValue('wallet')}</LongText>
      ),
    },
    {
      accessorKey: "referralCode",
      header: "Referral Code",
      enableSorting: false,
    },
    {
      accessorKey: "firstUpline",
      header: "1st Upline",
      enableSorting: true,
    },
    {
      accessorKey: "secondUpline",
      header: "2nd Upline",
      enableSorting: true,
    },
    {
      accessorKey: "thirdUpline",
      header: "3rdt Upline",
      enableSorting: true,
    }
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">
      <TableHeader filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="rounded-md border">
        <Table>
          {/*<TableHeader>*/}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="font-bold text-base bg-gray-100 hover:bg-gray-100 ">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? "cursor-pointer select-none hover:text-blue-500 hover:font-semibold text-black dark:text-white transition-all duration-300" : "text-black dark:text-white",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <span className="flex items-center gap-1">{flexRender(header.column.columnDef.header, header.getContext())} {header.column.getCanSort() ? <IconArrowsDownUp className="size-3.5 font-bold" /> : ""}</span>
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          {/*</TableHeader>*/}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

