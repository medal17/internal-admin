import React, { useState } from 'react'
import { PasswordField, TextField } from '../../../../components/form-input/TextField'
import { FormButton } from '../../../../components/buttons/FormButton'
import { changePassword } from '../../../../shared/services/profile.services';
import { toast } from 'react-toastify';

export const ChangePasswordModal = (props:{cancel:Function}) => {

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const [loading, setLoading] = useState(false)
    // console.log(password, confirmPassword)

    const callback = ()=>{
        toast.success('Password has been changed')
        props.cancel()
        setLoading(false)
    }
    const handelChangePassword = () => {
        setLoading(true);
        changePassword({ oldPassword, password, confirmPassword }, setLoading, callback )
    }
    return (
        <div className='px-2'>
            <h4 className='text-lg font-medium mb-5'> Change Password</h4>

            <PasswordField label={'Current Password'} defaultValue='' type={'password'} setValue={setOldPassword} />
            <PasswordField label={'New Password'} type={'password'} setValue={setPassword} />
            <PasswordField label={'Confirm New Password'} type={'password'} setValue={setConfirmPassword} />

            <div className='flex justify-between mt-7 space-x-6'>
                <div className='w-6/12' >
                    <FormButton label={'Cancel'} lightBorder shortHeight clickAction={props.cancel} isEnabled={true} />
                </div>
                <div className='w-6/12' >
                    <FormButton 
                        label={'Save'} 
                        shortHeight 
                        loading={loading}
                        clickAction={handelChangePassword} 
                        isEnabled={password&&password===confirmPassword} 
                    />
                </div>
            </div>
        </div>
    )
}
