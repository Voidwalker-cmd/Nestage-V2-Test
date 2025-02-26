import Cookies from 'js-cookie'
import {createFileRoute, Outlet} from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layouts/app-sidebar'
// import {useEffect, useState} from "react";
// import {useAuthStore} from "@/stores/authStore";
// import { Loader2 } from "lucide-react"
{/*import SkipToMain from '@/components/skip-to-main'*/}

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  // const isAuth = useAuthStore((state) => state.isAuth)
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'
  // const [loading, setLoading] = useState(!!1)
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   if(isAuth) {
  //     setLoading(!!0)
  //   } else {
  //     navigate({ to: '/' })
  //   }
  // }, []);
  
  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        {/*<SkipToMain />*/}
        <AppSidebar />
        <div
          id="content"
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh',
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
