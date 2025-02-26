import { createLazyFileRoute } from '@tanstack/react-router'
import Users from '@/pages/(dashboard)/users'

export const Route = createLazyFileRoute('/dashboard/users/')({
  component: Users,
})
