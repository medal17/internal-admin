import React, { useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { CustomModal } from '../../../../components/modal'
import { MoreDetails } from './MoreDetails'
import { currencyFormat } from '../../../../shared/currencyFormat'

export const UserTable = (props:{data:any}) => {
    const [openModal, setOpenModal] = useState(false)
    const [picked, setPicked] = useState<any>()

    const handleViewDetails =(data:any)=>{
        setPicked(data);
        setOpenModal(true)
    }
    return (
        <div>
            <div onClick={()=>null} className='w-full'>
                {/* <div className=''> */}
                    <div className='flex w-full text-darkGrey align-middle border-b px-6 font-[400] py-1'>
                        <div className='w-4/12 my-auto'>Loan type</div>
                        <div className='w-2/12 my-auto'>Interest Rate</div>
                        <div className='w-2/12 my-auto'>Tenor</div>
                        <div className='w-3/12 my-auto'>Repayment Method</div>
                        <div className='w-1/12 my-auto'>Action</div>
                    </div>
                {/* </div> */}
                {props?.data&& props.data.map((item:any)=>
                    <div className='flex border-b border-b-darkGrey px-6 py-3 font-[400]'>
                        <div className='w-4/12'>{item?.loanType}</div>
                        <div className='w-2/12 px-1.5'>{item?.interestRate+'%'}</div>
                        <div className='w-2/12'>{item?.maximumDuration+ ' '+item?.tenureType}</div>
                        <div className='w-3/12'>{currencyFormat(item?.maximumAmount)}</div>
                        <div className='w-1/12 ml-auto '>
                            <BsEyeFill 
                                onClick={()=>handleViewDetails(item)}
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
                size='30vw'
                width='900px'
            />
        </div>
    )
}
