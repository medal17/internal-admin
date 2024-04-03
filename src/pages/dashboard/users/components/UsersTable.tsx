import React, { useEffect, useState } from 'react'
import { ServiceTable } from '../../../../components/tables/ReuseableTable'
import { BiFilter } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { Popover } from 'antd';
import { FilterMenu } from './FilterMenu';
import { ExportIcon } from '../../../../assets/icons/ExportIcon';
import { ExportMenu } from './ExportMenu';
import { tabelTitleStyle } from '../../wallet/wallet';
import { EyeIcon } from '../../../../assets/icons/EyeIcon';
import { BsEye } from 'react-icons/bs';
import { MdRemoveRedEye } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { BASE_URL, ENDPOINTS } from '../../../../shared/constants';
import { AuthPayload } from '../../../../shared/authPayload';
import { TablePagination } from '../../../../components/tables/TablePagination';

export const UsersTable = () => {
    const headings = ['First Name', 'Last Name', 'Email', 'Registration Date',
        'Status', 'Action'];
    const keys = ['firstname', 'lastname', 'email', 'registrationDate', 'status', 'action'];
    const [allDataTab, setCurrentTab] = useState(new Date().getFullYear())
    const [disbursed, setDisbursed] = useState(new Date().getFullYear())
    const [currentPage, setCurrentPage] = useState({ page: 1 })
    const [repaidYear, setRepaid] = useState(new Date().getFullYear())
    const [search, setSearch] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [openExport, setOpenExport] = useState(false)
    const navigate = useNavigate()
    const [filterData, setFilterData] = useState({
        "searchParameter": '',
        "status": null,
        "startDate": null,
        "endDate": null,
        "applicationCode": "FINHUB",
        "partnerCode": "LOAN"
    })

    const usersData = useRequest(`${BASE_URL.ID}fetch/all/users/${currentPage?.page}/10`, 'post', 'get-users',
        { ...AuthPayload, ...filterData}, currentPage?.page);
    // /fetch/all/users/0/10
    console.log('users', usersData?.data?.data)


    const handleMenu = (type: string) => {
        // console.log()
        if (type === 'export') {
            setOpenExport(!openExport);
            setOpenFilter(false)
        } else {
            setOpenExport(false)
            setOpenFilter(!openFilter)
        }

    }

    useEffect(()=>{
        setOpenExport(false);
        setOpenFilter(false);
        // setOpenSort(false)
    },[usersData.data])

    const handleViewUser=(data:any)=>{
        console.log(data)
        navigate('/dashboard/users/view', {state:data})
    }

    const handleSearch =()=>{
        setCurrentPage({page:1})
        usersData.refetch()
    }
    // console.log('seee', filterData)
    return (
        <div>
            <div className='bg-white rounded-lg mb-4'>
                <div className='p-6 flex flex-wrap justify-between'>
                    <h3>Customer List</h3>
                    <div>
                        <div className='flex flex-wrap'>
                            <div className='flex border-2 rounded-md md:w-[350px] w-full md:my-0 my-3 border-darkGrey pl-2'>
                                <FiSearch className='text-darkGrey text-[20px] my-auto' />
                                <input
                                    placeholder='Search'
                                    className='bg-transparent mx-2 py-2 md:w-[230px] w-full outline-none'
                                    onChange={(value: any) => setFilterData({...filterData ,searchParameter:value.target.value})}
                                />
                                <div onClick={ handleSearch} 
                                className='bg-primary-light flex align-middle cursor-pointer rounded-md text-white my-1'>
                                    <div className='h-fit px-2 my-auto'>Search</div>
                                </div>
                            </div>
                            <div onClick={() => handleMenu('filter')}
                                className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-5 mx-1.5 md:px-5 px-1.5`}>
                                <BiFilter className={`text-[25px] mr-1 my-auto`} />
                                Filter
                            </div>
                            <Popover
                                content={
                                    <FilterMenu
                                        filterValue={filterData}
                                        handleFilterValue={setFilterData}
                                        handleClose={() => setOpenFilter(false)}
                                        handleFilter={() =>usersData.refetch()}
                                    />}
                                trigger={'click'}
                                placement='bottom'
                                open={openFilter}
                            >
                            </Popover>
                            <div
                                onClick={() => handleMenu('export')}
                                className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-5 mx-1.5 md:px-5 px-1.5`}
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
                    tableData={usersData?.data?.data?.contents || []}
                    keys={keys}
                    loading={usersData.isLoading}
                    actionButton={<ViewButton />}
                    actionButtonAction={handleViewUser}
                />

                <TablePagination
                    totalPages={usersData?.data?.data?.pages}
                    currentPage={currentPage?.page}
                    // lastPage={undefined} 
                    nextPageAction={undefined}
                    prevPageAction={undefined}
                    setPage={setCurrentPage} lastPage={undefined} 
                />
            </div>


        </div>
        // </div >
    )
}

const ViewButton = () => {
    return (
        <div className='flex align-middle text-sm cursor-pointer text-primary-light font-medium'>
            <MdRemoveRedEye className='text-xl my-auto mr-1' />
            View
        </div>)
}

const dummyData = [
    { 'date': '12-12-2003', 'name': 'Ad3ey Jame', 'borrowerWallet': '0023992932', 'loanReference': 'iihwjkjk29932', 'status': 'Declined', },
    { 'date': '12-12-2003', 'name': 'Ad3ey Jame', 'borrowerWallet': '0023992932', 'loanReference': 'iihwjkjk29932', 'status': 'Active' }
]

