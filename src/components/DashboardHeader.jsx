import { UserButton } from '@clerk/clerk-react'


function Header() {
  return (
    <div className='flex justify-between items-center p-10 h-12 border-b border-t-0'>
        <img src={'/images/logo.png'} alt='logo' width={150} height={150}/>
        <UserButton/>
    </div>
  )
}

export default Header