import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/molecules/password-input.tsx'
import { useNavigate } from '@tanstack/react-router';
import { useLogin } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'
// @ts-ignore
import { AxiosError } from "axios";
import {useAuthStore} from "@/stores/authStore.ts";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter your username' })
    .min(4, { message: 'Username must be at least 4 characters long' })
    .regex(/^[a-zA-Z0-9]+$/, { message: 'Username can only contain letters and numbers' }),
  password: z
    .string()
    .min(1, { message: 'Please enter your password' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
});


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const setIsAuth = useAuthStore((state) => state.setIsAuth)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const loginMutation = useLogin();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })
  
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { username, password } = data;
    
    try {
      await loginMutation.mutateAsync({ username, password });
      // localStorage.setItem("token", data.token);
      setIsAuth(!!1)
      navigate({ to: "/dashboard" });
    } catch (error) {
      setIsLoading(false);
      
      if (error instanceof AxiosError) {
        if(error?.code === "ERR_NETWORK") {
          toast({
            variant: "destructive",
            title: "Network Error!",
          });
        } else if (error?.response?.status === 400) {
          toast({
            variant: "destructive",
            title: error?.response?.data.error,
          });
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  
  
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-3'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Login
            </Button>

          </div>
        </form>
      </Form>
    </div>
  )
}
