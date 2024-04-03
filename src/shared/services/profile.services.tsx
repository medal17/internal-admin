import gatewayApi from "../../core/config/gatewayApi";
import { ErrorHandler, SuccessHandler } from "../ErrorHandler";
import { AuthPayload } from "../authPayload";
import { ENDPOINTS } from "../constants";
import { ChangePasswordModel } from "../models/Auth";


export const getProfile = (callback?: Function) => {
    // const email = localStorage.getItem('EMAIL')
    const request = gatewayApi.get(ENDPOINTS.GET_PROFILE)
    //console.log(request)
    request.then((responseData) => {
        if (responseData.status === 200) {
            if (callback) { callback(responseData.data.data) }
        } else {
           ErrorHandler('error')
           
        }
    }).catch(error => {
        console.error(error)
    })
}

///////////////////////////Update Profile/////////////

export const updateProfileInfo = (callback: Function, payload: any) => {
    const request = gatewayApi.post(ENDPOINTS.GET_PROFILE, {...payload})
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

///////////////////////////Update Profile/////////////

export const updateProfileDirect = (callback: Function, payload: any, loader: Function, image: FormData) => {
    const uploadImageRequest = gatewayApi.post(ENDPOINTS.UPLOAD_IMAGE, image);
    uploadImageRequest.then(ImageResponse => {
        if (ImageResponse.status === 200 || ImageResponse.status === 201) {
            
            let updatePayload = { ...payload, ['userAvatar']: ImageResponse?.data?.data?.filePath.toString() }
            // let updatePayload = { ...payload, ['userAvatar']: ImageResponse?.data?.data?.filePath.toString() }
            const request = gatewayApi.post(ENDPOINTS.UPDATE_PROFILE, { ...AuthPayload, ...updatePayload});
            request.then((responseData) => {
                if (responseData.status === 200 || responseData.status === 201) {
                    SuccessHandler(responseData.data.responseMessage)
                    callback()
                } else {
                    ErrorHandler(responseData.data.responseMessage)
                    loader(false)
                }
            }).catch(error => {
                ErrorHandler(error.response.data.responseMessage)
                loader(false)
            })
        } else {
            ErrorHandler('An error occured')
        }
    }).catch(error => {
        ErrorHandler(error.response.data.responseMessage)
        loader(false)
    })
}


////////////////////////////////Change Password///////////////////
export const changePassword = (payload: ChangePasswordModel, setLoading: Function, callback: Function) => {
    const request = gatewayApi.post(`identityservice/rest/api/authentication/change/password`, { ...AuthPayload, ...payload})
    request.then((responseData) => {
        if (responseData.status === 200) {
            ErrorHandler(responseData?.data?.responseMessage);
            callback(responseData)
        } else {
            setLoading(false)
            ErrorHandler(responseData?.data?.responseMessage)
        }
    }).catch(error => {
        setLoading(false)
        ErrorHandler( error?.response?.data?.responseMessage)
        console.error(error)
    })
}

////////////////////////////////update Profile Without Image/////////////////
export const updateProfileWithoutImage = (callback: Function, payload: any, loader: Function) => {
    const request = gatewayApi.post(ENDPOINTS.UPDATE_PROFILE, { ...AuthPayload, ...payload});
    request.then((responseData) => {
        if (responseData.status === 200 || responseData.status === 201) {
            SuccessHandler(responseData.data.responseMessage)
            callback()
        } else {
            ErrorHandler(responseData.data.responseMessage)
            loader(false)
        }
    }).catch(error => {
        ErrorHandler(error.response.data.responseMessage)
        loader(false)
    })
}

