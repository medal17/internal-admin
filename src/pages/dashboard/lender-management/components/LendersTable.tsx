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
import { IoAdd } from 'react-icons/io5';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { BASE_URL } from '../../../../shared/constants';
import { AuthPayload } from '../../../../shared/authPayload';
import { TablePagination } from '../../../../components/tables/TablePagination';
import { LuArrowUpDown } from 'react-icons/lu';

export const LendersTable = () => {
    const headings = ['Company Name', 'Email', 'Number of Loan Products', 'Active Loan Processed',
        'Status', 'Action'];
    const keys = ['lenderName', 'lenderEmail', 'lenderProducts', 'lenderActiveLoans', 'lenderStatus', 'action'];
    const [currentPage, setCurrentPage] = useState({ page: 1 })
    const [openFilter, setOpenFilter] = useState(false);
    const [search, setSearch] = useState('');
    const [openExport, setOpenExport] = useState(false)
    const navigate = useNavigate()

    const [filterData, setFilterData] = useState({
        "searchParameter": "",
        "page": 1,
        "pageSize": 10,
        loanProducts: '',
        activeLoans: '',

    })

    // useEffect(()=>{window.location.reload},[])

    
    const lendersData = useRequest(`${BASE_URL.LOAN}fetch/lenders/list/request`, 'post',
        'get-lenders-list', { ...AuthPayload, ...filterData }, currentPage?.page, filterData);
    // /
    useEffect(()=>{
        setOpenExport(false);
        setOpenFilter(false);
        // setOpenSort(false)
    },[lendersData.data])

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



    const handleSort = (item: any) => {
        setFilterData(
            item.key === 'activeLoans' ?
                { ...filterData, 'loanProducts': '', [item?.key]: item?.value }
                :
                { ...filterData, 'activeLoans': '', [item?.key]: item?.value }

        );
        // lendersData?.refetch()
    }

    const handleViewLender = (data: any) => {
        navigate('/dashboard/lenders-management/view', { state: data })
    }
    return (
        <div>
            <div className='bg-white rounded-lg'>
                <div className='p-6 flex flex-wrap justify-between'>
                    <h3 className='my-auto'>Lenders List</h3>
                    <div>
                        <div className='flex flex-wrap'>
                            <div className='flex border h-[40px] rounded-md md:w-[350px] w-full md:my-0 my-3 border-darkGrey pl-2'>
                                <FiSearch className='text-darkGrey text-[20px] my-auto' />
                                <input
                                    placeholder='Search'
                                    className='bg-transparent mx-2 py-2 md:w-[230px] w-full outline-none'
                                    onChange={(value: any) => setSearch(value.target.value)}
                                />
                                <div onClick={() =>setFilterData({...filterData, 'searchParameter':search})}
                                    className='bg-primary-light flex align-middle cursor-pointer rounded-md text-white my-1'>
                                    <div className='h-fit px-2 text-sm my-auto'>Search</div>
                                </div>
                            </div>
                            {/* <div onClick={() => handleMenu('filter')}
                                className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-2 mx-1.5 md:px-5 px-1.5`}>
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
                            </Popover> */}

                            <div onClick={() => handleMenu('filter')}
                                className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-2 mx-1.5 md:px-5 px-1.5`}>
                                <LuArrowUpDown className='my-auto' /> &nbsp;
                                Sort
                            </div>
                            <Popover
                                content={
                                    sortList.map((item) =>
                                        <div onClick={() => handleSort(item)} 
                                            className='font-primary py-1 px-1 hover:bg-grey cursor-pointer'
                                        >
                                            {item?.name}
                                        </div>)}
                            trigger={'click'}
                            placement='bottom'
                            open={openFilter}
                            >
                        </Popover>
                        <div
                            onClick={() => handleMenu('export')}
                            className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-2 mx-1.5 md:px-5 px-1.5`}
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

                        <div className='bg-primary-light cursor-pointer text-white rounded-lg flex align-middle px-3'>
                            <IoAdd className='my-auto' />
                            <div onClick={() => navigate('/dashboard/lenders-management/add')} className='my-auto font-semibold pl-2'>
                                Add Lender
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ServiceTable
                headings={headings}
                tableData={lendersData?.data?.data?.contents || []}
                loading={lendersData.isLoading}
                keys={keys}
                actionButton={<ViewButton />}
                actionButtonAction={handleViewLender}
            />
            <TablePagination
                totalPages={lendersData?.data?.data?.pages}
                currentPage={currentPage?.page}
                // lastPage={undefined} 
                nextPageAction={undefined}
                prevPageAction={undefined}
                setPage={setCurrentPage}
                lastPage={undefined}
            />
        </div>
        </div >
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

const sortList = [
    { name: 'Number of loan products (low to high)', key: 'loanProducts', value: 'DESC' },
    { name: 'Number of loan products (high to low)', key: 'loanProducts', value: 'ASC' },
    { name: 'Active loans processed (high to low)', key: 'activeLoans', value: 'DESC' },
    { name: 'Active loans processed (low to high)', key: 'activeLoans', value: 'ASC' },
]

