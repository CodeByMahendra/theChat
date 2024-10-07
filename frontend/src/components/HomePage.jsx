import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className='flex h-screen w-full bg-gray-400'>

      <div className='flex flex-col md:flex-row w-full h-full'>
        <Sidebar className='w-full md:w-1/4 lg:w-1/5 h-full bg-white' />
      
      </div>
    </div>
  )
}

export default HomePage;
