import DashboardHeader from '../../components/DashboardHeader';
import Sidebar from '../../components/Sidebar';
import {Outlet} from 'react-router-dom';

function DashboardLayout() {
  return (
    <>
    <DashboardHeader/>
    <div className=' flex flex-col md:flex-row'>
    <Sidebar/>
    <Outlet/>
    </div>
    </>
  )
}

export default DashboardLayout