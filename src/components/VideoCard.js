import React from 'react'

export const VideoCard = ({info}) => {
  const {snippet, statistics} = info;
  const {channelTitle, title, thumbnails} = snippet;

  return (
    <div className='p-2 m-2 w-72 shadow-md'>
      <img className='rounded-lg' alt='videos' src={thumbnails.medium.url}></img>
      <ul>
        <li className='fonr-bold py-2'>{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};
