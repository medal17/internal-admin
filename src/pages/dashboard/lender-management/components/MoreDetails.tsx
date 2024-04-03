import React from 'react'
import { TitleHead } from '../../../../components/others/TitleHead'
import { ServiceTable } from '../../../../components/tables/ReuseableTable'
import moment from 'moment'
import { TextField } from '../../../../components/form-input/TextField'

export const MoreDetails = (props:{data:any}) => {
    // console.log(props.data)
    return (
        <div>

            <h5 className=' text-[18px]'>View Loan Product</h5>
            <section>
                <TextField label={'Loan Type'} type={'text'} defaultValue={props.data?.loanType} isShort setValue={undefined} />
                <TextField label={'Interest Rate'} type={'text'} defaultValue={props.data?.interestRate.toString()+'%'} isShort setValue={undefined} />
                <TextField label={'Tenor'} type={''} defaultValue={props.data?.maximumDuration.toString()+' '+props.data?.tenureType} isShort setValue={undefined} />
                <TextField label={'Repayment Method'} type={'text'} defaultValue='Remita Direct Debit' isShort setValue={undefined} />
                <TextField label={'Customer Type'} type={'text'} defaultValue='Remita paid Customer' isShort setValue={undefined} />
            </section>

            <section className='py-2 mb-2'>
                {/* <div className='font-[600] mb-2'>Repayment Method</div> */}
                {/* <section className='border  px-3 py-3 rounded-lg border-[#F0E2BD] bg-[#101828] bg-opacity-5'>
                    <p className='mb-2'>Number of processed loan (total: 40)</p>
                    <ul className=' list-disc px-5 font-[400]'>
                        <div className='flex'>
                            <li className='w-6/12'>
                                <span>Active: </span>
                                <span>-</span>
                            </li>

                            <li>
                                <span>Settled: </span>
                                <span>-</span>
                            </li>
                        </div>

                        <div className='flex'>
                            <li className='w-6/12'>
                                <span>Declined: </span>
                                <span>-</span>
                            </li>

                            <li>
                                <span>Pending</span>
                                <span>-</span>
                            </li>
                        </div>
                    </ul>

                </section> */}

                <section className='border my-4  px-3 py-3 rounded-lg border-[#F0E2BD] bg-[#101828] bg-opacity-5'>
                    <p>Information Required</p>
                    <ul className=' list-disc px-5  space-y-4'>
                        <div className='flex'>
                            <li className='w-6/12'>
                                <span>First Name </span>
                            </li>

                            <li>
                                <span>House Address </span>
                            </li>
                        </div>

                        <div className='flex'>
                            <li className='w-6/12'>
                                <span>Last Name </span>
                            </li>

                            <li>
                                <span>Utility Bill</span>
                            </li>
                        </div>

                        <div className='flex'>
                            <li className='w-6/12'>
                                <span>Next Of Kin </span>
                            </li>

                            <li>
                                <span>BVN</span>
                            </li>
                        </div>
                        <div className='flex'>
                            <li className='w-6/12'>
                                <span>Relationship</span>
                            </li>

                            <li>
                                <span>NIN</span>
                            </li>
                        </div>
                    </ul>

                </section>
            </section>

        </div>
    )
}
