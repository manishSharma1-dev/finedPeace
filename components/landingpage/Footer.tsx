"use client"
import { useRouter } from "next/navigation"

export const Footer:React.FC = () => {
    const router = useRouter()

    function handlemovetosignuppage(){
        router.replace('/sign-up')
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
                    <p className="cursor-pointer">G</p>
                    <p className="cursor-pointer">T</p>
                </div>
            </div>
        </div>
    )
}