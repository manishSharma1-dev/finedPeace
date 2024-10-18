"use client"

import { useRouter } from "next/navigation"
import { MessageSquareQuote } from "lucide-react"

export const Navbar: React.FC = () => {

    const router = useRouter()

    function handlenavigationtologinpage(){
        router.replace('/sign-in')
    }

    return (
        <div className="p-3 border-b-[1px] border-[#222222] border-opacity-55">
            <div className="flex justify-between">

                <div className="flex gap-3 items-center">
                    {/* <img src="#" alt="logo" /> */}
                    <MessageSquareQuote size={14} color="black" />
                    <span className="font-bold text-sm">FindPeace</span>
                </div>

                <div className="flex gap-3">
                    <button className="bg-[#222222] text-white pt-1 pb-1 pl-2 pr-2 rounded text-xs" onClick={handlenavigationtologinpage}>Login</button>
                </div>

            </div>

        </div>
    )
}