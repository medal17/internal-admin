import { DatePicker, DatePickerProps, Input, InputNumber, Select, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { FormButton } from '../../../../components/buttons/FormButton'
import { filterTxnDetails } from '../../../../shared/services/wallet.service'
import CurrencyInput from 'react-currency-input-field'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { BASE_URL, LOAN_STATUS } from '../../../../shared/constants'
import { AuthPayload } from '../../../../shared/authPayload'

export const FilterMenu = (
    props: {
        handleFilterValue: Function,
        filterValue: any,
        handleFilter: Function,
        handleClose: Function
    }) => {
    const inputStyle = 'w-full h-12 text-[17px] rounded-lg border-2'
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [inputValue, setInputValue] = useState([10, 100])
    // fetch/loan/runtime/parameters
    const getPartners = useRequest(`${BASE_URL.LOAN}partner/fetch/all/1/100/0`, 'get',
        'get-partners' );
    
    const loanTypes = useRequest(`${BASE_URL.LOAN}fetch/loan/types/parameters`, 'get',
        'get-loan-types' );
        // ${ENDPOINTS.LOAN}fetch/loan/types/parameters
    
    // console.log(getPartners?.data?.data)

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString);
        props.handleFilterValue('transactionStartDate', dateString)

    };
    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setToDate(dateString)
        props.handleFilterValue('transactionEndDate', dateString)
    };

    const handleExportWallet = () => {
        // filterTxnDetails({
        //     ...props.filterValue
        // }, filterCallback)
    }

    useEffect(() => {
        // handleOnChange('minimumLoanAmount', inputValue[0]);
        // handleOnChange('maximumLoanAmount', inputValue[1]);


    }, [inputValue])

    const handleChange = (newValue: number[], type: string) => {
        setInputValue(newValue);
        props.handleFilterValue({...props.filterValue,'minimumLoanAmount': newValue[0],'maximumLoanAmount': newValue[1] })
    };

    const handleInputValue = (amount: number) => { console.log(amount) }
    console.log(inputValue)

    const handleSelectStatus = (data: any) => {
        props.handleFilterValue('transactionStatus', [data])
    }

    const handleOnChange = (key: string, value: string | number) => {
        props.handleFilterValue({ ...props.filterValue, [key]: value })
    }

    const handleSubmitFilter = () => {
        handleOnChange('maximumLoanAmount', inputValue[1]);
        // handleOnChange('minimumLoanAmount', inputValue[0]);
        props.handleFilter()
    }


    return (
        <div className='w-[27rem] font-semibold px-1'>
            <div className='flex justify-between'>
                <p className='text-[19px]'>Filter</p>
                <IoCloseCircleOutline onClick={() => props.handleClose()} className='text-[20px] my-auto' />
            </div>

            <div className='max-h-[60vh] overflow-y-scroll space-y-3 px-1'>
                <div className='flex space-x-6 justify-between'>
                    <div className='my-3'>
                        <label className='py-1'>Start Date</label>
                        <DatePicker
                            className='w-full h-12 text-[20px] rounded-lg border-2'
                            onChange={(date, dateString) => handleOnChange('startDate', dateString||null)}
                        />
                    </div>
                    <div className='my-3'>
                        <label className='py-1'>End Date</label>
                        <DatePicker
                            className='w-full h-12 text-[20px] rounded-lg border-2'
                            onChange={(date, dateString) => handleOnChange('endDate', dateString||null)}
                        />
                    </div>
                </div>

                <div className='my-2'>
                    <label className='py-1'>Provider</label>
                    <Select placeholder='Select Provider'
                        onChange={(text: string) => handleOnChange('provider', text)}
                        onDeselect={null}
                        allowClear
                        className={`${inputStyle} border-darkGrey border-opacity-20`}
                        options={
                            getPartners?.data?.data?.contents?.map((item:any)=>
                            Object.assign({value:item?.partnerName, label:item?.partnerName}))||[]
                        //     [
                        //     // { value: 'Pending', label: 'Pending' },
                        //     { value: 'Pending', label: 'Pending' },
                        //     { value: 'Successful', label: 'Successful' },
                        // ]
                    }
                    />
                </div>

                <div className='my-2'>
                    <label className='py-1'>Loan Type</label>
                    <Select placeholder='Select Loan Type'
                        onChange={(text: string) => handleOnChange('loanType', text)}
                        onDeselect={null}
                        allowClear
                        className={`${inputStyle} border-darkGrey border-opacity-20`}
                        options={
                            loanTypes?.data?.data?.map((item:any)=>
                            Object({value:item?.loanType, label:item?.shortName}||{}))||[]
                            // [
                            // { value: 'Pending', label: 'Pending' },
                            // { value: 'Active', label: 'Active' },
                            // { value: 'Pending', label: 'Pending' },
                            // { value: 'Declined', label: 'Declined' },
                            // { value: 'Settled', label: 'Settled' },
                            // { value: 'Successful', label: 'Successful' },
                        // ]
                    }
                    />
                </div>

                <div className='my-2'>
                    <label className='py-1'>Status</label>
                    <Select placeholder='Select Status'
                        onChange={(text: string) => handleOnChange('loanStatus', text)}
                        onDeselect={null}
                        allowClear
                        className={`${inputStyle} border-darkGrey border-opacity-20`}
                        options={
                            LOAN_STATUS.map(item=>Object.assign({value:item,label:item}||{}))
                            }
                    />
                </div>


                <div className='mb-3 w-11/12'>
                    <label>Loan Amount:</label>
                    <Slider
                        range
                        value={[inputValue[0], inputValue[1]]}
                        defaultValue={[inputValue[0], inputValue[1]]}
                        onChange={(value: any) => handleChange(value, '')}
                        max={20000000}
                        className='h-full'
                        railStyle={{ height: '8px', borderRadius: '10px' }}
                    // handleStyle={{}}
                    />
                    <div className='flex space-x-6 justify-between mt-6'>
                        <div className=''>
                            <label className='py-1 w-full'>From</label>
                            <div className='px-1 flex'>
                               <div className='my-auto relative text-[18px] text-darkGrey  -right-2'>₦</div> 

                                <CurrencyInput
                                    id="input-example"
                                    name="input-name"
                                    placeholder="Please enter a number"
                                    defaultValue={'undefined'}
                                    // prefix='₦'
                                    value={inputValue[0]||0}
                                    className={`${inputStyle} pl-6 font-poppins -ml-3.5 bg-white px-1 font-normal border-darkGrey border-opacity-20`}
                                    decimalsLimit={2}
                                    onValueChange={(value, name, values) => handleChange([Number(value), inputValue[1]], 'min')}
                                />

                            </div>
                        </div>
                        <div className=''>
                            <label className='py-1'>To</label>
                            <div className='px-1 flex'>
                               <div className='my-auto relative text-[18px] text-darkGrey  -right-2'>₦</div> 

                                <CurrencyInput
                                    id="input-example"
                                    name="input-name"
                                    placeholder="Please enter a number"
                                    defaultValue={0}
                                    value={inputValue[1]||0}
                                    
                                    className={`${inputStyle} pl-6 font-poppins -ml-3.5 bg-white px-1 font-normal border-darkGrey border-opacity-20`}
                                    decimalsLimit={2}
                                    onValueChange={(value, name, values) => handleChange([inputValue[0],Number(value) ], 'max')}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div className='my-2'>
                    <label className='py-1'>Tenor</label>
                    <Select placeholder='Select Tenor'
                        onChange={handleSelectStatus}
                        onDeselect={null}
                        allowClear
                        className={`${inputStyle} border-darkGrey border-opacity-20`}
                        options={[
                            // { value: 'Pending', label: 'Pending' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Successful', label: 'Successful' },
                        ]}
                    />
                </div> */}



            </div>
            <div className='flex space-x-2 py-4 w-full'>
                <div className='w-5/12'>
                    <FormButton shortHeight type='Outlined' label={'Cancel'} clickAction={() => props.handleClose()} isEnabled={true} />
                </div>
                <div className='w-5/12'>
                    <FormButton label={'Apply'} clickAction={handleSubmitFilter} shortHeight isEnabled={true} />
                </div>
            </div>
        </div>
    )
}
