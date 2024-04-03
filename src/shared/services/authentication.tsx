import { forgotPasswordModel, LoginModel, SignUpModel, verifyOTPModel } from '../models/Auth';
import { ClientJS } from 'clientjs';
import { APPLICATION_CODE, BASE_URL, ENDPOINTS } from '../constants/index';
// import { ErrorHandler } from './ErrorHandler';
import { AuthPayload } from '../authPayload';
import gatewayApi from '../../core/config/gatewayApi';
import { ErrorHandler } from '../ErrorHandler';
import { genericType } from '../models/index';


///////////////////// Login ///////////////////////////////////////////////
export const login = (payload: LoginModel, callback: Function, loadingFunction: Function) => {
    localStorage.setItem('token','');
    // getClient()

    const request = gatewayApi.post(`/identityservice/rest/api/authenticate/login`, {...AuthPayload, ...payload});
    request.then((response:genericType) => {
        if (response.status === 200) {
            // localStorage.setItem('token', response?.data?.data?.authorization?.token.substring(0,51)+'xxlsddfda32'+response?.data?.data?.authorization?.token.substring(52,response?.data?.data?.authorization?.token.length));
            localStorage.setItem('token', response?.data?.data?.authorization?.token);
            localStorage.setItem('refreshToken', response?.data?.data?.authorization?.refreshToken);
            localStorage.setItem('expiredAt', response?.data?.data?.authorization?.expiredAt);
            callback(response?.data)
        } else {loadingFunction()
            ErrorHandler('An Error Occured', loadingFunction)
        }
    }).catch((error:genericType) => {
        loadingFunction(); 
        ErrorHandler(error?.response?.data?.responseMessage||'Unable to login', loadingFunction) })
}


///////////////////// Upload Profile ///////////////////////////////////////////////

export const uploadProfile = (payload:any,image: FormData, callback: Function, setLoader:Function) => {
    const request = gatewayApi.post(ENDPOINTS.UPLOAD_IMAGE, image);
    request.then((response:genericType) => {
        if (response.status === 200 || response.status === 201) {
            completeSignUp({...AuthPayload, ['userAvatar']:response?.data?.data?.filePath.toString(), ...payload},callback)
           } else {
            setLoader(false);
            ErrorHandler('An error occured')
        }
    }).catch((error:genericType) => {setLoader(false); ErrorHandler(error?.response?.data?.responseMessage||error?.data?.responseMessage||'An error occured')})
}

///////////////////// Complete Reg ///////////////////////////////////////////////
export const completeSignUp = (payLoad: any, callback: Function) => {
    const request = gatewayApi.post('/identityservice/rest/api/update/registration/profile', payLoad)
    request.then((response:genericType) => {
        if (response.status === 200 || response.status === 201) {  
            callback();
        } else {ErrorHandler('An Error Occured')}
    }).catch((error:genericType)=> ErrorHandler(error?.response?.data?.responseMessage))
}

///////////////////// Get Otp ///////////////////////////////////////////////

export const getOTP = (email: string, callback: Function) => {
    const request = gatewayApi.get(`/send-otp/${email}`)
    request.then((responseData:genericType) => {
        if (responseData.status === 200) {
            callback(responseData)
        } else {ErrorHandler('An error occurd')
        }
    }).catch((error:genericType)=>ErrorHandler(error?.response?.data?.responseMessage|| 'An Error Occured')
    )
}


///////////////////// Verify Otp ///////////////////////////////////////////////
export const verifyOTP = (payLoad: verifyOTPModel, callback: Function, setLoader?:Function) => {
    const request = gatewayApi.post(ENDPOINTS.VERIFY_TOKEN, {...AuthPayload, ...payLoad})
    request.then((response:genericType) => {
        if (response.status === 200 && response.data.responseCode!==201) {
            callback()
        } else {setLoader&&setLoader(false) ;ErrorHandler(response?.data?.responseMessage||'An error Occured')}
    }).catch((error:genericType)=> { 
        setLoader&&setLoader(false);
        ErrorHandler(error?.response?.data?.responseMessage|| 'An Error Occured');
    })
}

