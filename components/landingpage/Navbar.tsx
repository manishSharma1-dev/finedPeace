"use client"

import { useRouter } from "next/navigation"
import { MessageSquareQuote } from "lucide-react"
import { useSession } from "next-auth/react"


export const Navbar: React.FC = () => {

    const { data: session } = useSession()
    const router = useRouter()

    function handlenavigationtologinpage(){
        if(!session){
            router.replace('/sign-in')
        } else {
            router.replace('/dashboard/thoughts')
        }
    }

    return (
       <div className="flex justify-between py-4 border-b-[1px] border-[#222222] border-opacity-55 xs:px-10 sm:px-12 lg:px-20 4xl:px-56 6xl:pl-[30rem] 6xl:pr-[30rem] 7xl:pl-[40rem] 6xl:py-10 7xl:pr-[40rem] 7xl:py-10">
            <div className="flex gap-3 items-center">
                <MessageSquareQuote size={14} color="black" className="xs:w-6 xs:h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-6 4xl:w-9 4xl:h-9 6xl:w-12 6xl:h-12 7xl:w-16 7xl:h-16"/>
                <p className="text-sm xs:hidden md:block sm:hidden md:text-xl lg:text-lg font-semibold lg:block 4xl:text-2xl 6xl:text-4xl 7xl:text-5xl">Dumpthought</p>
            </div>
            <div className="flex gap-3">
                <button className="bg-[#222222] text-white py-2 px-4 rounded-xl text-lg sm:px-8 sm:py-3 sm:text-xl lg:px-4 lg:py-2 lg:text-base 4xl:text-xl 4xl:px-7 4xl:py-3 6xl:px-9 6xl:py-5 6xl:text-2xl 7xl:text-4xl" onClick={handlenavigationtologinpage}>Login</button>
            </div>
       </div>
    )
}