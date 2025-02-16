"use client"

import { FormProvider, useForm } from 'react-hook-form'
import { checkPasswordSchema } from '@/Schemas/CheckPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from '@/hooks/use-toast'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Dock, DockIcon } from "@/components/dock";
import { User2Icon, LucideFeather, PlusCircle } from 'lucide-react'

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

        
        if(!res.ok){
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
    <div className='pt-10 relative min-h-screen'>
      <div className='flex justify-center items-center 7xl:gap-12'>
        <div>
          <p className='text-base text-center pb-10 xs:text-sm sm:text-base md:text-2xl lg:text-lg 4xl:text-3xl 6xl:text-4xl 7xl:text-6xl 7xl:pb-20'>Change Password 👀!</p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="oldpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='xs:text-sm sm:text-base lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>Old Password : </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Old Password" {...field} className='xs:text-xs xs:py-3 xs:px-4 sm:text-sm lg:text-base 4xl:text-2xl 4xl:py-6 4xl:px-6 6xl:text-4xl 6xl:py-10 6xl:px-12 7xl:text-5xl 7xl:py-12' />
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
                    <FormLabel className='xs:text-sm sm:text-base lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>New Password : </FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="New Password" {...field} className='xs:text-xs xs:py-3 xs:px-4 sm:text-sm lg:text-base 4xl:text-2xl 4xl:py-6 4xl:px-6 6xl:text-4xl 6xl:py-10 6xl:px-12 7xl:text-5xl 7xl:py-12' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-center'>
                <button type='submit' onClick={movetoSignIn} className='border pl-7 pr-7 text-xs rounded-md xs:text-sm sm:text-base xs:py-3 xs:px-6 lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl 7xl:mt-10'>
                  {checkPasswordUpdated === true ? <div className='animate-ping px-8'>◽◽◽</div> : 'Update'}
                </button>
              </div>

            </form>
          </FormProvider>

        </div>

          <div className=" absolute bottom-3 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl xs:block xs:visible lg:hidden lg:invisibe">
            <Dock direction="middle" className='xs:px-3 sm:px-4'>
              <DockIcon>
                <User2Icon className="size-4" onClick={() => router.push('/dashboard/profile')}/>
              </DockIcon>
              <DockIcon>
                <LucideFeather className="size-4" onClick={() => router.push('/dashboard/thoughts')} />
              </DockIcon>
              <DockIcon>
                <PlusCircle className="size-4" onClick={() => router.push('/addthought')} />
              </DockIcon>
            </Dock>
          </div>

      </div>    
    </div>
  )
}
