"use client"

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { EditIcon } from 'lucide-react'
import { Dock, DockIcon } from "@/components/dock";
import { User2Icon, LucideFeather, PlusCircle } from 'lucide-react'

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

      if(!res.ok){
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
      
      if(!res.ok){
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
      <div className='relative min-h-screen'>
        <p className='text-center pt-8  xs:text-2xl sm:text-3xl md:text-2xl lg:text-lg 4xl:text-3xl 6xl:text-4xl 7xl:text-6xl'>User Information 📒!</p>
        <div className='flex flex-col items-center gap-8 pt-10 6xl:pt-20 6xl:gap-16'>
          <div className='flex flex-col gap-3 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[35%] 2xl:w-[32%] 6xl:gap-10'>
            <Label className='text-xs opacity-75 flex items-center justify-between '>
              <span className='xs:text-xl sm:text-2xl lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>Username:</span>
              <span>
              <Dialog>
                <DialogTrigger asChild>
                  <EditIcon size={13} className='cursor-pointer hover:opacity-70 xs:size-6 lg:size-4 3xl:size-5 4xl:size-6 6xl:size-8 7xl:size-11' />
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
            <Input type='text' placeholder='username' value={userdata?.username} className='xs:text-lg xs:py-3 xs:px-4 sm:text-xl lg:text-base 4xl:text-2xl 4xl:py-6 4xl:px-6 6xl:text-4xl 6xl:py-10 6xl:px-12 7xl:text-5xl 7xl:py-12'/>
          </div>

          <div className='flex flex-col gap-3 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[35%] 2xl:w-[32%] 6xl:gap-10'>
            <Label className='text-xs opacity-75 xs:text-xl sm:text-2xl lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>fullname: </Label>
            <Input type='text' placeholder='Fullname' value={userdata?.fullName} className='xs:text-lg xs:py-3 xs:px-4 sm:text-xl lg:text-base 4xl:text-2xl 4xl:py-6 4xl:px-6 6xl:text-4xl 6xl:py-10 6xl:px-12 7xl:text-5xl 7xl:py-12'/>
          </div>

          <div className='flex flex-col gap-3 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[35%] 2xl:w-[32%] 6xl:gap-10'>
            <Label className='text-xs opacity-75 flex justify-between'>
              <span className='xs:text-xl sm:text-2xl lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>Email:</span>
              <span>
              <Dialog>
                <DialogTrigger asChild>
                  <EditIcon size={13} className='cursor-pointer hover:opacity-70 xs:size-6 lg:size-4 3xl:size-5 4xl:size-6 6xl:size-8 7xl:size-11' />
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
            <Input type='email' placeholder='Email' value={userdata?.email} className='xs:text-lg xs:py-3 xs:px-4 sm:text-xl lg:text-base 4xl:text-2xl 4xl:py-6 4xl:px-6 6xl:text-4xl 6xl:py-10 6xl:px-12 7xl:text-5xl 7xl:py-12'/>
          </div>
          <p className='text-sm  hover:opacity-50 cursor-pointer underline underline-offset-8 decoration-red-200 xs:text-lg xs:py-3 xs:px-4 sm:text-xl lg:text-base 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl' onClick={handleNavigationtoChangepassword}>Change Password 👀?</p>
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
