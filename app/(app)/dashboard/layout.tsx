"use client"

import { Navbar } from "@/components/landingpage/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Dashboardlayoutprops {
  children : React.ReactNode
}

const DashboardLayout: React.FC<Dashboardlayoutprops> = (props) => {
  

  return (
    <div>
      <div className="bg-black min-h-screen text-white">
      <Navbar />
        <div className="flex">

            <div className='pt-10 pl-6 w-[16rem] border-gray-400 border-opacity-25 border-r flex flex-col justify-between h-[46rem]'>

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

              <div className="pt-5 pl-[6rem] pr-[6rem]">
                {props.children}
              </div>

            </div>
        </div>
    </div>
  )
}

export default DashboardLayout


