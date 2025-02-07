"use client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { TwitterLogoIcon } from "@radix-ui/react-icons"
import { GitHubLogoIcon  } from "@radix-ui/react-icons"
import { Mail } from "lucide-react"

export const Footer:React.FC = () => {
    const router = useRouter()
    const { data: session } = useSession()

    function handlemovetosignuppage(){
        if(!session){
            router.replace('/sign-up')
        } else {
            router.replace('/dashboard/thoughts')
        }
    }

    return (
        <div className="bg-[#222222] text-white p-12 pb-0 mt-16 xs:px-10 sm:px-12 lg:px-20 xl:px-32 2xl:px-48 3xl:px-60 4xl:px-96 4xl:py-16 6xl:pl-[40rem] 6xl:pr-[40rem] 7xl:pl-[60rem] 7xl:pr-[60rem]">
            <div className="flex flex-col gap-5 justify-center items-center">
                <h1 className="text-center text-4xl font-semibold w-[50%] p-2 xs:text-3xl sm:text-4xl lg:text-2xl 4xl:text-4xl 6xl:text-6xl 7xl:text-7xl">Sign up today.</h1>  
                <div className="flex sm:items-center sm:justify-center gap-5 6xl:gap-12">
                    <button  className="text-black bg-white shadow-black mt-2 shadow-sm py-2 px-4 rounded-xl text-sm xs:text-xl xs:px-6 xs:py-4 sm:text-2xl sm:px-6 sm:py-4 lg:px-4 lg:py-3 lg:text-base 4xl:px-8 4xl:py-4 4xl:text-lg 6xl:text-2xl 7xl:text-4xl 7xl:px-10 7xl:py-8" onClick={  handlemovetosignuppage}>Sign up 🐱‍🏍.</button>
                </div>
            </div>

            <div className="flex text-xs justify-between items-center pb-4 mt-10 xs:text-lg sm:text-xl lg:text-base 4xl:text-xl 7xl:text-3xl">
                <p className="sm:text-xl opacity-80 lg:text-base 4xl:text-xl 6xl:text-3xl 7xl:text-4xl">Made by: Manish </p>
                <div className="flex gap-5 items-center 4xl:gap-8 6xl:gap-12">
                    <GitHubLogoIcon className="cursor-pointer xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 4xl:w-8 4xl:h-8 6xl:w-10 6xl:h-10 7xl:w-14 7xl:h-14" onClick={() => window.open("https://github.com/manishSharma1-dev/finedPeace","_blank")} />
                    <TwitterLogoIcon className="cursor-pointer xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 4xl:w-8 4xl:h-8 6xl:w-10 6xl:h-10 7xl:w-14 7xl:h-14" onClick={() =>window.open("https://x.com/Manish1_sh","_blank")} />
                    <Mail  className="cursor-pointer xs:w-5 xs:h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 4xl:w-8 4xl:h-8 6xl:w-10 6xl:h-10 7xl:w-14 7xl:h-14" />
                </div>
            </div>
        </div>
    )
}