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
import { downloadLenderInfo } from '../../../../shared/services/lenders.services';

export const ExportMenu = (props: { walletDetails: any, filterValue:any, handleClose:Function }) => {
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [currentValue, setCurrentValue] = useState('csv')
    
    function download(url: any) {
        setLoading(false)

        let blob = new Blob([url], { type: currentValue === 'pdf' 
        ? 
        "application/pdf" : "octet/stream" });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Monicenta Lenders${currentValue === 'pdf' ? '.pdf' : 
        (currentValue === 'csv' ? '.csv' : '.xlsx')}`;
        link.click()
    }

    const handleExportWallet = () => {
        setLoading(true)
        downloadLenderInfo({
            ...props.filterValue,
            page:1,
            pageSize:30,
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
                    
                    <IconsCard setValue={setCurrentValue} type='csv' currentValue={currentValue} />
                    <IconsCard setValue={setCurrentValue} type='pdf' currentValue={currentValue} />
                    <IconsCard setValue={setCurrentValue} type='xlsx' currentValue={currentValue} />
                </div>
                <br />
                <div className='flex space-x-2 py-4 w-full'>
                    <div className='w-5/12'>
                        <FormButton shortHeight type='Outlined' label={'Cancel'} clickAction={() => props.handleClose()} isEnabled={true} />
                    </div>
                    <div className='w-5/12'>
                        <FormButton 
                            label={'Download'} 
                            clickAction={handleExportWallet} 
                            shortHeight 
                            isEnabled={true} 
                            loading ={loading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
