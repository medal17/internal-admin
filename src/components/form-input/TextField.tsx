import React, { useEffect, useState } from 'react'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import { isValidPassword } from '../../shared/helpers'
import moment from 'moment'
import { noSymbolCurrecncy } from '../../shared/currencyFormat'

interface textFieldModel {
  label: string,
  type: string,
  placeholder?: string
  setValue: Function,
  isNin?: boolean,
  isPasswordCheck?: boolean,
  enable?: boolean,
  defaultValue?: string,
  isShort?: boolean,
  name?: string,
  value?: string | number,
  controlled?: boolean,
  maxLength?: number,
  maxValue?: number,
  pattern?:string,
  step?:string
}


// useEffect(()=>{
//   setIsValidEmail(isValidEmailAddress(username))
// },[username])

export const TextField = (props: textFieldModel) => {
  const { controlled } = props
  const [checked, setChecked] = useState(false);


  return props.type !== 'checkbox' ? (
    <div className='flex flex-col space-y-1 my-3'>
      <label className='lg:text-sm text-xs font-medium text-primary-light'>{props.label}</label>
      <input name={props.name} type={props.type} required value={props.value}
        placeholder={props.placeholder} step={props.step}
        disabled={props.enable} maxLength={props.isNin ? 14 : (props.maxLength ? props.maxLength : 100)}
        onChange={(text) => !controlled ? props.setValue(text.target.value) : props.setValue(text.target.value, props.name)}
        defaultValue={props.defaultValue !== '' ? props.defaultValue : ''}
        className='md:h-11 h-11 border border-darkGrey 
          border-opacity-70 md:text-sm text-sm border-gray-300 px-3 
        bg-white rounded-md '
      />
    </div>
  ) : <div className='flex space-y-1 mb-1 align-middle space-x-3'>
    <input type={props.type} onClick={() => {setChecked(!checked); controlled? props.setValue(checked, props.name): props.setValue(checked) }} placeholder={props.placeholder} id={props.label}
      className={`${props.isShort ? 'w-4' : 'w-5'} 
      bg-white  border border-darkGrey accent-primary-light 
      px-3 rounded-xl`} 
    />
    <label htmlFor={props.label} className={` ${props.isShort ? 'font-normal lg:text-[sm text-xs' : 'font-medium lg:text-sm text-xs'}  font-poppins cursor-pointer`}>{props.label}</label>

  </div>
}

export const CurrencyField = (props: textFieldModel) => {
  const [inputText, setInput] = useState('')
  const handleCurrency = (input: any) => {
    const result = input.value.replace(/\D/g, '');
    setInput(noSymbolCurrecncy(Number(result)));
    props.controlled?props.setValue(result, props.name): props.setValue(result);
  }

  return (
    <div className='flex flex-col space-y-1 my-3'>
      <label className='lg:text-sm text-xs font-semibold'>{props.label}</label>
      <input name={props.name} type={'text'} required
        placeholder={props.placeholder}
        disabled={props.enable} maxLength={props.maxLength}
        onChange={(text) => !props.controlled ? handleCurrency(text.target) : handleCurrency(text.target)}
        // defaultValue={props.defaultValue!==''?props.defaultValue:''}
        value={inputText}
        className='md:h-11 h-10 border bg-white md:text-base text-sm border-darkGrey px-3 rounded-md '
      />
    </div>
  )
}

export const NumberField = (props: textFieldModel) => {
  const [inputText, setInput] = useState(props.defaultValue||'')
  const handleCurrency = (input: any) => {
    const result = input.value.replace(/[\D\s]/g, '');
    props.maxValue&&setInput(input && (props.maxValue?Number(input.value) <= props.maxValue ? result : props.maxValue:Number(result)));
    setInput(input && (props.maxLength?result?.length <= props.maxLength ? result :result.substring(0, props.maxLength):result));
    // props.setValue(result);
    props.controlled?props.setValue(result, props.name): props.setValue(result);

  }

  return (
    <div className='flex flex-col space-y-1 my-3 w-full'>
      <label className='lg:text-sm text-xs font-semibold'>{props.label}</label>
      <input name={props.name} 
        placeholder={props.placeholder} type="text" pattern="[0-9]*" inputMode="numeric"
        disabled={props.enable} maxLength={props.maxLength} required
        onChange={(text) => !props.controlled ? handleCurrency(text.target) : handleCurrency(text.target)}
        // defaultValue={props.defaultValue!==''?props.defaultValue:''}
        value={inputText}
        className='md:h-11 h-10 border md:text-base bg-transparent text-sm border-darkGrey px-3 rounded-md '
      />
    </div>
  )
}


