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
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function Page() {

    const [checkPasswordUpdated,setCheckPasswordUpdated] = useState(false)
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
      try {

        setCheckPasswordUpdated(true)
        
        const res = await fetch('/api/change-password',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({ oldpassword : data?.oldpassword , newpassword : data?.newpassword })
        })

        
        if(res.status != 200){
          const errText = await res.text()
          toast({
            title : errText,
            className : 'w-[300px] text-sm'
          })
          return;
        }
        
        const result = await res.json()

        toast({
          title : result?.message,
          className:"w-[300px] text-sm"
        })

      } catch (error) {
        console.log(error ?? 'Internal Server Error')
      } finally {
        setCheckPasswordUpdated(false)
      }
    }

  return (
    <div className='pt-10'>
      <div className='flex justify-center items-center'>
        <div>

          <p className='text-base text-center pb-10'>Change Password 👀!</p>
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
                      <Input type='password' placeholder="New Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-center'>
                <button type='submit' onClick={movetoSignIn} className='border pl-7 pr-7 py-2 text-xs rounded'>
                  {checkPasswordUpdated === true ? <div className='animate-ping px-8'>◽◽◽</div> : 'Update'}
                </button>
              </div>

            </form>
          </FormProvider>

        </div>
      </div>    
    </div>
  )
}
