import React from 'react'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { BASE_URL } from '../../../../shared/constants'
import { useLocation } from 'react-router-dom'
import Spin from 'antd/es/spin'

export const LoansProcessed = (props: { items: any }) => {

    const location = useLocation();
    const processedData = useRequest(`${BASE_URL.LOAN}fetch/lender/loans/request/${location?.state?.lenderId}`, 'get',
        'get-lenders-processed-loans')

    // 
    const borderStyle = 'border-b border-b-black border-opacity-30 p-3'
    return (
        processedData && !processedData.isLoading && !processedData.isFetching ?
            <div className='border mt-5 border-black border-opacity-30 rounded-md'>
                <div className={`font-[600] ${borderStyle}`}>
                    No of Loans Processed
                </div>
                <div className={`flex ${borderStyle}`}>
                    <div className='w-6/12'>Active</div>
                    <span>{processedData?.data?.data?.active?.value || 0}</span>
                </div>

                <div className={`flex ${borderStyle}`}>
                    <div className='w-6/12'>Declined</div>
                    <span>{processedData?.data?.data?.declined?.value || 0}</span>
                </div>

                <div className={`flex ${borderStyle}`}>
                    <div className='w-6/12'>Settled</div>
                    <span>{processedData?.data?.data?.settled?.value || 0}</span>
                </div>

                <div className={`flex p-3`}>
                    <div className='w-6/12'>Pending</div>
                    <span>{processedData?.data?.data?.pending?.value || 0}</span>
                </div>
            </div>
            :

            <div className='py-40 my-auto text-center'>
                <span className="relative flex h-10 w-10 mx-auto">
                    <Spin size="large" />
                </span>
                Loading Data
            </div>
    )
}
