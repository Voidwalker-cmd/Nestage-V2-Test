"use client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const UserIndex  = () => {
    return (
        <>
            <Card className="!p-3">
                <div className="!grid !grid-cols-4 lg:!grid-cols-12 !gap-3 lg:!gap-5">
                    <Card className="!w-auto !col-span-4 lg:!col-span-4">
                        <CardHeader>
                            <CardDescription>Total Earings</CardDescription>
                            <CardTitle>$7,890</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="!w-auto !col-span-4 lg:!col-span-4">
                        <CardHeader>
                            <CardDescription>Level One</CardDescription>
                            <CardTitle>$3,890</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="!w-auto !col-span-4 lg:!col-span-4">
                        <CardHeader>
                            <CardDescription>Level Two</CardDescription>
                            <CardTitle>$1,890</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
                <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-3 lg:!gap-5 !mt-2">
                    <Card className="!border-0 !w-auto !col-span-2 lg:!col-span-3 !bg-transparent dark:!bg-inherit !shadow-none dark:!shadow">
                        <CardHeader>
                            <CardDescription>Status</CardDescription>
                            <CardTitle>Active</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="!border-0 !w-auto !col-span-5 lg:!col-span-9 !bg-transparent dark:!bg-inherit !shadow-none dark:!shadow">
                        <CardHeader>
                            <div className="!flex !justify-end">
                                <div>
                                    <CardDescription>Link</CardDescription>
                                    <CardTitle>https://nestage.io/?ref=1234</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                </div>
            </Card>
        </>
    )
}

export default UserIndex