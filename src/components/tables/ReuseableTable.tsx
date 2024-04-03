import moment from 'moment'
import React, { useState } from 'react'
import Logo from '../../assets/images/monicenterLogo.png'
import { currencyFormat, decimalCurrency } from '../../shared/currencyFormat'

import { BsInfoCircle } from 'react-icons/bs'
import { Empty, Popover, Spin } from 'antd'
import { FiInfo } from 'react-icons/fi'

export interface tableModel {
    headings: string[],
    tableData: any[],
    keys: string[],
    actionTitle?: string,
    coverageAction?: Function,
    actionButtonAction?: Function,
    type?: string,
    loading?: boolean
    linkButtonAction?: Function
    actionButton?: JSX.Element,
    nofixedWidth?: boolean,
    moreList?: any
}
export const ReuseableTable = (props: tableModel) => {
    const headerRowStyle = 'bg-[#F9FAFB] text-xs font-medium text-opacity-10 border-b border-b-black border-opacity-10 ';
    const bodyRowStyle = 'h-16 text-[14px] text-[#344054] border-b border-opacity-20 border-b-darkGrey'
    return (
        <div className='w-full'>
            <table className='w-full' >
                <tr className={headerRowStyle}>
                    {props?.headings?.map(item => <td className='h-12 opacity-80'><span className='px-2'>{item}</span></td>)}
                </tr>
                {props.tableData.map(item =>

                    <tr className={bodyRowStyle}>
                        {props.keys?.map(key =>
                            <td >
                                {key !== 'Status' && key !== 'loanStatus' ?
                                    <span className='px-2'>
                                        {key === 'date' ? moment(item[key]).format('DD/MM/YYYY') :
                                            key === 'premium' || key === 'requestedAmount' ? currencyFormat(item[key]) : item[key]}
                                    </span>
                                    :
                                    <span className={` font-poppins text-xs bg-opacity-10 rounded-md py-0.5 px-2 ${item[key] === 'Successful' ? 'bg-lightGreen text-lightGreen' : 'text-red bg-red'}`}>{item[key]}</span>}
                            </td>
                        )
                        }
                    </tr>)
                }
            </table>
        </div>
    )
}




