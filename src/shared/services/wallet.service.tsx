import gatewayApi from "../../core/config/gatewayApi";
import { ErrorHandler } from "../ErrorHandler";
import { AuthPayload } from "../authPayload";
import { ENDPOINTS } from "../constants";

export const getWalletBalance = (callback: any) => {
    const request = gatewayApi.get(`${ENDPOINTS.WALLET}my/wallet/balance`);

    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data.data)
            console.log(responseData)
            //  console.log(responseData)
        } else {
        }
    }).catch(error => {
        
    })
}

export const getWalletHistory = (callback: Function, payload?:any|null, search?:any) => {
    const request = search? gatewayApi.post(`${ENDPOINTS.TRANSACTION}my/transaction/history`,{...AuthPayload,...payload,'genericSearchParameter':search})
    : gatewayApi.post(`${ENDPOINTS.TRANSACTION}my/transaction/history`,{...AuthPayload,...payload,pageSize:10});
    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data.data
                )
        } else {
            ErrorHandler( responseData.data.responseMessage)
        }
    }).catch(error => {
        ErrorHandler(error.response.data.responseMessage)
    })
}

///////////////////Get Wallet Parameters///////////////////////////////////////////
export const getWalletParams = (callback: Function, payload?:any|null) => {
    const request = gatewayApi.post(`${ENDPOINTS.TRANSACTION}resolve/runtime/parameters`,{...AuthPayload,...payload});
    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data.data
                )
        } else {
            ErrorHandler(responseData.data.responseMessage)
        }
    }).catch(error => {
        // fireNotification({ message: error.response.data.responseMessage || 'Unable to get wallet', variant: 'error', status: true })
    })
}

///////////////////Get Bank List///////////////////////////////////////////
export const getBankList = (callback: Function) => {
    const request = gatewayApi.get(`${ENDPOINTS.WALLET}wallet/bank/list`);
    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data.data
                )
        } else {
            ErrorHandler( responseData.data.responseMessage )
        }
    }).catch(error => {
        // fireNotification({ message: error.response.data.responseMessage || 'Unable to get wallet', variant: 'error', status: true })
    })
}

///////////////////Get Account Details///////////////////////////////////////////
export const getAccountDetails = (callback: Function, payload:string, code:string, loader:Function) => {
    const request = gatewayApi.get(`${ENDPOINTS.WALLET}wallet/account/lookup/${payload}/${code}`);
    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data.data
                )
        } else {
            loader(false)
            ErrorHandler( responseData.data.responseMessage)
        }
    }).catch(error => {
        loader(false)
        ErrorHandler(error.response.data.responseMessage)
    })
}

/////////////////////Send Money/////////////////////////
// export const sendMoney = (callback: Function, payload:any, loader?:Function) => {
//     const request = gatewayApi.post(`${ENDPOINTS.TRANSACTION}send/money`,{...AuthPayload, ...payload});
//     request.then((responseData) => {
//         if (responseData.status === 200) {
//             responseData.data.responseMessage.includes('Insufficient')?fireNotification({ message: responseData.data.responseMessage || 'An error occured', variant: 'error', status: true })
//             :callback(responseData.data)

//         } else {
//             loader&&loader(false)
//             fireNotification({ message: responseData.data.responseMessage || 'An error occured', variant: 'error', status: true })
//         }
//     }).catch(error => {
//         loader&&loader(false)
//         // callback(error?.response?.data?.responseMessage, error)
//         fireNotification({ message: error.response.data.responseMessage || 'Unable to get wallet', variant: 'error', status: true })
//     })
// }

/////////////////////Send Money/////////////////////////
// export const createPin = (callback: Function, payload:{pin:string, confirmPin:string}) => {
//     const request = gatewayApi.post(`${BASE_URL.ID}authentication/create/transaction/pin`,{...AuthPayload, ...payload});
//     request.then((responseData) => {
//         if (responseData.status === 200) {
//             fireNotification({ message: responseData.data.responseMessage || 'Success', variant: 'success', status: true })
//             callback(responseData.data.data)
//         } else {
//             fireNotification({ message: responseData.data.responseMessage || 'An error occured', variant: 'error', status: true })
//         }
//     }).catch(error => {
//         callback(error?.response?.data?.responseMessage, error)
//         fireNotification({ message: error.response.data.responseMessage || 'Unable to get wallet', variant: 'error', status: true })
//     })
// }


/////////////////////////Transaction Details///////////////////////
export const getTrxnDetails =(reference:string, callback:Function)=>{
    const request = gatewayApi.get(`${ENDPOINTS.TRANSACTION}payment/trans/details/${reference}`);
    request.then((responseData)=>{
        if(responseData.status===200){
            callback(responseData.data.data)
        }
    }).catch((error)=>{
        ErrorHandler( error.data.responseMessage)
    })
}


//////////////////////////////Export Wallet Details///////////////////////
export const exportTxnDetails=(payload:Record<string, any>, callback: Function)=>{
    // const headers = {'Content-Type': 'application/json'};

    const request = gatewayApi.post(`transactionservice/rest/api/export/transaction/history`, {...AuthPayload,...payload}, {responseType:'blob'})
    request.then((responseData)=>{
        if (responseData.status=200){
            callback(responseData.data)
        }else{
            ErrorHandler(responseData.data.responseMessage)
        }
    }).catch((error)=>ErrorHandler(error.data.responseMessage))
} 

//////////////////////////////Filter Wallet Details///////////////////////
export const filterTxnDetails=(payload:Record<string, any>, callback:Function)=>{
    const request = gatewayApi.post(`transactionservice/rest/api/my/transaction/history`, {...AuthPayload,...payload})
    request.then((responseData)=>{
        if (responseData.status=200){
            callback(responseData?.data)
        }else{
            ErrorHandler(responseData.data.responseMessage)
        }
    }).catch((error)=>ErrorHandler(error.data.responseMessage))
} 



