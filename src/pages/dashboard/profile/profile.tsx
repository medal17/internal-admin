import React, { useEffect, useState } from 'react'
import { FormButton } from '../../../components/buttons/FormButton'
import { DateField, PhoneNumberField, TextField } from '../../../components/form-input/TextField'
import { IoPersonCircleSharp } from 'react-icons/io5';
import { SelectImage } from '../../../components/form-input/SelectImage';
import { getProfile, updateProfileDirect, updateProfileWithoutImage } from '../../../shared/services/profile.services';
import { useRequest } from '../../../shared/hooks/useRequest';
import { ENDPOINTS } from '../../../shared/constants';
import { useNavigate } from 'react-router-dom';
export const Profile = () => {
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openSaveModal, setSaveModal] = useState(false);
    const [profile, setProfile] = useState<any>({});
    const [avatar, setAvatar] = useState(true);
    const [payload, setPayload] = useState<any>({});
    const [currentImage, setCurrentImage] = useState();
    const [previewImage, setPreviewImage] = useState<any>('');
    let formRef: any = document.getElementById('form');
    const navigate = useNavigate()
    const userDetails = useRequest(ENDPOINTS.GET_PROFILE,
        'get',
        'get-user-profile')
        
    const handleInputChange = (value: string | number, name: string) => {
        setPayload({ ...payload, [name]: value })
    }

    useEffect(()=>{
        getProfile(callback);
    },[])
 
    const callback = (response: any) => {
        setLoadingProfile(false);
        setPayload(response)
        setProfile(response);
    }

    const updateCallback = () => {
        setLoading(false); setSaveModal(false);
        userDetails.refetch()
        getProfile(callback); setCurrentImage(undefined); setPreviewImage(null);
    }

    const handleUpdate = () => {
        const formData = new FormData();
        currentImage && formData.append('file', currentImage)
        setLoading(true)
        // verifyPassword(() => 
        currentImage ?
        updateProfileDirect(updateCallback, { ...payload, userAvatar: payload?.avatar }, setLoading, formData)
        : 
        updateProfileWithoutImage(updateCallback, { ...payload, userAvatar: payload?.avatar }, setLoading)
            // , password, setLoading)
    }


    return (
        <div className='lg:w-9/12 w-full bg-white rounded-lg p-8 shadow-md'>
            <div className='w-11/12'>
                <p className='font-bold text-[18px] text-black'>User Profile</p>
                <p className='py-3 mb-5 text-sm text-darkGrey text-opacity-90'>
                    Manage and secure your private information
                </p>
                { !loadingProfile?
                <div>
                    <div className='mb-3 font-bold text-sm'>
                        <p className='mb-2'>Photo</p>
                        
                            <div className='flex align-middle'>
                                { (previewImage ||userDetails?.data?.data?.avatar)&&avatar ?
                                <img src={previewImage || userDetails?.data?.data?.avatar} className='h-14 w-14 rounded-full ' />:
                                <div>
                                    <IoPersonCircleSharp 
                                        className='h-14 w-14 rounded-full text-primary-light' />
                                </div>
                                }
                                <label htmlFor='upload' className='my-auto mx-5 border-2 px-4 py-1.5 rounded-lg cursor-pointer border-primary-darkest'>
                                    Upload
                                </label>
                                {/* <p onClick={()=>{setAvatar(false)}} className='font-[600] my-auto text-darkGrey cursor-pointer'>Remove</p> */}
                                <form id='form'>
                                    <input id='upload' className='hidden' onChange={(event) => SelectImage( event, setCurrentImage, setPreviewImage )} type='file' accept='image/*' />
                                </form>
                                {/* {previewImage ||avatar && <div onClick={removeImage} className='my-auto text-darkGrey font-medium cursor-pointer'>Remove</div>} */}
                            </div>
                            
                        
                    </div>
                    <div className='py-1.5'>
                        <TextField label={'First Name'} type={'text'} name='firstName'
                            defaultValue={userDetails?.data?.data?.firstName} controlled setValue={handleInputChange} />
                    </div>
                    <div className='py-1.5'>
                        <TextField 
                            label={'Last Name'} 
                            name='lastName' 
                            type={'text'} 
                            controlled 
                            defaultValue={userDetails?.data?.data?.lastName} 
                            setValue={handleInputChange} 
                        />
                    </div>
                    <div className='py-1.5'>
                        <TextField 
                            label={'Email'} 
                            enable 
                            name='emailAddress' 
                            type={'email'} 
                            controlled
                            defaultValue={userDetails?.data?.data?.emailAddress} 
                            setValue={handleInputChange} 
                        />
                        {/* <div onClick={()=>setEmailModal(true)} className='font-bold text-sm cursor-pointer text-primary-light'>
                    Change Email
                </div> */}
                    </div>
            
                    <div className='flex flex-wrap w-full justify-between mt-10'>
                        <div className='md:w-1/2 w-full flex space-x-5'>
                            <div className='xl:w-6/12 md:6/12 w-full'>
                                <FormButton 
                                    label={'Save'} 
                                    shortHeight 
                                    loading={loading}
                                    clickAction={() => handleUpdate()} 
                                    isEnabled={payload !== profile || currentImage ? true : false} 
                                />
                            </div>
                        </div>
                        <div className='md:w-1/2 w-full flex space-x-5'>
                            <div className='xl:w-6/12 md:6/12 w-full'>
                                <FormButton 
                                    label={'Change Password'} 
                                    shortHeight 
                                    type='Outlined'
                                    clickAction={() => navigate('/dashboard/settings')} 
                                    isEnabled={true} 
                                />
                            </div>
                        </div>
                    </div>
                </div>:
                // <Loading/>
                <></>
                }
            </div>            
        </div>
    )
}
