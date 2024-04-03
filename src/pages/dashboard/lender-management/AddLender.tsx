import React, { useState } from 'react'
import Image from '../../../assets/images/bg-image.jpg'
import { FiUpload } from 'react-icons/fi'
import { NumberField, PhoneNumberField, TextField } from '../../../components/form-input/TextField'
import { FormButton } from '../../../components/buttons/FormButton'
import { CustomModal } from '../../../components/modal'
import { SuccessCard } from '../../../components/cards/SuccessCard'
import { useNavigate } from 'react-router-dom'
import { SelectImage } from '../../../components/form-input/SelectImage'
import { BiImage, BiUser } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'

export const AddLender = () => {
    const [successModal, setSuccessModal] = useState(false);
    const [active, setActive] = useState(false);
    const navigate = useNavigate()
    const [currentImage, setCurrentImage] = useState();
    const [previewImage, setPreviewImage] = useState<any>('');
    const [formValue, setFormValue] = useState<any>({})

    const handleAddLender = () => {
        setSuccessModal(true)
    }




    const updateCallback = () => {
        // setLoading(false); setSaveModal(false);
        // userDetails.refetch()
        // getProfile(callback); setCurrentImage(undefined); setPreviewImage(null);
    }

    const handleUpdate = () => {
        const formData = new FormData();
        // currentImage && formData.append('file', currentImage)
        // setLoading(true)
        // // verifyPassword(() => 
        // currentImage ?
        // updateProfileDirect(updateCallback, { ...payload, userAvatar: payload?.avatar }, setLoading, formData)
        // : 
        // updateProfileWithoutImage(updateCallback, { ...payload, userAvatar: payload?.avatar }, setLoading)
        // , password, setLoading)
    }

    const handleChange = (value, key) => {
        setFormValue({ ...formValue, [key]: value });
        // setActive(true)

        // console.log(formValue)
    }

    console.log(active)

    return (
        <div className='xl:flex grid'>
            <section className='bg-white shadow-md rounded-lg xl:w-5/12 w-full p-8'>
                <div className='flex'>
                    {previewImage ?
                        <img src={previewImage} className='rounded-full h-20 w-20 border border-grey' /> :
                        <div className='rounded-full h-20 w-20 flex align-middle bg-grey' >
                            <FaUser className='m-auto text-3xl text-white' />
                        </div>}
                    <label htmlFor='upload' className='flex border cursor-pointer border-darkGrey my-auto ml-10 w-fit p-2 h-[40px] rounded-md'>
                        Upload  <FiUpload className='my-auto ml-2' />'
                    </label>
                    <form id='form'>
                        <input id='upload' className='hidden' onChange={(event) => SelectImage(event, setCurrentImage, setPreviewImage)} type='file' accept='image/*' />
                    </form>
                </div>

                <div className='mt-8'>
                    {formListLeft.map((item: any) =>
                        item?.type === 'digit' ?
                            <NumberField
                                label={item?.name}
                                type={'number'}
                                maxLength={10}
                                placeholder={`Enter ${item?.name}`}
                                setValue={handleChange}
                                name={item?.key}
                                controlled
                            />
                            :
                            <TextField
                                label={item?.name}
                                type={item?.type}
                                placeholder={`Enter ${item?.name}`}
                                setValue={handleChange}
                                name={item?.key}
                                controlled
                            />)}
                </div>
            </section>
            <section className='xl:ml-20 ml-0 h-fit xl:mt-0 mt-4 bg-white shadow-md rounded-lg xl:w-5/12 w-full p-8'>
                {formListRight.map((item: any) =>
                    item?.type === 'phone' ?
                        <PhoneNumberField
                            label={item?.name} type={''}
                            placeholder={`Enter ${item?.name}`}
                            setValue={handleChange}
                            name={item?.key}
                            controlled
                        /> :
                        (item?.type === 'digit' ?
                            <NumberField
                                label={item?.name}
                                type={'number'}
                                maxLength={10}
                                placeholder={`Enter ${item?.name}`}
                                setValue={handleChange}
                                name={item?.key}
                                controlled
                            />
                            :
                            <TextField
                                label={item?.name}
                                type={item?.type}
                                placeholder={`Enter ${item?.name}`}
                                setValue={handleChange}
                                name={item?.key}
                                controlled
                            />))}

                <div className='flex space-x-4 mt-6'>
                    <div className='w-6/12 border-opacity-10'>
                        <FormButton
                            lightBorder shortHeight
                            label={'Cancel'}
                            clickAction={() => navigate('/dashboard/lenders-management')}
                            isEnabled={true}
                        />
                    </div>
                    <div className='w-6/12'>

                        <FormButton shortHeight
                            label={'Add'}
                            clickAction={handleAddLender}
                            isEnabled={
                                    formValue?.cacNumber &&
                                    formValue?.companyAddress &&
                                    formValue?.companyDescription &&
                                    formValue?.companyId &&
                                    formValue?.companyName &&
                                    formValue?.companyPersonName &&
                                    formValue?.companyShortName &&
                                    formValue?.dateOfIncorporation &&
                                    formValue?.emailAddress &&
                                    formValue?.personEmail &&
                                    formValue?.personPhone &&
                                    formValue?.repaymentMethod &&
                                    formValue?.targetCustomers &&
                                    formValue?.typeOfLoan ? true : false}
                        />
                    </div>
                </div>
            </section>

            <CustomModal
                status={successModal}
                bgColor={''}
                component={
                    <SuccessCard
                        message={'Lender Added Successfully'}
                        heading={''}
                        okAction={() => navigate('/dashboard/lenders-management')}
                    />}
                toggle={() => setSuccessModal(false)}

            />
        </div>
    )
}

const formListLeft = [
    { name: 'Company Name', type: '', key: 'companyName', subText: '' },
    { name: 'Email Address', type: '', key: 'emailAddress', subText: '' },
    { name: 'RC Number (CAC Number)', type: 'digit', key: 'cacNumber', subText: '' },
    { name: 'Company Description', type: '', key: 'companyDescription', subText: 'Based on the product/service they offer e.g Loan company' },
    { name: 'Company Address', type: '', key: 'companyAddress', subText: '' },
    { name: 'Company ShortName', type: '', key: 'companyShortName', subText: 'e.g TajowInvest for Tajow Investment LTD' },
    { name: 'Company ID', type: '', key: 'companyId', subText: '' },
]

const formListRight = [
    { name: 'First & Last Name of Company Contact Person', type: '', key: 'companyPersonName', subText: '' },
    { name: 'Contact Person\'s Phone Number', type: 'phone', key: 'personPhone', subText: '' },
    { name: 'Contact Person\'s Email', type: '', key: 'personEmail', subText: '' },
    { name: 'Date of Company Incorporation', type: 'date', key: 'dateOfIncorporation', subText: '' },
    { name: 'Loan Repayment Method', type: '', key: 'repaymentMethod', subText: '' },
    { name: 'Target Customers', type: '', key: 'targetCustomers', subText: '' },
    { name: 'Type of Loan', type: '', key: 'typeOfLoan', subText: '' },
]
