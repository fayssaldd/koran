import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../pages/NavBar'

export default function Layout() {
  return (
    <>
        <div className='mb-' >
          <NavBar/>  
        </div> 
        <div>
            <Outlet/>
        </div>
    </>
  )
}
