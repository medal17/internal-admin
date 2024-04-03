import React, { useEffect, useState } from 'react'
import { DataCard, PieChartCard, StatsDataCard } from './components/DataCard'
import { StatsMeterGreen, StatsMeterOrange } from '../../../assets/icons/StatsMeter'
import { BarChart } from '../../../components/charts/BarChart'
import { ChartTab } from './components/ChartTab'
import { useRequest } from '../../../shared/hooks/useRequest'
import { BASE_URL, ENDPOINTS, LOAN_STATUS } from '../../../shared/constants'
import { AuthPayload } from '../../../shared/authPayload'
import html2canvas from 'html2canvas'
import {  Spin } from 'antd'
import DashboardTable from './components/Table'
import { CustomModal } from '../../../components/modal'
import { ChangePasswordModal } from './components/ChangePasswordModal'

export const Dashboard = () => {

    const [allDataTab, setCurrentTab] = useState(new Date().getFullYear())
    const [disbursed, setDisbursed] = useState(new Date().getFullYear())
    const [providerYear, setProviderYear] = useState(new Date().getFullYear())
    const [processedLoanYear, setProcessedLoanYear] = useState(new Date().getFullYear())
    const [userYear, setUserYear] = useState(new Date().getFullYear())
    const [openFilter, setOpenFilter] = useState(false)
    const [openExport, setOpenExport] = useState(false);
    const [status, setStatus] = useState('')
    const [search, setSearch] = useState('');

    const { data, isLoading } = useRequest(`${ENDPOINTS.LOAN}fetch/all/time/loan/details`, 'get',
        'mystats')
    const providersChartData = useRequest(`${ENDPOINTS.LOAN}fetch/loan/providers/graph/details/${providerYear}`, 'get',
        'provider-chart', providerYear, providerYear)

    const chartData = useRequest(`${ENDPOINTS.LOAN}partner/loan/graph`, 'post', 'get-chart-data',
        { ...AuthPayload, year: allDataTab, loanStatus: status }, 0, allDataTab.toString(), status);

    const disbursedChartData = useRequest(`${ENDPOINTS.LOAN}partner/loan/graph`, 'post', 'get-disbursed',
        { ...AuthPayload, year: disbursed, loanStatus: 'Active' }, disbursed, status);
    
    const usersGraph= useRequest(`${BASE_URL.ID}fetch/user/graph/details/${userYear}/FINHUB/LOAN`, 'get',
    'users-graph', '', userYear)
    // fetch/user/graph/details/2023/FINHUB/LOAN

    const proccessedChartData = useRequest(`${ENDPOINTS.LOAN}fetch/loan/type/count`, 'get', 'get-processed-loans')


    const statsData = data?.data?.loanAnalyticsCountDetails;
    const amountStatsData = data?.data?.loanAnalyticsAmountDetails;
    const [openConfirm, setOpenConfirm] = useState(true);

// console.log('aany',data)
    const downloadReceipt = (id: string) => {
        html2canvas(document.querySelector(`#${id}`), {
            onclone: function (document) {
                const style = document.createElement('style');
                style.innerHTML = '.py-2{padding-bottom:18px;}';
                document.body.appendChild(style);
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgData;
            downloadLink.download = id.split('_') + '.png';
            downloadLink.click();
        });

    };

    const pieData = ['#E74EA7','#FF9076','#88E2B7','#5786EC']
     

    // useEffect(() => {
    //     // getStats(setStats, ()=>setLoading)
    //     // getDashboardGraph(allYear,setAllData,setLoading, '')
    // }, [])

    const dataList = [
        {
            title: 'Active Loan users :' || '',
            value: data?.data?.active_loan_users?.value || 0,
            percentage: data?.data?.active_loan_users?.percentageValue || 0,
            color: '#BFEBFF', status: statsData?.approved?.status || 0
        },
        {
            title: 'Active lenders: ' || '',
            value: data?.data?.active_lenders?.value || 0,
            percentage: data?.data?.active_lenders?.percentageValue || 0,
            color: '#F3E8FF', status: statsData?.declined?.status || 0
        },
        {
            title: 'Loans Processed' || '',
            value: data?.data?.loans_processed?.value  || 0,
            percentage: data?.data?.loans_processed?.percentageValue  || 0,
            color: '#FEF8F1', status: statsData?.pending?.status || 0
        }
    ]

    const amountList = [
        {
            title: amountStatsData?.active?.name || 'Total Loan Amount',
            value: data?.data?.total_loan_amount?.value || 0,
            percentage: data?.data?.total_loan_amount?.percentageValue || 0,
            color: '#D9FBE4', status: amountStatsData?.active?.status || 0,
            meter: <StatsMeterOrange />
        },
        {
            title: amountStatsData?.repaid?.name || 'Total Income',
            value: Number(proccessedChartData?.data?.data?.totalRevenue||0),
            percentage: amountStatsData?.repaid?.percentageValue || 0,
            color: '#D9FBE4', status: amountStatsData?.repaid?.status || 0,
            meter: <StatsMeterGreen />
        }
    ]

console.log('vall',proccessedChartData?.data?.data?.loanTypeCount?.
    map((item:any)=>Number(item?.value)).
    reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  },0)||0)

    return (
        isLoading ?
            <div className='py-40 my-auto text-center'>
                <span className="relative flex h-10 w-10 mx-auto">
                    <Spin size="large" />
                </span>
                Loading Data
            </div> :
            <div className='py-5 w-full'>
                <div className='w-full lg:mr-10 mr-0'>
                    <div className='w-[100%] flex  pb-2'>
                        {dataList.map((item: any) =>
                            <div className='min-w-[33.333%] px-3'>
                                <DataCard
                                    color={item?.color}
                                    title={item?.title}
                                    value={Number(item?.value)}
                                    isCount
                                    percentage={`${item?.status === 'Positive' ? '+' : ''}
                            ${item?.percentage} %`}
                                />
                            </div>
                        )
                        }

                    </div>
                </div>

                <div className='flex  py-8'>
                    <div className='w-6/12'>
                        {amountList.map((item: any, index: number) =>
                            <div className=' px-3'>
                                <StatsDataCard
                                    color={'#fff'}
                                    title={item?.title}
                                    value={item?.value}
                                    percentage={item?.percentage}
                                    meterElement={item?.meter}
                                />
                                {index == 0 && <br />}
                            </div>
                        )
                        }
                    </div>
                    <div className='w-6/12 p-5 flex align-middle  bg-white rounded-lg'>
                        <PieChartCard
                            data={
                                proccessedChartData?.data?.data?.loanTypeCount?.map((item:any,index:number)=>
                                Object.assign({value:item?.value,color:pieData[index]}))||[]    
                            }
                            labels={proccessedChartData?.data?.data?.loanTypeCount?.map((item:any)=>item?.name)||[]}
                            title={'Revenue of Processed Loans'}
                            value={Number(proccessedChartData?.data?.data?.totalRevenue||0)}
                        />
                    </div>
                </div>

                <div className='px-3'>
                    <div id='Loan-Requests' className='shadow-md rounded-xl py-3 bg-[#fff]'>
                        <div className='mb-8 p-5 flex justify-between'>
                            <div className='flex'>
                                <div className='my-auto text-lg font-[600] mr-2'>Processed Loans :</div>
                                <div className='border border-black border-opacity-30 px-2 rounded-lg'>
                                <select onChange={(value)=>setStatus(value?.target.value)} className='text-sm bg-white h-full my-auto'>
                                   {LOAN_STATUS.map((item)=> <option value={item}>{item +` Loans`} </option>)}
                                </select>
                                </div>
                            </div>
                            <div className='my-auto'>
                                <ChartTab setCurrentTab={setCurrentTab} currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} />
                            </div>
                            {/* <div onClick={() => downloadReceipt('Loan-Requests')}
                                className={`${tabelTitleStyle} cursor-pointer mx-5 px-3`}>
                                <div data-html2canvas-ignore="true">
                                    <ExportIcon />
                                </div> &nbsp;
                                <div className='my-auto'>Export</div>
                            </div> */}
                        </div>
                        <div className='h-[300px] font-poppins my-5 px-5 w-full flex justify-center'>
                            <BarChart bg='#068037' dataList={chartData?.data ? chartData?.data?.data?.graphDetails?.map((item: any) => item?.y_value) : []} />
                        </div>
                    </div>


                </div>

                <div id='Disbursed-Loans' className='shadow-md rounded-xl py-3 my-10 bg-[#fff]'>
                    <div className='mb-8 p-5 flex justify-between'>
                        <div className='my-auto text-lg font-[600]'>Registered Users</div>
                        <div className='my-auto'>
                            <ChartTab setCurrentTab={setUserYear} currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} />
                        </div>
                        {/* <div onClick={() => downloadReceipt('Disbursed-Loans')} className={`${tabelTitleStyle} cursor-pointer mx-5 px-3`}>
                            <div data-html2canvas-ignore="true">
                                <ExportIcon />
                            </div>&nbsp;
                            Export
                        </div> */}
                    </div>
                    <div className='h-[300px] fosnt-poppins my-5 px-5 w-full flex justify-center'>
                        <BarChart bg='' dataList={usersGraph?.data?.data?.graphDetails?.map((item: any) => item?.y_value) || []} />
                    </div>
                </div>

                <div id='Repaid-Loans' className='shadow-md rounded-xl py-3 my-10 bg-[#fff]'>
                    <div className='mb-8 p-5 flex justify-between'>
                        <div className='my-auto text-lg font-[600]'>Loan Providers</div>
                        <div className='my-auto'>
                            <ChartTab currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} setCurrentTab={setProviderYear} />
                        </div>
                        {/* <div onClick={() => downloadReceipt('Repaid-Loans')} className={`${tabelTitleStyle} cursor-pointer mx-5 px-3`}>
                            <div data-html2canvas-ignore="true">
                                <ExportIcon />
                            </div> &nbsp;
                            Export
                        </div> */}
                    </div>
                    <div className='h-[300px] fosnt-poppins my-5 px-5 w-full flex justify-center'>
                        <BarChart 
                            bg='#FF9076' 
                            dataList={providersChartData?.data?.data?.graphDetails?.map((item: any) => item?.y_value)} 
                        />
                    </div>
                </div>

                <DashboardTable />
                <CustomModal 
                    status={
                        (data&&data?.requiredPasswordChange)
                        ||
                        (providersChartData?.data?.data&& 
                        providersChartData?.data?.data?.requiredPasswordChange)
                        ?  true:false} 
                    bgColor={''} 
                    component={
                        <ChangePasswordModal 
                            cancel={()=>setOpenConfirm(false)}
                        />} 
                    toggle={undefined}
                />
            </div>
        // </div> 
        // </div>
    )
}


