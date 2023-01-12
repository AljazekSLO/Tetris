import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Lobby from './pages/Lobby'
import Game from './pages/Game'

import { MdMusicNote,  MdMusicOff } from 'react-icons/md'

function App() {

  const [playing, setPlaying] = useState(false)

  useEffect(() => {
      const audio = document.getElementById('audio')
      if (audio.paused) {
          setPlaying(false)
      } else {
          setPlaying(true)
      }
  }, [])

  return (
    <div className='bg-[#155293] w-[100%] h-[100vh] z-[-10]'>
        <div className='absolute top-0 left-0 z-30'>
            { !playing ? 
                <div className='flex justify-center items-center bg-[#3da5d9] rounded-full w-[50px] h-[50px] m-3 hover: cursor-pointer' onClick={() => {audio.play(); audio.loop = true; setPlaying(true)}}>
                    <MdMusicOff className='text-white text-3xl' />
                </div> :
                <div className='flex justify-center items-center bg-[#3da5d9] rounded-full w-[50px] h-[50px] m-3 hover: cursor-pointer' onClick={() => {audio.pause(); audio.loop = true; setPlaying(false)}}>
                    <MdMusicNote className='text-white text-3xl' />
                </div>

            }      
        </div>
    <audio id='audio' src='/music.mp3' loop></audio>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/game" element={<Game/>} />
          <Route exact path="/settings" element={<Settings playing={playing} setPlaying={setPlaying}/>} />
          <Route exact path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
