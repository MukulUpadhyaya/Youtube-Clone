import React from 'react'
import { MenuItems } from './MenuItems'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export const SideBar = () => {

  const isMenuOpen = useSelector((store)=>store.app.isMenuOpen);

  if(!isMenuOpen)return null;
  return (
    <div className='p-5 shadow-lg w-48'>
      <ul>
          <Link to={"/"}><li>Home</li></Link>
          <li>Short</li>
          <li>Videos</li>
          <li>Live</li>
        </ul>
        <h1 className='font-bold'>Subscribtions</h1>
        <ul>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Movies</li>
        </ul>
        <h1 className='font-bold'>Subscribtions</h1>
        <ul>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Movies</li>
        </ul>
        <h1 className='font-bold'>Subscribtions</h1>
        <ul>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Movies</li>
        </ul>
        <h1 className='font-bold'>Subscribtions</h1>
        <ul>
          <li>Music</li>
          <li>Sports</li>
          <li>Gaming</li>
          <li>Movies</li>
        </ul>
    </div>
  )
}
