import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react"
import FilesTable from "../components/FilesTable";


function MyFiles() {
    const user = useUser()
    const [allFiles,setAllFiles] = useState([])
    const userEmail = user.user.primaryEmailAddress.emailAddress
    useEffect(()=>{
       fetch(`https://file-flow.onrender.com/get-all-files`,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userEmail})
            })
            .then(res=>res.json())
            .then(data=>{
                setAllFiles(data)
            })
            .catch(err=>console.log(err))
          
    },[userEmail])
  return (
<div className=" w-full p-2 md:p-4 ">  
<h1 className=" font-semibold text-xl">My Files</h1>
<p className=" border p-2 text-slate-500 mt-2">Total Files : {allFiles?.length}</p>

{allFiles?.length>0?<FilesTable allFiles={allFiles}/>:<p className=" text-center">No files available</p>}
</div>
  )
}

export default MyFiles