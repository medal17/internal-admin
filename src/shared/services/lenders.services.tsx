import gatewayApi from "../../core/config/gatewayApi";
import { AuthPayload } from "../authPayload";
import { ENDPOINTS } from "../constants";


export const  downloadLenderInfo = (payload:any,callback: any)=>{
    const request = gatewayApi.post(`${ENDPOINTS.LOAN}export/lender/list`, 
    {...AuthPayload,...payload}, {responseType:'blob'});

    request.then((responseData) => {
        if (responseData.status === 200) {
            callback(responseData.data)
        } 
    })

}