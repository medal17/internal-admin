import React from 'react'

export const Auth = () => {


}

export interface LoginModel{
    'username':string,
    'password': string,
    'rememberMe': boolean,
    'requestChannelId'?:string,
    'requestChannel'?:string,
    'requestChannelType'?:string,
    'applicationCode'?:string,
    'partnerCode'?:string,
}

export interface SignUpModel{
    emailAddress:string,
    password:string,
    requestChannelId?:string,
    requestChannel?: string,
    requestChannelType?: string,
    applicationCode?: string,
    partnerCode?:string,
    firstName:string,
    lastName:string,
    middleName?:string,
    customIdentifier?:string,
    assignedRoles:number[],
    enabledTwoFa:boolean,
    verified:boolean
}

export interface ProfileModel  {
    firstName:string,
    lastName:string,
    email: string,
    gender:string,
    mobileNumber:string,
    imageUrl: any,
    dateOfBirth:string
    
}

export interface ChangePasswordModel {
    oldPassword:string, 
    password:string, 
    confirmPassword:string
}


export interface forgotPasswordModel{
    email: string,
    password: string,
    confirmPassword: string
}

export interface verifyOTPModel {
    requestChannelId?:string,
    "requestChannel"?:string,
    // "requestChannelType":string,
    "applicationCode"?:string,
    "verificationEvent": string,
    "partnerCode"?:string,
    "verificationReference"?: string,
    "verificationCode"?:string
}
