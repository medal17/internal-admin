import React from 'react'
import { PiWarningCircleBold } from 'react-icons/pi'

interface confirmDeactivateProps {
    okAction:Function
}

export const ConfirmDeactivate = (props:confirmDeactivateProps) => {
    return (
        <div className=''>
            <div className='bg-red bg-opacity-10 w-fit p-2 rounded-full text-red'>
                <div className='bg-red bg-opacity-10 w-fit p-2 rounded-full'>
                    <PiWarningCircleBold className='text-3xl' />
                </div>
            </div>
            <h4 className='text-lg  mt-3 mb-2'> Deactivate User</h4>
            <p className='text-darkGrey font-[400] text-[15px]'>Are you sure you want to deactivate this user? This action cannot be undone.</p>

            <div className='pt-8 flex space-x-4'>
                <button className='border-2 py-2.5 border-darkGrey border-opacity-25 w-6/12'>
                    Cancel
                </button>
                <button onClick={()=>props.okAction()} className='bg-red py-2.5 text-white w-6/12'>
                    Deactivate
                </button>
            </div>
        </div>
    )
}
