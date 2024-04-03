import { Logo } from '../../assets/icons/Logo'
import { AuthDividedScreen } from '../../components/others/AuthDividedScreen'
import { PasswordField, TextField } from '../../components/form-input/TextField'
import { FormButton } from '../../components/buttons/FormButton'
import { updatePasswordRequest } from '../../shared/services/authentication'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ChangeNewPassword = () => {
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    const handleChangePassword=()=> {
        setLoading(true);
        const payloadDetails = location?.state
        let payload: any = {
            "username": payloadDetails.username,
            "password": password,
            "confirmPassword": confirmPassword,
            "requestAuthorization": {
                "verificationEvent": payloadDetails?.event,
                "verificationReference": payloadDetails?.reference,
                "verificationCode": payloadDetails?.otp,
                "authorizationType": "OTP"
            }
        }
        updatePasswordRequest(payload, callback,setLoading)
    }

    const callback=()=>{
        toast.success('Password Changed SUccessfully');
        navigate('/')
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
                            loading={loading}
                            shortHeight clickAction={()=>handleChangePassword()} 
                            isEnabled={password&&password===confirmPassword?true:false} 
                        />
                    </div>
                </div>
            } />
        </div>
    )
}
