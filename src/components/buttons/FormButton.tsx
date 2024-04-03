import React from 'react'

interface formButtonModel {
    label:string,
    clickAction:Function,
    type?: string,
    isEnabled:boolean,
    loading?:boolean,
    shortHeight?:boolean,
    lightBorder?:boolean
}
export const FormButton = (props:formButtonModel) => {
    const outlineStyle=`border-2 border-primary-light text-primary-light ${ props.shortHeight?'py-2':'py-4' } cursor-pointer font-poppins font-medium text-center rounded-md`;
    
    // const []

    const handleClickAction=()=> {
      if(props.isEnabled && !props.loading){
        props.clickAction()
      }
    }
  return (
    <div onClick={handleClickAction} className={props.type?outlineStyle:`border-primary-light
     ${!props.isEnabled&&'opacity-25'} ${props.lightBorder&&'border border-darkGrey bg-opacity-10 text-primary-light bg-transparent'}  ${props.isEnabled&&!props.loading&&'hover:scale-95 transition ease-in-out delay-150'}  
     ${ props.shortHeight?'py-2.5':'py-4' }
     ${props.loading||props.lightBorder?'text-primary-light bg-opacity-50':'text-white '}bg-primary-light cursor-pointer font-poppins font-medium text-center rounded-md`}>
        {props.loading ?'Processing': props.label}
    </div>
  )
}

export const ModalButton = (props:formButtonModel) => {
  let outlineStyle=`border-[1px] border-darkGrey text-primary-light ${ props.shortHeight?'py-2':'py-4' } 
  cursor-pointer font-poppins font-medium text=[12px] text-center rounded-md`;
  
  // const []

  const handleClickAction=()=> {
    if(props.isEnabled && !props.loading){
      props.clickAction()
    }
  }
return (
  <div onClick={handleClickAction} className={props.type?outlineStyle:`border-1  border-darkGrey
   ${!props.isEnabled&&'opacity-25'}  ${props.isEnabled&&!props.loading&&'hover:scale-95 transition ease-in-out delay-150'}  
   ${ props.shortHeight?'py-2':'py-4' }
   ${props.loading?'text-primary-light bg-opacity-50':'text-white '}bg-primary-light cursor-pointer font-poppins font-medium text-center rounded-md`}>
      {props.loading ?'Processing': props.label}
  </div>
)
}
