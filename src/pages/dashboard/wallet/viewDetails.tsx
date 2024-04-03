import React, { useRef, useState } from 'react'
import { walletBalanceModel } from '../../../shared/models/wallet.model';
import { currencyFormat, decimalCurrency } from '../../../shared/currencyFormat';

export const ViewDetails = (props: { closeModal: Function, walletDetails: any}) => {
    const {walletDetails} = props
    
    return (
        <div className='py- overflow-y-hidden wallet'>
            <div className='flex justify-between mx-auto pb-5'>
                <p className=' w-fit font-bold text-xl mb-2'>
                    Transaction Information
                </p>
            </div>
            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Receiver's Name: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>{walletDetails?.receiverName}</span>
            </p>

            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Amount: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>{currencyFormat(Number(walletDetails?.transactionAmount))}</span>
            </p>
            
            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Transaction Date: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>{walletDetails?.transactionEndDate}</span>
            </p>

            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Reference Number: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>{walletDetails?.transactionReference}</span>
            </p>

            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Description: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>{walletDetails?.narration}</span>
            </p>

            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    External Reference: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>
                    {walletDetails?.processorReference}
                </span>
            </p>

            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Status: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>
                    {walletDetails?.transactionEvent}
                </span>
            </p>

            <p className='text-sm mx-auto flex py-3 justify-between'>
                <span className='text-[17px] font-[400]'>
                    Wallet Balance: 
                </span>
                <span className='text-[17px] text-[#34405] font-[600]'>
                    {decimalCurrency(Number(walletDetails?.bookedBalanceAfterTransaction))}
                </span>
            </p>
            
            {/* <div className='bg-[#F8F9FD] w-11/12 mx-auto font-poppins flex align-middle justify-between px-3 h-28 my-7 rounded-md'>
                <div className='my-auto'>
                    <p className='font-medium text-primary-light align-middle flex pb-1'>
                        <BsBank2 className='my-auto mr-2' />BANK NAME
                    </p>
                    <p>{props.walletDetails?.walletInfos[0]?.bank?.name || 'David Hey'}</p>
                </div>

                <div className='my-auto'>
                    <p className='font-medium  text-primary-light pb-1'>
                        <span className='font-black pr-2'>#</span>ACCOUNT NUMBER
                    </p>
                    <p className='flex align-middle'>
                        <span >{props.walletDetails?.walletInfos[0]?.accountNumber ||'00095475444'} </span>
                        <span onClick={handleCopy} className='my-auto text-primary-light ml-3 cursor-pointer' ref={textAreaRef}>
                            <IoCopyOutline />
                        </span>
                    </p>
                </div>
                <div className='my-auto'>
                    <p className='font-medium flex align-middle text-primary-light pb-1'>
                        <MdPerson4 className='my-auto mr-2' /><span>BENEFICIARY</span>
                    </p>
                    <p>{props.walletDetails?.walletInfos[0]?.accountName||'James Cole'}</p>
                </div>

            </div>
            <p className='font-bold font-poppins text-sm w-11/12 pt-2 my-3 mx-auto'>
                How to fund Wallet?
                <button 
                    onClick={() => setShowSteps(!showSteps)} 
                    className='ml-2 bg-transparent  text-primary-light border-b'>
                        {!showSteps ? 'Find out' : 'Hide'}
                </button>
            </p>

            {showSteps &&
                <div className='w-11/12 h-[42vh] mx-auto overflow-y-scroll py-2 pb-3'>
                    <div className='w-full grid grid-cols-2 overflow-y-scrol'>
                        {STEPS_TO_FUND_WALLET.map(item =>
                            <p className='w-full py-4'>
                                <p className='text-primary-light font-bold text-sm'>Step {item.id}</p>
                                <p className='text-black'>{item.text}</p>
                            </p>)}
                    </div>
                </div>}
            <br /> */}
        </div>
    )
}
