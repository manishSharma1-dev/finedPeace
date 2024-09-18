"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'

interface userdata {
  username : string,
  fullName : string,
  email : string
}

export default function page() {
  const [userdata,setUserData] = useState<userdata | null>(null)
  const [refresh,setRefresh] = useState(false)

  const { toast } = useToast()

  const router = useRouter()

  function handleNavigationtoChangepassword(){
    router.replace('/dashboard/change-password')
  }

  useEffect(() => {

    setRefresh(true)

    async function UserprofileData () {
      const response = await axios.get('/api/userprofile')

      if(!response){
        toast({
          title : 'User Profile -fetched failed'
        })
      }

      const result = await response.data.data

      toast({
        title : "User Detail -found",
        description : "user daetail fetched"
      })

      console.log("response from the backend",result)

      setUserData(result)

    }

    UserprofileData()

    setRefresh(false)

  },[refresh])

  return (
    <div>
      <div className='pt-10'>
       <p>User Info :</p>

        <div className='flex flex-col gap-5 pt-10'>

          <div className='flex flex-col gap-4 w-[30%]'>
            <Label>Username: </Label>
            <Input type='text' placeholder='username' value={userdata?.username}/>
          </div>

          <div className='flex flex-col gap-4 w-[30%]'>
            <Label>fullname: </Label>
            <Input type='text' placeholder='Fullname' value={userdata?.fullName}/>
          </div>

          <div className='flex flex-col gap-4 w-[30%]'>
            <Label>Email: </Label>
            <Input type='email' placeholder='Email' value={userdata?.email}/>
          </div>

        </div>

        <p className='pt-10 text-sm  hover:opacity-50 cursor-pointer underline underline-offset-8 decoration-red-200' onClick={handleNavigationtoChangepassword}>Change Password ?</p>

      </div>
    </div>
  )
}
