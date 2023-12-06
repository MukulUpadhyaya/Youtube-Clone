import React from 'react'
import ChatMessage from './ChatMessage'

const LiveChat = () => {
  return (
    <div className='w-full h-[600] ml-2 p-2 mr-4 shadow-lg border border-black bg-slate-100 rounded-lg'>
        <ChatMessage 
        name={"Mukul Upadhyaya"} 
        message={"This is a live chat message."}
        />
        <ChatMessage 
        name={"Mukul Upadhyaya"} 
        message={"This is a live chat message."}
        />
        <ChatMessage 
        name={"Mukul Upadhyaya"} 
        message={"This is a live chat message."}
        />
        <ChatMessage 
        name={"Mukul Upadhyaya"} 
        message={"This is a live chat message."}
        />
        <ChatMessage 
        name={"Mukul Upadhyaya"} 
        message={"This is a live chat message nbfkd knfnkfn knks knk."}
        />
        <ChatMessage 
        name={"Mukul Upadhyaya"} 
        message={"This is a live chat message."}
        />
    </div>
  )
}

export default LiveChat