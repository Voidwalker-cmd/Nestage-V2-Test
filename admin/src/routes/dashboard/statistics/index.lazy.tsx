import { createLazyFileRoute } from '@tanstack/react-router'
import Statistics from '@/pages/(dashboard)/chart'

export const Route = createLazyFileRoute('/dashboard/statistics/')({
  component: Statistics,
})
