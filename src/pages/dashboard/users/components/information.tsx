import React, { useState } from 'react'
import { ImageTitleHead, TitleHead, ValidateTitleHead } from '../../../../components/others/TitleHead'
import { IoIosArrowDown } from 'react-icons/io'
import { UserTable } from './UserTable'
import { CustomModal } from '../../../../components/modal'
import { ValidateBVNModal } from './ValidateBVNModal'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../../../../shared/constants'
import { AuthPayload } from '../../../../shared/authPayload'
import { ViewProfileModal } from './ViewProfileModal'
import { truncateText } from '../../../../core/functions/inputValidator'
import { Spin } from 'antd'

export const PersonalInformation = (props: { items: any }) => {

    const [openValidateBVN, setOpenValidateBVN] = useState(false);
    const [openProfile, setOpenProfile] = useState(false)

    return (
        <div>
            <div className='text-[14px] font-[400] py-5 space-y-5'>
                {props.items && personal.map((item: any) =>

                    <TitleHead title={item?.title} value={props.items[item?.key]} style={'w-1/2 font-[500] '} />
                )}

                <ImageTitleHead
                    title={'Profile Photo:'}
                    value={props.items?.profilePhoto ? truncateText(props.items?.profilePhoto, 20) : '-'}
                    style={'w-1/2 font-[500] '}
                    action={() => setOpenProfile(true)}
                />
                <TitleHead title={'Home Address:'} value={props?.items?.homeAddress} style={'w-1/2 font-[500] '} />
                <ValidateTitleHead
                    title={'BVN:'}
                    actionText='Validate'
                    action={() => setOpenValidateBVN(true)} value={props?.items?.bnv || ''} style={'w-1/2 font-[500] '} />
                <ValidateTitleHead title={'NIN:'} value={props?.items?.nin || ''} style={'w-1/2 font-[500] '} />
                <ImageTitleHead title={'Identification:'} value={props?.items?.identityDocument || ''} style={'w-1/2 font-[500] '} action={undefined} />

                <ImageTitleHead title={'Utitlity Bill:'} value={props?.items?.utitlityBill || ''} style={'w-1/2 font-[500] '} action={undefined} />


            </div>

            <CustomModal
                status={openValidateBVN}
                bgColor={''}
                component={<ValidateBVNModal data={props?.items} />}
                toggle={() => setOpenValidateBVN(false)}
            />

            <CustomModal
                status={openProfile}
                bgColor={''}
                component={<ViewProfileModal data={props?.items?.profilePhoto} />}
                toggle={() => setOpenProfile(false)}
            />
        </div>
    )
}

const personal = [
    { key: 'firstname', title: 'First Name:' },
    { key: 'lastname', title: 'Last Name:' },
    { key: 'phoneNumber', title: 'Phone Number:' },
    { key: 'email', title: 'Email:' },
    { key: 'dateOfBirth', title: 'Date Of Birth:' },
    { key: 'gender', title: 'Gender:' },
]

export const WalletInformation = (props: { items: any }) => {
    // console.log('newest', props.items)
    return (
        // props?.items ?
            <div>
                {props.items &&
                    props.items?.map((item1) => <div className='text-[14px] font-[400] py-5 space-y-5'>
                        {/* {wallet.map((item: any) => */}

                        <TitleHead title='Wallet Account Number:' value={item1?.walletNumber} style={'w-1/2 font-[500] '} />
                        <TitleHead title='Wallet Balance:' value={item1?.balance} style={'w-1/2 font-[500] '} />
                        <TitleHead title='Bank Name:' value={item1?.bankName} style={'w-1/2 font-[500] '} />
                        <TitleHead title='NUBAN Account Number:' value={item1?.nubanNumber} style={'w-1/2 font-[500] '} />
                        <TitleHead title='NUBAN Account Name:' value={item1?.nuban} style={'w-1/2 font-[500] '} />
                        <TitleHead title='Wallet Opening Date:' value={item1?.openingDate} style={'w-1/2 font-[500] '} />
                        <TitleHead title='Status:' value={item1?.status} style={'w-1/2 font-[500] '} />
                        {/* )} */}
                    </div>)}
            </div>
            // :
            // <div className='py-40 my-auto text-center'>
            //     <span className="relative flex h-10 w-10 mx-auto">
            //         <Spin size="large" />
            //     </span>
            //     Loading Data
            // </div>
    )
}


export const CustomerInformation = (props: { items: any }) => {
    // /fetch/customer/loan/information/0/100
    const location = useLocation()
    const [bodyData, setBody] = useState({ "userId": location.state?.id, "loanStatus": "Active" })
    const usersData = useRequest(`${BASE_URL.LOAN}fetch/customer/loan/information/0/20`, 'post',
        'get-user-loans', { ...AuthPayload, ...bodyData }, 0,);
    const pendingsData = useRequest(`${BASE_URL.LOAN}fetch/customer/loan/information/0/20`, 'post',
        'get-pending-loans', { ...AuthPayload, "userId": location.state?.id, "loanStatus": "Pending" }, 0,);

    const settledData = useRequest(`${BASE_URL.LOAN}fetch/customer/loan/information/0/20`, 'post',
        'get-settled-loans', { ...AuthPayload, "userId": location.state?.id, "loanStatus": "Settled" }, 0,);

    const declinedData = useRequest(`${BASE_URL.LOAN}fetch/customer/loan/information/0/20`, 'post',
        'get-declined-loans', { ...AuthPayload, "userId": location.state?.id, "loanStatus": "Declined" }, 0,);

    const [current, setCurrent] = useState<string[]>()
    console.log(current)


    const handleDropdown = (picked: string) => {
        if (!current || !current.includes(picked)) {
            setCurrent(current ? [...current, picked] : [picked])
        } else {
            setCurrent(current.filter((item) => item !== picked))
        }
        // console.log(current)
    }
    return (
        <div>
            {groupList.map((item) =>
                <div className={`border  
                ${current && current.includes(item) && 'pb-6'} border-darkGrey rounded-md pt-4 my-3 w-full`}>
                    <div onClick={() => handleDropdown(item)}
                        className={`flex justify-between px-6 cursor-pointer  
                        ${current && current.includes(item) && 'border-b border-b-darkGrey'} 
                        pb-4`}
                    >
                        {item}
                        <IoIosArrowDown className='my-auto' />
                    </div>
                    {current && current.includes(item) &&
                        <div className=''>
                            <UserTable
                                data={item === 'Active Loans' ?
                                    usersData?.data?.data?.contents
                                    : (
                                        item === 'Pending Loans' ? pendingsData?.data?.data?.contents
                                            : (
                                                item === 'Settled Loans' ? settledData?.data?.data?.contents
                                                    : (
                                                        item === 'Declined Loans' ? declinedData?.data?.data?.contents
                                                            : []
                                                    )))
                                }
                            />
                        </div>}
                </div>)}
        </div>
    )
}

const groupList = [
    'Pending Loans',
    'Active Loans',
    'Settled Loans',
    'Declined Loans',

]
//   const customer =[
//     {key:'firstName', title:' Name'},
//     {key:'lastName', title:'Last Name'},
//     {key:'phoneNumber', title:'Last Name'},
//     {key:'email', title:'Last Name'},
//     {key:'dob', title:'Last Name'},
//     {key:'gender', title:'Last Name'},
// ]
