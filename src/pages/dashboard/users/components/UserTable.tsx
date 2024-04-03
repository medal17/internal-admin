import React, { useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { CustomModal } from '../../../../components/modal'
import { MoreDetails } from './MoreDetails'

export const UserTable = (props:{data:any}) => {
    const [openModal, setOpenModal] = useState(false);
    const [picked, setPicked] = useState('')

    const handlePick=(id:string)=>{
        setPicked(id);
        setOpenModal(true)
    }
    return (
        <div>
            <div onClick={()=>null} className='w-full'>
                {/* <div className=''> */}
                    <div className='flex w-full border-b px-6 font-[400] py-3 text-darkGrey'>
                        <div className='w-6/12'>Providers</div>
                        <div className='w-3/12'>Loan type</div>
                        <div className='w-2/12'>Loan amount</div>
                        <div className='w-1/12'></div>
                    </div>
                {/* </div> */}
                    {props.data&&props.data.map((item:any)=>
                    <div className='flex border-b border-b-darkGrey px-6 py-3 font-[400]'>
                        <div className='w-6/12'>{item?.provider}</div>
                        <div className='w-3/12'>{item?.loanType}</div>
                        <div className='w-2/12'>{item?.loanAmount}</div>
                        <div className='w-0.5/12 ml-auto '>
                            <BsEyeFill 
                                onClick={()=>handlePick(item?.loanId)}
                                className='text-xl cursor-pointer text-primary-darkest'
                            />
                        </div>
                    </div>)}
            </div>

            <CustomModal 
                status={openModal} 
                bgColor={''} 
                component={<MoreDetails data={picked}/>} 
                toggle={()=>setOpenModal(false)}
                size='80vw'
                width='900px'
            />
        </div>
    )
}
