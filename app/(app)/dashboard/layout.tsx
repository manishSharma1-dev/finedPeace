"use client"

import Link from "next/link"
import { AuthProvider } from "@/context/Authprovider"
import { signOut } from "next-auth/react"

interface Dashboardlayoutprops {
  children : React.ReactNode
}

const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
  return (
     <AuthProvider>
      <div className="bg-black text-white overflow-hidden xl:px-28 2xl:px-48 3xl:px-56 4xl:pl-[18rem] 4xl:pr-24 6xl:pl-[28rem] 6xl:pr-32 7xl:pl-[32rem] 7xl:pr-52">

        <div className="grid xs:grid-cols-1 sm:grid-cols-1 lg:grid-cols-7">

          <div className="min-h-screen border-r xs:hidden sm:hidden lg:block lg:col-start-1 lg:col-end-2">
            <div className="flex-col flex justify-between min-h-screen p-3">
                <div className='flex flex-col text-xs gap-3 4xl:gap-6 6xl:gap-9 7xl:gap-14'>
                    <p className='cursor-pointer hover:opacity-60 xl:text-sm 2xl:text-lg 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>
                      <Link href={'/dashboard/thoughts'}>Thoughts</Link>
                    </p>
                    
                    <p className='cursor-pointer hover:opacity-60 xl:text-sm 2xl:text-lg 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl'>
                      <Link href={'/dashboard/profile'}>Profile</Link>
                    </p>
                </div>
                <div className='text-xs xl:text-xm 2xl:text-base 4xl:text-xl 4xl:px-8 4xl:py-4 6xl:py-6 6xl:px-10 7xl:px-14 7xl:py-8'>
                    <button className='hover:bg-gray-300 p-1 pl-3 pr-3 border rounded-lg hover:text-black  4xl:px-6 4xl:py-2 6xl:py-4 6xl:px-10 6xl:text-2xl 7xl:px-14 7xl:py-6 7xl:text-3xl' onClick={() => signOut({ callbackUrl: '/sign-in' })}>Logout</button>
                </div>
            </div>
          </div>

          <div className="min-h-screen xs:col-start-1 xs:col-end-2 sm:col-start-1 sm:col-end-2 lg:col-start-2 lg:col-end-8">
              {props.children}
          </div>

        </div>

      </div>
    </AuthProvider>
  )
}

export default DashboardLayout