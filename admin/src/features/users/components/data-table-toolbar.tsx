import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input.tsx'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder="Filter by wallet or referral code..."
          value={(table.getColumn('wallet')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            const value = event.target.value;
            table.getColumn('wallet')?.setFilterValue(value);
            table.getColumn('referralCode')?.setFilterValue(value.toUpperCase());
          }}
          className="h-8 w-[250px]"
        />
      
      </div>
    </div>
  )
}
