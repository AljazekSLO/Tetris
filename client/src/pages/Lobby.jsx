import React from 'react'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import Stars from '../components/Stars'
import HistoryMenu from '../components/HistoryMenu'

const Lobby = () => {

  const [scores, setScores] = useState([])

  useEffect(() => {
    setScores(JSON.parse(localStorage.getItem('scores')));
  }, [])
  
  return (
    <div className='h-[100vh]'>
      <Stars />
      <div className='h-full flex justify-center items-center relative z-20'>
          <HistoryMenu/>
      </div>
    </div>
  ) 
}

export default Lobby