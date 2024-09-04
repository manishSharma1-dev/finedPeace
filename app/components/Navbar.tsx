export const Navbar: React.FC = () => {
    return (
        <div className="p-3 border-b-[1px] border-[#222222] border-opacity-55">
            <div className="flex justify-between">

                <div className="flex gap-3 items-center">
                    <img src="#" alt="logo" />
                    <span className="font-bold text-sm">FindPeace</span>
                </div>

                <div className="flex gap-3">
                    <button className="bg-[#EBEBEB] text-black pt-1 pb-1 pl-2 pr-2 rounded text-xs">Dark</button>
                    <button className="bg-[#222222] text-white pt-1 pb-1 pl-2 pr-2 rounded text-xs">Login</button>
                </div>

            </div>

        </div>
    )
}