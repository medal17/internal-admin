import { useState } from 'react'
import {BsPersonFill} from 'react-icons/bs'
// import Wallet from '../../assets/images/wallet.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../../assets/icons/Logo'
import { useRequest } from '../../shared/hooks/useRequest'
import { ENDPOINTS } from '../../shared/constants'

export const DashboardNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const userDetails = useRequest(ENDPOINTS.GET_PROFILE,
    'get',
    'get-user-profile')?.data

  return (
    <div className='bg-white py-3 px-3 xl:w-[83%] lg:w-[77%] w-full ml-auto shadow-sm fixed right-0 left-0 z-40'>
        <div className=' w-full px-5 m-auto flex justify-between align-middle'>
            {/* <span className='cursor-pointer' onClick={()=>navigate('/')}>
              <Logo />
            </span>  */}
            <div className='capitalize text-2xl font-bold'>
            {location?.pathname&&location?.pathname.split('/').length>1?
            location?.pathname.split('/')[2]?.replace('-',' '): location?.pathname.split('/')[1]?.replace('-',' ')}
            {location?.pathname==='/dashboard'&&'Dashboard'}
            </div>
            <div className=' flex lg:ml-auto space-x-3  xl:font-bold  font-semibold my-auto'>
             
                <div>
                  <p className='font-[400]'>{userDetails?.data?.firstName} {userDetails?.data?.lastName}</p>
                  <p className='text-darkGrey text-[14px] font-[500]'>{userDetails?.data?.emailAddress} </p>
                </div>
                {/* <img src ={Wallet} className='lg:flex hidden' alt='wallet '/> */}
                  {userDetails?.data?.avatar?<img src={userDetails?.data?.avatar} className='h-10 w-10 rounded-full'/>:
                  <span className='my-auto  bg-grey p-3 rounded-full text-white'>
                   <BsPersonFill/>
                    </span>
                    }
            </div> 
        </div>
        
    </div>
  )
}
