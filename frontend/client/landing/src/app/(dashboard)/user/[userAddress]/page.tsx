import type { Metadata } from 'next'
import UserIndex from "@/components/pages/Users/Index"
import { shortenHexStringServer } from '@/utils/server'

type Props = {
  params: Promise<{ userAddress: string }>
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const userAddress = (await params).userAddress

  return {
    title: `User: ${shortenHexStringServer(userAddress, "sh")} | Dashboard`,
    description: `User: ${userAddress}`,
  }
}

const page = () => {
  return (
    <div className="container mx-auto px-5 my-auto py-5 darkModeText">
      <UserIndex />
    </div>
  )
}

export default page