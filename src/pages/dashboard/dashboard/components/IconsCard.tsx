import React from 'react'
import { BiCheck } from 'react-icons/bi'
import { PdfcIcon } from '../../../../assets/icons/PdfcIcon'
import { CsvIcon } from '../../../../assets/icons/CsvIcon'

const activeStyle = 'w-[100px] h-[100px] cursor-pointer border-2 rounded-md flex align-middle border-2  justify-center  border-[#2F80ED]'
const inactiveStyle = 'w-[100px] h-[100px] cursor-pointer border-2 rounded-md flex align-middle justify-center border-opacity-25 border-darkGrey'

export const IconsCard = (props: { setValue: Function, currentValue: string, type: string }) => {
    const { currentValue, type } = props
    return (
        <div className='mt-3'>
            {type===currentValue&&
            <div className='bg-successGreen w-fit h-fit ml-auto -mb-5 mr-5 text-white rounded-full'>
                <BiCheck className='text-[16px] ml-auto' />
            </div>}
            <div onClick={() => props.setValue(type)} className={`${currentValue===type ? activeStyle : inactiveStyle} mx-3`}>
                <div className='my-auto'>
                    {type === 'pdf' ?
                        <PdfcIcon /> : 
                    (type==='csv'?
                    <CsvIcon />:
                    (type==='xlsx'&&<CsvIcon/>))}
                </div>
            </div>

        </div>
    )
}
