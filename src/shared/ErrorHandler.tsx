import { toast } from "react-toastify";

export const ErrorHandler = (errorMessage: string, callback?: Function ) => {
    callback&&callback()
    toast.error(errorMessage)
    // toast({ message: errorMessage || 'Unable to Connect', variant: 'error', status: true });
}


export const SuccessHandler = (errorMessage: string, callback?: Function ) => {
    callback&&callback()
    toast.success(errorMessage)
    // toast({ message: errorMessage || 'Unable to Connect', variant: 'error', status: true });
}