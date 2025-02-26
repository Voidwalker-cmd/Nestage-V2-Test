import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsPassword from '@/pages/(dashboard)/settings/password'

export const Route = createLazyFileRoute('/dashboard/settings/')({
  component: SettingsPassword,
})
