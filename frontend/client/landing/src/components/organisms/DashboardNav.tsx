import {SidebarTrigger} from "@/components/ui/sidebar"
import {ToggleTheme} from "@/components/molecules/ToggleTheme"
import {Points} from "@/components/molecules/Points";
import Notification from "@/components/molecules/Notification";
import ConnectWallet from "@/components/molecules/ConnectWallet";

const DashboardNav = () => {
  return (
    <div className="fixed lg:sticky top-0 w-full bg-white dark:bg-[#18181b] px-5 shadow !z-50">
        <div className="flex items-center justify-between py-4">
          <div className="space-x-3 flex items-center ">
            <SidebarTrigger className="!w-6 !h-6 lg:!w-5 lg:!h-5 !text-black dark:!text-white" />
            <p className="darkModeText hidden lg:block ml-5 font-semibold text-lg"><Points/></p>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <ToggleTheme />
            <Notification/>
            <ConnectWallet isDashboard={!!1}/>
          </div>
        </div>
    </div>
  )
}

export default DashboardNav