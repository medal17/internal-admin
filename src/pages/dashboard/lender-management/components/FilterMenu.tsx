import { DatePicker, DatePickerProps, Input, InputNumber, Select } from 'antd'
import React, { useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { FormButton } from '../../../../components/buttons/FormButton'
import { filterTxnDetails } from '../../../../shared/services/wallet.service'
import { TextField } from '../../../../components/form-input/TextField'
import { Slider, Switch } from 'antd';
import CurrencyInput from 'react-currency-input-field'

export const FilterMenu = (
    props: {
        walletDetails: any,
        handleFilterValue: Function,
        filterValue: any,
        setWalletHistory: Function,
        handleClose: Function
    }) => {
    const inputStyle = 'w-full h-11 text-[18px] rounded-lg border-2'
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [inputValue, setInputValue] = useState([20, 60]);

    const walletIds = props.walletDetails?.walletInfos.map((info) => info.walletId)

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString);
        props.handleFilterValue('transactionStartDate', dateString)

    };
    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setToDate(dateString)
        props.handleFilterValue('transactionEndDate', dateString)
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
    const handleSelectStatus = (data: any) => {
        props.handleFilterValue('transactionStatus', [data])
    }
    // console.log(inputValue)

    const handleChange = (newValue: number[]) => {
        setInputValue(newValue);
    };
    return (
        <div className='w-[27rem] font-semibold px-3 text-poppins'>
            <div className='flex justify-between'>
                <p className='text-[19px]'>Filter</p>
                <IoCloseCircleOutline onClick={() => props.handleClose()} className='text-[20px] my-auto' />
            </div>

            <div className='my-2'>
                <label className=' text-[16px]'>Company Type</label>
                <Select placeholder='Select Company Type'
                    onChange={handleSelectStatus}
                    onDeselect={null}
                    allowClear
                    className={`${inputStyle} border-darkGrey border-opacity-20`}
                    options={[
                        // { value: 'Pending', label: 'Pending' },
                        // { value: 'Pending', label: 'Pending' },
                        // { value: 'Successful', label: 'Successful' },
                    ]}
                />
            </div>



            <div className='mb-3'>
                <label>Number of active loans:</label>
                <Slider
                    range
                    value={[inputValue[0], inputValue[1]]}
                    defaultValue={[inputValue[0], inputValue[1]]}
                    onChange={handleChange}
                    max={2000}
                    className='h-full'
                    railStyle={{ height: '8px', borderRadius: '10px' }}
                // handleStyle={{}}
                />
                <div className='flex space-x-6 justify-between'>
                    <div className=''>
                        <label className='py-1 w-full'>From</label>
                        <div>
                            <InputNumber
                                min={1}
                                max={20}
                                style={{ width: '100%' }}
                                className={`${inputStyle} text-[12px] border-darkGrey border-opacity-20`}
                                value={inputValue[0]}
                                onChange={(value: number) => handleChange([inputValue[0], value])}

                            />
                            {/* <InputNumber
                                min={1}
                                // max={20}
                                color='#000'
                                className={`${inputStyle} font-poppins border-darkGrey border-opacity-20`}
                                value={inputValue[0]}
                                onChange={(value: number) => handleChange([value, inputValue[1]])}
                            /> */}
                        </div>
                    </div>
                    <div className=''>
                        <label className='py-1'>To</label>
                        <div>
                            <InputNumber
                                min={1}
                                max={20}
                                style={{ width: '100%' }}
                                className={`${inputStyle} text-[12px] border-darkGrey border-opacity-20`}
                                value={inputValue[1]}
                                onChange={(value: number) => handleChange([inputValue[0], value])}

                            />
                        </div>

                    </div>
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
