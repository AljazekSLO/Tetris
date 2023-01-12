import React from 'react'
import { useState, useEffect, useRef } from 'react'

const Timer = ({timer, setTimer}) => {

  const id =useRef(null);
  const clear=()=>{
  window.clearInterval(id.current)
}
  useEffect(()=>{
     id.current=window.setInterval(()=>{
      setTimer((time)=>time-1)
    },1000)
    return ()=>clear();
  },[])

  useEffect(()=>{
    if(timer===0){
      clear()
    }

  },[timer])


  return (
    <div className="App">

     <div className='text-3xl text-white font-bold my-2'>Game starts in: {timer}</div>

    </div>
  );
}

export default Timer