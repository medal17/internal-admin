import React, { useEffect, useState } from 'react'
import { FormButton } from '../buttons/FormButton'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom';
import { ClientJS } from 'clientjs';
import { resendOTP, verifyOTP } from '../../shared/services/authentication';

export interface OtpModel {
    setModal?: Function,
    header: string,
    description: JSX.Element | string,
    hasBackArrow: boolean,
    buttonLabel?: string,
    performAction?: Function,
    setOtp: Function,
    otpValue: string,
    expiresIn?:number,
    resendOtp?:Function,
    successAction:Function
    payloadData?:any,
    isPasswordReset?:boolean,
    verificationEvent?:'Two_Factor_Authentication'|'Registration'|'PasswordRest'
}
export const Otp = (props: OtpModel) => {
    const [countDown, setCountDown] = useState({ seconds: 0, minute: 3|| 0 });
    const [otp, setOtp] = useState(props.otpValue);
    const [payload, setPayload] = useState(props.payloadData);
    const [loading, setLoading] = useState(false)
    const client = new ClientJS();

    const navigate = useNavigate()
    const inputStyle = `md:h-14 h-10 md:w-14 w-10 md:px-3 px-2 md:text-lg text-sm font-poppins font-medium rounded-md 
    text-center bg-grey flex justify-center align-middle`
    const activeInputStyle = `md:h-14 h-10 md:w-14 w-10 md:px-3 px-2 border-2 border-primary-light md:text-lg text-sm font-poppins font-medium rounded-md 
    text-center bg-grey flex justify-center align-middle`
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
    const location = useLocation();

    const handleChange = (event: string) => {
        const result = event.replace(/\D/g, '');
        props.setOtp(result);
        setOtp(result)
    };

    const handleSubmitOtp = () => {
        if (otp.length === 6) {
            props.setModal ? props.setModal(true) : props.performAction && props.performAction(otp)
            props.setOtp(otp)
        }
    }
    const resendPayload={
        verificationEvent:props.verificationEvent||'Two_Factor_Authentication'
      }

      const [hide, setHide] = useState("")
      
    
      const resendOtpCallback=(response:any)=>{
            // setDescription(response?.data?.responseMessage)
           
            setHide("none")
          setPayload(response?.data)
          setCountDown({...countDown, minute: response?.data?.data?.expiredIn, seconds:0})
      }
      const handleResendOTP=()=>{
         resendOTP(resendPayload, resendOtpCallback)
      }

      const verifyOtpCallback=()=>{
        setLoading(false);
        props.successAction();
      }

      const handleVerifyOtp=()=>{
        setLoading(true)
        verifyOTP({
            verificationCode: otp,
            verificationReference: payload?.verificationReference || payload?.data?.verificationReference,
            verificationEvent: resendPayload.verificationEvent
        }, 
            verifyOtpCallback, setLoading)
      }   
      

      const emailPart = payload?.verificationRequestMessage?.split("email")[1];
      const email = emailPart?.split(" ");

    return (
        <label htmlFor='otp' className='w-full mx-auto rounded-xl  align-middle '>
            {!props.hasBackArrow ?
                <div className='text-xl font-poppins text-center font-semibold'>{props.header}</div>
                :
                <div className='flex w-full justify-between px-4'>
                    <div onClick={() => navigate(-1)} className='bg-grey w-fit rounded-full p-2 cursor-pointer'>
                        <IoMdArrowRoundBack className='text-sm' />
                    </div>
                    <div className='text-xl font-poppins font-bold justify-self-center'>{props.header}</div>
                </div>}
            <div className='font-poppins text-sm text-center py-3 opacity-70' style={{display: hide}}>
                <p>We have sent an email with a verification code to</p>
                <p className="font-semibold">{ email? email[1] : ""}</p>
                <p>Enter the OTP you received to verify your account.</p>
                

                 
                {/* {payload.data?.verificationRequestMessage || payload?.verificationRequestMessage} */}
            </div>

            <div className=' w-full flex justify-center my-7 align-middle justify-items-between lg:space-x-4 md:space-x-1 space-x-2 mx-auto'>
                <div className={otp.length === 0 ? activeInputStyle : inputStyle}>
                    <div className='m-auto min-w-[25px] h-fit'>{otp[0]}</div>
                </div>
                <div className={otp.length === 1 ? activeInputStyle : inputStyle}>
                    <div className='m-auto min-w-[25px] h-fit'>{otp[1]}</div>
                </div>
                <div className={otp.length === 2 ? activeInputStyle : inputStyle}>
                    <div className='m-auto min-w-[25px] h-fit'>{otp[2]}</div></div>
                <div className={otp.length === 3 ? activeInputStyle : inputStyle}>
                    <div className='m-auto min-w-[25px] h-fit'>{otp[3]}</div>
                </div>
                <div className={otp.length === 4 ? activeInputStyle : inputStyle}>
                    <div className='m-auto min-w-[25px] h-fit'>{otp[4]}</div>
                </div>
                <div className={otp.length === 5 ? activeInputStyle : inputStyle}>
                    <div className='m-auto min-w-[25px] h-fit'>{otp[5]}</div>
                </div>
            </div>
            <div className='px-2 w-full  justify-center my-7 align-middle pt-2 justify-items-center md:space-x-4 space-x-2 mx-auto'>
            <div className={`text-center ${countDown.minute === 0 && countDown.seconds === 0 ? "mb-4" : 'mb-8'} font-poppins text-sm font-normal text-darkGrey`}>Didn't get OTP? You can resend OTP in
                <span className='text-primary-light font-semibold ml-1 opacity-80'>{countDown.minute}:{countDown.seconds < 10 ? '0' + countDown.seconds : countDown.seconds}</span>
            </div>
            {countDown.minute === 0 && countDown.seconds === 0 &&
                <div onClick={() => handleResendOTP()} 
                    className='text-primary-light text-center cursor-pointer font-poppins font-semibold mb-5 opacity-80'>
                    Resend Code
                </div>
            }
             
            <div className={`${otp.length ===6 ? '' : 'opacity-50 mx-auto mt-2'} 'mx-auto w-10/12'`}>
                <FormButton loading={loading} isEnabled={true} label={props?.buttonLabel ? props.buttonLabel : 'Submit'}
                    clickAction={props.isPasswordReset? ()=>props.performAction&&props.performAction() : handleVerifyOtp}
                />
            </div>
            </div>

            <input type='text' id='otp' className='border w-0 border-white focus:outline-none text-white cursor-pointer -mb-20 bg-transparent' value={otp} maxLength={6} autoFocus={true} onChange={(text) => handleChange(text.target.value)} />

            

        </label>
    )
}
