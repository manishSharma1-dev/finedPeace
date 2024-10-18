"use client"

import React, { useEffect, useState } from 'react'
import { Asterisk,MessageSquareQuote,XSquare } from "lucide-react"
import { useForm,FormProvider  } from 'react-hook-form'
import { checkthoughtSchema } from '@/Schemas/CheckthoughtSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from "zod"
import { useToast } from '@/hooks/use-toast'
import axios from "axios"
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from "lucide-react"

interface Response {
  status : any ;
  message : any ;
  data : any;
}


export default function page() {
  const [thoughtformBackend,setthoughtfromBackend] = useState([])
  const [refresh,setrefresh] = useState(false)
  const [loading, setLoading] = useState(false);

  const { toast } = useToast()

  const form = useForm<z.infer<typeof checkthoughtSchema>>({
    resolver : zodResolver(checkthoughtSchema),
    defaultValues : {
      thought : ''
    }
  })


  const onSubmit = async(data:z.infer<typeof checkthoughtSchema>) => {

    try {
      const response = await axios.post('/api/add-thought', data )
    if(!response){

      toast({
        title : "Adding thought failed",
        description : "Adding thought Failed",
        variant : 'destructive'
      })

      throw new Error("Response Didn't Received")

    }

    setrefresh(true)

      toast({
        title : "thought -added",
        description : "thought added Successfully"
      })
      form.reset()

    } catch (error  :any ) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast({
          title: "Thought",
          description: errorMessage,
          variant:'destructive'
      });
    }

  }

  useEffect(() =>{

    const fetchallthoudhtfrombackend = async() => {
      setLoading(true);
      try {
        const response = await axios.get('/api/getallThought')

        if (!response.data || !response.data.data) {
          throw new Error("No thoughts are here");
      }
        const result = await response.data.data

        setthoughtfromBackend(result)
        setrefresh(false)            

      } catch (error) {
        console.error("Loading Thought Failed",error)
      } finally {
        setLoading(false)
        console.log("Loading state changes");
     }
    }

     fetchallthoudhtfrombackend();
  

  },[refresh])


  async function handledeltethoughtfromthebackend(thoughtID:string) {
      
      try {
          console.log("Id of the thought to be deleted",thoughtID)
          
          const response :any  = await axios.delete(`/api/delete-thought/${thoughtID}`)
         
    
          if(!response){

    
            toast({
              title : "Deleting thought failed",
              description : "Error in receiving reponse",
              variant : 'destructive'
            })
    
          throw new Error("Error in receiving reponse")
    
        } 

        setrefresh(true)
    
        toast({
          title : "thought",
          description : "DEleted thought successfully"
        })
    
        console.log("thought deleted")

      } catch (error : any ) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast({
          title: "Thought",
          description: errorMessage,
          variant:'destructive'
      });
      }
  }

  return (
   <div className='flex gap-[2%]'>

     <div className='w-[65%] border-r border-white border-opacity-20 h-[46rem] pt-10 overflow-y-auto scrollbar-hide  '>
      <div className='flex flex-col gap-5 h-auto '>

      {refresh || loading === false ? <>
        { Array.isArray(thoughtformBackend) && thoughtformBackend.map((thoughtField:any,index:number) => (
          <div className='flex flex-col gap-2 text-sm w-[30rem] bg-zinc-800 pt-2 pb-2 pl-4 pr-4 rounded' key={index}>
            <div className='flex items-center justify-between pb-2'>
              <span>{`by - ${thoughtField?.username}`}</span>
              <XSquare size={14} className='hover:opacity-40' onClick={() => handledeltethoughtfromthebackend(thoughtField?._id)} />
            </div>
            <p>{thoughtField?.content}</p>
          </div>
        ))} 
      </> : <div className='flex gap-2'><span>Loading...</span><Loader2 size={20} className='animate-spin' /></div> }

      </div>
     </div>

     <div className='w-[33%] pt-10 pl-5'>

        <div className='flex items-center gap-1'>
          <Asterisk size={13} color='red' />
          <span className='text-sm'>Write here anything :--</span>
        </div>

        <div className='flex flex-col gap-1 pt-3 pl-5 text-xs flex-wrap'>
          <p className='italic opacity-40 pl-3 '>- anything that came to your mind...</p>
          <p className='italic opacity-40 pl-3 '>- words from your heart...</p>
          <p className='italic opacity-40 pl-3 '>- things you can't discuss with anyone...</p>
          <p className='italic opacity-40 pl-3 '>- your guilts(if your want..)</p>
          <p className='italic opacity-40 pl-3 '>- things you want to say but fear to say it...</p>
        </div>

        <div className='pt-16'>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="thought"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-2 pb-2'><span>Your thought </span><MessageSquareQuote size={13} /></FormLabel>
                    <FormControl className='w-72'>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none overflow-y-auto scrollbar-hide" 
                        {...field}
                        rows={8}
                      />
                    </FormControl>
                    <FormDescription>
                      Let your<span className='opacity-65'> @words</span> be out.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='text-xs'>Submit</Button>
            </form>
          </FormProvider>
        </div>

     </div>

   </div>
  )
}


