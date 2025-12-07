import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    // Main Wrapper: Sets the base background for the entire dashboard area
    // Uses a clean light gray/white for light mode and a deep neutral color for dark mode
    <div className='relative min-h-screen bg-gray-50 dark:bg-neutral-800 transition-colors duration-300'>
      
      {/* Left Side: Sidebar Component */}
      <Sidebar />
      
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='flex-1 md:ml-64'>
        {/*
          pt-16 is crucial for mobile view: It ensures the content starts below 
          the fixed mobile header/navbar, preventing overlap.
        */}
        <div className='pt-16 md:pt-0 p-4 sm:p-6'> 
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
      
    </div>
  )
}

export default DashboardLayout