import { Popover } from 'antd'
import React, { useState } from 'react'

export const ChartTab = (props: { tabList: string[], currentTab: string, setCurrentTab: Function }) => {
  const [tab, setTab] = useState(props.currentTab)
  const thisYear = new Date().getFullYear()
  const [showPopper, setShowPopper] = useState(false)

  const currentYear = new Date().getFullYear()
  const years = [];
  for (let i = 2022; i <= currentYear; i++) {
      years.push(i);
  }
  const handleSetTab = (item: string) => {
    setTab(item);
    props.setCurrentTab(item === 'This Year' ? thisYear : (item === 'Last Year' ? thisYear - 1 : ''))
  }

  const handleSetCustomTab = (item: string) => {
    setTab(item);
    setShowPopper(true)
  }

  const handlePickYear = (item: string) => {
    props.setCurrentTab(item)
    setShowPopper(false)
  }
  return (
    <div className='flex border border-darkGrey rounded-md cursor-pointer'>
      {props.tabList.map((item, index) =>
        item === 'Custom Year' ?
          <Popover
            content={<div className=' w-full px'>
              {years.map((item:string)=>
              <div onClick={()=>handlePickYear(item)} className='block text-lg hover:text-white hover:bg-darkGrey px-3 cursor-pointer'>{item}</div>)}
              </div>}
            trigger={'click'}
            placement='bottom'
            className=' mx-0'
            visible={showPopper}
          >
            <div
              onClick={() => handleSetCustomTab(item)}
              className={`px-5 py-2 ${index == 0 ? 
                'rounded-l-md' : index === props.tabList.length - 1 ? 
                'rounded-r-md' : 'border-x border-darkGrey'} 
                ${item === tab && 'bg-primary-light text-white'}`}
            >
              {item}
            </div>
          </Popover> :
          <div
            onClick={() => handleSetTab(item)}
            className={`px-5 py-2 ${index == 0 ? 'rounded-l-md' : index === props.tabList.length - 1 ? 'rounded-r-md' : 'border-x border-darkGrey'} ${item === tab && 'bg-primary-light text-white'}`}>
            {item}
          </div>
      )}
    </div>
  )
}
