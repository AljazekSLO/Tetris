import { Link } from "react-router-dom";

import { useEffect } from "react";

const Menu = () => {

    return(
        <div className="relative z-20">
            <h1 className="text-center m-[-1rem] text-[5rem] uppercase font-bold text-white drop-shadow-xl">Tetris</h1>
            <h1 className="text-center mb-4 text-[1.2rem] capitalize font-bold text-white drop-shadow-xl">It's the addictive puzzle game that started it all!</h1>
            <div className="flex flex-col gap-4 items-center z-10">
                <Link to='/game'><button className="bg-[#f8c304] py-2 px-5 rounded-lg text-[#8a4900] font-bold text-2xl min-w-[300px]">Create New Game</button></Link>
                <Link to='/lobby' ><button className="bg-[#f8c304] py-2 px-5 rounded-lg text-[#8a4900] font-bold text-2xl min-w-[300px]">Game History</button></Link>
                <Link to='/settings'><button className="bg-[#f8c304] py-2 px-5 rounded-lg text-[#8a4900] font-bold text-2xl min-w-[300px]">User Settings</button></Link>
            </div>
        </div>
    )
}

export default Menu;