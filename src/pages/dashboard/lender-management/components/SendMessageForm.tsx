import React, { useState } from 'react'
import { TextField } from '../../../../components/form-input/TextField'
import TextArea from 'antd/es/input/TextArea';
import { FormButton } from '../../../../components/buttons/FormButton';
import { CustomModal } from '../../../../components/modal';
import { SuccessCard } from '../../../../components/cards/SuccessCard';

interface sendMessageProps {
    okAction: Function,
}

export const SendMessageForm = (props:sendMessageProps) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [openSuccessModal, setopenSuccessModal] = useState(false)

    return (
        <div>
            <h5 className='font-semibold text-lg mb-2'>Send Message</h5>
            <TextField
                label={'Title'}
                type={'text'}
                setValue={setTitle}
                placeholder='Enter Title'
            />

            <div className='mt-3 mb-2 text-md font-semibold'>Type a message</div>
            <TextArea rows={4} />

            <div className='flex space-x-4 mt-10'>
                <div className='w-6/12'>
                    <FormButton label={'Cancel'} type='Outline' shortHeight clickAction={undefined} isEnabled={false} />
                </div>
                <div className='w-6/12'>
                    <FormButton label={'Send'}  shortHeight clickAction={()=>props.okAction()} isEnabled={true} />
                </div>
            </div>

        </div>
    )
}
