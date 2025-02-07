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
        <div className="bg-[#222222] text-white mt-16 xs:px-10 sm:px-12 lg:px-20 xl:px-32 2xl:px-48 3xl:px-60 4xl:px-80 6xl:pl-[40rem] 6xl:pr-[40rem] 7xl:pl-[60rem] 7xl:pr-[60rem]">
            <div className="flex flex-col justify-center items-center p-12 4xl:gap-8 6xl:gap-10 4xl:py-20 6xl:py-32">
                <p className="text-center text-sm w-[60%] xs:w-[100%] sm:w-[100%] lg:w-[80%] 2xl:text-lg p-2 opacity-85 xs:text-balance sm:text-lg lg:text-base 4xl:text-2xl 6xl:text-3xl 7xl:text-5xl">This is your space to say what you {"can't"} say anywhere else. Whether it’s passing your thought or something {"that's"} been building up over time, here you can share it all. No profiles, no followers, just a moment of release in total privacy — just pure anonymity and a place to release {"whatever’s"} on your mind. Your words are safe, and your thoughts remain your own, without fear of being judged or exposed.</p>  
                <div className="flex sm:items-center sm:justify-center gap-5">
                    <button  className="text-black bg-white shadow-black mt-2 shadow-sm py-2 px-4 rounded-xl text-sm xs:text-xl xs:px-6 xs:py-4 sm:text-2xl sm:px-6 sm:py-4 lg:px-4 lg:py-3 lg:text-base 4xl:px-8 4xl:py-4 4xl:text-lg 6xl:text-2xl 7xl:text-4xl 7xl:px-10 7xl:py-7" onClick={  handlegetstartedFunction}>Get Started 👓</button>
                </div>
            </div>
        </div>
    )
}