import { Logo } from '../../assets/icons/Logo'
import { AuthDividedScreen } from '../../components/others/AuthDividedScreen'
import { FormButton } from '../../components/buttons/FormButton'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import OtpInput from 'react18-input-otp';
import { useEffect, useState } from 'react'
import { inputStyle } from '../../shared/constants/tailwindStyle'
import { resendOTP, verifyOTP } from '../../shared/services/authentication'


export const VerifyLoginOTP = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [countDown, setCountDown] = useState({ seconds: 0, minute: 3 || 0 });
    const [resendOtpPayload, setresendOtpPayload] = useState('');
    const [hide, setHide] = useState('');
    let location = useLocation();
    const data = location?.state?.data

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleCountDown();
        }, 1000);
        return () => { clearInterval(intervalId) }
    }, [countDown])

    const handleCountDown = () => {
        if (countDown.seconds === 0 && countDown.minute > 0) {
            setCountDown({ ...countDown, seconds: 59, minute: countDown.minute - 1 })
        } else if (countDown.seconds > 0) {
            setCountDown({ ...countDown, seconds: countDown.seconds - 1 })
        }
    }
    const payload = {
        verificationEvent: data?.verificationEvent,
        verificationReference: data?.verificationReference,
        verificationCode: otp
    }

    const handleChange = (enteredOtp: string) => {
        setOtp(enteredOtp);
    };

    const handleOtp = () => {
        verifyOTP(payload, () => navigate('/dashboard', { replace: true }))
    }



    const resendPayload = {
        verificationEvent: data?.verificationEvent || 'Two_Factor_Authentication'
    }
    const resendOtpCallback = (response: any) => {
        // setDescription(response?.data?.responseMessage)

        setHide("none")
        setresendOtpPayload(response?.data)
        setCountDown({ ...countDown, minute: 3, seconds: 0 })
    }
    const handleResendOTP = () => {
        resendOTP(resendPayload, resendOtpCallback)
    }


    console.log('data ', data)
    return (
        <div className='h-full w-screen'>
            <AuthDividedScreen children={
                <div className=' m'>
                    <div className='mx-auto w-fit'>
                        <div className='mx-auto w-fit'>
                            <Logo />
                        </div>
                        <div className='text-[24px] text-center mb-7 mt-3 font-poppins font-[700]'>
                            Enter OTP
                        </div>
                        <div className='text-center font-poppins font-[400] py-3 mb-8'>
                            {data?.verificationRequestMessage ?
                                <>
                                    {data?.verificationRequestMessage.split('your ')[0]}
                                    <br/>
                                    <b>{data?.verificationRequestMessage.split('your ')[1]}</b>
                                    <br />
                                    <br />
                                    Enter the OTP you received to verify your account.
                                </>
                                :
                                <>We have sent an email with a verification code to <br />
                                    <b>{data?.verificationEmail}</b> <br />
                                    Enter the OTP you received to verify your account.</>
                            }
                        </div>

                    </div>
                    {/* <div className='w-[200px] mx-auto'>
                        {data?.verificationRequestMessage}
                    </div> */}
                    <div className='md:px-14 px-0 mb-3 '>
                        <OtpInput
                            isInputNum
                            isInputSecure
                            inputStyle={` text-2xl focus:outline-0 font-[900]  ${inputStyle} mx-1`}
                            className={`${inputStyle}  text-center text-2xl font-[800] mx-auto`}
                            value={otp}
                            shouldAutoFocus
                            onChange={handleChange}
                            numInputs={6}
                        />
                    </div>

                    <div className={`text-center ${countDown.minute === 0 && countDown.seconds === 0 ? "mb-4" : 'mb-8'} font-poppins text-sm font-normal text-darkGrey`}>Didn't get OTP? You can resend OTP in
                        <span className='text-primary-light font-semibold ml-1 opacity-80'>{countDown.minute}:{countDown.seconds < 10 ? '0' + countDown.seconds : countDown.seconds}</span>
                    </div>
                    {countDown.minute === 0 && countDown.seconds === 0 &&
                        <div onClick={() => handleResendOTP()}
                            className='text-primary-light text-center cursor-pointer font-poppins font-semibold mb-5 opacity-80'>
                            Resend Code
                        </div>
                    }

                    <div className='mx-auto w-[408px] mt-[44px]'>
                        <FormButton
                            label={'Proceed'}
                            shortHeight
                            clickAction={() => handleOtp()}
                            isEnabled={otp.length === 6 ? true : false}
                        />
                    </div>
                </div>
            } />
        </div>
    )
}

