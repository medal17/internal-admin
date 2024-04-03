import React from 'react'
import { UserDetails } from './components/UserDetails'
import { OtherDetails } from './components/OtherDetails'
import { useLocation } from 'react-router-dom'

export const ViewUser = () => {
    const location = useLocation();
    // console.log('data',location.state)
    return (
        <div>
            <div className='flex space-x-5'>
                <UserDetails />
                <OtherDetails />
            </div>
        </div>
    )
}
