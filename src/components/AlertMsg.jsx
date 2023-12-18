import {AlertOctagon} from 'lucide-react';


import React from 'react'

function AlertMsg({msg}) {
  return (
    <div className='max-w-[30rem] mt-4 rounded-md bg-red-400 text-white p-3 flex gap-3'>
        <AlertOctagon/><h1>{msg}</h1>
    </div>
  )
}

export default AlertMsg