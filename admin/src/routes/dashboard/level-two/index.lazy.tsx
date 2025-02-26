import { createLazyFileRoute } from '@tanstack/react-router'
import levelTwo from '@/pages/(dashboard)/level-two'

export const Route = createLazyFileRoute('/dashboard/level-two/')({
  component: levelTwo,
})
