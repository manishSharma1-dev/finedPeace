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

type thoughtType = {
  _id : string;
  content : string;
  username : string;
}

export default function Page() {
  const [thoughtFetchedformBackend,setFetchedthoughtfromBackend] = useState<thoughtType[]>([])
  const [newThoughtCreated,setNewThoughtCreated] = useState(false)
  const [checkThoughtDeleted,setCheckThoughtDeleted] = useState(false)

  const [checkifthoughtAdded,setCheckIfThoughtAdded] = useState(false)

  const { toast } = useToast()

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

      
      if(res.status != 200){
         const errtext = await res.text()
         toast({
          title : errtext,
          className:'w-[300px] text-sm'
         })
         return ;
      }

      const result = await res.json()

      setNewThoughtCreated(!newThoughtCreated)

      toast({
        title : result?.message,
        className:'w-[300px] text-sm'
      })

      form.reset()

    } catch (error : error) {
      console.log(error?.message ?? "Internal server Error")
    } finally {
      setCheckIfThoughtAdded(false)
    }
  }

  // function for fetching All thought
  useEffect(() =>{
    const fetchallthoughtfrombackend = async() => {
      try {
        const res = await fetch("/api/getallThought")

        if(res.status != 200){
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
      } 
    }

     fetchallthoughtfrombackend();
  },[newThoughtCreated,checkThoughtDeleted,toast])


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

        if(res.status != 200){
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

      } catch (error) {
        console.error(error ?? "Internal Server Error")
      } finally {
        setCheckThoughtDeleted(!checkThoughtDeleted)
      }
  }

  return (
   <div className='grid grid-cols-6'>

       <div className='col-start-1 col-end-5 min-h-screen border-r max-h-screen h-auto overflow-y-auto scrollbar-hide'>
        {
          thoughtFetchedformBackend.length > 0 ? (
            <div className='flex flex-col items-center gap-2 p-2 '>
              {
                thoughtFetchedformBackend.map((thoughtField:thoughtType,idx:number) => (
                  <div className='flex flex-col gap-2 text-sm w-[27rem] bg-neutral-800 pt-2 pb-2 pl-4 pr-4 rounded cursor-pointer' key={idx}>
                    <div className='flex items-center justify-between pb-2'>
                      <span>{`by - ${thoughtField?.username}`}</span>
                      <XSquare size={14} className='hover:opacity-40' onClick={() => handledeltethoughtfromthebackend(thoughtField?._id)} />
                    </div>
                    <p className='text-xs opacity-65 w-[80%]'>{thoughtField?.content}</p>
                  </div>
                ))
              } 
            </div>
          ) : ( 
            <div className='flex justify-center items-center min-h-screen'>
              <p className='text-sm opacity-70 hover:opacity-100 cursor-pointer animate-pulse'>Wait, fetching thoughts🎈 !</p>
            </div>
          )
        }
       </div>

       <div className='col-start-5 col-end-7 min-h-screen pl-7 pr-5'>
          <div className='flex items-center gap-1 pt-3'>
            <Asterisk size={13} color='red' />
            <span className='text-xs'>Write here anything✍ !</span>
          </div>

          <div className='flex flex-col gap-1 pt-7 pl-5 text-xs flex-wrap'>
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

          <div className='pt-16'>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="thought"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 pb-2'><span className='opacity-80 hover:opacity-100 cursor-pointer'>Your thought </span><MessageSquareQuote size={13} />{'!'}</FormLabel>
                    <FormControl className='w-72'>
                      <Textarea
                        placeholder="What's in your mind ✍"
                        className="resize-none text-xs overflow-y-auto scrollbar-hide" 
                        {...field}
                        rows={11}
                      />
                    </FormControl>
                    <FormDescription>
                      dump your thoughts here..
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="submit" className='text-xs px-12 border py-2 rounded'>
                {checkifthoughtAdded === true ? <div className='animate-bounce text-sm'><p>🐱‍🏍</p></div> : 'Submit'}
              </button>
            </form>
          </FormProvider>
        </div>

       </div>
   </div>
  )
}