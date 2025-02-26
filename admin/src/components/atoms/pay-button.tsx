import { Button } from "@/components/ui/button"

interface PayButtonProps {
  userId: string
  onPay: (userId: string) => void
}

export function PayButton({ userId, onPay }: PayButtonProps) {
  return (
    <Button variant="destructive" onClick={() => onPay(userId)} className="bg-red-500 hover:bg-red-600">
      Pay Now
    </Button>
  )
}

