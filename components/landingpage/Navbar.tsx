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
        <div className="p-3 border-b-[1px] border-[#222222] border-opacity-55">
            <div className="flex justify-between">

                <div className="flex gap-3 items-center">
                    <MessageSquareQuote size={14} color="black" />
                    <span className="text-sm">Dumpthought</span>
                </div>

                <div className="flex gap-3">
                    <button className="bg-[#222222] text-white pt-1 pb-1 pl-2 pr-2 rounded text-xs" onClick={handlenavigationtologinpage}>Login</button>
                </div>

            </div>

        </div>
    )
}