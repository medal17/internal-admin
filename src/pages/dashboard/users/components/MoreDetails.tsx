import React from 'react'
import { TitleHead } from '../../../../components/others/TitleHead'
import { ServiceTable } from '../../../../components/tables/ReuseableTable'
import moment from 'moment'
import { useRequest } from '../../../../shared/hooks/useRequest'
import { BASE_URL } from '../../../../shared/constants'

export const MoreDetails = (props: { data: string }) => {
    // fetch/customer/single/loan/information/57
    const loanData = useRequest(`${BASE_URL.LOAN}fetch/customer/single/loan/information/${props?.data}`, 'get', 'get-user-loan-details');
    const simplifiedData = loanData?.data?.data || ''
    return (
        <div className='max-h-[85vh] overflow-y-scroll mt-5'>
            <div className='mt-6 flex justify-between'>
                <section className='font-[600] space-y-8'>
                    <TitleHead noflex title={'Provider'} value={simplifiedData?.provider} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Loan Amount'} value={simplifiedData?.loanAmount} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Net Balance'} value={simplifiedData?.netBalance>1?simplifiedData?.netBalance:'N/A'} style={'font-[400]'} />
                    {/* <TitleHead noflex title={'Loan Tenor'} value={simplifiedData?.loanTenure} style={'font-[400]'} /> */}
                </section>

                <section className='font-[600] space-y-8'>
                    <TitleHead noflex title={'Loan Status'} value={simplifiedData?.loanStatus} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Interest Amount'} value={simplifiedData?.interestAmount>1?simplifiedData?.interestAmount:'N/A'} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Amount Repayable'} value={simplifiedData?.amountRepayable?simplifiedData?.amountRepayable:'N/A'} style={'font-[400]'} />
                    {/* <TitleHead noflex title={'Provider'} value={'Pal Credit'} style={'font-[400]'} /> */}
                </section>
                <section className='font-[600] space-y-8'>
                    <TitleHead noflex title={'Loan Type'} value={simplifiedData?.loanType} style={'font-[400]'} />
                    <TitleHead noflex title={'Interest Rate'} value={simplifiedData?.interestRate+'%'} style={'font-[400]'} />
                    <TitleHead noflex title={'Repayment Method'} value={simplifiedData?.repaymentMethod} style={'font-[400]'} />
                    {/* <TitleHead noflex title={'Provider'} value={'Pal Credit'} style={'font-[400]'} /> */}
                </section>
                <section className='font-[600] space-y-8 text-right'>
                    <TitleHead noflex title={'Loan Tenor'} value={ simplifiedData?.loanDuration+' '+simplifiedData?.loanTenure} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Repayment Amount'} value={simplifiedData?.repaymentAmount>1?simplifiedData?.repaymentAmount:'N/A'} style={'font-[400]'} />
                    <TitleHead noflex title={'Date of disbursal'} value={moment(simplifiedData?.dateOfDisbursal).format('DD MMMM, yyy')||'N/A'} style={'font-[400]'} />
                    {/* <TitleHead noflex title={'Provider'} value={'Pal Credit'} style={'font-[400]'} /> */}
                </section>
            </div>

            {simplifiedData&&simplifiedData?.loanStatus==='Active'&&
            <section className='py-2 mt-8 '>
                <div className='font-[600] mb-5'>Repayment Schedule</div>
                <section className='border flex justify-between px-3 py-5 font-[600] rounded-lg border-[#F0E2BD] bg-[#FFF9EA]'>
                    <TitleHead noflex isAmount title={'Total Repayable Amount'} value={simplifiedData?.repaymentAmount} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Loan Amount'} value={simplifiedData?.loanAmount} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Accrued Interest'} value={simplifiedData?.interestAmount} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Interest Balance'} value={simplifiedData?.interestBalance} style={'font-[400]'} />
                    <TitleHead noflex isAmount title={'Outstanding Payment'} value={simplifiedData?.netBalance} style={'font-[400]'} />

                </section>

                <br />
                {simplifiedData&&simplifiedData?.loanRepaymentList&&simplifiedData?.loanRepaymentList.length>0&&
                <div className=''>
                    <ServiceTable
                        headings={['Due Date', 'Principal Payment', 'Interest Payment', 'Monthly Payment', 'Status']}
                        tableData={simplifiedData?.loanRepaymentList?.map((item:any)=>item)||[]}
                        keys={['dueDate', 'principalAmount', 'interestAmount', 'monthlyAmount', 'status']}
                    />
                </div>}
            </section>}

        </div>
    )
}
