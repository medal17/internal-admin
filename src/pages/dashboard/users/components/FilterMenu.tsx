import { DatePicker, DatePickerProps, Input, Select } from 'antd'
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { FormButton } from '../../../../components/buttons/FormButton'
import { filterTxnDetails } from '../../../../shared/services/wallet.service'

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

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString);
        props.handleFilterValue({...props.filterValue,'startDate':dateString||null})

    };
    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setToDate(dateString)
        props.handleFilterValue({...props.filterValue,'endDate':dateString||null})
    };

    const handleFilter = () => {
        // filterTxnDetails({
        //     ...props.filterValue
        // }, filterCallback)
    // console.log('f-value',props.filterValue)

        props.handleFilter()
    }

    // console.log(props.filterValue)
    const filterCallback = (resp: any) => {
        // props.setWalletHistory(resp?.data)
    }
    const handleSelectStatus=(data:any)=>{
        props.handleFilterValue({...props.filterValue,'status':data})
    }
    return (
        <div className='w-[27rem] font-semibold px-3 font-primary'>
            <div className='flex justify-between'>
                <p className='text-[19px]'>Filter</p>
                <IoCloseCircleOutline onClick={() => props.handleClose()} className='text-[20px] my-auto' />
            </div>

            <div className='my-2'>
                <label className='py-1'>Status</label>
                <Select placeholder='Select Status'
                    onChange={handleSelectStatus}
                    onDeselect={null}
                    allowClear
                    className={`${inputStyle} text-primary border-darkGrey border-opacity-20`}
                    options={[
                        // { value: 'Pending', label: 'Pending' },
                        { value: false, label: 'InActive' },
                        { value: true, label: 'Active' },
                        // { value: 'Declined', label: 'Declined' },
                        // { value: 'Settled', label: 'Settled' },
                    ]}
                />
            </div>
            <div className='flex space-x-6 justify-between'>
                <div className='my-3'>
                    <label className='py-1'>Start Date</label>
                    <DatePicker className='w-full h-12 text-[20px] rounded-lg border-2' onChange={onChange} />
                </div>
                <div className='my-3'>
                    <label className='py-1'>End Date</label>
                    <DatePicker className='w-full h-12 text-[20px] rounded-lg border-2' onChange={onChangeTo} />
                </div>
            </div>


            <div className='flex space-x-2 py-4 w-full'>
                <div className='w-5/12'>
                    <FormButton shortHeight type='Outlined' label={'Cancel'} clickAction={() => props.handleClose()} isEnabled={true} />
                </div>
                <div className='w-5/12'>
                    <FormButton label={'Apply'} clickAction={handleFilter} shortHeight isEnabled={true} />
                </div>
            </div>
        </div>
    )
}
