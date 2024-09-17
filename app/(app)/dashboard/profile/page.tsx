"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

export default function page() {
  const [userdata,setUserData] = useState({})
  const [refresh,setRefresh] = useState(false)

  const { toast } = useToast()

  const router = useRouter()

  function handleNavigationtoChangepassword(){
    router.replace('/dashboard/change-password')
  }

  useState(() => {
    async function UserprofileData () {
      const response = await axios.get('/api/userprofile')

      if(!response){
        toast({
          title : 'User Profile -fetched failed'
        })
      }

      const result = await response.data

      toast({
        title : "User Detail -found",
        description : "user daetail fetched"
      })

      console.log("response from the backend",result)

    }
  })

  return (
    <div>
      <div className='pt-10'>
       <p>User Info :</p>

        <div className='flex flex-col gap-5 pt-10'>

          <div className='flex flex-col gap-4 w-[30%]'>
            <Label>Username: </Label>
            <Input type='text' placeholder='username'/>
          </div>

          <div className='flex flex-col gap-4 w-[30%]'>
            <Label>fullname: </Label>
            <Input type='text' placeholder='Fullname'/>
          </div>

          <div className='flex flex-col gap-4 w-[30%]'>
            <Label>Email: </Label>
            <Input type='email' placeholder='Email'/>
          </div>

        </div>

        <p className='pt-10 text-sm  hover:opacity-50 cursor-pointer underline underline-offset-8 decoration-red-200' onClick={handleNavigationtoChangepassword}>Change Password ?</p>

      </div>
    </div>
  )
}
