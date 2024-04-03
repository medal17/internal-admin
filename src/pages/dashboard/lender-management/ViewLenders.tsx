import React from 'react'
import { LenderDetails } from './components/LenderDetails'
import { OtherDetails } from './components/OtherDetails'

export const ViewLenders = () => {

    return (
        <div>
            <div className='flex space-x-5'>
                <LenderDetails />
                <OtherDetails />
            </div>
        </div>
    )
}
