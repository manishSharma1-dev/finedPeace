"use client"

import React, { useState } from 'react'
import { Asterisk,MessageSquareQuote } from "lucide-react"
import { useForm,FormProvider  } from 'react-hook-form'
import { checkthoughtSchema } from '@/Schemas/CheckthoughtSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { useToast } from '@/hooks/use-toast'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { error } from '@/types/types'
import { LoaderIcon } from 'lucide-react'
import { Dock, DockIcon } from "@/components/dock";
import { User2Icon, LucideFeather, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [checkifthoughtAdded,setCheckIfThoughtAdded] = useState(false)
    const { toast } = useToast()
    
    const router = useRouter();

    const form = useForm<z.infer<typeof checkthoughtSchema>>({
    resolver : zodResolver(checkthoughtSchema),
    defaultValues : {
        thought : ''
    }
    })

    const onSubmit = async(data:z.infer<typeof checkthoughtSchema>) => {
        try {
    
          setCheckIfThoughtAdded(true)
    
          const res = await fetch("/api/add-thought",{
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ thought : data?.thought })
          })
    
          
          if(!res.ok){
             const errtext = await res.text()
             toast({
              title : errtext,
              className:'w-[300px] text-sm'
             })
             return ;
          }
    
          const result = await res.json()

          toast({
            title : result?.message,
            className:'w-[300px] text-sm'
          })
    
          form.reset()
          setCheckIfThoughtAdded(false)
    
        } catch (error : error) {
          console.log(error?.message ?? "Internal server Error")
        } finally {
          setCheckIfThoughtAdded(false)
        }
      }

  return (
    <div className='relative flex flex-col min-h-screen bg-black text-white'>
      <div className='flex flex-col bg-black text-white'>
          <div className='flex items-center justify-center gap-1 pt-3'>
              <Asterisk size={13} color='red' className="xs:size-8" />
              <span className='xs:text-2xl'>Write here anything✍ !</span>
          </div>

          <div className='flex flex-col justify-center items-center gap-1 pt-14 pl-5 xs:text-xl'>
              <p className='pl-3 '>
                  <span >{'->'} </span>
                  <span className='opacity-40'>drop your thought here...</span>
              </p>
              <p className='pl-3'>
                  <span>{'->'} </span>
                  <span className='opacity-40 italic animate-pulse'>anything that came to your mind...</span>
              </p>
              <p className=' pl-3 '>
                  <span >{'->'} </span> 
                  <span className='opacity-40'>Any Idea that came to your mind...</span>
              </p>
              <p className='pl-3 '>
                  <span >{'->'} </span> 
                  <span className='opacity-40 animate-pulse'>things you want to say but fear to say it...</span>
              </p>
          </div>

          <div className='pt-16 flex justify-center items-center'>
              <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                  <FormField
                  control={form.control}
                  name="thought"  
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel className='flex items-center justify-center gap-2 pb-2'>
                          <span className='opacity-80 hover:opacity-100 cursor-pointer xs:text-2xl'>Your thought </span >
                          <MessageSquareQuote size={13} className='xs:size-5'/>
                          <span className='xs:text-lg'>{'!'} </span>
                          </FormLabel>
                      <FormControl className='w-full'>
                          <Textarea
                          placeholder="What's in your mind ✍"
                          className="resize-none text-xs overflow-y-auto scrollbar-hide xs:text-2xl" 
                          {...field}
                          rows={11}
                          />
                      </FormControl>
                      <FormDescription className='xs:text-lg'>
                          dump your thoughts here..
                      </FormDescription>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
                  <div className='flex items-center justify-center'> 
                      <button type="submit" className='text-xs px-12 border py-2 rounded xs:text-lg'>
                          {checkifthoughtAdded === true ? (
                              <LoaderIcon size={18} stroke="white" strokeWidth={2.5} className="opacity-80 animate-spin" />
                              ) : 'Submit'
                          }
                      </button> 
                  </div>
              </form>
              </FormProvider>
          </div>
      </div>

      <div className=" absolute bottom-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl xs:block xs:visible lg:hidden lg:invisibe">
        <Dock direction="middle" className='xs:px-16 xs:my-2 sm:px-20 sm:py-3'>
          <DockIcon>
            <User2Icon className="size-6" onClick={() => router.push('/dashboard/profile')}/>
          </DockIcon>
          <DockIcon>
            <LucideFeather className="size-6" onClick={() => router.push('/dashboard/thoughts')} />
          </DockIcon>
          <DockIcon>
            <PlusCircle className="size-6" onClick={() => router.push('/addthought')} />
          </DockIcon>
        </Dock>
      </div>

     </div>
  )
}