import { createLazyFileRoute } from '@tanstack/react-router'
import Notifications from '@/pages/(dashboard)/notifications'

export const Route = createLazyFileRoute('/dashboard/notifications/')({
  component: Notifications,
})
