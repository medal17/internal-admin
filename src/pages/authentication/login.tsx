import React, { useState } from 'react'
import { Logo } from '../../assets/icons/Logo'
import { AuthDividedScreen } from '../../components/others/AuthDividedScreen'
import { PasswordField, TextField } from '../../components/form-input/TextField'
import { FormButton } from '../../components/buttons/FormButton'
import { Switch } from '../../components/buttons/Switch'
import { Link, useNavigate } from 'react-router-dom'
import { getPartnersCode, login } from '../../shared/services/authentication'
import { genericType } from '../../shared/models/index'

export const Login = () => {

    const [rememberMe, setRememberMe] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const payload ={
        password: password, 
        username: email, 
        rememberMe: !rememberMe
   }
    const handleLogin = () => {
        setLoading(true)
        login(payload,loginCallback, () => setLoading(false));
    }

    const loginCallback = (response: any) => {
        getPartnersCode();
        // use
        // console.log(response?.requiredPasswordChange)
        response?.requiredPasswordChange
        ?
        // navigate('/verify-login', {state:{data:response.data}})
        navigate('/change-password', {state:{email}})
        :
        navigate('/dashboard', {state:{data:response.data}})
    }

    return (
        <div className='h-full w-screen'>
            <AuthDividedScreen children={
                <div className=' m'>
                    <div className='mx-auto w-fit'>
                        <Logo />
                        <div className='text-[16px] mb-7 mt-3 font-poppins font-[600]'>
                            Hello Admin! Welcome Back
                        </div>
                    </div>

                    <div className='w-[408px] mx-auto'>
                        <TextField
                            label={'Email'}
                            type={'email'}
                            placeholder='Email'
                            setValue={setEmail}
                        />
                    </div>
                    <div className='w-[408px] mx-auto'>
                        <PasswordField
                            label={'Password'}
                            type={'password'}
                            placeholder='Password'
                            setValue={setPassword}
                        />
                    </div>
                    <div className=' flex justify-between font-poppins text-[0.75rem] w-[408px] mx-auto'>
                        
                        <Switch label={'Remember Me'} setValue={setRememberMe} value={rememberMe}/>
                        <div className='cursor-pointer text-primary-light'>
                          <Link to='/forgot-password'>  Forgot Password?</Link>
                        </div>
                    </div>
                    <div className='mx-auto w-[408px] mt-[44px]'>
                        <FormButton 
                            label={'Login'} 
                            shortHeight 
                            loading={loading}
                            clickAction={()=>handleLogin()} 
                            isEnabled={email&&password?true:false} 
                        />
                    </div>
                </div>
            } />
        </div>
    )
}
