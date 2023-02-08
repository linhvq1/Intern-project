import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from '../components/layouts/Navbar'
import AddScheduleInfo from './AddScheduleInfo/AddScheduleInfo'
import ScheduleList from './ScheduleList/ScheduleList'

function Home() {
  return (
    <div>
        <Navbar />
        <div className='pb-2 flex-1 h-screen overflow-y-auto'>
            <Routes>
                <Route path='/' element={<ScheduleList />}/>
                <Route path='add-schedule' element={<AddScheduleInfo />}/>
                <Route path="*" element={<p className='h-full flex justify-center items-center'>Path not resolved</p>} />
            </Routes>
        </div>
    </div>
  )
}

export default Home