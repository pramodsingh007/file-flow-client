import { File, Shield, Upload } from 'lucide-react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <header className=' h-auto md:h-screen w-auto md:w-[15rem] border-r space-y-8 bg-secondary p-3 rounded-lg'>
            <ul className=' mt-0 md:mt-10 flex justify-between md:block space-y-0 md:space-y-8'>
                <li>
                    <Link className='flex gap-2 hover:bg-slate-200 rounded-md p-3' to={'/dashboard/upload'}><Upload/>Upload</Link>
                </li>
                <li>
                    <Link className=' flex gap-2 hover:bg-slate-200 rounded-md p-3' to={'/dashboard/my-files'}><File/>Files</Link>
                </li>
                <li>
                    <Link className=' flex gap-2 hover:bg-slate-200 rounded-md p-3' to={'/dashboard/upgrade'}><Shield/>Upgrade</Link>
                </li>
            
            </ul>
    </header>
  )
}

export default Header