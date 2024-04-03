import React from 'react'
import moment from 'moment';
import { decimalCurrency, noSymbolCurrecncy } from '../../shared/currencyFormat';
import { TablePagination } from './Pagination';
import { walletHistoryResponse } from '../../shared/models/wallet.model';
import './style.css'
import { truncateText } from '../../core/functions/inputValidator';
import { Spin } from 'antd';
import { MdHourglassEmpty } from 'react-icons/md';

export interface tableModel {
    headings: string[],
    tableData: any[],
    keys: string[],
    actionTitle?: string,
    coverageAction?: Function,
    actionElement: JSX.Element,
    actionButtonAction: Function,
    paginatedData: walletHistoryResponse | undefined
    setPayloadData: Function,
    getHistory: Function,
    payloadData: any,
    isLoading?: boolean
}

export const WalletTable = (props: tableModel) => {
    const { paginatedData } = props
    const headerRowStyle = 'bg-[#F9FAFB] text-xs font-medium text-opacity-10 border-b border-b-black border-opacity-10 ';
    const bodyRowStyle = 'h-16 text-[14px] text-[#344054] font-[400] border-b border-opacity-20 border-b-darkGrey'
    return (
        <div className='md:w-[11/12] w-full md:overflow-x-hidden overflow-x-scroll'>
            <table className='md:w-full w-[300vw]' >
                <tr className={headerRowStyle}>
                    {props.headings.map(item => <td className='h-12 opacity-80'>
                        <span className='px-2'>{item}</span>
                    </td>)}
                </tr>
                {props.tableData && props.tableData.length > 0 ?
                    props.tableData.map((item, index) =>
                        <tr className={bodyRowStyle}>
                            {props.keys.map(key =>
                                <td className={`${key}==='sn'&&'px-3'`} style={{ width: '200px' }}>
                                    {key !== 'status' && key !== 'transactionEvent' ?
                                        <span className='px-2'>
                                            {key.includes('Date') || key === 'Date' ?
                                                truncateText(item[key], 14, true) :
                                                key === 'premium' || key.includes('Amount') || key === 'walletBalance' ?
                                                    <span className={`font-[600] `}>
                                                        {noSymbolCurrecncy(Number(item[key]))}
                                                    </span>
                                                    :
                                                    key === 'Action' ?
                                                        (item?.transactionType === 'Debit' || item?.transactionType === 'Deposit' ?
                                                            <div onClick={() => props.actionButtonAction(item)}>
                                                                {props.actionElement}
                                                            </div>
                                                            :
                                                            <div onClick={() => props.actionButtonAction(item)}>
                                                                {props.actionElement}
                                                            </div>) :
                                                        (item[key] && key.includes('Reference') ?
                                                            <div>{item[key]?.substring(0, 18) }<br/> { item[key]?.substring(18, item[key].length)}</div>
                                                            :
                                                            (key === 'sn' ? index + 1 :
                                                                (item[key] && key === 'narration' &&
                                                                    item[key].includes('Bank transfer of') ?
                                                                    'Bank Transfer' : (item[key]))))}
                                        </span>
                                        :
                                        <span className={`font-poppins flex align-middle w-fit text-xs bg-opacity-10 rounded-full py-0.5 px-2 
                                    ${item[key] === 'Credit' || item[key] === 'Deposit' ? 'bg-lightGreen text-[#027A48]' :
                                                'text-red bg-red'}`}>
                                            <div className={`rounded-full h-2 w-2 mr-2 my-auto
                                    ${item[key] === 'Credit' || item[key] === 'Deposit' ? 'bg-lightGreen' :
                                                    ' bg-red'}`}></div>
                                            {item[key] === 'Deposit' ? 'Credit' : 'Debit'}
                                        </span>}
                                </td>
                            )
                            }
                        </tr>)
                    :
                   (!props.isLoading&& 
                   <tr>
                        <td colSpan={7}>
                            <div className='text-center py-8 mt-20 text-primary-light'>
                                <MdHourglassEmpty className='text-4xl mx-auto' />
                                No data to show
                            </div>
                        </td>

                    </tr>)
                }
                {props.isLoading && <tr className='text-center'>
                    <td colSpan={9} >
                        <div className='py-24'>
                            <span className="relative flex h-10 w-10 mx-auto">
                                <Spin size="large" />
                            </span>
                            Loading Data</div>
                    </td>
                </tr>}
            </table>

            {/* <div className='flex px-4 flex-wrap align-middle justify-between font-poppins pt-8 pb-4'>
                <span className='my-auto text-sm text-left'>Showing {paginatedData&&(paginatedData?.current_page*10)-9} to&nbsp;
                {paginatedData&&paginatedData?.current_page*10} of {paginatedData&&paginatedData?.pages} Pages</span>
                <div className='my-auto ml-auto h-fit xl:w-3/12 md:w-4/12 w-full'>
                {paginatedData&&
                <TablePagination currentPage={paginatedData?.current_page} nextPageAction={()=>props.getHistory({...props.payloadData,page:paginatedData?.current_page,pageSize:10, lastRecord:paginatedData?.current_page*10})} 
                    prevPageAction={() => props.getHistory({...props.payloadData,page:paginatedData?.current_page-1, pageSize:10, lastRecord:paginatedData?.current_page*10})} 
                    setPage={ props.getHistory} totalPages={paginatedData?.pages} />
                    }
                </div>
            </div> */}
        </div>
    )
}
