import React from 'react'
import { useEffect, useState } from 'react'

const Lobby = () => {

  const [scores, setScores] = useState([])

  useEffect(() => {
    setScores(JSON.parse(localStorage.getItem('scores')));
  }, [])
  
  return (
    <div>
      <div className='flex justify-center flex-col items-center w-full h-[100vh]'>
        <h1 className='text-white text-4xl font-bold'>History of Games:</h1>
          {scores && scores.map((score, index) => (
            <h1>{score}</h1>
          ))}
      </div>
    </div>
  )
}

export default Lobby