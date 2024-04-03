import React, { useState } from 'react'
import { TextField } from '../../../../components/form-input/TextField'
import TextArea from 'antd/es/input/TextArea';
import { FormButton } from '../../../../components/buttons/FormButton';
import { CustomModal } from '../../../../components/modal';
import { SuccessCard } from '../../../../components/cards/SuccessCard';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { AuthPayload } from '../../../../shared/authPayload';
import { BASE_URL } from '../../../../shared/constants';
import { sendUserMessage } from '../../../../shared/services/users.services';
import { useLocation } from 'react-router-dom';

interface sendMessageProps {
    cancelAction: Function,
    okAction: Function,
}

export const SendMessageForm = (props:sendMessageProps) => {
    const [title, setTitle] = useState('');
    const [content, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation()

    const callback =(response:any)=>{
        setLoading(false);
        setMessage(''); setTitle('');
        props.okAction()
    }
   const sendMessage =()=>{
    setLoading(true)
    let payload = {"userId": location.state?.id,  title, content};
        sendUserMessage(payload,callback)
    }

    return (
        <div className='py-3'>
            <h5 className='font-semibold text-lg my-2'>
                Send Message
            </h5>
            <TextField
                label={'Title'}
                type={'text'}
                value={title}
                setValue={setTitle}
                placeholder='Enter Title'
            />

            <div className='mt-3 mb-2 text-md font-semibold'>
                Type a message
            </div>
            <TextArea 
                value={content} 
                onChange={val=>{setMessage(val.target.value)}} 
                rows={4} 
            />

            <div className='flex space-x-4 mt-10'>
                <div className='w-6/12'>
                    <FormButton 
                        label={'Cancel'} 
                        type='Outline' 
                        shortHeight 
                        clickAction={()=>props.cancelAction(false)} 
                        isEnabled={true} 
                    />
                </div>
                <div className='w-6/12'>
                    <FormButton 
                        label={'Send'}  
                        shortHeight 
                        clickAction={sendMessage} 
                        isEnabled={title&&content?true:false} 
                        loading={loading}
                    />
                </div>
            </div>

        </div>
    )
}
