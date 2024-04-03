import { DatePicker, DatePickerProps, Input, Select } from 'antd'
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { FormButton } from '../../../../components/buttons/FormButton'
import { filterTxnDetails } from '../../../../shared/services/wallet.service'
import { LOAN_STATUS } from '../../../../shared/constants'

export const FilterMenu = (
    props: {
        handleFilterValue: Function,
        filterValue:any,
        handleFilter:Function,
        handleClose: Function
    }) => {
    const inputStyle = 'w-full h-12 text-[20px] rounded-lg border-2'
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [status, setStatus] = useState('')
    const [refNumber, setRefNo] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString);
        props.handleFilterValue({...props.filterValue,'startDate':dateString||null})

    };
    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setToDate(dateString)
        props.handleFilterValue({...props.filterValue,'endDate':dateString||null})
    };

    const handleExportWallet = () => {
        // filterTxnDetails({
        //     ...props.filterValue
        //     // "transactionStatus": status ? [status] : null,
        //     // "transactionStartDate": fromDate,
        //     // "transactionEndDate": toDate,
        //     // referenceNumber: refNumber,
        //     // narration: description
        // }, filterCallback)
        props.handleFilter()
    }

    const filterCallback = (resp: any) => {
        // props.setWalletHistory(resp?.data)
    }
    const handleSelectStatus=(data:any)=>{
        props.handleFilterValue('transactionStatus',[data])
    }

    const handleChangeValue=(key:string,value:string)=>{
        props.handleFilterValue({...props.filterValue, [key]:value})
    }

    console.log(props.filterValue)
    return (
        <div className='w-[25rem] font-semibold px-3'>
            <div className='flex justify-between'>
                <p className='text-[18px]'>Filter</p>
                <IoCloseCircleOutline onClick={() => props.handleClose()} className='text-[20px] my-auto' />
            </div>

            

            <div className='my-2'>
                <label className='py-1'>Status</label>
                <Select placeholder='Select Status'
                    onChange={(value)=>handleChangeValue('loanStatus',value)}
                    onDeselect={null}
                    allowClear
                    className={`${inputStyle} border-darkGrey border-opacity-20 h-10`}
                    options={LOAN_STATUS.map((item)=>Object.assign({value:item, label:item}))
                       }
                />
            </div>
            <div className='flex space-x-6 justify-between'>
                <div className='my-3'>
                    <label className='py-1'>Start Date</label>
                    <DatePicker className='w-full h-10 text-[20px] rounded-lg border-2' onChange={onChange} />
                </div>
                <div className='my-3'>
                    <label className='py-1'>End Date</label>
                    <DatePicker className='w-full h-10 text-[20px] rounded-lg border-2' onChange={onChangeTo} />
                </div>
            </div>
         

            <div className='flex space-x-2 py-4 w-full'>
                <div className='w-5/12'>
                    <FormButton shortHeight type='Outlined' label={'Cancel'} clickAction={() => props.handleClose()} isEnabled={true} />
                </div>
                <div className='w-5/12'>
                    <FormButton label={'Apply'} clickAction={handleExportWallet} shortHeight isEnabled={true} />
                </div>
            </div>
        </div>
    )
}
