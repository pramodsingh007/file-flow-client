import { useState} from "react";
import { useNavigate } from 'react-router-dom'



export default function Modal() {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate()
 


  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 p-4 px-8  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative flex justify-center">
                 <img className=" border-4  rounded-full p-4" src={'/images/icons8-tick.gif'} alt="tick" width={100} height={100}/>
                </div>
                <h1 className="text-xl mt-4 text-center">File <span className=" text-primary font-bold">Uploaded</span> Successfully</h1>
                <div className="flex items-center mt-4 justify-center ">
                  <button
                    className="text-semibold bg-green-500 rounded-full text-white background-transparent font-bold uppercase px-8 py-4 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {setShowModal(false);navigate('/dashboard/my-files')}}
                  >
                    Done
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}