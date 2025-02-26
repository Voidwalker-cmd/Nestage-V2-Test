import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsWallet from '@/pages/(dashboard)/settings/wallet'

export const Route = createLazyFileRoute('/dashboard/settings/wallet')({
  component: SettingsWallet,
})
