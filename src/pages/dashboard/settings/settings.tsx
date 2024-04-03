import React, { useState } from 'react'
import { PasswordField } from '../../../components/form-input/TextField'
import { FormButton } from '../../../components/buttons/FormButton'
import { changePassword } from '../../../shared/services/profile.services'
import { genericType } from '../../../shared/models/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../shared/services/authentication'

export const Settings = () => {

    const [loading, setLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const handelChangePassword = () => {
        setLoading(true);
        changePassword({ oldPassword, password, confirmPassword }, setLoading, callback, )
    }

    const callback = (response: genericType) => {
        setLoading(false);
        let path =window&& window.location.origin.includes('/stagingapi')?'/login':'/'
        logout(()=>navigate(path))
    }

    return (
        <div className='lg:w-9/12 w-full bg-white rounded-lg p-8 shadow-md'>
            <div className='w-11/12'>
                <p className='font-bold text-[18px] text-black'>Settings</p>
                <p className='py-3 mb-5 text-sm text-darkGrey text-opacity-90'>
                    Manage and secure your private information
                </p>
                <div className='flex-col space-y-6'>
                    <PasswordField
                        label={'Current Password'}
                        type={'password'}
                        placeholder='Type your password here'
                        setValue={setOldPassword}
                    />

                    <PasswordField
                        label={'New Password'}
                        type={'password'}
                        placeholder='Type your password here'
                        setValue={setPassword}
                    />
                    <PasswordField
                        label={'Confirm New Password'}
                        type={'password'}
                        placeholder='Type your password here'
                        setValue={setConfirmPassword}
                    />
                    <br/>
                    {/* <div> */}
                    <div className='w-[150px] my-10'>
                        <FormButton 
                            shortHeight 
                            label={'Save'} 
                            
                            isEnabled={oldPassword &&password&&confirmPassword&&
                                (password===confirmPassword)? true:false}
                            loading = {loading}
                            clickAction={() => handelChangePassword()} 
                            // isEnabled={false} 
                        />
                    </div>
                    {/* <div className='w-[150px] my-10'>
                        <FormButton 
                            shortHeight 
                            label={'Change Password'} 
                            type='borderd'
                            isEnabled={true}
                            loading = {loading}
                            clickAction={() => navigate('/chan')} 
                            // isEnabled={false} 
                        />
                    </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
