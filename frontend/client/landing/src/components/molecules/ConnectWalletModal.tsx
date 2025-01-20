"use client"

import {
    Dialog,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

const ConnectWalletModal = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter()

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay className="bg-gray-200 bg-opacity-40">
                <DialogContent className="overflow-y-hiddenc w-full h-[635px] md:w-auto md:h-auto p-10 rounded-lg flex items-center justify-center">
                    <DialogHeader>
                        <DialogTitle className="hidden">Edit profile</DialogTitle>
                        <DialogDescription className="hidden">
                            Make changes to your profile here. Click save when youre done.
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}

export default ConnectWalletModal
