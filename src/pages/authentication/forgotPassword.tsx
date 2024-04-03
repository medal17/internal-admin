import React, { useState } from 'react'
import { Logo } from '../../assets/icons/Logo'
import { AuthDividedScreen } from '../../components/others/AuthDividedScreen'
import { FormButton } from '../../components/buttons/FormButton'
import { useNavigate } from 'react-router-dom'
import { TextField } from '../../components/form-input/TextField'
import { resetPasswordRequest } from '../../shared/services/authentication'

export const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const otpCallback =(response:any)=>{
        setLoading(false)
        navigate('/password-otp', {state: {data: response?.data,email:email}})
    }
    const handleGetOTP=()=>{
        setLoading(true)
        resetPasswordRequest(email, otpCallback);
    }


    return (<div className='h-full w-screen'>
        <AuthDividedScreen children={
            <div className=' m'>
                <div className='mx-auto text-center w-fit mb-6'>
                    <div className='mx-auto w-fit'>
                    <Logo />
                    </div>
                    <div className='text-[16px] mb-1 mt-3 font-poppins font-[600]'>
                        Hello Lender! Welcome Back
                    </div>
                    <p className='text-center'>
                        Don’t worry! It happens. Please enter the email
                        <br/> address associated with your account.
                    </p>
                </div>

                <div className='w-[408px] mx-auto'>
                    <TextField
                        label={'Email'}
                        type={'email'}
                        placeholder='e.g example@gmail.com'
                        setValue={setEmail}
                    />
                </div>
                <div className='mx-auto w-[408px] mt-[44px]'>
                    <FormButton
                        label={'Reset Password'}
                        shortHeight
                        clickAction={handleGetOTP}
                        loading={loading}
                        isEnabled={email.length>10?true:false}
                    />
                </div>
            </div>
        } />
    </div>

    )
}
