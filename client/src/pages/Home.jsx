
import React, {useState, useEffect} from 'react'
import Menu from '../components/Menu'
import Stars from '../components/Stars'


function Home() {


    return (
        <div className='h-full flex justify-center items-center'>
            <Stars />
            <Menu />
        </div>
    )
    }
export default Home
