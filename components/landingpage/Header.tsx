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
        <main>
            <div className="grid grid-cols-2">
 
                <div className="pt-28 pb-20 pl-32 pr-32 text-wrap">
                    <h1 className="text-5xl font-bold pb-3">Share What You {"Can't"} Say Out <span className="underline underline-offset-4 decoration-purple-400 decoration-wavy">Loud...</span> </h1>
                    <p className="text-lg pb-4 pt-5">No profiles, no followers, just a moment of release in total privacy.</p>
                    <div className="flex gap-5">
                        <button className="bg-[#222222] text-white shadow-black shadow-sm pt-1 pb-1 pl-2 pr-2 rounded text-sm" onClick={handlegetstartedFunction}>Get Started</button>
                    </div>
                </div> 

                <div className="h-[33rem]">
                    <div>
                        <Image src={headerImage} alt="Header" className="object-cover min-h-[25rem] max-h-[27rem]" />
                    </div>
                </div>

            </div>
        </main>
    )
}

// className="object-fill h-[27rem]"