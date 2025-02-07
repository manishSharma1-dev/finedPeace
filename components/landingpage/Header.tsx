"use client"

import Image from "next/image"
import headerImage from "@/public/finedpeaceProjectheaderimg.png"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export const Header: React.FC = () =>{

    const { data: session } = useSession()

    const router = useRouter()

    function handlegetstartedFunction(){
        if(!session){
            router.replace('/sign-in')
        } else {
            router.replace('/dashboard/thoughts')
        }
    }


    return (
        <div className="xs:px-10 sm:px-12 lg:px-20 xl:px-32 2xl:px-48 3xl:px-60 4xl:px-80 6xl:pl-[40rem] 6xl:pr-[40rem] 6xl:py-20 7xl:pl-[60rem] 7xl:pr-[60rem] 7xl:py-40">
            <div className="xs:flex xs:flex-col xs:gap-8 sm:flex sm:flex-col sm:gap-8 lg:grid lg:grid-cols-2">
 
                <div className="py-24 px-64 xs:px-0 sm:px-0 4xl:py-40 6xl:py-56">
                    <h1 className="text-5xl font-bold pb-3 xs:text-4xl sm:text-5xl sm:text-center lg:text-left lg:text-3xl xl:text-2xl 2xl:text-3xl 4xl:text-4xl 6xl:text-6xl 6xl:pb-8 7xl:text-7xl">Share What You {"Can't"} Say Out <span className="underline underline-offset-4 decoration-purple-400 decoration-wavy">Loud...</span> </h1>
                    <p className="text-lg pb-4 pt-5 sm:text-center sm:text-xl lg:text-left lg:text-base 4xl:text-2xl 6xl:text-3xl 7xl:text-5xl 7xl:pb-7">No profiles, no followers, just a moment of release in total privacy.</p>
                    <div className="flex sm:items-center sm:justify-center lg:block gap-5">
                        <button className="bg-[#222222] text-white shadow-black mt-2 shadow-sm py-2 px-4 rounded-xl text-sm  xs:text-xl xs:px-6 xs:py-4 sm:text-2xl sm:px-6 sm:py-4 lg:text-base lg:px-4 lg:py-3 4xl:px-8 4xl:py-4 4xl:text-lg 6xl:text-2xl 7xl:px-10 7xl:py-6 7xl:text-4xl" onClick={  handlegetstartedFunction}>Get Started</button>
                    </div>
                </div> 

                <div className="py-24 px-64 xs:px-0 xs:py-0 sm:px-0 sm:py-0 lg:py-10 xl:py-16 2xl:py-20 4xl:py-16 6xl:rounded-2xl">
                    <Image src={headerImage} alt="Header" className="rounded-xl xs:object-fill 2xl:object-contain 6xl:object-scale-down"/>
                </div>
            </div>
        </div>    
    )
}