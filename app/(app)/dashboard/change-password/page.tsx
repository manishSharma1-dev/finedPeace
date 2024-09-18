"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { checkPasswordSchema } from '@/Schemas/CheckPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function page() {

    const { toast } = useToast()
    const router = useRouter()

    function movetoSignIn(){
      router.replace('/sign-in')
    }

    const form = useForm<z.infer<typeof checkPasswordSchema>>({
        resolver : zodResolver(checkPasswordSchema),
        defaultValues : {
            oldpassword : '',
            newpassword : ''
        }
    })

    const onSubmit = async(data : z.infer<typeof checkPasswordSchema>) => {

        const response = await axios.post('/api/change-password',data)

        if(!response){
          
          toast({
            title : 'password changed -failed',
            description  : 'password changed failed'
          })

          throw new Error("password changed -failed")
        }

        toast({
          title : 'password changeded -success',
          description  : 'password changed success'
        })

        console.log("password changed Successfull", response.data)

    }

  return (
    <div className='pt-28 '>
      <div className='flex justify-center items-center'>
        <div>

          <p className='font-bold text-3xl pb-10'>Change Password :</p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="oldpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password : </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Old Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password : </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="New Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' onClick={movetoSignIn} >Change</Button>

            </form>
          </FormProvider>

        </div>
      </div>    
    </div>
  )
}
