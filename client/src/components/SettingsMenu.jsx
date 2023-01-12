import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { IoMdArrowRoundBack } from 'react-icons/io'

import {getCharFromKeyCode, getKeyCodeFromChar} from '../utils/index'

const SettingsMenu = ({playing, setPlaying}) => {


  
  useEffect(() => {
    const keyCodes = JSON.parse(localStorage.getItem('keys'));  
    console.log(keyCodes);

    const volume = document.getElementById('volume')
    volume.value = localStorage.getItem('volume') * 100;
    
  }, [])

  const handleChangeKeys = (e) => {
    e.preventDefault();
    const directions = ['rotate', 'down', 'left', 'right'];
    const keys = {};
    directions.forEach((direction) => {
      const input = document.querySelector(`input[name=${direction}]`);
      const key = input.value;
      const keyCode = key.length === 1 ? key.charCodeAt(0) : getKeyCodeFromChar(key);
      if (keyCode >= 41 && keyCode <= 122) {
        keys[direction] = keyCode - 32;
      } else {
        keys[direction] = keyCode;
      }
    });
    const values = Object.values(keys);
    const keysInRange = values.every((value) => value >= 37 && value <= 122);
    if (!keysInRange) {
      console.log('Keys must be in range a-z');
      return;
    }
    localStorage.setItem('keys', JSON.stringify(keys));
    console.log('Keys changed successfully');
  };
  
  
  const handleClick = (direction) => {
    const input = document.querySelector(`input[name=${direction}]`);
    input.value = 'Press a key';
    input.addEventListener('keydown', (e) => {
      e.preventDefault();
      input.value = e.key;
    });
  };
  
  const changeVolume = (e) => {
    const audio = document.getElementById('audio')
    const volume = e.target.value / 100;
    localStorage.setItem('volume', volume);
    audio.volume = volume;
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
                        <td className='text-white font-bold text-xl p-3'><input id='volume' onChange={changeVolume} type='range'></input></td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Move Left</td>
                        <td className='text-white font-bold text-xl p-3'>
                          <input
                            type="button"
                            name="left"
                            className="text-white hover:cursor-pointer"
                            defaultValue="ArrowLeft"
                            onClick={() => handleClick('left')}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Move Right</td>
                        <td className='text-white font-bold text-xl p-3'>
                          <input
                            type="button"
                            name="right"
                            className="text-white hover:cursor-pointer"
                            defaultValue="ArrowRight"
                            onClick={() => handleClick('right')}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Move Down</td>
                        <td className='text-white font-bold text-xl p-3'>
                          <input
                            type="button"
                            name="down"
                            className="text-white hover:cursor-pointer"
                            defaultValue="ArrowDown"
                            onClick={() => handleClick('down')}
                          />
                        </td>
                    </tr>
                    <tr>
                        <td className='text-white font-bold text-xl p-3 text-right'>Move Rotate</td>
                        <td className='text-white font-bold text-xl p-3'>
                          <input
                            type="button"
                            name="rotate"
                            className="text-white hover:cursor-pointer"
                            defaultValue="Q"
                            onClick={() => handleClick('rotate')}
                          />
                        </td>
                        <td>
                            <button onClick={handleChangeKeys}>Save</button>
                        </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
  )
}

export default SettingsMenu