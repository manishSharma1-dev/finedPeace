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
      <div className="bg-black text-white overflow-hidden">
        <div className="grid grid-cols-7">
        <div className="col-start-1 col-end-2 min-h-screen border-r">
          <div className="flex-col flex justify-between min-h-screen p-3">
              <div className='flex flex-col text-xs gap-3'>
                  <p className='cursor-pointer hover:opacity-60'>
                    <Link href={'/dashboard/thoughts'}>Thoughts</Link>
                  </p>
                  
                  <p className='cursor-pointer hover:opacity-60'>
                    <Link href={'/dashboard/profile'}>Profile</Link>
                  </p>
              </div>
              <div className='text-xs'>
                  <button className='hover:bg-gray-300 p-1 pl-3 pr-3 border rounded hover:text-black' onClick={() => signOut({ callbackUrl: '/sign-in' })}>Logout</button>
              </div>
          </div>
        </div>
        <div className="col-start-2 col-end-8 min-h-screen">
            {props.children}
        </div>
        </div>
      </div>
    </AuthProvider>
  )
}

export default DashboardLayout