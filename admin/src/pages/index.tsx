import { Card } from '@/components/ui/card'
import AuthLayout from "@/components/layouts/auth-layout.tsx";
import { UserAuthForm } from '@/components/organisms/user-auth-form';

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left pb-4'>
          <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
          <p className='text-sm text-muted-foreground'>
            Enter your admin credentials to log into your account
          </p>
        </div>
        <UserAuthForm />
      </Card>
    </AuthLayout>
  )
}
