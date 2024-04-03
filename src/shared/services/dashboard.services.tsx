import { forgotPasswordModel, LoginModel, SignUpModel, verifyOTPModel } from '../models/Auth';
import { ClientJS } from 'clientjs';
import { APPLICATION_CODE, BASE_URL, ENDPOINTS } from '../constants/index';
// import { ErrorHandler } from './ErrorHandler';
import { AuthPayload } from '../authPayload';
import gatewayApi from '../../core/config/gatewayApi';
import { ErrorHandler } from '../ErrorHandler';
import { genericType } from '../models/index';


///////////////////////////Update Profile/////////////

export const getStats = (callback: Function, loading: Function) => {
    const request = gatewayApi.get(`${ENDPOINTS.LOAN}fetch/loan/details/count/amount`)
    request.then((responseData) => {
        if (responseData.status === 200 || responseData.status === 201) {
            callback(responseData.data.data)
        } else {
            ErrorHandler(responseData.data.responseMessage)
        }
    }).catch(error => {
        // fireNotification({ message: '', variant: 'error', status: true })
        console.error(error)
    })
}

// "year": 2023,
//     "loanStatus": ""
///////////////////////////Update Profile/////////////

export const getDashboardGraph = (year:number,callback: Function, loading: Function,loanStatus?:string) => {
    const request = gatewayApi.post(`${ENDPOINTS.LOAN}partner/loan/graph`,{...AuthPayload, year,loanStatus})
    request.then((responseData) => {
        if (responseData.status === 200 || responseData.status === 201) {
            callback(responseData.data.data)
        } else {
            ErrorHandler(responseData.data.responseMessage)
        }
    }).catch(error => {
        // fireNotification({ message: '', variant: 'error', status: true })
        console.error(error)
    })
}