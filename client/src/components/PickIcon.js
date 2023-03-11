import React from 'react'

function PickIcon({icon}) {
  return (
    <div className='font-semibold bg-gray-400 p-1 rounded text-white'>{icon || 'ガ'}</div>
  )
}

export default PickIcon