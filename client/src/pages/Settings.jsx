
import React from 'react'

import SettingsMenu from '../components/SettingsMenu'
import Stars from '../components/Stars'

function Settings({playing, setPlaying}) {


    return (
        <div className='h-[100vh]'>
            <Stars />
            <div className='h-full flex justify-center items-center relative z-20'>
                <SettingsMenu playing={playing} setPlaying={setPlaying} />
            </div>
        </div>
    )
    }
export default Settings
