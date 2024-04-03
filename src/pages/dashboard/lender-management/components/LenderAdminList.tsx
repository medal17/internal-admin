import React from 'react'
import { ServiceTable } from '../../../../components/tables/ReuseableTable';
import { BiSearch } from 'react-icons/bi';

interface Props {
    okAction:Function;
    closeAction:Function
}
export const LenderAdminList = (props:Props) => {
  return (
    <div className=''>
        <div className='mt-7'></div>
        <section className='flex justify-between mb-3'>
            <h4>Users</h4>
            <div className='flex align-middle text-darkGrey border border-darkGrey rounded-lg px-2 py-1'>
                <BiSearch className='my-auto text-lg'/>
                <input placeholder='Search' className='my-auto bg-white'/>
            </div>
        </section>
        <ServiceTable 
            headings={['Name', 'Email', 'Action']} 
            tableData={[{name:'Bolanle Johnson', email:'jsonbolly@gmail.com'}]} 
            keys={['name', 'email', 'action']}
            actionButton={<div className='cursor-pointer text-sm w-[140px]'>Reset Password</div>}
            actionButtonAction={()=>props.okAction()}
        />
    </div>
  )
}
