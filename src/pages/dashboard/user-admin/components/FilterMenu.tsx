import { DatePicker, DatePickerProps, Input, Select } from 'antd'
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { FormButton } from '../../../../components/buttons/FormButton'
import { filterTxnDetails } from '../../../../shared/services/wallet.service'
import { BsSearch } from 'react-icons/bs'

export const FilterMenu = (
    props: {
        walletDetails: any,
        handleFilterValue: Function,
        filterValue:any,
        setWalletHistory: Function,
        handleClose: Function
    }) => {
    const inputStyle = 'w-full h-12 text-[20px] rounded-lg border-2'
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [status, setStatus] = useState('')
    const [refNumber, setRefNo] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const walletIds = props.walletDetails?.walletInfos.map((info) => info.walletId)

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString);
        props.handleFilterValue('transactionStartDate',dateString)

    };
    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setToDate(dateString)
        props.handleFilterValue('transactionEndDate',dateString)
    };

    const handleExportWallet = () => {
        filterTxnDetails({
            "walletIds": walletIds,
            ...props.filterValue
            // "transactionStatus": status ? [status] : null,
            // "transactionStartDate": fromDate,
            // "transactionEndDate": toDate,
            // referenceNumber: refNumber,
            // narration: description
        }, filterCallback)
    }

    const filterCallback = (resp: any) => {
        props.setWalletHistory(resp?.data)
    }
    const handleSelectStatus=(data:any)=>{
        props.handleFilterValue('transactionStatus',[data])
    }
    return (
        <div className='w-[27rem] font-medium px-3'>
            <div className='flex justify-between'>
                <p className='text-[16px]'>Filter</p>
                <IoCloseCircleOutline onClick={() => props.handleClose()} className='text-[20px] my-auto' />
            </div>

            <div className='flex border rounded-lg py-1 pr-3 mt-6 border-darkGrey'>
                <Input type='text' className='border-0' placeholder='Search for a Name'/>
                <BsSearch className='my-auto text-xl'/>
            </div>

            <div className='flex space-x-6 justify-between py-2'>
                <div className='my-3'>
                    <label className='py-1'>Start Date</label>
                    <DatePicker className='w-full h-10 text-[20px] rounded-lg border' onChange={onChange} />
                </div>
                <div className='my-3'>
                    <label className='py-1'>End Date</label>
                    <DatePicker className='w-full h-10 text-[20px] rounded-lg border' onChange={onChangeTo} />
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
