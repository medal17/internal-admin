import { ClientJS } from "clientjs";
import {APPLICATION_CODE, PRODUCT_ID} from './constants'
import {stringSentenceCase} from '../core/functions/index'

const client= new ClientJS();
export const AuthPayload ={
    requestChannelId:localStorage.getItem('clientId'),
    requestChannel:'Web',
    requestChannelType:client.getDeviceType()==='mobile'?
    'Mobile_Browser':'Desktop_Browser',
    // requestApplicationCode:'FINHUB',
    // requestPartnerCode:'LOAN',
    requestApplicationCode:APPLICATION_CODE,
    requestPartnerCode:'SYSTEMSPECS',
    // requestPartnerCode:'SYSTEMSPECS',
    requestApplicationModule:"BACK_OFFICE",
    userType:"BackOffice"
}