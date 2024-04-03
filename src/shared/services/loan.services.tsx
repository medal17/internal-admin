import gatewayApi from "../../core/config/gatewayApi";
import { AuthPayload } from "../authPayload";
import { ENDPOINTS } from "../constants";



export const  downloadLoanInfo = (payload:any,callback: any)=>{
    const request = gatewayApi.post(`${ENDPOINTS.LOAN}export/loan/list`, 
    {...AuthPayload,...payload}, {responseType:'blob'});

    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data)
        } 
    })

}