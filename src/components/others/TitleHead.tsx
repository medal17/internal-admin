import React, { useState } from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { currencyFormat, noSymbolCurrecncy } from '../../shared/currencyFormat'

export const TitleHead = (props: { title: string, value: string, style: string, isAmount?: boolean, noflex?: boolean }) => {
  return (
    <div className={props.noflex ? '' : 'flex font-primary'}>
      <div className={`${props.style}`}>{props.title}</div>
      <div className='break-words w-1/2'>
        {props.isAmount && Number(props.value) > 1 ?
        (currencyFormat(Number(props.value || 0)))
        :
        props.value}
      </div>
    </div>
  )
}


export const ValidateTitleHead = (props: { title: string, value: string, style: string, noflex?: boolean, actionText?: string, action?: Function }) => {
  const [show, setShow] = useState(false)
  return (
    <div className={props.noflex ? '' : 'flex'}>
      <div className={`${props.style}`}>
        {props.title}
      </div>
     {props.value&& 
     <div className='flex'>{show ? props.value :
        '**** **** **** ' + props.value.substring(props.value.length - 4, props.value.length)}
        <div className='mx-3 text-primary-light cursor-pointer border-b-2'
          onClick={() => props.action ? props.action() : null}
        > {props.actionText}</div>
      </div>}
    </div>
  )
}


export const ImageTitleHead = (props: { title: string, value: string, style: string, actionText?: string, action: Function }) => {
  return (
    <div className={'flex'}>
      <div className={`${props.style}`}>{props.title}</div>
     {props.value&& 
     <div className='flex'>
        <BsFillImageFill className='text-xl text-darkGrey' />
        <div className='px-4'>{props.value && props.value.length > 20 ?
          props.value.substring(0, 19) + '...' : props.value}</div>
        {props.value && <div onClick={() => props.action()} className='border-b-2 font-medium text-primary-light cursor-pointer'>{props.actionText || 'Preview'}</div>}
      </div>}
    </div>
  )
}
