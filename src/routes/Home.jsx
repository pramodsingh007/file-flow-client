import { useNavigate } from "react-router"

export default function Home() {
  const navigate = useNavigate()
  const onClickHandler = () =>{
      navigate('/dashboard/upload')
  }
  return (
    <main className=' pr-4 pl-5 mt-32 w-full grid place-content-center'>
    
      <div className=' max-w-[50rem] space-y-7'>
      <h1 className=' leading-tight text-3xl sm:text-5xl text-center font-semibold'> <strong className=' text-primary'>Upload,Save</strong> and easily <strong className='text-primary'>Share</strong> your files in one place</h1>
        <p className=' text-center text-gray-600'>Drag and drop your file directly on our cloud and share it with your
          friends and family secuarely with passsword and sent it on email
        </p>
        <div className=' sm:flex sm:flex-row flex flex-col space-y-4 sm:space-y-0  justify-center sm:space-x-5  '>
        <button onClick={onClickHandler} className=' rounded-lg font-semibold bg-primary text-white p-5 px-8'>Get Started</button>
        <button className=' rounded-lg font-semibold  border shadow-md p-5 px-8 '>Learn More</button>
        </div>
      </div>
     
    </main>
  )
}
