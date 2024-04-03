import React from 'react'

export const Logout = (props:{action:Function, closeAction:Function}) => {
  return (
    <div>
        <p className='text-center text-xl font-semibold py-2'>Confirm Logout</p>
        <p className='text-center text-[18px] py-3'>
            Confirm you wish to Logout of this Application 
        </p>
        <div className='flex mx-auto w-fit mt-5'>
            <div onClick={()=>props.closeAction()} className='border cursor-pointer px-7 py-2 rounded-lg mr-3'>Cancel</div>
            <div onClick={()=>props.action()} className='bg-lighterOrange cursor-pointer text-white px-7 py-2 rounded-lg'>Logout</div>
        </div>
    </div>
  )
}
