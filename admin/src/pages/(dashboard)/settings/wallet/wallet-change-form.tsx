import {useState} from 'react';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {useWeb3Store} from "@/stores/web3Store.ts";
import {useSetRefAdminAddress} from "@/hooks/useAuth.ts";

const walletFormSchema = z.object({
  adminWallet: z.string().nonempty(),
  refAdminWallet: z.string().nonempty(),
});

type WalletFormValues = z.infer<typeof walletFormSchema>;

export default function WalletChangeForm() {
  const masterAddress = useWeb3Store((state) => state.masterAddress)
  const refAddress = useWeb3Store((state) => state.refAddress)
  const setRefAddress = useWeb3Store((state) => state.setRefAddress)
  const [editMode, setEditMode] = useState<{ adminWallet: boolean; refAdminWallet: boolean }>({
    adminWallet: false,
    refAdminWallet: false,
  });
  
  const changeRefAddress = useSetRefAdminAddress()
  
  const form = useForm<WalletFormValues>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      adminWallet: masterAddress,
      refAdminWallet: refAddress,
    },
  });
  
  const toggleEdit = (field: keyof WalletFormValues) => {
    if (field === "adminWallet") {
      toast({
        variant: "destructive",
        title: "Changing Admin wallet",
        description: "For security reasons you can't change the Admin wallet."
      })
    }
    setEditMode((prev) => ({...prev, [field]: !prev[field]}));
  };
  
  const onSave = async (field: keyof WalletFormValues) => {
    const updatedValue = form.getValues(field);
    if (updatedValue === refAddress) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Can't set new address as it's same with the old address."
      })
      return
    }
    
    try {
      const res = await changeRefAddress.mutateAsync({
        address: updatedValue,
        currentAddress: refAddress,
        type: "refAdmin"
      })
      console.log({res})
      toast({title: `${field} updated successfully to ${updatedValue}`});
      setRefAddress(updatedValue);
    } catch (e) {
      toast({
        variant: "destructive",
        title: e.response.data.error
      })
      return;
    }
    toggleEdit(field);
  };
  
  return (
    <Form {...form}>
      <form className='space-y-5'>
        {/* Admin Wallet (Read-only) */}
        <FormField
          control={form.control}
          name='adminWallet'
          render={({field}) => (
            <FormItem>
              <FormLabel>Admin Wallet</FormLabel>
              <FormControl>
                <div className='flex items-center space-x-2'>
                  <Input {...field} readOnly={!editMode.adminWallet}/>
                  <Button type='button' variant='outline' onClick={() => toggleEdit('adminWallet')}>
                    Edit
                  </Button>
                </div>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        
        {/* Referral Admin Wallet (Editable) */}
        <FormField
          control={form.control}
          name='refAdminWallet'
          render={({field}) => (
            <FormItem>
              <FormLabel>Referral Admin Wallet</FormLabel>
              <FormControl>
                <div className='flex items-center space-x-2'>
                  {editMode.refAdminWallet ? (
                    <>
                      <Input {...field} />
                      <Button type='button' variant='outline' onClick={() => onSave('refAdminWallet')}>
                        Save
                      </Button>
                      <Button type='button' variant='destructive' onClick={() => toggleEdit('refAdminWallet')}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input {...field} readOnly/>
                      <Button type='button' variant='outline' onClick={() => toggleEdit('refAdminWallet')}>
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
