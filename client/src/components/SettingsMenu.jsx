import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { IoMdArrowRoundBack } from 'react-icons/io'

import { getKeyCodeFromChar} from '../utils/index'

const SettingsMenu = ({playing, setPlaying}) => {

  
  useEffect(() => {

    let keyCodes;
    
    if(localStorage.getItem('keys') != null) {
      keyCodes = JSON.parse(localStorage.getItem('keys'));  
    }
    else {
      keyCodes = {
        rotate: { key: 'q', keyCode: 81 },
        down: { key: 'ArrowDown', keyCode: 40 },
        left: { key: 'ArrowLeft', keyCode: 37 },
        right: { key: 'ArrowRight', keyCode: 39 },
      };
    }


    const directions = ['rotate', 'down', 'left', 'right'];
    directions.forEach((direction) => {
      const input = document.querySelector(`input[name=${direction}]`);
      input.value = keyCodes[direction].key;
    });
    

    const volume = document.getElementById('volume')
    const valueStatus = localStorage.getItem('volume') * 100;
    if(valueStatus == 0 || null) volume.value = 100;
    else volume.value = valueStatus;

    
  }, [])

  const handleChangeKeys = (e) => {
    e.preventDefault();
    const directions = ['rotate', 'down', 'left', 'right'];
    const save = document.getElementById('save');
    const keys = {};
    directions.forEach((direction) => {
      const input = document.querySelector(`input[name=${direction}]`);
      const key = input.value;
      const keyCode = key.length === 1 ? key.charCodeAt(0) : getKeyCodeFromChar(key);
      if (keyCode >= 41 && keyCode <= 122) {
        keys[direction] = { key: key, keyCode: keyCode - 32};
      } else {
        keys[direction] = { key: key, keyCode: keyCode};
      }
    });
    const values = Object.values(keys);
    const keysInRange = values.every((value) => value.keyCode >= 37 && value.keyCode <= 122);
    if (!keysInRange) {
      console.log('Keys must be in range a-z');
      return;
    }
    localStorage.setItem('keys', JSON.stringify(keys));
    save.innerHTML = 'Saved!';
    
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
            <div className='bg-[#3da5d9] rounded-b-md flex items-start justify-center min-h-[600px] relative'>
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
                            value="ArrowLeft"
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
                            value="ArrowRight"
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
                            value="ArrowDown"
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
                            value="q"
                            onClick={() => handleClick('rotate')}
                          />
                        </td>
                    </tr>
                  </tbody>
                </table>
               <button id='save' className='absolute bottom-0 right-0 m-5 px-2 py-1 bg-white rounded' onClick={handleChangeKeys}>Save Keys</button>
            </div>
        </div>
  )
}

export default SettingsMenu