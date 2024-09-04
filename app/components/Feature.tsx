import feature1 from "@/public/bg.jpg"
import Image from "next/image"

export const Feature: React.FC = () => {
    return (
        <div className="mt-20 mb-10 ml-44 mr-44">
            <div className="flex justify-between items-center overflow-hidden flex-wrap ">

                <div className="rounded-lg text-sm w-[25rem]">
                    <Image src={feature1} alt="feature1" className="rounded-xl"/>
                    <div>
                        <h1 className="mb-3 mt-3 font-semibold">feature part 1</h1>
                        <p className="text-xs opacity-70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, suscipit? Mollitia quaerat Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>

                <div className="rounded-lg text-sm w-[25rem]">
                    <Image src={feature1} alt="feature1" className="rounded-xl" />
                    <div>
                        <h1 className="mb-3 mt-3 font-semibold">feature part 1</h1>
                        <p className="text-xs opacity-70">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, suscipit? Mollitia quaerat Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}