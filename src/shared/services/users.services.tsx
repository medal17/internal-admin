import gatewayApi from "../../core/config/gatewayApi";
import { AuthPayload } from "../authPayload";
import { BASE_URL, ENDPOINTS } from "../constants";

export const sendUserMessage = (payload:any,callback: any) => {
    const request = gatewayApi.post(`${BASE_URL.ID}custom/feedback/request`, 
    {...AuthPayload,...payload});

    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data.data)
        } 
    })
}

export const  downloadUserInfo = (payload:any,callback: any)=>{
    const request = gatewayApi.post(`${ENDPOINTS.WALLET}download/scheme/customer/wallet/infos`, 
    {...AuthPayload,...payload}, {responseType:'blob'});

    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data)
        } 
    })

}