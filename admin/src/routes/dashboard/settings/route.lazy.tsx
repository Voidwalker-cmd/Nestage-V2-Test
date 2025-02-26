import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@/pages/(dashboard)/settings'

export const Route = createLazyFileRoute('/dashboard/settings')({
  component: Settings,
})
