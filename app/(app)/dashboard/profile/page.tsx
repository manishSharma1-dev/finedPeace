"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { EditIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { error } from '@/types/types'

interface userdata {
  username : string,
  fullName : string,
  email : string
}

export default function Page() {
  const [userdata,setUserData] = useState<userdata | null>(null)
  const [newUsernameValue,setNewUsernamaValue] = useState("");
  const [newEmailValue,setNewEmailValue] = useState("")

  const [checkUsernameUpdated,setCheckUsernameUpdated] = useState(false)
  const [checkEmailUpdated,setCheckEmailUpdated] = useState(false)
  const [checkButtonStateLoading,setCheckButtonStateLoading] = useState(false)

  const { toast } = useToast()

  const router = useRouter()

  function handleNavigationtoChangepassword(){
    router.push('/dashboard/change-password')
  }

  useEffect(() => {

    async function UserprofileData () {
      try {

        const res = await fetch('/api/userprofile')

        if(!res.ok){
          const errText = await res.text()
          toast({
            title : errText,
            className : 'w-[300px] text-sm'
          })
          return;
        }
  
        const data = await res.json()
  
        setUserData(data?.data)

      } catch (error : error) {
        console.log(error?.message || "Failed to fetch User profile")
      }
    }

    UserprofileData()
  },[checkEmailUpdated,checkUsernameUpdated,toast])

  async function updateEmail() {
    try {

      setCheckButtonStateLoading(true)

      const res = await fetch('/api/updateEmail',{
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ newEmail : newEmailValue })
      })

      if(res.status != 200){
        const errText = await res.text()
        toast({
          title : errText,
          className : 'w-[300px] text-sm'
        })
        return;
      }
      
      const data = await res.json()

      toast({
        title : data?.message,
        className : 'w-[300px] text-sm'
      })

      setCheckEmailUpdated(!checkEmailUpdated)
      
    } catch (error : error) {
      console.error(error?.message ?? 'Internal server error')
    } finally {
      setCheckButtonStateLoading(false)
    }
  }

  async function updateUsername() {
    try {

      setCheckButtonStateLoading(true)
      
      const res = await fetch('/api/updateUsername',{
        method : 'PUT',
        headers : { 
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ newUsername : newUsernameValue })
      })
      
      if(res.status != 200){
        const errText = await res.text()
        toast({
          title : errText,
          className : 'w-[300px] text-sm'
        })
        return;
      }

      const data = await res.json()

      toast({
        title : data?.message,
        className : 'w-[300px] text-sm'
      })

      setCheckUsernameUpdated(!checkUsernameUpdated)
      
    } catch (error) {
      console.error(error ?? 'Internal server error')
    } finally {
      setCheckButtonStateLoading(false)
    }
  }

  return (
      <div>
        <p className='text-center pt-8'>User Information 📒!</p>
        <div className='flex flex-col items-center gap-8 pt-10 '>
          <div className='flex flex-col gap-3 w-[30%]'>
            <Label className='text-xs opacity-75 flex justify-between'>
              <span>Username:</span>
              <span>
              <Dialog>
                <DialogTrigger asChild>
                  <EditIcon size={13} className='cursor-pointer hover:opacity-70' />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle />
                    <DialogDescription>
                      Enter New Username...
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="Username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        className="col-span-3"
                        value={newUsernameValue}
                        onChange={(e) => setNewUsernamaValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button type="submit" onClick={updateUsername} className='bg-black text-white pl-7 pr-7 text-sm py-2 rounded'>
                      {checkButtonStateLoading === true ? <div className='animate-ping px-8'>◽◽◽</div> : 'Update Username'}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </span>
            </Label>
            <Input type='text' placeholder='username' value={userdata?.username}/>
          </div>

          <div className='flex flex-col gap-3 w-[30%]'>
            <Label className='text-xs opacity-75'>fullname: </Label>
            <Input type='text' placeholder='Fullname' value={userdata?.fullName}/>
          </div>

          <div className='flex flex-col gap-3 w-[30%]'>
            <Label className='text-xs opacity-75 flex justify-between'>
              <span>Email:</span>
              <span>
              <Dialog>
                <DialogTrigger asChild>
                  <EditIcon size={13} className='cursor-pointer hover:opacity-70' />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                  <DialogTitle />
                    <DialogDescription>
                      Enter New Email...
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        className="col-span-3"
                        value={newEmailValue}
                        onChange={(e) => setNewEmailValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button type="submit" onClick={updateEmail} className='bg-black text-white border pl-7 pr-7 text-sm py-2 rounded'>
                    {checkButtonStateLoading === true ? <div className='animate-ping px-8'>◽◽◽</div> : 'Update Email'}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              </span>
            </Label>
            <Input type='email' placeholder='Email' value={userdata?.email}/>
          </div>
          <p className='text-sm  hover:opacity-50 cursor-pointer underline underline-offset-8 decoration-red-200' onClick={handleNavigationtoChangepassword}>Change Password 👀?</p>
        </div>
      </div>
  )
}
