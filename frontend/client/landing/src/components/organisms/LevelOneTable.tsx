"use client"

import * as React from "react"
import {useEffect} from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, Loader2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Progress} from "@/components/ui/progress"
import {Card, CardDescription, CardHeader} from "@/components/ui/card";
import * as T from "@/types"
import {useWeb3Store} from "@/store";
import {getLevelOne} from "@/functions";
import LevelOneNewStakeModal from "@/components/organisms/LevelOneNewStakeModal";
// import {useAuthStore} from "@/store/auth";
// import {useGetStakers} from "@/hooks/useWeb3";
import {useUserContext} from "@/context/UserContext";

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
}

const getProgress = (startDate: number, endDate: number): number => {
  const now = Date.now()
  if (now >= endDate) return 100
  const total = endDate - startDate
  const elapsed = now - startDate
  return (elapsed / total) * 100
}

export const columns: ColumnDef<T.Investment>[] = [
  {
    accessorKey: "id",
    header: ({column}) => {
      return (
        <Button
          className="hover:!bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => <div className="ml-2">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({column}) => {
      return (
        <Button
          className="hover:!bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "startDate",
    header: ({column}) => {
      return (
        <Button
          className="hover:!bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const startDate = row.getValue("startDate") as number
      return <div>{formatDate(startDate)}</div>
    },
  },
  {
    accessorKey: "endDate",
    header: ({column}) => {
      return (
        <Button
          className="hover:!bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const endDate = row.getValue("endDate") as number
      return <div>{formatDate(endDate)}</div>
    },
  },
  {
    accessorKey: "profit",
    header: ({column}) => {
      return (
        <Button
          className="hover:!bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Profit
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const profit = parseFloat(row.getValue("profit"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit)
      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
      const startDate = row.original.startDate
      const endDate = row.original.endDate
      const now = Date.now()
      const isCompleted = now >= endDate
      
      if (isCompleted) {
        return <div>Completed</div>
      } else {
        const progress = getProgress(startDate, endDate)
        return (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-[60%]"/>
            <span>{Math.round(progress)}%</span>
          </div>
        )
      }
    },
  },
]

const LevelOneTable = () => {
  const address = useWeb3Store((state) => state.address);
  const {stakers, balLoading} = useUserContext()
  const data = stakers.length ? getLevelOne(stakers, address) : []
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  
  useEffect(() => {
    if (data.length) {
      sessionStorage.clear()
    } else {
      sessionStorage.setItem("c6f03c2a-cb01-464d-b0ce-0ed3656b5d24", "d7c3c465-348e-4a91-8e6e-2543c37b5ae0")
    }
  }, [data]);
  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId)
      if (typeof rowValue === "string" || typeof rowValue === "number") {
        return String(rowValue).toLowerCase().includes(filterValue.toLowerCase())
      }
      return false
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })
  
  return (
    <>
      {data.length ? (
        <Card className="!px-3">
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter by ID, Amount, Date, Profit, or Status..."
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto setBtn">
                    Columns <ChevronDown/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
          <span className="mr-2">Showing {table.getRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} stakes.</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="setBtn">
                      Stakes per view: {table.getState().pagination.pageSize} <ChevronDown className="ml-2 h-4 w-4"/>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {[5, 10, 25, 50, 100].map((pageSize) => (
                      <DropdownMenuItem
                        key={pageSize}
                        onClick={() => table.setPageSize(pageSize)}
                      >
                        Show {pageSize}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-x-2 flex items-center">
                {/* Dropdown to change page size */}
                
                {/* Pagination buttons */}
                <Button
                  className="setBtn"
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  className="setBtn"
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="p-0 lg:px-8 lg:py-4 flex items-center justify-center">
          <Card className="!rounded-xl !shadow-lg !p-6 !w-full !max-w-2xl">
            <CardHeader className="!text-center !mb-2">
              <h2 className="text-2xl font-bold">Nestage De-Fi Staking</h2>
            </CardHeader>
            <CardDescription className="!text-center !mb-6 !flex flex-col !justify-center !items-center gap-3">
              <span className="italic font-medium">{`You don't have any active stake yet.`}</span>
              {!balLoading ? <LevelOneNewStakeModal size="large"/> : (<Loader2
                className="h-5 w-5 animate-spin"/>)}
            </CardDescription>
          </Card>
        </div>
      )}
    </>
  )
}

export default LevelOneTable