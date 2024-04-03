import React from 'react';
import {TbError404} from 'react-icons/tb'
// import { NavButton } from '../../components/buttons/NavButton';
// import { HeaderLogo } from '../../components/other/headerLogo';
import logo from '../../assets/images/monicenterLogo.png'
import { FormButton } from '../../components/buttons/FormButton';
import { useNavigate } from 'react-router-dom';

export const GeneralErrorPage = () => {
  const navigate = useNavigate()
    const stlyle = {
        transition: 'transform 0.3s ease-in',
        transitionOrigin: 'top left'
    }
  return (
    <div className='w-full h-screen flex flex-col  font-poppins py-8'>
        {/* <HeaderLogo/> */}
        <div className='m-auto'>
        <div className='bg-grey rounded-full p-6 w-fit mx-auto animate-bounce' style={stlyle}>
            <TbError404 className='m-auto text-7xl text-primary-light -rotate-45'/> 
        </div>
        <div className='text-center mt-3 text-darkGrey font-medium'>Oops the page you are looking for is Missing </div> 
        <div className='mx-auto w-fit  my-5'><FormButton label={'Go Back'} type={'filled'} clickAction={()=>navigate(-1)} isEnabled={true} shortHeight /></div>
        </div>
    </div>
  )
}
