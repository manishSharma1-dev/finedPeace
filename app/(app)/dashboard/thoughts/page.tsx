"use client"

import React from 'react'
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

export default function page() {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof checkthoughtSchema>>({
    resolver : zodResolver(checkthoughtSchema),
    defaultValues : {
      thought : ''
    }
  })

  const onSubmit = async (data:z.infer<typeof checkthoughtSchema>) => {
    const response = await axios.post('/api/add-thought',data)

    if(!response){

      toast({
        title : "Adding thought failed",
        description : "Adding thought Failed"
      })

      throw new Error("Response Didn't Received")

    }

    toast({
      title : "thought -added",
      description : (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
        </pre>
      )
    })

  }


  return (
   <div className='flex gap-[2%]'>

     <div className='w-[65%] border-r border-white border-opacity-20 h-[46rem] pt-10 overflow-y-auto scrollbar-hide  '>
      <div className='flex flex-col gap-5 h-auto '>


        <div className='flex flex-col gap-2 text-sm w-[30rem] bg-zinc-800 pt-2 pb-2 pl-4 pr-4 rounded'>
          <div className='flex items-center justify-between pb-2'><span>by -username</span><XSquare size={14} className='hover:opacity-40'/></div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque sequi, facere velit Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto odio saepe a harum error omnis at voluptate, dolorem pariatur, velit voluptas sit molestiae perferendis, suscipit labore expedita distinctio eaque eveniet? loe
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum eos iste placeat quos dolorem recusandae magnam blanditiis reiciendis sapiente eaque eveniet iusto doloremque aperiam at, soluta tenetur perspiciatis sint ducimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. In expedita ratione rem omnis at recusandae iusto atque voluptate ab non, velit accusantium soluta officia? Numquam ex odio tenetur sunt dolorum? doloribus ad in perspiciatis provident qui eaque eveniet</p>
        </div>


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
                        className="resize-none" 
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
