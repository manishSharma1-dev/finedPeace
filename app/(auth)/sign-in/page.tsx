"use client"

import * as z from 'zod'
import { CheckSignInSchema } from '@/Schemas/CheckSignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import Link from 'next/link'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader } from 'lucide-react'


export default function Page() {

  const [checkIfLogin,setCheckIfLogin] = useState(false)

  const {toast} = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof CheckSignInSchema>>({
    resolver : zodResolver(CheckSignInSchema),
    defaultValues : {
      email : '',
      password : ''
    }
  })

  const onSubmit = async(data:z.infer<typeof CheckSignInSchema>) => {
    try {

      setCheckIfLogin(true);
      
      const response = await signIn('credentials', {
        redirect: false,
        email : data.email,
        password : data.password
      })
      
      if (!response || response.error) {
        toast({
          title : 'login failed',
          description : "Incorrect Username or Password",
          variant : 'destructive'
        })

      }  else {
        toast({
          title : 'login Success',
          description : "Password match",
          variant : 'default'
        })

        setCheckIfLogin(false)

        router.replace('/dashboard/thoughts')
      }

    } catch (error) {
      console.error("Logging Failed",error)
    } finally{
      setCheckIfLogin(false)
    }
  }

  return (
    <div className='pt-28 '>
      <div className='flex justify-center items-center'>
        <div>

        <p className='text-3xl font-bold pb-5'>Login User:</p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* for username */}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email : </FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password : </FormLabel>
                      <FormControl>
                        <Input type='password' placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}  
                />

                <Button type="submit" className="px-10 py-2 flex items-center justify-center">
                  {checkIfLogin === true ? (
                    <Loader size={18} stroke="white" strokeWidth={2.5} className="opacity-80 animate-spin" />
                  ) : (
                    "Sign-in"
                  )}
                </Button>
 
            </form>
          </FormProvider>
          
          <div className='text-sm pt-4'>
            <p>New Member ? <span className='text-center text-blue-600 hover:text-blue-500'><Link href={'/sign-up'}>Register</Link></span></p>
          </div>
        </div>

      </div>
    </div>
  )
}
