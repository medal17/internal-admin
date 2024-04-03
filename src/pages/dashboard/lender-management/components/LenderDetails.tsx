import React, { useState } from 'react'
import BGImage from '../../../../assets/images/bg-image.jpg'
import { FormButton } from '../../../../components/buttons/FormButton'
import { FaRegEnvelope } from 'react-icons/fa'
import { TitleHead } from '../../../../components/others/TitleHead'
import { TbInfoHexagon } from 'react-icons/tb'
import { CustomModal } from '../../../../components/modal'
import { SendMessageForm } from './SendMessageForm'
import { SuccessCard } from '../../../../components/cards/SuccessCard'
import { ConfirmDeactivate } from './ConfirmDeactivate'
import { DeactivateReason } from './DeactivateReason'
import { RiLockPasswordLine } from 'react-icons/ri'
import { LenderAdminList } from './LenderAdminList'
import { PasswordVerification } from './PasswordVerification'
import { useLocation } from 'react-router-dom'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { BASE_URL } from '../../../../shared/constants'
import { FaUser } from 'react-icons/fa6'

export const LenderDetails = () => {

    const location = useLocation();
    const [openMessage, setOpenMessage] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [deactivateModal, setOpenDeactivateModal] = useState(false);
    const [openReason, setOpenReasonModal] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false)
    const [openVerifyResetPassword, setOpenVerifyResetPassword] = useState(false);
    const [openResetSuccessModal, setOpenResetSuccessModal] = useState(false);

    const lenderDetails =  useRequest(`${BASE_URL.LOAN}fetch/lender/details/request/${location?.state?.lenderId}`, 'get', 
    'get-lenders-details');

    const handleMessageSuccess = () => {
        setOpenMessage(false);
        setOpenSuccessModal(true);
    }


    const handleOpenPasswordVerification = () => {
        setOpenResetPassword(false);
        setOpenVerifyResetPassword(true)

    }

    const handleOpenDeactivationReason = () => {
        setOpenDeactivateModal(false);
        setOpenReasonModal(true);
    }
    return (
        <div className='bg-white h-fit w-5/12 rounded-lg shadow-md p-8 '>
            <section className='flex justify-between'>
                {!lenderDetails.isLoading&& !lenderDetails.isFetching?
                    <img 
                        src={lenderDetails?.data?.data?.lenderDocument} 
                        className='h-20 w-20 rounded-full bg-grey' 
                    />
                :
                <div className='bg-grey rounded-full h-20 w-20 flex align-middle'>
                <FaUser className='y text-3xl m-auto'/>
                </div>
                }
            </section>
            <section className='text-[14px] mt-10 mb-6 font-[400] flex-col border-b border-b-darkGrey py-10 space-y-5'>
                <TitleHead title={'Company Name:'} value={lenderDetails?.data?.data?.lenderName} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Company Description:'} value={lenderDetails?.data?.data?.lenderDescription} style={'w-1/2 font-[500] '} />
                <TitleHead title={'CAC Registration Number:'} value={lenderDetails?.data?.data?.lenderCacNumber} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Email:'} value={lenderDetails?.data?.data?.lenderEmail} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Contact Number:'} value={lenderDetails?.data?.data?.lenderPhoneNumber} style={'w-1/2 font-[500]'} />
                <TitleHead title={'Contact Address:'} value={lenderDetails?.data?.data?.lenderAddress} style={'w-1/2 font-[500]'} />
            </section>
            <section className='flex justify-between'>
                <div onClick={() => setOpenDeactivateModal(true)} className='flex text-lg align-middle text-red'>
                    <TbInfoHexagon className='my-auto mr-2' />
                    <small className='cursor-pointer'>Deactivate Company</small>
                </div>
                <div onClick={() => setOpenResetPassword(true)} className='flex align-middle text-lg text-primary-light'>
                    <RiLockPasswordLine className='my-auto mr-2' />
                    <small className=' my-auto cursor-pointer'>Reset Password</small>
                </div>
            </section>

            <CustomModal
                status={openSuccessModal}
                bgColor={''}
                component={
                    <SuccessCard
                        message={'Message has been sent Successfully'}
                        heading={''}
                        okAction={() => setOpenSuccessModal(false)}
                    />}
                toggle={undefined}
            />

            <CustomModal
                status={openResetSuccessModal}
                bgColor={''}
                component={
                    <SuccessCard
                        message={'Password has been reset Successfully'}
                        heading={''}
                        okAction={() => setOpenResetSuccessModal(false)}
                    />}
                toggle={undefined}
            />

            <CustomModal
                status={deactivateModal}
                bgColor={''}
                component={<ConfirmDeactivate okAction={handleOpenDeactivationReason} />}
                toggle={() => setOpenDeactivateModal(false)}
            />


            <CustomModal
                status={openReason}
                bgColor={''}
                component={
                    <DeactivateReason
                        okAction={() => setOpenReasonModal(true)}
                        closeAction={() => setOpenReasonModal(false)}
                    />}
                toggle={undefined}
            />


            <CustomModal
                status={openResetPassword}
                bgColor={''}
                size='700px'
                component={
                    <LenderAdminList
                        okAction={handleOpenPasswordVerification}
                        closeAction={() => setOpenResetPassword(false)}
                    />}
                toggle={() => setOpenResetPassword(false)}
            />

            <CustomModal
                status={openVerifyResetPassword}
                bgColor={''}
                size='420px'
                component={
                    <PasswordVerification
                        okAction={() => setOpenResetSuccessModal(true)}
                        message='Enter Password to confirm Password Reset for Lenders'
                        buttonText='Reset Password'
                    // closeAction={() => setOpenResetPassword(false)}
                    />}
                toggle={() => setOpenVerifyResetPassword(false)}
            />
        </div>
    )
}
