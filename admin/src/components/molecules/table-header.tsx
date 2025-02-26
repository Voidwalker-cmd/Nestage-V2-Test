import { Input } from "@/components/ui/input"

interface TableHeaderProps {
  filter: string
  setFilter: (value: string) => void
}

export function TableHeader({ filter, setFilter }: TableHeaderProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search stakers..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
    </div>
  )
}

