"use client"

import * as z from 'zod'
import { CheckSignInSchema } from '@/Schemas/CheckSignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
// import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'


export default function page() {

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
      
      const response = await signIn('credentials', {
        redirect: false,
        email : data.email,
        password : data.password
      })
      
      if (!response || response.error) {
        // throw new Error(response?.error || "Invalid Response");
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

        console.log("user Logged in..")

        console.log("Response", response)

        router.replace('/dashboard/thoughts')

      }


    } catch (error) {
      console.error("Logging Failed",error)
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

                <Button type='submit'>Sign-in</Button>
 
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
