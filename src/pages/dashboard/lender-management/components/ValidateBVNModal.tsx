import React from 'react'
import { TitleHead } from '../../../../components/others/TitleHead'
import BGImage from '../../../../assets/images/bg-image.jpg'

interface Props {
    closeAction: Function
}

export const ValidateBVNModal = () => {
  return (
    <div className='bg-white  rounded-lg p-4 '>
        <h4 className='text-xl mb-8 font-semibold'>BVN Report</h4>
            <section className='flex'>
                <button className='flex my-auto w-6/12 h-12 align-middle'>
                    <div className='my-auto '>Photo:</div>
                </button>
                <img src={BGImage} className='h-20 w-20 rounded-full' />
                
                {/* <FormButton label={''}  clickAction={undefined} isEnabled={false}/> */}
            </section>
            <section className='text-[14px] mt-1  font-[400] flex-col py-10 space-y-5'>
                <TitleHead title={'First Name:'} value={'John'} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Last Name:'} value={'Doe'} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Gender:'} value={'Male'} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Email:'} value={'Johnnydoellly@gmail.com'} style={'w-1/2 font-[500] '} />
                <TitleHead title={'Phone Number:'} value={'+2348023708417'} style={'w-1/2 font-[500]'} />
                <TitleHead title={'Address:'} value={'12, Admiralty Way'} style={'w-1/2 font-[500]'} />
            </section>
        </div>

  )
}
