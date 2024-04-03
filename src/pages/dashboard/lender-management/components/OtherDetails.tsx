import { Spin, Tabs } from 'antd';
import React, { Children, useEffect, useState } from 'react'
import { TitleHead } from '../../../../components/others/TitleHead';
import { LoanProducts, PersonalInformation, WalletInformation } from './information';
import moment from 'moment';
import { LoansProcessed } from './LoansProcessed';
import { CustomModal } from '../../../../components/modal';
import { PasswordVerification } from './PasswordVerification';
import { SuccessCard } from '../../../../components/cards/SuccessCard';
import { useLocation } from 'react-router-dom';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { BASE_URL, ENDPOINTS } from '../../../../shared/constants';
import { LenderDetails } from './LenderDetails';
import { AuthPayload } from '../../../../shared/authPayload';
// import { Information } from './information';

export const OtherDetails = () => {

    const location = useLocation()
    const [openPassword, setOpenPassword] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const payload = {
        "walletOwnerId": location.state?.userId,
        "forMerchant": true
    }

    useEffect(()=>{
        lenderDetails.refetch()
        userWalletData.refetch()
    },[])

    const lenderDetails =  useRequest(`${BASE_URL.LOAN}fetch/lender/details/request/${location?.state?.lenderId}`, 'get', 
    'get-lenders-details');

    const userWalletData = useRequest(`${ENDPOINTS.WALLET}fetch/generic/wallet/balance`, 'post', 'get-users-details',
    {...AuthPayload, ...payload}, location?.state?.id);

    
const tabList: any = [{
    label: 'Company Information',
    children: lenderDetails.isLoading ||
    lenderDetails.isFetching?
        <div className='py-40 my-auto text-center'>
        <span className="relative flex h-10 w-10 mx-auto">
            <Spin size="large" />
        </span>
        Loading Data
    </div>:
    <PersonalInformation
        items={lenderDetails?.data&&lenderDetails?.data?.data} />
}, {
    label: 'Wallet Information',
    children:
     <WalletInformation
        // items={
            // userWalletData&&userWalletData?.data&&
            // userWalletData?.data?.data&&!userWalletData.isLoading&&
            // userWalletData?.data?.data?.walletInfos.map((item:any)=>
                    
            //       Object.assign({
            //         walletNumber: item?.accountNumber || '-',
            //         balance: item?.availableBalance||0,
            //         bankName: item?.bank?.name || '-',
            //         nubanNumber: item?.accountNumber || '-',
            //         nuban: item?.accountName || '-',
            //         openingDate: item?.dateCreated||'-',
            //         status: 'Active'
            //     }))
            // {
            //     walletNumber: 'Hammed',
            //     balance: 40000,
            //     bankName: 'UBA',
            //     nubanNumber: '002384384',
            //     nuban: '0034834343',
            //     openingDate: moment(new Date()).format('DD/MM/yyy'),
            //     status: 'Active'
            // }
        // } 
        />
}, {
    label: 'Loan Proccessed',
    children: <LoansProcessed items={{ firstName: 'Hammed' }} />
},
    , {
    label: 'Loan Products',
    children: <LoanProducts items={{ firstName: 'Hammed' }} />
},

]


    return (
        <div className='bg-white w-7/12 rounded-lg shadow-md p-8'>
            <section className='flex justify-start text-left w-11/12'>
                <Tabs
                    defaultActiveKey="1"
                    centered
                    style={{ fontFamily: 'Inter', width: '100%' }}
                    color='red'
                    onChange={(value) => console.log(value)}
                    tabBarStyle={{ color: 'green' }}
                    items={tabList.map((item: any, i) => {
                        return {
                            label: item?.label,
                            key: i,
                            children: item?.children
                        };
                    })}
                />
            </section>

           
        </div>
    )
}

