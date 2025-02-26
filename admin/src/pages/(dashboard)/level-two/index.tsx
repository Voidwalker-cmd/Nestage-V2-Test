import { Header } from '@/components/layouts/header'
import { Main } from '@/components/layouts/main'
import { ProfileDropdown } from '@/components/molecules/profile-dropdown'
// import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
// import { columns } from '@/features/users/components/users-columns'
import { UsersDialogs } from '@/features/users/components/users-dialogs'
import { UsersPrimaryButtons } from '@/features/users/components/users-primary-buttons'
// import { UsersTable } from '@/features/users/components/users-table'
import UsersProvider from '@/features/users/context/users-context'
import {ReferralDashboard} from "@/features/levelTwo/referral-dashboard";
// import { userListSchema } from '@/features/users/data/schema'
// import { users } from '@/features/users/data/users'

export default function levelTwo() {
  // Parse user list
  // const userList = userListSchema.parse(users)

  return (
    <UsersProvider>
      <Header fixed>
        {/*<Search />*/}
        <div className='ml-auto flex items-center space-x-4'>
          {/*<ThemeSwitch />*/}
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Level Two</h2>
            <p className='text-muted-foreground'>
              Manage all Level two payment here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {/*<UsersTable data={userList} columns={columns} />*/}
          <ReferralDashboard />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
