import React, { useState } from 'react'
import BGImage from '../../../../assets/images/bg-image.jpg'
import { FormButton } from '../../../../components/buttons/FormButton'
import { FaRegEnvelope, FaUser } from 'react-icons/fa'
import { TitleHead } from '../../../../components/others/TitleHead'
import { TbInfoHexagon } from 'react-icons/tb'
import { CustomModal } from '../../../../components/modal'
import { SendMessageForm } from './SendMessageForm'
import { SuccessCard } from '../../../../components/cards/SuccessCard'
import { ConfirmDeactivate } from './ConfirmDeactivate'
import { DeactivateReason } from './DeactivateReason'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../../../../shared/constants'
import { Spin } from 'antd'

export const UserDetails = () => {

    const [openMessage, setOpenMessage] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [deactivateModal, setOpenDeactivateModal] = useState(false);
    const [openReason, setOpenReasonModal] = useState(false);
    const location = useLocation()
    const usersData = useRequest(`${BASE_URL.ID}view/user/personal/information/${location.state?.id}`, 'get', 'get-users-details');
    // view/user/personal/information/3



    const handleMessageSuccess = () => {
        setOpenMessage(false);
        setOpenSuccessModal(true);
    }

    const handleOpenDeactivationReason = () => {
        setOpenDeactivateModal(false);
        setOpenReasonModal(true);
    }
    return (
        <div className='bg-white w-5/12 rounded-lg shadow-md p-8 h-fit'>
            {!usersData.isLoading  ?
                <section className='flex justify-between'>
                    {!usersData.isLoading && !usersData.isFetching &&
                        usersData?.data?.data?.profilePhoto ?
                        <img src={usersData?.data?.data?.profilePhoto} className='h-20 w-20 rounded-full' />
                        :
                        <div className='bg-grey rounded-full h-20 w-20 flex align-middle'>
                            <FaUser className='y text-3xl m-auto' />
                        </div>
                    }
                    <button onClick={() => setOpenMessage(true)} className='flex my-auto bg-[#E7EDEF] h-12 align-middle'>
                        <div className='my-auto'>Send Message</div>
                        <FaRegEnvelope className='my-auto ml-1' />
                    </button>
                    {/* <FormButton label={''}  clickAction={undefined} isEnabled={false}/> */}
                </section>
                :
                <div className='text-center py-44'>
                    <Spin className='mx-auto mb-5' />
                    <div className='text-darkGrey'>Loading Data</div>
                </div>
            }
            <section className='text-[14px] mt-10 mb-6 font-[400] flex-col border-b border-b-darkGrey py-10 space-y-5'>
                <TitleHead title={'First Name:'} value={usersData?.data?.data?.firstname} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Last Name:'} value={usersData?.data?.data?.lastname} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Gender:'} value={usersData?.data?.data?.gender} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Email:'} value={usersData?.data?.data?.email} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Phone Number:'} value={usersData?.data?.data?.phoneNumber} style={'w-1/2 font-[500]'} />
                <TitleHead title={'Address:'} value={usersData?.data?.data?.homeAddress} style={'w-1/2 font-[500]'} />
            </section>
            <div onClick={() => setOpenDeactivateModal(true)} className='flex align-middle text-red'>
                <TbInfoHexagon className='my-auto mr-2' />
                <small className='font-semibold cursor-pointer'>Deactivate User</small>
            </div>

            <CustomModal
                status={openMessage}
                bgColor={''}
                component={
                    <SendMessageForm
                        cancelAction={setOpenMessage}
                        okAction={handleMessageSuccess}
                    />}
                toggle={() => setOpenMessage(false)}
            />


            <CustomModal
                status={openSuccessModal}
                bgColor={''}
                component={
                    <SuccessCard
                        message={'Message has been sent Successfully'}
                        heading={''}
                        okAction={() => setOpenSuccessModal(false)}
                    />}
                toggle={() => setOpenSuccessModal(false)}
            />

            <CustomModal
                status={deactivateModal}
                bgColor={''}
                component={<ConfirmDeactivate okAction={handleOpenDeactivationReason} />}
                toggle={undefined}
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
        </div>
    )
}