export const DateField = (props: textFieldModel) => {
  let date = moment(new Date()).subtract(18, 'years').format('yyy-MM-DD');
// console.log(moment(new Date()).subtract(18, 'years').format('yyy-MM-DD'))
  return (
    <div className='flex flex-col space-y-1 my-3'>
      <label className='text-sm font-semibold'>{props.label}</label>
      <input disabled={props.enable} type={props.type} placeholder={props.placeholder}
      max={date}
        onChange={(text) => !props.controlled ? props.setValue(text.target.value) : 
          props.setValue(text.target.value, props.name)} 
          defaultValue={props.defaultValue !== '' ?
          props.defaultValue : ''}
        className='md:h-11 h-[42px] bg-transparent border md:text-base text-sm border-darkGrey px-3 rounded-md mt-1.5' />
    </div>
  )
}

export const PasswordField = (props: textFieldModel) => {
  const [show, setShow] = useState<boolean>(false);
  const [password, setPassword] = useState('')

  return (
    <div className={`flex flex-col space-y-1 my-3`}>
      <label className='text-sm font-primary'>{props.label}</label>
      <div className='flex'>
        <input type={show ? 'text' : props.type} placeholder={props.placeholder}
          onChange={(text) => { props.setValue(text.target.value); setPassword(text.target.value) }}
          className={`md:h-11 h-10 border bg-transparent ${props.isPasswordCheck && password && 
            !isValidPassword(password) ? 'border-2 border-lightRed text-lightRed' :
            'border-darkGrey'} px-3 rounded-md w-full pr-101 md:text-sm text-sm font-[400]`} />
        {show ? <BsEye className='my-auto -ml-8 text-xl opacity-60 cursor-pointer' onClick={() => setShow(false)} />
          :
          <BsEyeSlash className='my-auto -ml-8 text-xl opacity-60 cursor-pointer' onClick={() => setShow(true)} />}
      </div>
      <div className='text-xs text-lightRed font-medium'>{props.isPasswordCheck && password && !isValidPassword(password) && 'Password must be atleast 8 charecter with Uppercase, number and symbol'}</div>
    </div>
  )
}

export const PinField = (props: textFieldModel) => {
  const [show, setShow] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const handleChange = (event: string) => {
    const result = event.replace(/\D/g, '');
    props.setValue(result);
    setPassword(result)
  };

  return (
    <div className={`flex flex-col space-y-1 my-3`}>
      <label className='text-sm font-medium'>{props.label}</label>
      <div className='flex'>
        <input type={show ? 'text' : props.type}  maxLength={4} placeholder={props.placeholder} required
          onChange={(text) => handleChange(text.target.value)} value={password}
          className={`md:h-11 h-10 bg-transparent border border-1 border-darkGrey px-3 rounded-md w-full  md:text-sm text-sm`} />
        {show ? <BsEye className='my-auto -ml-8 text-xl opacity-60 cursor-pointer' onClick={() => setShow(false)} />
          :
          <BsEyeSlash className='my-auto -ml-8 text-xl opacity-60 cursor-pointer' onClick={() => setShow(true)} />}
      </div>
    </div>
  )
}


export const PhoneNumberField = (props: textFieldModel) => {
  const [phoneNumber, setPhoneNumber] = useState(props.defaultValue || '')
  // props.reset&&setPhoneNumber('');

  const handleChange = (event: string) => {
    const result = event.replace(/\D/g, '');
    props.controlled ? props.setValue(result, props.name) : props.setValue(result);
    setPhoneNumber(result)
  };
  return (
    <div className='flex flex-col space-y-1 my-3'>
      <label className='text-sm font-semibold'>{props.label}</label>
      <div className='flex align-middle justify-items-stretch md:h-11 h-10 border border-darkGrey px-3 rounded-md '>
        <span className='my-auto font-poppins opacity-40 border-r pr-2 mr-2 text-sm'>+234</span>
        <input maxLength={10} type={props.type} bg-transparent placeholder={props.placeholder} required
          onChange={(text) => handleChange(text.target.value)} defaultValue={props.defaultValue !== '' ? props.defaultValue : ''}
          className='w-full bg-white border-0 outline-none md:text-xs text-sm' />
      </div>

    </div>
  )
}

export const TextOnlyField = (props: textFieldModel) => {
  const [string, setString] = useState(props.defaultValue || '')
  // props.reset&&setPhoneNumber('');

  const handleChange = (event: string) => {
    const result = event.replace(/[^a-zA-Z0-9 ]/g, '');
    props.controlled ? props.setValue(result, props.name) : props.setValue(result);
    setString(result)
  };
  return (
    <div className='flex flex-col space-y-1 my-3'>
      <label className='text-sm font-semibold'>{props.label}</label>
      <div className='flex align-middle justify-items-stretch bg-transparent md:h-11 h-10 border border-darkGrey px-3 rounded-md '>
        <input  type={props.type} placeholder={props.placeholder} required
          onChange={(text) => handleChange(text.target.value)} defaultValue={props.defaultValue !== '' ? props.defaultValue : ''}
          className='w-full border-0 outline-none md:text-base text-sm' />
      </div>

    </div>
  )
}


