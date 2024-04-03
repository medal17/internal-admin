import React from 'react'
import { TitleHead } from '../../../../components/others/TitleHead'
import moment from 'moment'
import { currencyFormat } from '../../../../shared/currencyFormat'

export const ViewMore = (props: { data: any }) => {
    const {data} = props
    return (
        <div>
            <h5 className='font-semibold'>Loan Information</h5>
            <section className='font-primary py-3 text-primary-light text-[16px] space-y-3'>
                <TitleHead
                    title={'Date of Loan Disbursal'}
                    value={data?.dateOfLoanDisbursal?moment(data?.dateOfLoanDisbursal).format('MMMM DD, yyy'):''}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Date of Loan Application'}
                    value={data?.dateOfLoanApplication?moment(data?.dateOfLoanApplication).format('MMMM DD, yyy'):''}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Loan Status'}
                    value={data?.loanStatus}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Loan Type'}
                    value={data?.loanType}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Repayment Method'}
                    value={data?.repaymentMethod}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Interest Rate'}
                    value={data?.interestRate+' %'}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Customer Name'}
                    value={data?.fullName}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Loan Amount'}
                    value={data?.loanAmount?currencyFormat(data?.loanAmount||0):null}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Amount Repayable'}
                    value={currencyFormat(data?.amountRepayable||0)}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead
                    title={'Provider'}
                    value={data?.provider}
                    style={'text-darkGrey w-6/12'}
                />
                <TitleHead 
                    title={'Loan Tenor'} 
                    value={data?.loanDuration+' '+data?.loanTenure} 
                    style={'text-darkGrey w-6/12'} 
                />
                <TitleHead 
                    title={'Net Balance'} 
                    value={currencyFormat(data?.netBalance||0)} 
                    style={'text-darkGrey w-6/12'} 
                />
            </section>
        </div>
    )
}
