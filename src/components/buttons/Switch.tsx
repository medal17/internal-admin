import React, { useState } from 'react'

interface switchProps {
    label:string,
    setValue: Function,
    value:boolean
}

export const Switch = (props:switchProps) => {
    const {label, setValue} = props
    const [picked, setPicked] = useState(false)
    const handleClick =()=>{
        setPicked(!picked)
        setValue(picked)
    }
    return (
        <div onClick={handleClick} className='flex font-normal text-[0.75rem] font-poppins align-middle cursor-pointer'>
            <div className={`w-[40px] h-[20px] border border-[#e5e5e5] p-[0.1px] mr-3 flex ${picked?'justify-end bg-successGreen':'bg-[#f2f2f2]'} rounded-full`}>
                <div className='h-[19px] w-[19px] rounded-full bg-white shadow-sm'></div>
            </div>
            {label}
        </div>
    )
}
