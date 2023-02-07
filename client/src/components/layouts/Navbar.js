import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex shadow-lg p-3 pl-7 items-center sticky top-0'>
        <div className='logo text-xl font-semibold pr-7'>First_Project</div>
        <div className='page-list'>
            <Link className='pr-7 font-normal' to='..' relative='path'>Home</Link>
            <Link className='font-normal' to='..' relative='path'>Privacy</Link>
        </div>
    </div>
  )
}

export default Navbar