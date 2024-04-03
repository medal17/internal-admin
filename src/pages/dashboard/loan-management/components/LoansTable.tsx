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
import { LuArrowUpDown } from 'react-icons/lu';
import { CustomModal } from '../../../../components/modal';
import { ViewMore } from './ViewMore';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { BASE_URL } from '../../../../shared/constants';
import { AuthPayload } from '../../../../shared/authPayload';
import { TablePagination } from '../../../../components/tables/TablePagination';

export const LoanTable = () => {
    const headings = ['Date of Loan Application', 'Customer Name', 'Provider', 'Loan Type',
        'Loan Amount', 'Status', 'Action'];
    const keys = ['dateOfLoanApplication', 'fullName', 'provider', 'loanType', 'loanAmount', 'loanStatus', 'action'];
    const [currentPage, setCurrentPage] = useState({page:1})
    const [search, setSearch] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [openExport, setOpenExport] = useState(false)
    const [openSort, setOpenSort] = useState(false)
    const [sortType, setSortType] = useState('')
    const navigate = useNavigate();
    const [openViewMore, setOpenViewMore] = useState(false)
    const [data, setData] = useState<any>()
    const [filterData, setFilterData] = useState({
        "searchParameter": "",
        "sortByDateOfApplication": "",
        "borrowersName": "",
        "startDate": null,
        "endDate": null,
        "provider": "",
        "loanType": "",
        "loanStatus": "",
        "minimumLoanAmount": "",
        "maximumLoanAmount": ""
    })
    const loansData = useRequest(`${BASE_URL.LOAN}fetch/loan/list/${currentPage?.page}/10`, 'post',
        'get-user-loans', { ...AuthPayload, ...filterData }, currentPage?.page);

        useEffect(()=>{
            setOpenExport(false);
            setOpenFilter(false);
            setOpenSort(false)
        },[loansData.data])


    const handleMenu = (type: string) => {
        // console.log()
        if (type === 'export') {
            setOpenExport(!openExport);
            setOpenFilter(false)
            setOpenSort(false)
        } else if (type === 'filter') {
            setOpenExport(false)
            setOpenFilter(!openFilter)
            setOpenSort(false)
        } else {
            setOpenExport(false)
            setOpenFilter(false)
            setOpenSort(!openSort)
        }

    }

    const handleSort=(item:any)=>{
        item.key ==='borrowersName'
        setFilterData(
            item.key ==='borrowersName'?
            {...filterData, 'sortByDateOfApplication':'', [item?.key]:item?.value}
            :
            {...filterData, 'borrowersName':'', [item?.key]:item?.value}

            );
        loansData?.refetch()
    }

    // console.log('rrrr',filterData)

    const handleViewMore = (data: any) => {
        setData(data)
        setOpenViewMore(true)
    }

    const handleSearch=()=>{
        setCurrentPage({page:1})
        loansData.refetch()
    }
    return (
        <div>
            <div className='bg-white rounded-lg'>
                <div className='p-6 flex flex-wrap justify-between'>
                    <h3 className='text-lg font-semibold'>Loan List</h3>
                    <div>
                        <div className='flex flex-wrap'>
                            <div className='flex mx-2 px-1 border-[1.5px] rounded-md md:w-[340px] py-1 h-[40px] w-full md:my-0 my-3 border-darkGrey pl-2'>
                                <FiSearch className='text-darkGrey text-[20px] my-auto' />
                                <input
                                    placeholder='Search'
                                    className='bg-transparent mx-2 flex justify-center md:w-[230px] w-full outline-none'
                                    onChange={(value: any) => setFilterData({...filterData,searchParameter:value.target.value})}
                                />
                                <div onClick={handleSearch} 
                                className='bg-primary-light flex align-middle cursor-pointer rounded-md text-white '>
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
                                        handleFilterValue={setFilterData}
                                        handleFilter={()=>loansData.refetch()}
                                        handleClose={() => setOpenFilter(false)}
                                    />}
                                trigger={'click'}
                                placement='bottom'
                                open={openFilter}
                            >
                            </Popover>

                            {/* /////////////////////Sort////////////////// */}
                            <div
                                onClick={() => handleMenu('sort')}
                                className={`${tabelTitleStyle} md:w-fit w-3/12
                                cursor-pointer h-[40px] md:mx-1 mx-1.5 md:px-5 px-1.5`}
                            >
                                <LuArrowUpDown className='my-auto' /> &nbsp;
                                Sort
                            </div>
                            <Popover
                                content={
                                    sortList.map((item) =>
                                        <div onClick={() => handleSort(item)} className='font-primary py-1 px-1 hover:bg-grey cursor-pointer'>
                                            {item?.name}
                                        </div>)}
                                trigger={'click'}
                                placement='bottomLeft'
                                open={openSort}
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
                    tableData={loansData?.data?.data?.contents || []}
                    loading={loansData.isLoading}
                    keys={keys}
                    actionButton={<ViewButton />}
                    nofixedWidth
                    actionButtonAction={handleViewMore}
                />

                <TablePagination
                    totalPages={loansData?.data?.data?.pages}
                    currentPage={currentPage?.page}
                    // lastPage={undefined} 
                    nextPageAction={undefined}
                    prevPageAction={undefined}
                    setPage={setCurrentPage} 
                    lastPage={undefined}
                />
            </div>

            <CustomModal
                status={openViewMore}
                bgColor={''}
                component={<ViewMore data={data} />}
                toggle={() => setOpenViewMore(false)}
            />
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

const sortList = [
    {name:'Date of application (Newest to Oldest)', key:'sortByDateOfApplication', value:'ASC'},
    {name:'Date of application (Oldest to Newest)', key:'sortByDateOfApplication', value:'DESC'},
    // {name:'Borrowers Name', key:'borrowersName', value:'DESC'}
]

