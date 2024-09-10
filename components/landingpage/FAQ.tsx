export const FrequentlyAskedQuestion:React.FC = () => {
    return (
        <div>
            <h1 className="text-center font-bold text-xl mt-20 mb-10">FAQ</h1>
            {/* Accordian COmponent  */}
            <div className="bg-[#EBEBEB] mt-10 mb-10 ml-44 mr-44 pt-6 pb-6 pl-10 pr-10 rounded-xl flex flex-col gap-4 text-xs">
                <p className="cursor-pointer border-b border-black border-opacity-20 pb-1 opacity-70">+ Why Should i use it ?</p>
                <p className="cursor-pointer border-b border-black border-opacity-20 pb-1 opacity-70">+ Did it really help ?</p>
                <p className="cursor-pointer border-b border-black border-opacity-20 pb-1 opacity-70">+ What type of tracks are their ?</p>
            </div>
        </div>
    )
}