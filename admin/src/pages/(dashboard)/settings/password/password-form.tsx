import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {toast} from '@/hooks/use-toast'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {PasswordInput} from "@/components/molecules/password-input";
import {useChangePassword} from "@/hooks/useAuth.ts";

const passwordFormSchema = z.object({
  currentPassword: z
    .string()
    .min(6, {
      message: 'Your Current Password should be at least 6 characters.',
    })
    .max(16, {
      message: 'Your Current Password cant be longer than 16 characters.',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    })
    .max(16, {
      message: 'Password must not be longer than 16 characters.',
    }),
  conPassword: z
    .string()
    .min(6, {
      message: 'Confirm Password must be at least 6 characters.',
    })
    .max(16, {
      message: 'Confirm Password must not be longer than 16 characters.',
    }),
})

type ProfileFormValues = z.infer<typeof passwordFormSchema>

export default function PasswordForm() {
  
  const changePasswordMutate = useChangePassword()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(passwordFormSchema),
    mode: 'onChange',
  })
  
  const onSubmit = async (data: ProfileFormValues) => {
    const {password, conPassword, currentPassword} = data
    
    if (password !== conPassword) {
      toast({
        variant: "destructive",
        title: "Both Passwords don't match"
      })
      return;
    }
    if (password === currentPassword) {
      toast({
        variant: "destructive",
        title: "New Password can't be your Current Password."
      })
      return;
    }
    
    try {
      await changePasswordMutate.mutateAsync({currentPassword, newPassword: password});
      toast({
        title: "Password Updated"
      })
      form.reset();
      return;
    } catch (e) {
      toast({
        variant: "destructive",
        title: e.response.data.error
      })
      return;
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='currentPassword'
          render={({field}) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Current Password' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='New Password' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='conPassword'
          render={({field}) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='Confirm New Password' {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type='submit'>Update Password</Button>
      </form>
    </Form>
  )
}
