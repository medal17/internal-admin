import { Logo } from '../../assets/icons/Logo'
import { AuthDividedScreen } from '../../components/others/AuthDividedScreen'
import { PasswordField, TextField } from '../../components/form-input/TextField'
import { FormButton } from '../../components/buttons/FormButton'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLocale } from 'antd/es/locale'
import Password from 'antd/es/input/Password'
import { useState } from 'react'
import { resetPasswordRequest } from '../../shared/services/authentication'

export const ChangePassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate();
    const notify=()=>{navigate('/first-timer', {state:{password, confirmPassword, email:location?.state?.email}})}
    // console.log(location.state)
    const handleGetOTP=()=>{
        resetPasswordRequest(location?.state?.email, notify);
    }
    return (
        <div className='h-full w-screen'>
            <AuthDividedScreen children={
                <div className=' m'>
                    <div className='mx-auto w-fit'>
                        <Logo />
                        <div className='text-[16px] mb-7 mt-3 font-poppins font-[300]'>
                        Please update your password.
                        </div>
                    </div>

                    <div className='w-[408px] mx-auto'>
                        <PasswordField
                            label={'New Password'}
                            type={'password'}
                            placeholder='Enter New Password'
                            setValue={setPassword}
                        />
                    </div>
                    <div className='w-[408px] mx-auto'>
                        <PasswordField
                            label={'Confirm New Password'}
                            type={'password'}
                            placeholder='Confirm New Password'
                            setValue={setConfirmPassword}
                        />
                    </div>
                
                    <div className='mx-auto w-[408px] mt-[44px]'>
                        <FormButton 
                            label={'Proceed'} 
                            shortHeight clickAction={handleGetOTP} 
                            isEnabled={password&&password===confirmPassword?true:false} 
                        />
                    </div>
                </div>
            } />
        </div>
    )
}
