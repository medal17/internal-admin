import React, { useState } from 'react'
import { ServiceTable } from '../../../../components/tables/ReuseableTable'
import { BiFilter } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { Popover } from 'antd';
import { FilterMenu } from './FilterMenu';
import { ExportIcon } from '../../../../assets/icons/ExportIcon';
import { ExportMenu } from './ExportMenu';
import { tabelTitleStyle } from '../../wallet/wallet';
import moment from 'moment';
import { MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IoMdMore } from 'react-icons/io';
import { CustomModal } from '../../../../components/modal';
import { ConfirmDeactivate } from './ConfirmDeactivate';
import { EditUserForm } from './EditUserForm';

export const UserAdminTable = () => {
    const headings = ['Name', 'Email', 'Phone Number', 'Admin Role',
        'Status', 'Action'];
    const keys = ['name', 'email', 'phoneNumber', 'adminRole', 'status', 'action'];
    const [search, setSearch] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [openExport, setOpenExport] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    const [openMore, setOpenMore] = useState(false);
    const [deactivateModal, setOpenDeactivateModal] = useState(false);
    const [resetModal, setOpenResetModal] = useState(false);
    const [editUser, setOpenEditUser] = useState(false);
    // const navigate = useNavigate

    const [filterData, setFilterData] = useState({
        "transactionStatus": null,
        "transactionStartDate": null,
        "transactionEndDate": null,
        referenceNumber: '',
        narration: '',

    })

    const handleMenu = (type: string) => {
        // console.log()
        if (type === 'export') {
            setOpenExport(!openExport);
            setOpenFilter(false)
        } else if (type === 'filter') {
            setOpenExport(false)
            setOpenFilter(!openFilter)
        } else {
            setOpenExport(false)
            setOpenFilter(false)
            setOpenSort(!openSort)
        }

    }

    const moreList = [
        { action: () => setOpenDeactivateModal(true), title: 'Deactivate User' },
        { action: () => setOpenResetModal(true), title: 'Reset Password' },
        { action: () => setOpenEditUser(true), title: 'Edit User' },
    ]

    const handleOpenMore = (data: any) => {
        setOpenMore(!openMore)
    }

    return (
        <div>
            <div className='bg-white rounded-lg'>
                <div className='p-6 flex flex-wrap justify-between'>
                    <h3 className='text-lg my-auto font-semibold'>User Admin List</h3>
                    <div>
                        <div className='flex flex-wrap'>
                            <div className='flex mx-2 px-1 border-[1.5px] rounded-md md:w-[340px] py-1 h-[40px] w-full md:my-0 my-3 border-darkGrey pl-2'>
                                <FiSearch className='text-darkGrey text-[20px] my-auto' />
                                <input
                                    placeholder='Search'
                                    className='bg-transparent mx-2 flex justify-center md:w-[230px] w-full outline-none'
                                    onChange={(value: any) => setSearch(value.target.value)}
                                />
                                <div onClick={() => null} 
                                className='bg-primary-light flex align-middle  cursor-pointer rounded-md text-white '>
                                    <div className=' px-2 my-auto '>Search</div>
                                </div>
                            </div>
                            <div onClick={() => handleMenu('filter')}
                                className={`${tabelTitleStyle} md:w-fit w-3/12
                            cursor-pointer md:mx-1 mx-1.5 h-[40px] md:px-5 px-1.5`}>
                                <BiFilter className={`text-[25px] mr-1 my-auto`} />
                                Filter
                            </div>
                            <Popover
                                content={
                                    <FilterMenu
                                        filterValue={filterData}
                                        handleFilterValue={() => null}
                                        handleClose={() => setOpenFilter(false)}
                                        setWalletHistory={() => null}
                                        walletDetails={null}
                                    />}
                                trigger={'click'}
                                placement='bottom'
                                open={openFilter}
                            >
                            </Popover>

                            <div
                                onClick={() => handleMenu('export')}
                                className={`${tabelTitleStyle} md:w-fit w-3/12
                            cursor-pointer h-[40px] md:mx-1 mx-1.5 md:px-5 px-1.5`}
                            >
                                <ExportIcon /> &nbsp;
                                Export
                            </div>

                            <Popover
                                content={
                                    <ExportMenu
                                        filterValue={filterData}
                                        handleClose={() => setOpenExport(false)}
                                        walletDetails={null}
                                    />}
                                trigger={'click'}
                                placement='bottomLeft'
                                open={openExport}
                            >

                            </Popover>

                        </div>

                    </div>
                </div>
                <ServiceTable
                    headings={headings}
                    tableData={dummyData}
                    keys={keys}
                    nofixedWidth
                    type='more'
                    moreList={moreList}
                    actionButton={<ViewButton />}
                    actionButtonAction={handleOpenMore}
                />
            </div>
            <CustomModal
                status={deactivateModal}
                bgColor={''}
                component={<ConfirmDeactivate okAction={() => setOpenDeactivateModal(false)} />}
                toggle={() => setOpenDeactivateModal(false)}
            />

            <CustomModal
                status={resetModal}
                bgColor={''}
                component={
                    <ConfirmDeactivate okAction={() => setOpenResetModal(false)} />}
                toggle={() => setOpenResetModal(false)}
            />
            <CustomModal
                status={editUser}
                bgColor={''}
                component={
                    <EditUserForm okAction={() => setOpenResetModal(false)} />}
                toggle={() => setOpenEditUser(false)}
            />
        </div>
        // </div >
    )
}


const ViewButton = () => {
    return (
        <div className='flex align-middle text-sm cursor-pointer text-primary-light font-medium'>
            <IoMdMore className='text-xl my-auto mr-1' />
        </div>)
}

const dummyData = [
    { 'email': 'demmmm@gmail.com', 'name': 'Ad3ey Jame', 'phoneNumber': '08023885945', 'adminRole': 'Originator', 'status': 'Active' },
    { 'email': 'demmmm@gmail.com', 'name': 'Ad3ey Jame', 'phoneNumber': '08023885945', 'adminRole': 'Originator', 'status': 'Active' },
    { 'email': 'demmmm@gmail.com', 'name': 'Ad3ey Jame', 'phoneNumber': '08023885945', 'adminRole': 'Originator', 'status': 'Active' },
    { 'email': 'demmmm@gmail.com', 'name': 'Ad3ey Jame', 'phoneNumber': '08023885945', 'adminRole': 'Originator', 'status': 'Active' },
    { 'email': 'demmmm@gmail.com', 'name': 'Ad3ey Jame', 'phoneNumber': '08023885945', 'adminRole': 'Originator', 'status': 'Active' },
]

