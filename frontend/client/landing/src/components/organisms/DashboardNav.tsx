import { SidebarTrigger } from "@/components/ui/sidebar"
import { BellIcon } from "@/components/atoms/Icons"
import { ToggleTheme } from "@/components/molecules/ToggleTheme"
import UserAvatar from "@/components/molecules/UserAvatar"

const DashboardNav = () => {
  return (
    <div className="fixed lg:sticky top-0 w-full bg-white dark:bg-[#18181b] px-5 shadow">
        <div className="flex items-center justify-between py-4">
          <div className="space-x-3 flex items-center">
            <SidebarTrigger className="!w-6 !h-6 lg:!w-5 lg:!h-5 !text-black dark:!text-white" />
            <p className="darkModeText hidden lg:block ml-5 font-semibold text-lg">1,234,567,890 pts</p>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <ToggleTheme />
            <BellIcon className="w-6 lg:w-5 h-6 lg:h-5 !text-black dark:!text-white" />
            <UserAvatar />
          </div>
        </div>
    </div>
  )
}

export default DashboardNav