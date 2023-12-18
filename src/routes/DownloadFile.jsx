import { Download, FileDown, Zap } from "lucide-react"
import { useState } from "react"
import { useLoaderData } from "react-router"
import { Link } from "react-router-dom"

function DownloadFile() {
    const loaderData = useLoaderData()
    const [enableDownload,setEnableDownload] = useState(false)
    const passwordInputHandler = (e)=>{
        if(e.target.value===loaderData?.password){
            setEnableDownload(true)
        }
        else{
            setEnableDownload(false)
        }
    }
  return (
    <div className=" w-full h-screen flex bg-secondary justify-center items-center">
        <div className=" max-w-[28rem] border  bg-slate-100 p-8">
        <h1 className=" text-2xl font-semibold text-center"><span className="text-primary">{loaderData?.userName}</span> Shared the file with You</h1>
        <p className=" text-center text-sm mb-6 text-slate-500">Find file details below</p>
        <div className=" flex justify-center"><FileDown width={100} height={100}/></div>
        <div className=" flex space-x-2 mb-6 items-center justify-center">
            <span>{loaderData?.fileName}</span> <Zap/> <span>{loaderData?.fileType}</span> <Zap/> <span>{(loaderData?.fileSize/1024/1024).toFixed(2)}MB</span> 
        </div>
        {loaderData?.password&&<input onChange={passwordInputHandler}  placeholder="Enter password to access the file" className="w-full p-2 mb-6  rounded-md border outline-none h-12" type="password" />}
        {loaderData?.password&&<a download={enableDownload}  href={loaderData?.fileURL}><button disabled={enableDownload?false:true} className=" w-full h-12 rounded-full disabled:bg-slate-400 bg-primary text-white font-semibold flex justify-center items-center gap-2"> <Download/> Download</button></a>}
        {!loaderData?.password&&<Link target="_blank" download={true}  to={loaderData?.fileURL}><button className=" w-full h-12 rounded-full disabled:bg-slate-400 bg-primary text-white font-semibold flex justify-center items-center gap-2"> <Download/> Download</button></Link>}
        <p className=" text-center mt-4 text-xs text-slate-500">*Term and Condition apply</p>
    </div>
    </div>
  )
}

export default DownloadFile