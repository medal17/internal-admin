import React from 'react'
import LoginBanner from '../../assets/images/bg-image.jpg'
import Logo from '../../assets/images/white-logo.png'
// 
export const AuthDividedScreen = (props:{children:JSX.Element | JSX.Element[]}) => {
    return (
        <div className='h-screen body-selected -mt-1 dissmiss flex'>
            <div className=' hidden  md:flex w-[65%] bg-[#031317] bg-opacity-95  flex-col align-bottom '>
                <div className='absolute w-[55%] top-[40%] mx-auto'>
                    <img src={Logo} className='mx-auto mb-3' />
                </div>
                <img className='lg:h-screen mix-blend-overlay bg-blend-multiply bg-opacity-90 h-4/5 w-[100%] mt-auto mx-auto' src={LoginBanner} />
            </div>
            <div className='md:w-[55%] w-full flex flex-col justify-center  p-5'>
                {props.children}
            </div>
        </div>
    )
}
