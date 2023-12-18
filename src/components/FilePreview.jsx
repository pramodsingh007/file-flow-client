import {FileIcon,PlusIcon} from 'lucide-react';
import React from 'react'

function FilePreview({file,removeHandler}) {
    const onClickHandler = ()=>{
        removeHandler()
    }
  return (
    <div className='max-w-[30rem] mt-4'>
        <div className=' flex gap-16 items-center'>
            <div>
                <FileIcon/>
            </div>
            <div>
                <h1>{file.name}</h1>
                <p>{file.type} {(file.size/1024/1024).toFixed(2)}MB</p>
            </div>
            <div>
                <button onClick={onClickHandler}><PlusIcon className=' rotate-45'/></button>
            </div>
        </div>
    </div>
  )
}

export default FilePreview