import React from 'react'
import { FormButton } from '../buttons/FormButton'
import {FaCircleCheck} from 'react-icons/fa6'

interface successProps {
    message:string, 
    heading:string, 
    okAction:Function,
    icon?: JSX.Element
}

export const SuccessCard = (props:successProps) => {
  return (
    <div>
        <h4>{props.heading}</h4>
        {props.icon?
        props.icon:
        <FaCircleCheck className='text-5xl mx-auto my-2 text-lightGreen' />
    }
        <p className='text-lg text-center py-7 font-semibold'>{props.message}</p>
        <FormButton 
            shortHeight label={'Done'} clickAction={props.okAction} isEnabled={true} />
    </div>
  )
}
