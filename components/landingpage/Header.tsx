import Image from "next/image"
import headerImage from "@/public/bg.jpg"

export const Header: React.FC = () =>{
    return (
        <main>
            <div className="grid grid-cols-2">

                <div className="pt-28 pb-20 pl-32 pr-32 text-wrap">
                    <h1 className="text-5xl font-bold pb-3">Add Sections or Complete Pages</h1>
                    <p className="text-xl pb-4">Add breakpoints to your blank page, then drop sections to have them responsive out of the box.</p>
                    <div className="flex gap-5">
                        <button className="bg-[#222222] text-white shadow-black shadow-sm pt-1 pb-1 pl-2 pr-2 rounded text-sm">Get Started</button>
                        <button className="bg-[#EBEBEB] text-black pt-1 pb-1 pl-2 pr-2 rounded text-sm">Learn More</button>
                    </div>
                </div> 

                <div className="overflow-hidden max-h-[300vh]">
                    <div>
                        <Image src={headerImage} alt="Header" className="h-[65vh] rounded-sm"/>
                    </div>
                </div>

            </div>
        </main>
    )
}