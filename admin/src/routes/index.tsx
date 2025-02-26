import { createFileRoute } from '@tanstack/react-router'
import SignIn from "@/pages";

export const Route = createFileRoute('/')({
  component: SignIn,
})