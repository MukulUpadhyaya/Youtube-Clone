import React from 'react'

const ChatMessage = ({name, message}) => {
  return (
    <div className='flex items-center my-4 shadow-sm'>
        <img
        className="w-8 h-8"
        alt="user"
        src="https://cdn0.iconfinder.com/data/icons/cryptocurrency-137/128/1_profile_user_avatar_account_person-132-512.png"
      />
        <span className='font-bold pl-2'>{name}</span>
        <span className='pl-4'>{message}</span>
    </div>
  )
}

export default ChatMessage