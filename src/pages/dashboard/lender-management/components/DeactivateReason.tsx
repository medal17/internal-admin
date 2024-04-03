import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { PiWarningCircleBold } from 'react-icons/pi'
import { CustomModal } from '../../../../components/modal'
import { PasswordVerification } from './PasswordVerification'
import { SuccessCard } from '../../../../components/cards/SuccessCard'
import { MdDelete } from 'react-icons/md'

interface Props {
    okAction: Function,
    closeAction: Function,
}

export const DeactivateReason = (props: Props) => {
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleOk=()=> {
        setOpenSuccess(false);
        props.closeAction()
        setOpenPasswordModal(false)
    }

    return (
        <div className=''>
            {/* <div className='bg-red bg-opacity-10 w-fit p-2 rounded-full text-red'>
                <div className='bg-red bg-opacity-10 w-fit p-2 rounded-full'>
                    <PiWarningCircleBold className='text-3xl' />
                </div>
            </div> */}
            <h4 className='text-xl  mt-3 mb-2'> Please give a reason for deactivating <br />lender's account</h4>


            <p className='text-darkGrey font-[500] text-[15px]'>
                Type a message
            </p>
            <TextArea rows={4} />

            <div className='pt-8 flex space-x-4'>
                <button onClick={() => props.closeAction()} className='border-2 py-2.5 border-darkGrey border-opacity-25 w-6/12'>
                    Cancel
                </button>
                <button onClick={() => setOpenPasswordModal(true)} className='bg-red py-2.5 text-white w-6/12'>
                    Deactivate
                </button>
            </div>

            <CustomModal
                size='380px'
                status={openPasswordModal}
                bgColor={''}
                component={<PasswordVerification okAction={() => setOpenSuccess(true)} />}
                toggle={undefined}
            />

            <CustomModal
                // size='380px'
                status={openSuccess}
                bgColor={''}
                component={
                    <SuccessCard
                        okAction={handleOk}
                        message={'Lender has been deleted successfully'}
                        heading={''}
                        icon={
                            <div className='p-3 border-2 mt-3 border-primary-light w-fit rounded-full mx-auto'>
                                <MdDelete className='text-2xl text-primary-dark' />
                            </div>}
                    />}
                toggle={undefined}
            />
        </div>
    )
}
