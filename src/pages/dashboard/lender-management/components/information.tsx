import React, { useEffect, useState } from 'react'
import { ImageTitleHead, TitleHead, ValidateTitleHead } from '../../../../components/others/TitleHead'
import { IoIosArrowDown } from 'react-icons/io'
import { UserTable } from './UserTable'
import { CustomModal } from '../../../../components/modal'
import { ValidateBVNModal } from './ValidateBVNModal'
import { Switch } from '../../../../components/buttons/Switch'
import { TbInfoHexagon } from 'react-icons/tb'
import { PasswordVerification } from './PasswordVerification'
import { SuccessCard } from '../../../../components/cards/SuccessCard'
import { useLocation } from 'react-router-dom'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { BASE_URL, ENDPOINTS } from '../../../../shared/constants'
import { ViewProfileModal } from '../../users/components/ViewProfileModal'
import moment from 'moment'
import { currencyFormat, noSymbolCurrecncy } from '../../../../shared/currencyFormat'
import { AuthPayload } from '../../../../shared/authPayload'
import Spin from 'antd/es/spin'
import Empty from 'antd/es/empty'

export const PersonalInformation = (props: { items: any }) => {
    const [openValidateBVN, setOpenValidateBVN] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    return (
        <div>
            <div className='text-[14px] font-[400] py-5 space-y-5'>
                {props.items ? personal.map((item: any) =>

                    <TitleHead
                        title={item?.title}
                        value={item?.key === 'dateOfRegistration' ?
                            moment(props.items[item?.key]).format('DD/MM/yyy')
                            : props?.items[item?.key] || ''}
                        style={'w-1/2 break-words font-[500] '}
                    />
                ) : <></>}

                <ImageTitleHead title={'Licence/Registration Documents:'}
                    value={props?.items?.lenderDocument} style={'w-1/2 font-[500] '} action={() => setOpenProfile(true)} />
            </div>
            <CustomModal
                status={openProfile}
                bgColor={''}
                component={<ViewProfileModal title='Licence Document' data={props?.items?.lenderDocument} />}
                toggle={() => setOpenProfile(false)}
            />
            <CustomModal
                status={openValidateBVN}
                bgColor={''}
                component={<ValidateBVNModal />}
                toggle={() => setOpenValidateBVN(false)}
            />
        </div>
    )
}


// {
// 	"data": {
// 		"lenderId": 4,
// 		"lenderName": "IBS Golden",
// 		"lenderCode": "IBSGolden",
// 		"lenderEmail": "ibsgolden@gmail.com",
// 		"lenderStatus": "Active",
// 		"lenderDescription": "Loan and Investment Company",
// 		"lenderCacNumber": "1129972",
// 		"dateOfRegistration": "2023-07-31 14:26:09",
// 		"businessType": "Limited Liability Company (LTD)",
// 		"lenderAddress": "23, OPEBI ROAD, IKEJA, LAGOS",
// 		"lenderPhoneNumber": "09092157050",
// 		"lenderDocument": "https://d2uuyw1szka6av.cloudfront.net/dev/finhub/upload/images/a6708f28-c2f2-4f31-b6f9-ffa9aee258f7file.jpeg"
// 	}
// }

const personal = [
    { key: 'lenderName', title: 'Company Name:' },
    { key: 'lenderDescription', title: 'Company Description:' },
    { key: 'lenderCacNumber', title: 'CAC Registration Number:' },
    { key: 'dateOfRegistration', title: 'Date of Incorporation/Registration:' },
    { key: 'businessType', title: 'Company Type:' },
    { key: 'lenderEmail', title: 'Email:' },
    { key: 'lenderAddress', title: 'Contact Address:' },
    { key: 'lenderPhoneNumber', title: 'Contact Phone Number:' },
    // { key: 'dob', title: 'Licence/Registration Documents' }
]

