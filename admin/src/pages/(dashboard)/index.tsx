import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Main} from '@/components/layouts/main'
import {Header} from '@/components/layouts/header'
// import { TopNav } from '@/components/layout/top-nav'
import {ProfileDropdown} from '@/components/molecules/profile-dropdown'
import {useWeb3Store} from '@/stores/web3Store'
import {useAuth} from "@/context/AuthProvider";
import {useEffect} from "react";
import {Loader2} from "lucide-react";
import Overview from "@/components/Overview";
import {useActiveWalletConnectionStatus} from "thirdweb/react";
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import { Overview } from './components/overview'
// import { RecentSales } from './components/recent-sales'

export default function Dashboard() {
  const masterAddress = useWeb3Store((state) => state.masterAddress)
  const status: "connected" | "disconnected" | "connecting" = useActiveWalletConnectionStatus();
  
  const {
    lvlOne,
    lvlOneUSD,
    getTotalLevelOne,
    stakeError,
    stakesLoading,
    refetchStakes,
    lvlTwo,
    lvlTwoUSD,
    getTotalLevelTwo,
    levelTwoLoading,
    levelTwoError,
    levelTwoRefetch,
    totalUsers,
    allUserLoading,
    allUserRefetch,
    allUserError,
  } = useAuth()
  
  useEffect(() => {
    getTotalLevelOne();
    getTotalLevelTwo();
  })
  
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        {/*  <TopNav links={topNav} />*/}
        <div className='ml-auto flex items-center space-x-4'>
          {/*<Search />*/}
          {/*    <ThemeSwitch />*/}
          <ProfileDropdown/>
        </div>
      </Header>
      
      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          {/*<div className='flex items-center space-x-2'>*/}
          {/*  <Button>Connect Wallet</Button>*/}
          {/*</div>*/}
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              {/*<TabsTrigger value='analytics' disabled>*/}
              {/*  Analytics*/}
              {/*</TabsTrigger>*/}
              {/*<TabsTrigger value='reports' disabled>*/}
              {/*  Reports*/}
              {/*</TabsTrigger>*/}
              {/*<TabsTrigger value='notifications' disabled>*/}
              {/*  Notifications*/}
              {/*</TabsTrigger>*/}
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            {masterAddress ? (<>
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Level One Revenue
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {!stakeError ? (
                      stakesLoading ? (
                        <div className='w-full flex justify-center items-center'><Loader2
                          className="size-7 animate-spin text-black"/></div>
                      ) : (
                        <>
                          <div className='text-2xl font-bold'>${lvlOneUSD}</div>
                          <p className='text-xs text-muted-foreground'>
                            {lvlOne}BUSD
                          </p>
                        </>
                      )
                    ) : (<div className='w-full flex justify-center items-center'>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <p className='text-xs text-red-500'>Error fetching Level One revenue</p>
                        <Button onClick={refetchStakes}>Reload Level One</Button>
                      </div>
                    </div>)}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Level Two Revenue
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {!levelTwoError ? (
                      levelTwoLoading ? (
                        <div className='w-full flex justify-center items-center'><Loader2
                          className="size-7 animate-spin text-black"/></div>
                      ) : (
                        <>
                          <div className='text-2xl font-bold'>${lvlTwoUSD}</div>
                          <p className='text-xs text-muted-foreground'>
                            {lvlTwo}BUSD
                          </p>
                        </>
                      )
                    ) : (<div className='w-full flex justify-center items-center'>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <p className='text-xs text-red-500'>Error fetching Level Two revenue</p>
                        <Button onClick={levelTwoRefetch}>Reload Level Two</Button>
                      </div>
                    </div>)}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Site Profits</CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2'/>
                      <path d='M2 10h20'/>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>${lvlOne + lvlTwo}</div>
                    <p className='text-xs text-muted-foreground'>
                      {lvlOne + lvlTwo} BUSD
                    </p>
                  </CardContent>
                </Card>
                {/*<Card>*/}
                {/*  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>*/}
                {/*    <CardTitle className='text-sm font-medium'>*/}
                {/*      Active Now*/}
                {/*    </CardTitle>*/}
                {/*    <svg*/}
                {/*      xmlns='http://www.w3.org/2000/svg'*/}
                {/*      viewBox='0 0 24 24'*/}
                {/*      fill='none'*/}
                {/*      stroke='currentColor'*/}
                {/*      strokeLinecap='round'*/}
                {/*      strokeLinejoin='round'*/}
                {/*      strokeWidth='2'*/}
                {/*      className='h-4 w-4 text-muted-foreground'*/}
                {/*    >*/}
                {/*      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />*/}
                {/*    </svg>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    <div className='text-2xl font-bold'>+573</div>*/}
                {/*    <p className='text-xs text-muted-foreground'>*/}
                {/*      +201 since last hour*/}
                {/*    </p>*/}
                {/*  </CardContent>*/}
                {/*</Card>*/}
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Users
                    </CardTitle>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'/>
                      <circle cx='9' cy='7' r='4'/>
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'/>
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {!allUserError ? (allUserLoading ? (<div className='w-full flex justify-center items-center'><Loader2
                      className="size-7 animate-spin text-black"/></div>) : ( <div className='text-2xl font-bold'>{totalUsers}</div>
                      // <p className='text-xs text-muted-foreground'>
                      //   +180.1% from last month
                      // </p>
                      )) : (<div className='w-full flex justify-center items-center'>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <p className='text-xs text-red-500'>Error fetching All users</p>
                        <Button onClick={allUserRefetch}>Reload All Users</Button>
                      </div>
                    </div>)}
                   
                  </CardContent>
                </Card>
              </div>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
                <Card className='col-span-1 lg:col-span-7'>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>
                {/*<Card className='col-span-1 lg:col-span-3'>*/}
                {/*  <CardHeader>*/}
                {/*    <CardTitle>Recent Activities</CardTitle>*/}
                {/*    <CardDescription>*/}
                {/*      You made 265 sales this month.*/}
                {/*    </CardDescription>*/}
                {/*  </CardHeader>*/}
                {/*  <CardContent>*/}
                {/*    /!*<RecentSales />*!/*/}
                {/*  </CardContent>*/}
                {/*</Card>*/}
              </div>
            </>) : (
              <div className={`flex justify-center items-center h-full w-full italic ${status === "connecting" ? "text-blue-500" : "text-red-500"}`}>
                {status === "connecting" ? "Please wait wallet is connecting..." : "Wallet not connected"}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}

// const topNav = [
//   {
//     title: 'Overview',
//     href: 'dashboard/overview',
//     isActive: true,
//     disabled: false,
//   },
//   {
//     title: 'Customers',
//     href: 'dashboard/customers',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Products',
//     href: 'dashboard/products',
//     isActive: false,
//     disabled: true,
//   },
//   {
//     title: 'Settings',
//     href: 'dashboard/settings',
//     isActive: false,
//     disabled: true,
//   },
// ]
