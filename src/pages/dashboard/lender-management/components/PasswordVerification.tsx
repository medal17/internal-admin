import React from 'react'
import { PasswordField } from '../../../../components/form-input/TextField'

interface Props {
    okAction: Function,
    message?:string,
    buttonText?:string
}

export const PasswordVerification = (props:Props) => {
  return (
    <div>
        <h3 className='text-lg mb-6'>{props.message?props.message:'Enter a Password to confirm Deactivation'}</h3>

        <PasswordField label={'Enter Password'} type={''} setValue={undefined}/>

        <div className='pt-2 flex space-x-4'>
                <button onClick={()=>null} className='border-2 py-2.5 border-darkGrey border-opacity-25 w-6/12'>
                    Cancel
                </button>
                <button onClick={()=>props.okAction()} className='bg-primary-light py-2.5 text-white w-6/12'>
                   {props.buttonText?props.buttonText:'Deactivate'}
                </button>
            </div>
    </div>
  )
}
