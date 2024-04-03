import React, { useRef, useState } from 'react'
import { MdPerson4 } from 'react-icons/md';
import { BsBank2 } from 'react-icons/bs'
import { IoCopyOutline } from 'react-icons/io5'
// import { STEPS_TO_FUND_WALLET } from '../../../shared/staticList';
// import { CloseModalButton } from '../../../components/buttons/ModalButton';
import { walletBalanceModel } from '../../../shared/models/wallet.model';
import { STEPS_TO_FUND_WALLET } from '../../../shared/staticList';
// import { fireNotification } from '../../../components/other/snackbar';
// import copy from 'copy-text-to-clipboard';

export const AddMoney = (props: { closeModal: Function, walletDetails: walletBalanceModel | undefined }) => {

    const [showSteps, setShowSteps] = useState(false);
    const textAreaRef = useRef(null);
    async function handleCopy() {
        // try {
        //     await navigator.clipboard.writeText(props.walletDetails ? props.walletDetails?.walletInfos[0]?.accountNumber.toString() : '');
        //     fireNotification({ message: 'Account number has been copied', status: true, variant: 'success' });
        // } catch (error) {
        //     fireNotification({ message: 'Unable to copy account number' + error, status: true, variant: 'error' })
        // }
    }

    
    
    
    return (
        <div className='py- overflow-y-hidden wallet'>
            <div className='flex justify-between w-11/12 mx-auto pb-5'>
                <div className='w-10 h-10'></div>
                <p className='mx-auto w-fit font-bold text-xl mb-2'>Add Money</p>
                {/* <CloseModalButton clickAction={() => props.closeModal} /> */}
            </div>
            <p className='w-8/12 text-sm mx-auto text-center'>
                Add money to your wallet through bank transfer using the details 
                below and get credited instantly!
            </p>
            <div className='bg-[#F8F9FD] w-11/12 mx-auto font-poppins flex align-middle justify-between px-3 h-28 my-7 rounded-md'>
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
            <br />
        </div>
    )
}
