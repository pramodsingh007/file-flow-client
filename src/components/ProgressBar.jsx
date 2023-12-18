import React from 'react'

function ProgressBar({progress}) {
  return (
    <div className='h-4 overflow-hidden rounded-full bg-slate-300 w-full'>
        <div style={{width:`${progress.toFixed(0)}%`}} className={`h-full  bg-blue-600 text-xs text-end text-white` }>{progress.toFixed(0)}%</div>
    </div>
  )
}

export default ProgressBar