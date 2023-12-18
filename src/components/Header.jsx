
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react'



function Header() {
    const [toggle,setNavToggle] = useState(false)
    const toggleNavbarHandler = ()=>{
            setNavToggle(!toggle)
    }

    const user = true
    const navigate = useNavigate()
  const onClickHandler = () =>{
      navigate('/dashboard/upload')
  }    
  return (
    <header className=' relative border-r  p-4'>
        <nav className='flex justify-between'>
            <div className='flex items-center space-x-20'>
            <Link to={'/'}> <img  src={'/images/logo.png'} alt='logo' width={150} height={150} />  </Link>
            <ul className=' md:flex hidden space-x-5'>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/dashboard/upload'}>Upload</Link>
                </li>
                <li>
                    <Link to={'/about'}>About Us</Link>
                </li>
                <li>
                    <Link to={'/contact'}>Contact Us</Link>
                </li>
            
        
            </ul>
            </div>
            
            {!user.isSignedIn&&<button onClick={onClickHandler} className='  md:flex hidden bg-primary text-white p-3 rounded-md'>Get Started</button>}
            <button onClick={toggleNavbarHandler} className=' md:hidden flex p-2 rounded-md bg-secondary'><img src={'/images/menu.svg'} alt='menu' width={30} height={30}/></button>
        </nav>
        <nav className={` md:hidden flex top-[5rem] left-0 w-full bg-secondary min-h-full duration-500 p-4 absolute ${toggle?'flex':'hidden'}`}>
        <ul onClick={toggleNavbarHandler} className=' flex flex-col space-y-5  w-full h-full  justify-center '>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/dashboard/upload'}>Upload</Link>
                </li>
                <li>
                    <Link to={'/about'}>About Us</Link>
                </li>
                <li>
                    <Link to={'/contact'}>Contact Us</Link>
                </li>
            
        
            </ul>
        </nav>

    </header>
  )
}

export default Header