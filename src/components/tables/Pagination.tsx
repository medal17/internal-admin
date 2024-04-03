import React, { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import {RiArrowDropLeftFill} from 'react-icons/ri'

type paginationModel =  {
    currentPage: number,
    nextPageAction: Function,
    prevPageAction: Function,
    setPage:Function,
    totalPages: number,
}

export const Pagination = (props: paginationModel) => {
    const [pageList, setPageList] = useState<Array<number>>([]);
    const buttonStyle=`flex align-middle cursor-pointer justify-center  rounded-[5px] h-[34px] w-[34px]`
    // let pagesNumber:number[] = []
    useEffect(() => {
        setPageList([]);
        for (let i = 1; i <= props.totalPages; i++) {
            setPageList(current=>[...current, i]);
        }
    }, [])

    return (
        <div className='border-t border-t-darkGrey border-opacity-30 flex justify-between py-2 mt-20'>
            <button onClick={()=>props.currentPage>1&&props.prevPageAction()} 
                className='flex align-middle cursor-pointer'>
                <span className='my-auto' ><FiArrowRight className='rotate-180' /></span><span className='my-auto'>Previous</span>
            </button>
            { pageList.map((item,index)=>
                <button key={index} onClick={props.setPage(item)} className={` ${props.currentPage===item&&'bg-primary-light text-white'} ${buttonStyle}`}>
                    <span className='my-auto h-fit'>{item}</span>
                </button>
                )
            } 
            
            <button onClick={()=>props.currentPage<props.totalPages&&props.nextPageAction()} 
                className='flex align-middle cursor-pointer'>
                <span className='my-auto'>Next</span><span className='my-auto' ><FiArrowRight /></span>
            </button>
        </div>
    )
}

export const TablePagination = (props: paginationModel) => {
    const [pageList, setPageList] = useState<Array<number>>([]);
    const buttonStyle=`flex align-middle cursor-pointer justify-center  rounded-[5px] h-[34px] w-[34px]`
    let pagesNumber:number[] = []
    useEffect(() => {
        setPageList([]);
        for (let i = 1; i <= props.totalPages; i++) {
            setPageList(current=>[...current, i]);
        }
    }, [props.totalPages])
    return (
        <div className=' flex justify-between  py-2'>
            <button onClick={()=>props.currentPage>1&&props.prevPageAction()} 
                className=' align-middle'><RiArrowDropLeftFill className='text-3xl text-darkGrey' />
            </button>
            { pageList.map((item,index)=>
                <button onClick={()=>props.setPage({page:item,pageSize:10, lastRecord:76})} className={` ${props.currentPage===item?'bg-primary-light text-white':'text-darkGrey'} ${buttonStyle}`}>
                    <span className='my-auto h-fit'>{item}</span>
                </button>
                )
            } 
            
            <button onClick={()=>props.currentPage>1&&props.prevPageAction()} 
                className=' align-middle '><RiArrowDropLeftFill className='text-3xl text-darkGrey rotate-180' />
            </button>
        </div>
    )
}
