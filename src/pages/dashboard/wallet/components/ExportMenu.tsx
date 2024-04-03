import { DatePicker, DatePickerProps } from 'antd'
import React, { useState } from 'react'
import { IoCloseCircle, IoCloseCircleOutline } from 'react-icons/io5'
import { FormButton } from '../../../../components/buttons/FormButton';
import { CsvIcon } from '../../../../assets/icons/CsvIcon';
import { PdfcIcon } from '../../../../assets/icons/PdfcIcon';
import { exportTxnDetails } from '../../../../shared/services/wallet.service';
import { activeInputStyle } from '../../../../shared/constants/tailwindStyle';
import { BiCheck } from 'react-icons/bi';
import { IconsCard } from './IconsCard';
import moment from 'moment';

export const ExportMenu = (props: { walletDetails: any, filterValue:any, handleClose:Function }) => {
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [status, setStatus] = useState('')
    const [currentValue, setCurrentValue] = useState('csv')
    const walletIds = props.walletDetails?.walletInfos.map((info) => info.walletId)

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setFromDate(dateString)
    };
    const onChangeTo: DatePickerProps['onChange'] = (date, dateString) => {
        setToDate(dateString)
    };




    function download(url: any) {
        let blob = new Blob([url], { type: currentValue === 'pdf' ? "application/pdf" : "octet/stream" });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Moniecenta wallet history${currentValue === 'pdf' ? '.pdf' : 
        (currentValue === 'csv' ? '.csv' : '.xlsx')}`;
        link.click()
    }

    const handleExportWallet = () => {
        exportTxnDetails({
            "walletIds": walletIds,
            // "transactionStatus": status?[status]:null,
            ...props.filterValue,
            "transactionStartDate": props.filterValue?.transactionStartDate|| '2000-10-12',
            "transactionEndDate": props.filterValue?.transactionEndDate||moment(new Date()).format('YYYY-MM-DD'),
            "exportFormat": currentValue === 'pdf' ? 'Pdf' : 
            (currentValue === 'csv' ? "Csv" : 'Excel'),
        }, download)
    }
    return (
        <div className='w-[24rem] font-[600] text-[#344054]'>
            <div className='flex justify-between'>
                <p className='text-[19px]'>Export</p>
                <IoCloseCircleOutline onClick={()=>props.handleClose()} className='text-[20px] my-auto' />
            </div>
{/* 
            <div className='my-3'>
                <label>Start Date</label>
                <DatePicker className='w-full h-12 text-[20px] rounded-md border-2' onChange={onChange} />
            </div>

            <div className='my-4'>
                <label>End Date</label>
                <DatePicker className='w-full h-12 text-[20px] rounded-md border-2' onChange={onChangeTo} />
            </div> */}

            <div className='mt-3'>
                <p>Format:</p>
                <div className='flex'>
                    {/* <div onClick={() => setIsPdf(false)} className={!isPdf?activeStyle: inactiveStyle}>
                        <div className='my-auto'>
                            <CsvIcon />
                        </div>
                    </div> */}
                    <IconsCard setValue={setCurrentValue} type='csv' currentValue={currentValue} />
                    <IconsCard setValue={setCurrentValue} type='pdf' currentValue={currentValue} />
                    <IconsCard setValue={setCurrentValue} type='xlsx' currentValue={currentValue} />
                    {/* <div onClick={() => setIsPdf(true)} className={`${isPdf?activeStyle:inactiveStyle} mx-3`}>
                        <div className='bg-successGreen w-full h-fit text-white rounded-full'>
                            <BiCheck className='text-[16px] ml-auto'/>
                        </div>
                        <div className='my-auto'>
                            <PdfcIcon />
                        </div>
                    </div> */}
                </div>
                <br />
                <div className='flex space-x-2 py-4 w-full'>
                    <div className='w-5/12'>
                        <FormButton shortHeight type='Outlined' label={'Cancel'} clickAction={() => props.handleClose()} isEnabled={true} />
                    </div>
                    <div className='w-5/12'>
                        <FormButton label={'Download'} clickAction={handleExportWallet} shortHeight isEnabled={true} />
                    </div>
                </div>
            </div>
        </div>
    )
}
