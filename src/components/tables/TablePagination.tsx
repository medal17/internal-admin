// import React, { useEffect, useState } from 'react'
// import { BiArrowBack } from 'react-icons/bi'

import React from "react";
import { useCallback } from "react";
import './style.css'
import { BiArrowBack } from "react-icons/bi";

// interface PaginationModel {
//     totalPages: number,
//     currentPage: number,
//     lastPage: any,
//     nextPageAction: Function,
//     prevPageAction: Function,
//     setPage: Function
// }

// export const TablePagination = (props: PaginationModel) => {
//     const [pageList, setPageList] = useState<Array<number>>([]);
//     const [prevList, setPrevList] = useState([1, 2, 3])

//     const [currentPageH, setCurrentPage] = useState<any>(1);

//     const { totalPages, currentPage } = props
//     useEffect(() => {
//         setPageList([]);
//         for (let i = 1; i <= props.totalPages; i++) {
//             setPageList(current => [...current, i]);
//         }
//     }, [props.totalPages]);

//     useEffect(() => {
//         currentPage === prevList[2] && (prevList[prevList.length - 1] + 1) < pageList[pageList?.length - 3] &&
//             setPrevList([prevList[2], prevList[2] + 1, prevList[2] + 2])
//         currentPage === 1 && setPrevList([1, 2, 3])
//     }, [currentPage])

//     const handlePick = (page: any) => {
//         setCurrentPage(page)
//         props.setPage({ page: page, pageSize: 10, lastRecord: props.lastPage })
//     }

//     console.log('prev-last', prevList[prevList.length - 1] + 1)
//     console.log('post-first', pageList[pageList?.length - 3])
//     return (
//         <div className='py-3 px-8 col-lg-11 mx-auto flex justify-between '>
//             <button onClick={() => props.currentPage > 1 && handlePick(currentPage - 1)} className='h-fit flex border'>
//                 <BiArrowBack className='my-auto' />&nbsp;
//                 <div>Previous</div>
//             </button>
//             <div className='col-lg-5 mx-auto'>
//                 {totalPages > 0 && pageList?.length < 6 ? pageList.map((item, index) =>
//                     <button key={index} onClick={() => handlePick(item)} className={`page-button ${item === props.currentPage ? 'selected' : 'inactive px-3'} `}>
//                         {item}
//                     </button>) :
//                     <div className='mx-auto d-flex justify-content-center'>
//                         {pageList[pageList?.length - 3] > prevList[2] ?
//                             <>
//                                 <button onClick={() => handlePick(prevList[0])} className={`page-button ${prevList[0] === props.currentPage || currentPage === 0 ? 'selected' : 'inactive px-3'} `}>
//                                     {prevList[0]}
//                                 </button>
//                                 <button onClick={() => handlePick(prevList[1])} className={`page-button ${prevList[1] === props.currentPage ? 'selected' : 'inactive px-4'} `}>
//                                     {prevList[1]}
//                                 </button>
//                                 <button onClick={() => handlePick(prevList[2])} className={`page-button ${prevList[2] === props.currentPage ? 'selected' : 'inactive px-4'} `}>
//                                     {prevList[2]}
//                                 </button>
//                             </> :
//                             <button onClick={() => handlePick(pageList[0])} className={`page-button ${pageList[0] === props.currentPage || currentPage === 0 ? 'selected' : 'inactive px-3'} `}>
//                                 {pageList[0]}
//                             </button>
//                         }
//                         <span className='px-3 mt-2'>...</span>
//                         <button onClick={() => handlePick(pageList?.length - 3)} className={`page-button ${pageList?.length - 3 === props.currentPage ? 'selected' : 'inactive px-4'} `}>
//                             {pageList[pageList?.length - 3]}
//                         </button>
//                         <button onClick={() => handlePick(pageList?.length - 2)} className={`page-button ${pageList?.length - 2 === props.currentPage ? 'selected' : 'inactive px-4'} `}>
//                             {pageList[pageList?.length - 2]}
//                         </button>
//                         <button onClick={() => handlePick(pageList?.length - 1)} className={`page-button ${pageList?.length - 1 === props.currentPage ? 'selected' : 'inactive px-4'} `}>
//                             {pageList[pageList?.length - 1]}
//                         </button>
//                     </div>
//                 }
//             </div>
//             <button onClick={() => props.currentPage < pageList[pageList?.length - 1] && handlePick(currentPage + 1)} className='flex  border'>
//                 <div className='mr-2'>Next</div> &nbsp;
//                 <BiArrowBack className='arrow-right my-auto rotate-180' />
//             </button>
//         </div>
//     )
// }

