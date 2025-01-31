"use client"

import * as z from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckSignupSchema } from "@/Schemas/CheckSignupSchema"
import axios from "axios"
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { useState } from 'react'

export default function Page() {

  const [checkIfSign_up,setCheckIfSign_up] = useState(false)

  const router = useRouter()

    const form = useForm<z.infer<typeof CheckSignupSchema>>({
        resolver  : zodResolver(CheckSignupSchema),
        defaultValues : {
            username : " ",
            fullName : "",
            email : "",
            password : ""
        }
    })

    async function onSubmit(data:z.infer<typeof CheckSignupSchema>){
        try {

          setCheckIfSign_up(true)
            const response = await axios.post('/api/signup',{
                username : data?.username,
                fullName : data?.fullName,
                email : data?.email,
                password  :data?.password
            })

            if(!response){
                throw new Error("Registration Repsonse null")
            }

            console.log("Server Reponse",response.data)

            setCheckIfSign_up(false)

            router.replace('/sign-in') //move to sign-in page

        } catch (error) {
            console.error("User Registration failed",error)
        }
    }

  return (
    <div className='pt-28'>
      <div className='flex justify-center items-center'>
        <div>

         <p className='text-3xl font-bold pb-5'>Register New User:</p>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username : </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname : </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="FullName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email : </FormLabel>
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
                      <Input type='Password' placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="px-10 py-2 flex items-center justify-center">
                  {checkIfSign_up === true ? (
                    <Loader size={18} stroke="white" strokeWidth={2.5} className="opacity-80 animate-spin" />
                  ) : (
                    "Sign-in"
                  )}
              </Button>
              
            </form>
          </FormProvider>

          <div className='text-sm pt-4'>
              <p>Already a member ? <span className='text-center text-blue-600 hover:text-blue-500 '><Link href={'/sign-in'}>Login</Link></span></p>
          </div>
          
        </div>
      </div>
    </div>
  )
}
