import React from 'react'
import { TextField } from '../../../../components/form-input/TextField'

interface Props {
    okAction: Function
}

export const EditUserForm = (props: Props) => {
    return (
        <div>
            <h4 className='text-lg'>Edit User</h4>
            <TextField
                label={'Full Name'}
                type={''}
                // placeholder='Enter Company Name'
                setValue={undefined}
            />

            <TextField
                label={'Email Address'}
                type={''}
                // placeholder='Enter Company Name'
                setValue={undefined}
            />

            <TextField
                label={'Phone Number'}
                type={''}
                // placeholder='Enter Company Name'
                setValue={undefined}
            />

            <section>
                <h5>User Role:</h5>
                <div className='flex space-x-5 py-2'>
                    <div className='flex'>
                        <input type='checkbox' className='bg-white mr-2 h-5 w-5' />
                        <div>Originator</div>
                    </div>
                    <div className='flex'>
                        <input type='checkbox' className='bg-white mr-2 h-5 w-5 ' />
                        <div>Reviewer</div>
                    </div>
                    <div className='flex'>
                        <input type='checkbox' className='bg-white mr-2 h-5 w-5' />
                        <div>Approver</div>
                    </div>
                </div>
            </section>
            
            <div className='pt-8 flex space-x-4'>
                <button className='border-2 py-2.5 border-darkGrey border-opacity-25 w-6/12'>
                    Cancel
                </button>
                <button onClick={()=>props.okAction()} className='bg-primary-light py-2.5 text-white w-6/12'>
                    Add
                </button>
            </div>
        </div>
    )
}
