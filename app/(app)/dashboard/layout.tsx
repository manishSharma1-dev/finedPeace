"use client"

import { Navbar } from "@/components/landingpage/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthProvider } from "@/context/Authprovider"
import { signOut } from "next-auth/react"

interface Dashboardlayoutprops {
  children : React.ReactNode
}

const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {

  return (
    <AuthProvider>
      <div className="bg-black min-h-screen text-white overflow-hidden">
      <Navbar />
          <div className="flex">

              <div className='pt-10 pl-6 w-[16%] border-gray-400 border-opacity-25 border-r flex flex-col justify-between h-[46rem]'>

                  <div className='flex flex-col text-xs gap-3'>

                    <p className='cursor-pointer hover:opacity-60'>
                      <Link href={'/dashboard/thoughts'}>Thoughts</Link>
                    </p>

                    <p className='cursor-pointer hover:opacity-60'>
                      <Link href={'/dashboard/music'}>Spirit Music</Link>
                    </p>

                    <p className='cursor-pointer hover:opacity-60'>
                      <Link href={'/dashboard/profile'}>Profile</Link>
                    </p>

                  </div>

                  <div className='text-xs'>
                    <Button className='hover:bg-white hover:text-black' onClick={() => signOut({ callbackUrl: '/sign-in' })}>Logout</Button>
                  </div>

              </div>

              <div className="w-[83%] pl-20 pr-10">
                {props.children}
              </div>

        </div>
      </div>
    </AuthProvider>
  )
}

export default DashboardLayout

{/* <div>
      <div className="bg-black min-h-screen text-white overflow-hidden">
      <Navbar />
          <div className="flex">

              <div className='pt-10 pl-6 border-gray-400 border-opacity-25 border-r flex flex-col justify-between h-[46rem]'>

                  <div className='flex flex-col text-xs gap-3'>

                    <p className='cursor-pointer hover:opacity-60'>
                      <Link href={'/dashboard/thoughts'}>Thoughts</Link>
                    </p>

                    <p className='cursor-pointer hover:opacity-60'>
                      <Link href={'/dashboard/music'}>Spirit Music</Link>
                    </p>

                    <p className='cursor-pointer hover:opacity-60'>
                      <Link href={'/dashboard/profile'}>Profile</Link>
                    </p>

                  </div>

                  <div className='text-xs'>
                    <Button className='hover:bg-white hover:text-black'>Logout</Button>
                  </div>

              </div>

              <div>
                {props.children}
              </div>

        </div>
      </div>
    </div> */}


