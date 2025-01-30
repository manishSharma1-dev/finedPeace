"use client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { TwitterLogoIcon } from "@radix-ui/react-icons"
import { GitHubLogoIcon  } from "@radix-ui/react-icons"

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
        <div className="bg-[#222222] text-white p-12 pb-0 mt-16">
            <div className="flex flex-col justify-center items-center ">
                <h1 className="text-center text-4xl font-bold w-[50%] p-2">Sign up today.</h1>  
                <button className="text-black bg-white pt-1 pb-1 pl-2 pr-2 text-sm rounded mt-4" onClick={handlemovetosignuppage}>Sign up 🐱‍🏍.</button>    
            </div>

            <div className="flex text-xs opacity-40 justify-between mt-10">
                <p>made by -manish </p>
                <span> manishvsharma1@gmail.com</span>
                <div className="flex gap-5">
                    <GitHubLogoIcon className="cursor-pointer" onClick={() => window.open("https://github.com/manishSharma1-dev/finedPeace","_blank")} />
                    <TwitterLogoIcon className="cursor-pointer" onClick={() =>window.open("https://x.com/Manish1_sh","_blank")} />
                </div>
            </div>
        </div>
    )
}