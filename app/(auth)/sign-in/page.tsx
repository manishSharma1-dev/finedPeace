import React from 'react'
import * as z from 'zod'
import { CheckSignInSchema } from '@/Schemas/CheckSignInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export default function page() {

  const form = useForm<z.infer<typeof CheckSignInSchema>>({
    resolver : zodResolver(CheckSignInSchema),
    defaultValues : {
      email : '',
      password : ''
    }
  })

  async function onSubmit(data:z.infer<typeof CheckSignInSchema>) {
    try {
      const response = await signIn('credentials',{
        redirect  : false,
        email : data?.email,
        password : data?.password
      })
  
      if(!response?.ok){
        throw new Error("Invalid Response")
      }
  
      console.log("user Logged in..")
    } catch (error) {
      console.error("Logging Failed",error)
    }
  }

  return (
    <div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* for username */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username : </FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="Email" {...field} />
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
      </Form>
      
      <div className='text-sm'>
        <p>New Member ? <span className='text-center text-blue-600 hover:text-blue-500'><Link href={'/sign-up'}>Register</Link></span></p>
      </div>
    </div>
  )
}
