import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { IoMdArrowRoundBack } from 'react-icons/io'

const SettingsMenu = ({playing, setPlaying}) => {


  const changeVolume = (e) => {
    const audio = document.getElementById('audio')
    console.log(e.target.value);
    audio.volume = e.target.value / 100;
  }
  

  return (
    <div className='min-w-[300px] w-[50%]'>
            <div className='text-black font-bold text-3xl bg-white rounded-tr-md rounded-tl-md w-full text-center p-3 shadow-lg flex items-center'>
              <Link to='/'><IoMdArrowRoundBack className='mr-[1rem]'/></Link>
              <h1>Settings</h1>
            </div>
            <div className='bg-[#3da5d9] rounded-b-md flex items-start justify-center min-h-[600px]'>
                <table>
                  <tbody>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Music</td>
                        { playing ? 
                        <td className='text-white font-bold text-xl p-3'><button onClick={() => {audio.pause(); audio.loop = true; setPlaying(false)}}><span className='underline'>On</span> / Off</button></td> :
                        <td className='text-white font-bold text-xl p-3'><button onClick={() => {audio.play(); audio.loop = true; setPlaying(true)}}>On / <span className='underline'>Off</span></button></td>
                        }
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Volume</td>
                        <td className='text-white font-bold text-xl p-3'><input onChange={changeVolume} type='range'></input></td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Move Left</td>
                        <td className='text-white font-bold text-xl p-3'><button>A</button></td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Move Right</td>
                        <td className='text-white font-bold text-xl p-3'><button>D</button></td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Drop Down</td>
                        <td className='text-white font-bold text-xl p-3'><button>S</button></td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Rotate</td>
                        <td className='text-white font-bold text-xl p-3'><button>Q</button></td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
  )
}

export default SettingsMenu