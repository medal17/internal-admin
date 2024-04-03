import React, { useEffect, useState } from 'react';
import { Empty, Popover, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { tabelTitleStyle } from '../../wallet/wallet';
import { BiFilter } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { ServiceTable } from '../../../../components/tables/ReuseableTable';
import { ExportIcon } from '../../../../assets/icons/ExportIcon';
import { ExportMenu } from './ExportMenu';
import { FilterMenu } from './FilterMenu';
import { useRequest } from '../../../../shared/hooks/useRequest';
import { AuthPayload } from '../../../../shared/authPayload';
import { ENDPOINTS } from '../../../../shared/constants';
import { IoMdArrowDropdown } from 'react-icons/io';
import { currencyFormat } from '../../../../shared/currencyFormat';
import { truncateText } from '../../../../core/functions/inputValidator';
import { TablePagination } from '../../../../components/tables/TablePagination';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];



const DashboardTable: React.FC = () => {
  const [expandedRow, setRow] = useState<number[]>();
  const [openFilter, setOpenFilter] = useState(false)
  const [openExport, setOpenExport] = useState(false)
  const [currentRow, setCurrentRow] = useState<any>()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState({ page: 1 })
  const [pickedReference, setPickedReference] = useState('')
  const headings = ['Date of Disbursment', 'Name', 'Loan reference number',
    'Principal', 'Repayment Amount', 'Loan Status'];
  const keys = ['date', 'fullName', 'loanReference', 'loanAmount', 'repaymentAmount', 'loanStatus'];

 

  // useEffect(()=>{
  //   // se
  // },[currentPage?.page, currentRow])
  const [filterData, setFilterData] = useState({
    "searchParameter": '',
    "startDate": null,
    "endDate": null,
    "loanStatus": "",
    "page": currentPage?.page,
    "pageSize": 10
  })

  const trxPayload ={
    "referenceNumber": currentRow?.disbursementReference,
    "partnerId": 2,
    "applicationId": 2
  }
  const getDailyLoan = useRequest(`${ENDPOINTS.LOAN}fetch/daily/loans`, 'post', 'get-daily-loans',
    { ...AuthPayload, ...filterData, 'page': currentPage?.page }, currentPage?.page);

  const loanDetails = useRequest(currentRow ? `${ENDPOINTS.TRANSACTION}my/transaction/history` : '', '[post]', 'get-loan-trx-details',
    {...AuthPayload,...trxPayload}, 0, currentRow&&currentRow);


    const moreData = [
      { key: 'borrowersWallet', title: 'Borrowers wallet number',value: loanDetails?.data?.data?.contents[0]?.beneficiaryAccount ||' - ' },
      { key: 'rate', title: 'Interest' },
      { key: 'tenure', title: 'Tenor' },
      { key: 'loanAmount', title: 'Loan Amount' },
      { key: 'incomeToStsl', title: 'Income To Stsl', value:loanDetails?.data?.data?.contents[0]?.transactionFeeAmount||0.00 },
      { key: 'fees', title: 'Income To Lender' },
    ]
    
  // fetch/loan/transaction/details?transactionReference=LOAN-IPEG-20231227-F3CX0UNITG8WJH23
  // return <Table
  //   columns={columns}

  //   expandable={{
  //     expandedRowRender: (record,index:number) => <p onClick={()=>setRow([index+1])} style={{ margin: 0 }}>{record.description}</p>,
  //   // expandedRowKeys:expandedRow
  //     //   rowExpandable: (record) => record.name !== 'Not Expandable',
  //   }}

  //   dataSource={data}
  // />

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

  const handleClickRow = (item: any) => {

    // setPickedReference(item?.loanReference)
    currentRow === item ?
      setCurrentRow(null) : setCurrentRow(item);
    // const getLoanDetails = useRequest(`${ENDPOINTS.TRANSACTION}fetch/loan/transaction/details?transactionReference=${item?.loanReference}`, 'get', 'get-loan-trx-details',
    //   item?.loanReference);

  }

  const handleSearch =()=>{
    setCurrentPage({page:1}); 
    getDailyLoan.refetch()
  }

  return (
    <div className='bg-white rounded-lg mb-10 h-[80vh]'>
      <div className='p-6 flex flex-wrap justify-between'>
        <h3>Daily Loan Report</h3>
        <div>
          <div className='flex flex-wrap'>
            <div className='flex border-2 h-[40px] rounded-md md:w-[350px] w-full md:my-0 my-3 border-darkGrey pl-2'>
              <FiSearch className='text-darkGrey text-[20px] my-auto' />
              <input
                placeholder='Search'
                className='bg-transparent mx-2 py-2 md:w-[230px] w-full outline-none'
                onChange={(value: any) => setFilterData({ ...filterData, 'searchParameter': value.target.value })}
              />
              <div onClick={handleSearch} className='bg-primary-light cursor-pointer flex align-middle  rounded-md text-white my-1'>
                <div className='h-fit px-2 text-sm my-auto'>Search</div>
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
                  handleFilter={() => getDailyLoan.refetch()}
                  handleClose={() => setOpenFilter(false)}

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
      {/* <ServiceTable
        headings={headings}
        tableData={dummyData}
        keys={keys}
      /> */}

      <div className='bg-white'>
        <div className='text-[12px] flex'>
          <div className='w-5 bg-[#F9FAFB]'></div>

          {headings?.map((item) =>
            <div className='w-2/12 bg-[#F9FAFB] py-2.5 px-1'>
              {item}
            </div>)}
          <div className='w-7 bg-[#F9FAFB]'></div>
        </div>
        {/* body */}
        {getDailyLoan.isLoading ?
          <div className='text-center py-44'>
            <Spin className='mx-auto mb-5' />
            <div className='text-darkGrey'>Loading Data</div>
          </div>
          :
          (getDailyLoan?.data?.data &&getDailyLoan?.data?.data?.pages>0
            ?
          <div>

            {getDailyLoan.data?.data?.contents?.map((item: any, index: number) =>
              <div key={index} className={`border-t border-black border-opacity-10 bg-white`}>
                <div onClick={() => handleClickRow(item)} className=' flex cursor-pointer'>
                  <div className='w-5 bg-white'></div>
                  {keys?.map((key, keyIndex) =>
                    <div key={keyIndex} className='w-2/12 text-wrap py-7 flex-wrap px-1 my-auto text-[14px]'>
                      {(key === 'loanAmount' || key === 'repaymentAmount') && item[key] ?
                        currencyFormat(Number(item[key] || 0)) :
                        (key === 'loanReference' ?
                          <div className='break-words'>{item[key]}</div>
                          // truncateText(item[key],20)
                          :
                          item[key])
                      }

                    </div>)}
                  <div className='mr-3 my-auto'><IoMdArrowDropdown className='text-2xl' /></div>
                </div>
                {item === currentRow && moreData.map((item2: any, index1: number) =>
                  // <div className={'py-3 px-5 `}>

                  <div key={index1} className={` ${index1 === 0 && 
                  'border-t border-black border-opacity-10 pt-5 '} 
                  ${index1 === moreData.length - 1 && ' pb-5'} 
                  flex mb-2 text-sm px-5`}>
                    <div className='w-[200px]'>{item2?.title}</div>
                    <span>{
                    
                    item2?.key ==='incomeToStsl'||item2?.key==='borrowersWallet'?item2?.value:
                      item2?.key === 'loanAmount' && item[item2?.key] ?
                      currencyFormat(Number(item[item2?.key]) || 0) :
                      item[item2?.key] || '-'}
                      {item2.key === 'rate' && '%'}
                    </span>
                    
                  </div>
                  // </div>
                )}
                
              </div>
            )}
          </div>
          :
          <div className='py-44'>
            <Empty/>
          </div>
          )}
        {getDailyLoan?.data?.data&& getDailyLoan?.data?.data?.pages>0&&
        <TablePagination
          totalPages={getDailyLoan?.data?.data?.pages}
          currentPage={currentPage?.page}
          // lastPage={undefined} 
          nextPageAction={undefined}
          prevPageAction={undefined}
          setPage={setCurrentPage} 
          lastPage={undefined}
        />}
      </div>
      <br />
    </div>
  )
};

// const dummyData = [
//   { 'date': '12-12-2003', 'name': 'Ad3ey Jame', 'borrowerWallet': '0023992932', 'loanReference': 'iihwjkjk29932', 'principal': '23000', 'repaymentAmount': '300000' },
//   { 'date': '12-12-2003', 'name': 'Ad3ey Jame', 'borrowerWallet': '0023992932', 'loanReference': 'iihwjkjk29932', 'principal': '23000', 'repaymentAmount': '300000' }
// ]




export default DashboardTable;