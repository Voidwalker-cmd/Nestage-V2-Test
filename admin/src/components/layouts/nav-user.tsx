import {Link} from '@tanstack/react-router'
import {
  // BadgeCheck,
  // Bell,
  ChevronsUpDown,
  // CreditCard,
  LogOut,
  Settings,
} from 'lucide-react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {useWeb3Store} from "@/stores/web3Store.ts";

export function NavUser({
                          user,
                        }: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const {isMobile} = useSidebar()
  const masterAddress = useWeb3Store((state) => state.masterAddress)
  
  return (
    <>
      {masterAddress ?
        (<SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={user.avatar} alt={user.name}/>
                    <AvatarFallback className='rounded-lg'>AD</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>Admin Address</span>
                    <span className='truncate text-xs'>{masterAddress}</span>
                  </div>
                  <ChevronsUpDown className='ml-auto size-4'/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side={isMobile ? 'bottom' : 'right'}
                align='end'
                sideOffset={4}
              >
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage src={user.avatar} alt={masterAddress}/>
                      <AvatarFallback className='rounded-lg'>AD</AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>Admin Address</span>
                      <span className='truncate text-xs'>{masterAddress}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to='/dashboard/settings'>
                      <Settings className="size-4"/>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                  <LogOut/>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>) : ("")}
    </>
  )
}
