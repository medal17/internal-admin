import { Empty, Spin, Tabs } from 'antd';
import React, { Children } from 'react'
import { TitleHead } from '../../../../components/others/TitleHead';
import { CustomerInformation, PersonalInformation, WalletInformation } from './information';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { BASE_URL, ENDPOINTS } from '../../../../shared/constants';
import { AuthPayload } from '../../../../shared/authPayload';
// import { Information } from './information';

export const OtherDetails = () => {
    const location = useLocation();
    const payload = {
        "walletOwnerId": location.state?.id,
        "forMerchant": true
    }
    const usersData = useRequest(`${BASE_URL.ID}view/user/personal/information/${location.state?.id}`, 'get', 'get-users-details');
    const userWalletData = useRequest(`${ENDPOINTS.WALLET}fetch/generic/wallet/balance`, 'post', 'get-users-details',
        { ...AuthPayload, ...payload }, location?.state?.id);
    // console.log('user data',usersData?.data?.data)
    const tabList: any = [{
        label: 'Personal Information',
        children: usersData.isLoading ?
            <div className='text-center py-44'>
                <Spin className='mx-auto mb-5' />
                <div className='text-darkGrey'>Loading Data</div>
            </div> :
            <PersonalInformation
                items={usersData?.data?.data} />
    }, {
        label: 'Wallet Information',
        children:
            userWalletData.isFetching ?
                <div className='text-center py-44'>
                    <Spin className='mx-auto mb-5' />
                    <div className='text-darkGrey'>Loading Data</div>
                </div> :
                (userWalletData?.data?.data?.walletInfos?.length <1?
                    <Empty description='No Wallet' className='mt-24'/>:
                <WalletInformation
                    items={
                        userWalletData?.data && userWalletData?.data?.data &&
                        userWalletData?.data && !userWalletData.isLoading &&
                        userWalletData?.data?.data?.walletInfos?.length > 0 &&
                        userWalletData?.data?.data?.walletInfos.map((item: any) =>

                            Object.assign({
                                walletNumber: item?.accountNumber || '-',
                                balance: item?.availableBalance || 0,
                                bankName: item?.bank?.name || '-',
                                nubanNumber: item?.accountNumber || '-',
                                nuban: item?.accountName || '-',
                                openingDate: item?.dateCreated,
                                status: 'Active'
                            }))} />)
    }, {
        label: 'Customer Loan Information',
        children: <CustomerInformation items={{ firstName: 'Hammed' }} />
    }, {
    },

    ]
    return (
        <div className='bg-white w-7/12 rounded-lg shadow-md p-8'>
            <section className='flex justify-start '>
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



