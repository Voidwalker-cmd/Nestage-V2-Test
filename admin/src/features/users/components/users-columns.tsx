import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { callTypes } from '../data/data.ts'
import { User } from '../data/schema.ts'
import { DataTableColumnHeader } from './data-table-column-header.tsx'
import { DataTableRowActions } from './data-table-row-actions.tsx'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('id')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'wallet',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Wallet Id' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-36'>{row.getValue('wallet')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  // {
  //   id: 'wallet',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Wallet Id' />
  //   ),
  //   cell: ({ row }) => (
  //     <LongText className='max-w-36'>{row.getValue("wallet")}</LongText>
  //   ),
  //   meta: { className: 'w-36' },
  //   enableSorting: false,
  // },
  {
    accessorKey: 'referralCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Referral Code' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('referralCode')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'points',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Points' />
    ),
    cell: ({ row }) => <div>{row.getValue('points')} Nst Pst</div>,
  },
  {
    accessorKey: 'levelOne',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Level One' />
    ),
    cell: ({ row }) => {
      const { levelOne } = row.original
      const badgeColor = callTypes.get(levelOne)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('levelOne')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'levelOneStake',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Level One Stake' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('levelOneStake')}</div>,
  },
  {
    accessorKey: 'levelTwo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Level Two' />
    ),
    cell: ({ row }) => {
      const { levelTwo } = row.original
      const badgeColor = callTypes.get(levelTwo)
      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {row.getValue('levelTwo')}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: 'levelTwoStake',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Level Two Stake' />
    ),
    cell: ({ row }) => <div className='w-fit text-nowrap'>{row.getValue('levelTwoStake')}</div>,
  },
  // {
  //   accessorKey: 'dateJoined',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Date Joined' />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('dateJoined')}</div>,
  // },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