export const WalletInformation = () => {

    const location = useLocation()
    const [openHoldAccount, setOpenHoldAccount] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const payload = {
        "walletOwnerId": location.state?.userId,
        "forMerchant": true
    }
    const userWalletData = useRequest(`${ENDPOINTS.WALLET}fetch/generic/wallet/balance`, 'post', 'get-users-details',
        { ...AuthPayload, ...payload }, location?.state?.id);

    const handleOpenSuccess = () => {
        setOpenSuccess(true);
        setOpenHoldAccount(false)
    }

    // console.log('u-w-d',userWalletData)

    return (
        <div className='min-h-fit '>
            <div className='text-[14px] font-[400] '>

                {userWalletData?.data && userWalletData?.data?.data &&
                    !userWalletData.isFetching &&
                    userWalletData?.data?.data?.walletInfos.map((item: any, index: number) =>
                        <div className='py-5 space-y-5'>
                            <TitleHead title='Wallet Account Number: ' value={item?.walletNumber || '-'} style={'w-1/2 font-[500] '} />
                            <TitleHead title='Wallet Balance: ' value={currencyFormat(Number(item?.availableBalance) || 0)} style={'w-1/2 font-[500] '} />
                            <TitleHead title='Bank Name: ' value={item?.bank?.name || '-'} style={'w-1/2 font-[500] '} />
                            <TitleHead title='NUBAN Account Number: ' value={item?.accountNumber || '-'} style={'w-1/2 font-[500] '} />
                            <TitleHead title='NUBAN Account Name: ' value={item?.accountName || '-'} style={'w-1/2 font-[500] '} />
                            <TitleHead title='Wallet Opening Date: ' value={item?.dateCreated || '-'} style={'w-1/2 font-[500] '} />
                            <div className='text-lightGreen'>
                                <TitleHead title='Status: ' value={'Active' || '-'} style={'w-1/2 font-[500] text-black'} />
                            </div>
                        </div>
                    )}

                {userWalletData.isLoading || userWalletData.isFetching &&
                    <div className='py-40 my-auto text-center'>
                        <span className="relative flex h-10 w-10 mx-auto">
                            <Spin size="large" />
                        </span>
                        Loading Data
                    </div>}
                {!userWalletData.isLoading && !userWalletData.isFetching&&
                userWalletData?.data?.data?.walletInfos?.length <1&&
                <Empty description='No Wallet' className='mt-24'/>
                }
                
            </div>
            <div className='mt-10'>
                <Switch label={'Set as Default Wallet'} setValue={undefined} value={false} />

                <div onClick={() => setOpenHoldAccount(true)} className='flex align-middle mt-10 text-red'>
                    <TbInfoHexagon className='my-auto mr-2' />
                    <div className='font-semibold cursor-pointer'>Put Account on hold</div>
                </div>
            </div>

            <CustomModal
                status={openHoldAccount}
                bgColor={''}
                component={
                    <PasswordVerification
                        message={'Enter password to confirm changes'}
                        okAction={handleOpenSuccess}
                    />
                }
                toggle={() => setOpenHoldAccount(false)}
            />

            <CustomModal
                status={openSuccess}
                bgColor={''}
                component={
                    <SuccessCard
                        okAction={() => setOpenSuccess(false)}
                        message={'Wallet account has be placed on hold'}
                        heading={''}
                    />}
                toggle={() => setOpenSuccess(false)}
            />
        </div>
    )
}
const wallet = [
    { key: 'walletNumber', title: 'Wallet Account Number:' },
    { key: 'balance', title: 'Wallet Balance:' },
    { key: 'bankName', title: 'Bank Name:' },
    { key: 'nubanNumber', title: 'NUBAN Account Number:' },
    { key: 'nuban', title: 'NUBAN Account Name:' },
    { key: 'openingDate', title: 'Wallet Opening Date:' },
    { key: 'status', title: 'Status:' },
    {},

    { key: 'walletNumber', title: 'Wallet Account Number:' },
    { key: 'balance', title: 'Wallet Balance:' },
    { key: 'bankName', title: 'Bank Name:' },
    { key: 'nubanNumber', title: 'NUBAN Account Number:' },
    { key: 'nuban', title: 'NUBAN Account Name:' },
    { key: 'openingDate', title: 'Wallet Opening Date:' },
    { key: 'status', title: 'Status:' },
]

export const LoanProducts = (props: { items: any }) => {

    const location = useLocation();
    const productsData = useRequest(`${BASE_URL.LOAN}fetch/lender/products/request/${location?.state?.lenderId}`, 'get',
        'get-lenders-products')
    const [current, setCurrent] = useState<string[]>()


    return (
        <div className='border border-black border-opacity-20 pb-10 rounded-md '>
            <div className=''>
                {
                    productsData?.isLoading || productsData?.isFetching ?
                        <div className='py-40 my-auto text-center'>
                            <span className="relative flex h-10 w-10 mx-auto">
                                <Spin size="large" />
                            </span>
                            Loading Data
                        </div> :
                        <UserTable data={productsData?.data?.data?.loanProducts} />}
            </div>
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
