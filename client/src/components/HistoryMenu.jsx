import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { IoMdArrowRoundBack } from 'react-icons/io'


const HistoryMenu = () => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
      setScores(JSON.parse(localStorage.getItem('scores')));
    }, [])
   

  return (
    <div className='min-w-[300px] w-[50%]'>
            <div className='text-black font-bold text-3xl bg-white rounded-tr-md rounded-tl-md w-full text-center p-3 shadow-lg flex items-center'>
              <Link to='/'><IoMdArrowRoundBack className='mr-[1rem]'/></Link>
              <h1>Game History</h1>
            </div>
            <div className='bg-[#3da5d9] rounded-b-md flex items-start justify-center min-h-[600px]'>
                <table>
                  <tbody>
                     {scores ? scores.slice(0,5).map((score, index) => (
                        <tr key={index}>
                            <td className='text-3xl text-white font-bold p-5'>-</td>
                            <td className='text-3xl text-white'>{score} Points</td>
                        </tr>
                    )) : 
                        <tr><td className='text-3xl text-white font-bold p-5'>No Games yet.</td></tr>
                    } 
                  </tbody>
                </table>
            </div>
        </div>
  )
}

export default HistoryMenu