export const ServiceTable = (props: tableModel) => {
    const headerRowStyle = 'bg-[#F9FAFB] text-xs font-medium text-opacity-10 border-b border-b-black border-opacity-10 ';
    const bodyRowStyle = 'h-16 text-[14px] text-[#344054] border-b border-opacity-20 border-b-darkGrey text-center';
    const buttonStyle = 'bg-primary-light font-semibold cursor-pointer text-white text-sm w-fit px-6 py-2 rounded-xl mx-auto '
    const [openMore, setOpenMore] = useState(false)
    const [picked, setPicked] = useState<any>()
    //console.log(props.tableData)
    //console.log(props.keys)

    const handleMoreButton = (item: any, index: number) => {
        props.actionButtonAction(item)

        if (item !== picked) {
            setPicked(item)
            setOpenMore(true)
        } else {
            setPicked(null);
            setOpenMore(false)
        };

    }

    return (
        props.loading ?
            <div className='py-40 my-auto text-center'>
                <span className="relative flex h-10 w-10 mx-auto">
                    <Spin size="large" />
                </span>
                Loading Data
            </div> :
            <div className='w-full text-center'>
                <div className='md:block hidden'>
                    <table className=' w-full ' >
                        <thead className={headerRowStyle}>
                            <tr className='px-5'>
                                {props.headings.map(item =>
                                    <td className={`h-12 font-[500] text-left px-5 text-[#667085] ${item === 'Action' ? 'w-[100px]' : 'w-fit'}
                             ` }>
                                        <div className={` ${item === 'Provide' && 'text-center'} text-lef`}>{item}</div>
                                    </td>)}
                            </tr>
                        </thead>
                        {/* <table></table> */}

                        {props?.tableData && props?.tableData.length > 0
                            ?
                            props.tableData.map(item =>

                                <tr className={bodyRowStyle}>
                                    {/* <tr> */}
                                    {props.keys.map((key, index) =>
                                        <td className={`${!props.nofixedWidth || key === 'timeStamp'} text-left`}>{key === 'action' ?

                                            (props.actionButton ?
                                                (props.type === 'more' ?
                                                    <div onClick={() => handleMoreButton(item, index)} className='w-fit m-auto'>
                                                        {props.actionButton}

                                                        {item === picked &&
                                                            <Popover
                                                                className='relative left-10'
                                                                content={
                                                                    <div>
                                                                        {props.moreList.map(
                                                                            (item: any) =>
                                                                                <div onClick={() => item?.action()} className='cursor-pointer text-[14px] mb-2'>
                                                                                    {item.title}
                                                                                </div>)}
                                                                    </div>}
                                                                trigger={'click'}
                                                                placement='bottomLeft'
                                                                open={openMore}
                                                            >

                                                            </Popover>}

                                                    </div> :
                                                    <div onClick={() => props.actionButtonAction(item)} className='w-fit m-auto'>
                                                        {props.actionButton}
                                                    </div>)
                                                :
                                                <div
                                                    onClick={() => props.actionButtonAction && props.actionButtonAction(item)}
                                                    className={buttonStyle}>
                                                    {props?.actionTitle}
                                                </div>
                                            )
                                            : (key === " " ? <div className='underline cursor-pointer' onClick={() => props.linkButtonAction && props.linkButtonAction(item)}>See other Tenor</div>
                                                // key === 'coverageInfo' ?
                                                //     props.coverageAction &&
                                                //     <div onClick={props.coverageAction()} className='w-fit h-fit text-lightBlue cursor-pointer border-b text-xs font-medium mx-2'>
                                                //         See Coverage
                                                //     </div>
                                                :
                                                <div className={` px-5 flex text-sm text-left ${key === 'provider' || key === 'partnerName' && 'justify-start'}`}>{key === 'provider' || key === 'partnerName' &&

                                                    <div className='h-8 w-8 rounded-full mr-2 bg-primary-light p-1 text-start justify-start '>
                                                        <img src={item['partnerAvatar']} alt='logo'
                                                            className='h-7 w-7 justify-start' />

                                                    </div>}


                                                    <div className={`h-fit my-auto ${key === 'status' && props.type !== 'repayment' || key === 'loanStatus' &&
                                                        item['status'] === 'Approved'  ||item[key] === 'Approved'|| item[key] === 'Successful' || item[key] === 'Active' ?
                                                        'bg-lightGreen bg-opacity-10 font-poppins px-2.5 rounded-full text-lightGreen text-xs' :
                                                        (item[key] === 'Pending' ? 'text-darkOrange bg-orange bg-opacity-10 px-2 py-0.5 rounded-full text-xs' : item[key] === 'Declined' ? 'text-red bg-orange bg-opacity-10 px-2 py-0.5 rounded-md text-xs' :
                                                            item[key] === 'Active' || item[key] === 'Approved' ? 'text-red bg-orange bg-opacity-10 px-2 py-0.5 rounded-full text-xs' : 'text-[#344054] text-[14px]')}`}>
                                                        {key === 'requestedAmount' || key === 'premium' ? currencyFormat(Number(item[key]), '', true) :

                                                            (key === 'partnerRepaymentMethods' && props.type === 'service' ?
                                                                <span className='flex bg-dark justify-between'>
                                                                    {item['partnerRepaymentMethods']?.map((item1: any, index: number) =>
                                                                        (item1?.name.includes('ol') ? 'jj' :
                                                                            (item1?.name.includes('Card') ? 'TCP' : item1?.name.includes('Bank') ? 'RIF' : item1.name))
                                                                        + (index < item['partnerRepaymentMethods']?.length - 1 ? ', ' : ''))
                                                                    }
                                                                    {/* <span className='my-auto ml-2' id={`${item['partnerRepaymentMethods'].recoveryPaymentMethod}${index}`}>
                                                                    <BsInfoCircle className='text-lightGreen cursor-pointer' />
                                                                    <UncontrolledTooltip styleName="tooltip" placement="top" target={`${item['partnerRepaymentMethods'].recoveryPaymentMethod}${index}`}>
                                                                        {item['partnerRepaymentMethods'][0]?.name?.includes('Direct') && 'Remita Direct Debit' ||
                                                                            item[key].includes('TCP') && 'Tokenize Card Payment' ||
                                                                            item[key].includes('RIF') && 'Remita Inflight (RIF)' ||
                                                                            item[key].includes('RIF') && item[key].includes('RDD') && 'Remita Inflight (RIF), Remita Direct Debit (RDD)' ||
                                                                            item[key].includes('RIF') && item[key].includes('TDD') && 'Remita Inflight (RIF), Tokenize Card Payment'
                                                                        }
                                                                    </UncontrolledTooltip>
                                                                </span> */}
                                                                </span>
                                                                :
                                                                (key === 'monthlyRepayment' || key === 'amountPayable' || key.includes('Amount') || key.includes('balance') ?
                                                                    currencyFormat(Number(item[key])) : (key === 'interestRate' ? item[key] + '%' : (key.includes('Date') ?
                                                                        moment(item[key]).format('DD MMMM, yyy') :
                                                                        (key === 'activity' ? <div className='flex'>{item[key]} <FiInfo className='my-auto ml-2 text-lg cursor-pointer' /></div> :

                                                                            (key.toLowerCase().includes('status') ?
                                                                                <div className='flex py-1 px-0'>
                                                                                    <div className={`h-1.5 w-1.5 ${item[key] === 'Active' ||item[key] === 'Approved'? 'bg-[#12B76A]' : 'bg-red'} my-auto mr-1 rounded-full`}></div>
                                                                                    {item[key]}
                                                                                </div>
                                                                                :
                                                                                <div className='text-left'>
                                                                                    {item[key]}
                                                                                </div>))))))}
                                                    </div>
                                                </div>)
                                        }
                                        </td>
                                    )
                                    }
                                </tr>
                            ) :
                            <tr >
                                <td colSpan={8} rowSpan={5}>
                                    <Empty className='mx-auto my-40' />
                                </td>
                            </tr>
                        }

                        {/* <table> */}
                        {/* <tr>
                                <td>jjkjkjkj</td>
                                <td>jjkjkjkj</td>
                                <td>jjkjkjkj</td>
                                <td>jjkjkjkj</td>
                                <td>jjkjkjkj</td>
                            </tr> */}
                        {/* </table> */}
                    </table>
                </div>
                <div className='md:hidden flex flex-col w-full justify-center'>
                    <div className='w-full'>
                        <div>

                        </div>
                        {props.tableData.map(item =>
                            <div className=' border-darkGrey flex w-full flex-col align-middle border-opacity-50 bg-white rounded-md mb-5'>
                                {props.keys.map(key => <div className=' w-full  align-middle  px-3 py-2'>
                                    {key === 'action' ?
                                        <div onClick={() => props.actionButtonAction && props.actionButtonAction(item)} className='bg-primary-light text-center text-sm font-semibold cursor-pointer text-white 
                                         px-4 py-3 rounded-md mx-auto my-2'>
                                            {props?.actionTitle}
                                        </div>
                                        : (
                                            key === 'coverageInfo' ? props.coverageAction &&
                                                <div className='flex my-2 justify-between'>
                                                    <span className='text-xs px-2'>Coverage Details</span>
                                                    <div onClick={props.coverageAction()} className='h-fit my-auto  text-lightBlue cursor-pointer border-b text-xs font-medium mx-2'>See Coverage</div>
                                                </div>
                                                : (key === 'price' || key === 'requestedAmount' || key === 'premium' ?
                                                    <div className='flex my-2 justify-between'>
                                                        <span className='text-sm '>Amount</span>
                                                        <div className='text-sm h-fit my-auto font-medium'>{currencyFormat(Number(item[key]))}</div>
                                                    </div> :
                                                    (key === 'partnerRepaymentMethods' ?
                                                        <></> :
                                                        // <div className='px-2 h-full flex align-middle my-2 text-sm'>
                                                        <div >
                                                            {key === 'partnerName' &&
                                                                <div className='flex my-2'>
                                                                    <img src={item['partnerAvatar']} alt='logo' className='h-8 w-8 rounded-full mr-2 my-auto bg-primary-light' />
                                                                    <div className='text-sm h-fit my-auto font-medium'>{(item[key])}</div>

                                                                </div>
                                                            }
                                                            {key === 'loanType' &&
                                                                <div className='flex my-2 justify-between'>
                                                                    <span className='text-sm '>Type of Loan</span>
                                                                    <div className='text-sm h-fit my-auto font-medium justify-end'>{(item[key])}</div>

                                                                </div>
                                                            }
                                                            {key === 'loanStatus' &&
                                                                <div className={`h-fit my-auto ${key === 'loanStatus' &&
                                                                    item['status'] || item['loanStatus'] === 'Applied'   ||item[key] === 'Approved' ?
                                                                    'bg-lightGreen bg-opacity-20 font-poppins px-4 rounded-sm text-lightGreen' :
                                                                    (item[key] === 'Pending' ? 'text-orange' : '')} flex my-2 justify-between`}>
                                                                    <span className='text-sm '>Status</span>
                                                                    <div className={`text-sm h-fit my-auto font-medium  ${key === 'loanStatus' &&
                                                                        item['status'] || item['loanStatus']  === 'Approved'  ? 'bg-lightGreen bg-opacity-20 font-poppins px-4 rounded-sm text-lightGreen' :
                                                                        item['status'] || item['loanStatus'] === 'Declined' ? 'bg-lightGreen bg-opacity-20 font-poppins px-4 rounded-sm text-red' :
                                                                            item['status'] || item['loanStatus'] === 'Active'  ||item[key] === 'Approved' ?
                                                                             'bg-lightGreen bg-opacity-20 font-poppins px-4 rounded-full text-lightGreen' :
                                                                                (item[key] === 'Pending' ? 'text-orange bg-opacity-20 bg-lightGreen px-4 font-poppins rounded-sm' : '')}`}>{(item[key])}</div>

                                                                </div>
                                                            }
                                                            {key === 'amountPayable' &&
                                                                <div className='flex my-2 justify-between'>
                                                                    <span className=' text-sm'>Amount Repayable</span>
                                                                    <div className='text-sm h-fit my-auto font-medium justify-end'>{currencyFormat(Number(item[key]))}</div>

                                                                </div>
                                                            }
                                                            {key === 'interestRate' &&
                                                                <div className='flex my-2 justify-between'>
                                                                    <span className='text-sm '>Interest Rate</span>
                                                                    <div className='text-sm h-fit my-auto font-medium justify-end'>{(item[key]) + '%'}</div>

                                                                </div>
                                                            }
                                                            {key === 'monthlyRepayment' &&
                                                                <div className='flex my-2 justify-between'>
                                                                    <span className='text-sm'>Monthly Repayment</span>
                                                                    <div className='text-sm h-fit my-auto font-medium justify-end'>{currencyFormat(Number(item[key]))}</div>

                                                                </div>
                                                            }

                                                            {key === 'Active' && props.type === 'service' &&

                                                                <div className='flex my-2 justify-between mt-3'>
                                                                    <span className='text-sm '>Repayment Method</span>
                                                                    <div className='text-sm h-fit my-auto font-medium justify-end'>
                                                                        {item['partnerRepaymentMethods']?.map((item1: any, index: number) =>
                                                                            (item1?.name.includes('ol') ? 'jj' :
                                                                                (item1?.name.includes('Card') ? 'TCP' : item1?.name.includes('Bank') ? 'RIF' : item1.name))
                                                                            + (index < item['partnerRepaymentMethods']?.length - 1 ? ', ' : ''))
                                                                        }
                                                                    </div>

                                                                    {/* <div className=' h-fit my-auto text-xs font-medium justify-end'>{(item[key])}</div> */}

                                                                </div>
                                                            }
                                                            <div className={`h-fit my-auto ${key === 'status' || key === 'loanStatus' &&
                                                                item['status'] || item['loanStatus'] === 'Applied' || key.toLocaleLowerCase().includes(status) ?
                                                                'bg-lightGreen bg-opacity-20 font-poppins px-4 rounded-sm text-lightGreen' :
                                                                (item[key] === 'Pending' ? 'text-orange' : '')}`}>
                                                                {/* <div className='flex my-2 justify-between'>
                                                                    <span className='text-xs px-2'>Status</span>
                                                                    <div className=' h-fit my-auto text-xs font-medium mx-2'>{(item[key])}</div>
                                                                </div> */}
                                                                {/* {item[key]} */}
                                                            </div>
                                                        </div>))
                                        )}
                                </div>)}

                            </div>)
                        }


                    </div>


                </div>
            </div>
    )
}



export const CoverageTable = (props: tableModel) => {

    return (<div className='w-full  p-4 '>
        <table className='w-full border' >
            <tr className='bg-[#F9FAFB] font-medium bg-opacity-60 border-b border-b-black border-opacity-10 '>
                {props.headings.map(item => <td className='h-10 text-black border'><span className='px-2'>{item}</span></td>)}
            </tr>
            {props.tableData.map(item =>
                <tr className='h-14'>
                    {props.keys.map(key =>
                        <td className='border px-2'><span className='px-2'>{item[key]}</span></td>
                    )
                    }
                </tr>)
            }
        </table>
    </div>)
}