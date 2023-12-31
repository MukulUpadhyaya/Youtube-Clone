import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessages } from '../utils/chatSlice'
import {generateRandomName, generateRandomMessage } from '../utils/Helper'

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");
  const chatMessages = useSelector((store) => store.chat.messages)
  useEffect(()=>{
    const i = setInterval(()=>{
      dispatch(addMessages({
        name:generateRandomName(),
        message:generateRandomMessage(20)
      }))
      //console.log("API POLLING")
    },1500)
    return ()=>clearInterval(i);
  },[])
  return (
  <div className='flex flex-col'>
    <div className='w-full h-[400px] ml-2 p-2 mr-4 shadow-lg border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
       {chatMessages.map((c,i)=>(
        <ChatMessage
        key={i}
        name={c.name}
        message={c.message}
        />
       ))} 
    </div>
    <form className='w-full p-2 ml-2 border border-black rounded-md my-2'
     onSubmit={(e)=>{
      e.preventDefault();
      //console.log(liveMessage);
      dispatch(addMessages({
        name:"Mukul",
        message: liveMessage
      }))
      setLiveMessage("")
     }}>
      <input className='w-64 py-1 bg-slate-100 px-2' type='text' value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)}></input>
      <button className='bg-green-100 mx-2 p-2 px-3 rounded-md' >send</button>
    </form>
    </div>
    
  )
}

export default LiveChat