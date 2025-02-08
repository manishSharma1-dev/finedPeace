"use client"

import React, { useEffect, useState } from 'react'
import { Asterisk,MessageSquareQuote,XSquare } from "lucide-react"
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


type thoughtType = {
  _id : string;
  content : string;
  username : string;
}

export default function Page() {
  const [thoughtFetchedformBackend,setFetchedthoughtfromBackend] = useState<thoughtType[]>([])
  const [newThoughtCreated,setNewThoughtCreated] = useState(false)
  const [thoughtDeleted,setthougthDeleted] = useState(false)

  const [checkThoughtDeleted,setCheckThoughtDeleted] = useState(false)
  const [checkifthoughtAdded,setCheckIfThoughtAdded] = useState(false)

  const { toast } = useToast()

  const router = useRouter();

  const form = useForm<z.infer<typeof checkthoughtSchema>>({
    resolver : zodResolver(checkthoughtSchema),
    defaultValues : {
      thought : ''
    }
  })


  // function for creating new thoughts
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

      setNewThoughtCreated(!newThoughtCreated)

    } catch (error : error) {
      console.log(error?.message ?? `Internal server Error ${checkThoughtDeleted} `)
      
    } finally {
      setCheckIfThoughtAdded(false)
    }
  }

  // function for fetching All thought
  useEffect(() => {
    const fetchallthoughtfrombackend = async() => {
      try {
        const res = await fetch("/api/getallThought")

        if(!res.ok){
          const errtext = await res.text()
          toast({
            title : errtext,
            className:'w-[300px] text-sm'
          })
          return ;
        }

        const data = await res.json()

        setFetchedthoughtfromBackend(data?.data)

      } catch (error : error) {
        console.error("Loading Thought Failed",error?.message)
        toast({
          title : error?.message ?? "Loading thought failed",
          className : 'w-[300px] text-sm'
        })
      } 
    }
     fetchallthoughtfrombackend();
  },[newThoughtCreated,thoughtDeleted,toast]) 


  // func for deleting thought
  async function handledeltethoughtfromthebackend(thoughtID:string) {
      try {

        toast({
          title : "thought deleting",
          className:'w-[300px] text-sm'
        })

        const res = await fetch(`/api/delete-thought/${thoughtID}`,{
          method : 'DELETE'
        })

        if(!res.ok){
          const errtext = await res.text()
          toast({
           title : errtext,
           className:'w-[300px] text-sm'
          })
          return ;
        } 
        
        const data = await res.json()

        toast({
          title : data?.message,
          className:'w-[300px] text-sm'
        })

        setthougthDeleted(!thoughtDeleted)

      } catch (error : error) {
        console.error(error ?? "Internal Server Error")

        toast({
          title : error?.message ?? "failed thought delete",
          className:'w-[300px] text-sm'
        })

      } finally {
        setCheckThoughtDeleted(false)
      }
  }

  return (
   <div className='grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-6 relative'>

      <div className='min-h-screen border-r max-h-screen h-auto overflow-y-auto scrollbar-hide xs:col-start-1 xs:col-end-2 sm:col-start-1 sm:col-end-2  lg:col-start-1 lg:col-end-5'>
        {
          thoughtFetchedformBackend.length > 0 ? (
            <div className='flex flex-col gap-2 py-2 xs:px-3 sm:px-4 lg:px-32 lg:items-center 3xl:gap-3 4xl:px-48 6xl:px-60 7xl:px-80 7xl:gap-6'>
              {
                thoughtFetchedformBackend.map((thoughtField:thoughtType,idx:number) => (
                  <div className='flex flex-col gap-2 text-sm bg-neutral-800 pt-2 pb-2 pl-4 px-8 rounded hover:bg-neutral-700 xs:w-full sm:w-full lg:px-5 3xl:gap-5 6xl:gap-8 6xl:px-8 6xl:py-7 7xl:px-9 7xl:py-8 7xl:gap-12' key={idx}>
                    <div className='flex items-center justify-between pb-2'>
                      <span className='xs:text-xl sm:text-xl lg:text-sm 2xl:text-base 3xl:text-lg 4xl:text-2xl 6xl:text-[2.7rem] 6xl:leading-4 7xl:text-6xl'>{`by - ${thoughtField?.username}`}</span>
                      <XSquare size={14} className='cursor-pointer hover:opacity-40 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 6xl:w-9 6xl:h-9 7xl:w-12 7xl:h-12' onClick={() => handledeltethoughtfromthebackend(thoughtField?._id)} />
                    </div>
                    <p className='text-xs opacity-65 w-[80%] xs:text-sm sm:text-base lg:text-xs 2xl:text-sm 3xl:text-base 4xl:text-xl 6xl:text-[2.1rem] 6xl:leading-[2.7rem] 7xl:text-[2.7rem] 7xl:leading-[3.5rem]'>{thoughtField?.content}</p>
                  </div>
                ))
              } 
            </div>
          ) : ( 
            <div className='flex justify-center items-center min-h-screen xs:px-4 sm:px-4 lg:px-0'>
              <p className='text-sm opacity-70 hover:opacity-100 cursor-pointer animate-pulse xs:text-2xl sm:text-2xl lg:text-sm 2xl:text-base 4xl:text-lg 7xl:text-5xl'>Wait, fetching thoughts🎈 !</p>
            </div>
          )
        }
      </div>



      <div className='min-h-screen pl-7 pr-5 xs:hidden xs:invisible sm:hidden sm:invisible lg:block lg:visible lg:col-start-5 lg:col-end-7 xl:pt-2 3xl:pt-3 4xl:pl-9 4xl:pt-7 6xl:pl-12 6xl:pt-12 7xl:pt-16 7xl:pl-20'>

        <div className='flex items-center gap-1 pt-3'>
          <Asterisk size={13} color='red' className="xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 4xl:w-8 4xl:h-8 6xl:w-12 6xl:h-12 7xl:w-16 7xl:h-16" />
          <span className='text-xs lg:text-sm xl:text-base 2xl:text-lg 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>Write here anything✍ !</span>
        </div>

        <div className='flex flex-col gap-1 pt-7 pl-5 text-xs flex-wrap md:text-xs xl:text-xs 2xl:text-base 4xl:text-xl 6xl:text-4xl 6xl:pt-12 7xl:text-5xl 7xl:pt-16 7xl:leading-[3.4rem]'>
          <p className='pl-3'>
            <span>{'->'} </span>
            <span className='opacity-40 italic animate-pulse'>anything that came to your mind...</span>
          </p>
          <p className='pl-3 '>
            <span >{'->'} </span>
            <span className='opacity-40'>drop your thought here...</span>
          </p>
          <p className='pl-3 '>
            <span >{'->'} </span> 
            <span className='opacity-40 italic animate-pulse'>things you cannot discuss with anyone...</span>
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

        <div className='pt-16 xl:pt-12 2xl:pt-14 3xl:pt-20 4xl:pt-28 6xl:pt-32 7xl:pt-36'>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="thought"  
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='flex items-center gap-2 pb-2 6xl:gap-3'>
                    <span className='opacity-80 hover:opacity-100 cursor-pointer xl:text-base 2xl:text-lg 4xl:text-3xl 6xl:text-5xl 6xl:pb-5 7xl:text-6xl'>Your thought </span >
                    <MessageSquareQuote size={13} className='3xl:w-6 3xl:h-6 6xl:w-9 6xl:h-9 7xl:w-12 7xl:h-12'/>
                    <span className='3xl:text-lg 6xl:text-2xl 7xl:text-4xl'>{'!'} </span>
                    </FormLabel>
                  <FormControl className='w-72 3xl:w-[28rem] 4xl:w-[28rem] 6xl:w-[40rem] 7xl:w-[50rem]'>
                    <Textarea
                      placeholder="What's in your mind ✍"
                      className="resize-none text-xs overflow-y-auto scrollbar-hide xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-2xl 4xl:h-[30vh] 6xl:text-4xl 6xl:h-[34vh] 7xl:text-5xl" 
                      {...field}
                      rows={11}
                    />
                  </FormControl>
                  <FormDescription className='xl:text-sm 3xl:text-base 4xl:text-xl 6xl:text-3xl 7xl:text-4xl'>
                    dump your thoughts here..
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button type="submit" className='text-xs px-12 border py-2 rounded flex items-center justify-center xl:text-sm 4xl:text-lg 6xl:text-3xl 6xl:px-16 6xl:py-6 7xl:text-5xl'>
              {checkifthoughtAdded === true ? (
                    <LoaderIcon size={18} stroke="white" strokeWidth={2.5} className="opacity-80 animate-spin" />
                  ) : 'Submit'}
            </button>
          </form>
        </FormProvider>
      </div>

      </div>

      <div className=" absolute bottom-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl xs:block xs:visible lg:hidden lg:invisibe">
          <Dock direction="middle" className='xs:px-3 xs:my-2 sm:px-4 sm:py-1'>
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