///////////////////// Resend OTP ///////////////////////////////////////////////

export const resendOTP =(payLoad:verifyOTPModel, callback:Function)=>{
    const request = gatewayApi.post(ENDPOINTS.RESEND_TOKEN, {...AuthPayload, ...payLoad})
    request.then((response:genericType) => {
        if (response.status === 200) {
            callback(response)
        } else {ErrorHandler('An error Occured')}
    }).catch((error:genericType)=> {ErrorHandler(error?.response?.data?.responseMessage || 'An Error Occured')})
}

/////////////////////Request Password Reset////////////////////////////////////////
export const resetPasswordRequest = (email: string, callback: Function) => {
    localStorage.setItem('token','');
    const request = gatewayApi.post(ENDPOINTS.REQUEST_PASSWORD_RESET, {...AuthPayload,['username']:email})
    
    request.then((response:genericType) => {
        if (response.status === 200) {
            // localStorage.setItem('token', response?.data?.data?.authorization?.token);
            callback(response?.data);
        } else {ErrorHandler('An error occured')
        }
    }).catch((error:genericType)=> ErrorHandler(error?.response?.data?.responseMessage|| 'An Error Occured'))
}

/////////////////////Request Password Reset////////////////////////////////////////
export const updatePasswordRequest = (payload:any, callback: Function, loader?:Function) => {
    const request = gatewayApi.post(`${BASE_URL.ID}authentication/update/password`, {...AuthPayload,...payload})
    request.then((response:genericType) => {
        loader&&loader(false)
        if (response.status === 200) {
            callback(response?.data);
        } else {
            loader&&loader(false);
            ErrorHandler('An error occured')
        }
    }).catch(
        (error:genericType)=> ErrorHandler(error?.response?.data?.responseMessage|| 'An Error Occured')
    )
}
///////////////////// Forgot Password ///////////////////////////////////////////////
export const forgotPassword = (payLoad: forgotPasswordModel, callback: Function) => {
    const request = gatewayApi.post('/forgot-password', {...payLoad})
    request.then((response: genericType) => {
        if (response.status === 200) {
            callback(response);
        } else {ErrorHandler('An error occured')
        }
    }).catch((error:genericType)=> ErrorHandler(error?.response?.data?.responseMessage|| 'An Error Occured'))
}

//////////////////Logout///////////////////
export const logout =(callback:Function)=>{
    const request = gatewayApi.post(`${BASE_URL.PASSWORD}logout`, {...AuthPayload,logoutReason:"Self_Logout"});
    request.then((response:genericType)=>{
        if(response.status===200) {
            localStorage.setItem('token','')
            // window.location.href='/';
            window.location.href = window.location.origin.includes('stagingapi')?'/login':'/'
            callback()
        }else {
            localStorage.setItem('token','')
            // window.location.href='/';
        	window.location.href = window.location.origin.includes('stagingapi')?'/login':'/'
            ErrorHandler('An error occured')
    }
    }).catch((error:genericType)=>{ 
        localStorage.setItem('token','')
        // window.location.href='/';
        window.location.href = window.location.origin.includes('stagingapi')?'/login':'/'
        //  ErrorHandler(error?.response?.data?.responseMessage|| 'An Error Occured')
        })
}

export const getPartnersCode = ()=> {
    // fetch/active/finhub/partner/infos/0
    const request = gatewayApi.get(`${BASE_URL.ID}fetch/active/finhub/partner/infos/0`);
    request.then((response:genericType)=>{
        if(response.status===200) {
            response.data?.data?.contents?.map((item:any)=>item?.partnerCode==='LOAN'?
            localStorage.setItem('partnerId',item?.partnerId):null
            )
            

        }
    })
} 
