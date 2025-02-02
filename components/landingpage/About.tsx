"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export const About:React.FC = () => {

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
        <div className="bg-[#222222] text-white p-12 mt-16">
            <div className="flex flex-col justify-center items-center ">
                <p className="text-center text-sm w-[60%] p-2">This is your space to say what you {"can't"} say anywhere else. Whether it’s passing your thought or something {"that's"} been building up over time, here you can share it all. No profiles, no followers, just a moment of release in total privacy — just pure anonymity and a place to release {"whatever’s"} on your mind. Your words are safe, and your thoughts remain your own, without fear of being judged or exposed.</p>  
                <button className="text-black bg-white pt-1 pb-1 pl-2 pr-2 text-sm rounded mt-4" onClick={handlegetstartedFunction}>Get Started 👓</button>    
            </div>
        </div>
    )
}