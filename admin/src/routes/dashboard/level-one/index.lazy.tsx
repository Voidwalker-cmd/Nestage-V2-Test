import { createLazyFileRoute } from '@tanstack/react-router'
import levelOne from '@/pages/(dashboard)/level-one'

export const Route = createLazyFileRoute('/dashboard/level-one/')({
  component: levelOne,
})