interface PaginateProps {
    totalPages: number;
    currentPage: number;
    // setPage: (page: number) => void;
    // totalPages: number,
        // currentPage: number,
        lastPage: any,
        nextPageAction: Function,
        prevPageAction: Function,
        // setPage: (page: number) => void;
        setPage: Function;
  }
  
  export const TablePagination = React.memo(
    ({ totalPages, currentPage, setPage, lastPage }: PaginateProps) => {
     
      const handlePageChange = useCallback(
        (page: number) => {
          setPage({ page: page, pageSize: 10, lastRecord:lastPage });
        },
        [currentPage]
      );

    //   alert(currentPage)
  
      const visiblePages = 3;
      const ellipsisThreshold = 3;
  
      const getPageNumbers = useCallback(() => {
        const pageNumbers = [];
  
        if (totalPages <= visiblePages) {
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
              <div
                key={`page-${i}`}
                className={`${currentPage === i ? 'selected' : 'inactive'} flex align-middle justify-center`}
                onClick={() => handlePageChange(i)}
              >
                <div className="my-auto">{i}</div>
              </div>
            );
          }
        } else {
          const ellipsisStart = currentPage - ellipsisThreshold;
          const ellipsisEnd = currentPage + ellipsisThreshold;
  
          pageNumbers.push(
            <div
              key={`page-1`}
              className={`${currentPage === 1 ||currentPage === 0 ? 'selected' : 'inactive'} flex align-middle justify-center`}
              onClick={() => handlePageChange(1)}
            >
              <div className="my-auto">1</div>
            </div>
          );
  
          if (ellipsisStart > 2) {
            pageNumbers.push(<div key="ellipsis-start" className="mt-auto mb-0.5">...</div>);
          }
  
          for (let i = ellipsisStart; i <= ellipsisEnd; i++) {
            if (i > 1 && i < totalPages) {
              pageNumbers.push(
                <div
                  key={`page-${i}`}
                  className={`${currentPage === i ? 'selected ' : 'inactive'} flex align-middle justify-center`}
                  onClick={() => handlePageChange(i)}
                >
                  <div className="my-auto">{i}</div>
                </div>
              );
            }
          }
  
          if (ellipsisEnd < totalPages - 1) {
            pageNumbers.push(<div key="ellipsis-end" className="mt-auto mb-0.5">...</div>);
          }
  
          pageNumbers.push(
            <div
              key={`page-${totalPages}`}
              className={`${currentPage === totalPages ? 'selected ' : 'inactive'} flex align-middle justify-center`}
              onClick={() => handlePageChange(totalPages)}
            >
              <div className="my-auto">{totalPages}</div>
            </div>
          );
        }
  
        return pageNumbers;
      }, [
        currentPage,
        handlePageChange,
        totalPages,
        visiblePages,
        ellipsisThreshold,
      ]);
  
      return (
        <div className="paginate flex align-middle w-full py-3 mt-4 px-3">
          <div
            className="arrow border w-[110px] px-3 rounded-lg border-darkGrey cursor-pointer flex align-middle"
            onClick={() => setPage({ page: currentPage-1, pageSize: 10, lastRecord:lastPage } )}
          >
            {/* <ArrowLeft /> */}
            <BiArrowBack className='my-auto' />&nbsp;
            <div className="my-auto">Previous</div>
          </div>

          <div className="mx-auto w-11/12"> 
            <div className="flex justify-center">{getPageNumbers()}</div>
          </div>
          <div
            className="arrow ml-auto border w-[110px] px-5 rounded-lg border-darkGrey cursor-pointer flex align-middle"
            onClick={() => setPage({ page: currentPage+1, pageSize: 10, lastRecord:lastPage })}
          >
            <div className="my-auto mr-2">Next</div>
            <BiArrowBack className='arrow-right my-auto rotate-180' />
          </div>
        </div>
      );
    }
  );
  
