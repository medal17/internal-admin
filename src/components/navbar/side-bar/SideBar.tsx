import React, { useState } from "react";

import { RxDashboard } from 'react-icons/rx'
import { IoSettingsOutline } from "react-icons/io5";
import { SideNavButton } from "../../buttons/SideNavButton";
import './side-menu.css'
import WhiteLogo from '../../../assets/images/white-logo.png'
import { Wallet } from "../../../assets/icons/Wallet";
import { useRequest } from "../../../shared/hooks/useRequest";
import { BASE_URL, ENDPOINTS } from "../../../shared/constants";
import { TbLogout2 } from "react-icons/tb";
import { CustomModal } from "../../modal";
import { Logout } from "../../cards/Logout";
import { login, logout } from "../../../shared/services/authentication";
import { HiOutlineBriefcase, HiOutlineUsers } from "react-icons/hi2";
import { LuUser2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { PiNotepadLight } from "react-icons/pi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Popover } from "antd";
import { IoIosCheckmarkCircle } from "react-icons/io";


interface sideBarModel {
  isOpen: boolean,
  toggle: Function,
  userDetails: any
}

const SideBar = (props: sideBarModel) => {
  const navigate = useNavigate()
  const [logOut, setLogout] = useState(false)
  const [openAppInView, setOpenAppInView] = useState(false)
  const { userDetails } = props

  // BASE_URL.ID
  // const applicationList = useRequest(`${BASE_URL.ID}/fetch/light/application/infos`,
  //   'get', 'get-app-list')

    // console.log('app-list',applicationList?.data?.data)

  return <div className='w-[17.1%] bg-[#124630] bg-blend-multiply menu'>
    <div className="side-menu h-screen">
      <nav className="list-unstyled h-4/5 space-y-4 px-3">
        <div onClick={() => setOpenAppInView(!openAppInView)} className="py-3 bg-[#435FAA] mt-2 flex-col px-5 cursor-pointer text-white align-middle rounded-md">
          <div className="h-fit my-auto">
            <div className="text-[12px]">App in view</div>
            <div className="flex align-middle justify-between h-fit w-full my-auo ">
              <div className="text-[12] font-poppins font-semibold"> Monicenta</div>
              <div className="ml-auto text-2xl my-auto"><MdOutlineArrowDropDown /></div>
            </div>

          </div>
          <div className="-ml-5">
            <Popover
              className="w-full"
              content={
                <div className=' py-1 px-1 font-poppins  w-[208px]'>
                  <div className="hover:bg-grey cursor-pointer p-2">Pouchii</div>
                  <div className="hover:bg-grey cursor-pointer p-2 border-t border-darkGrey flex align-middle justify-between">
                    MoniCenta
                    <IoIosCheckmarkCircle className='text-lightGreen text-xl my-auto' />
                  </div>
                  <div className="hover:bg-grey cursor-pointer p-2">FundaCause</div>
                </div>}
              trigger={'click'}
              placement='bottomLeft'
              open={openAppInView}
            /></div>

          {/* </Popover> */}
        </div>


        {/* <img src={WhiteLogo} width={'60%'} className="mx-auto py-5" /> */}
        <br />
        {menus.map(item =>
          <div>
            <SideNavButton
              key={item.title}
              otherTargets={item?.otherTargets}
              icon={item.icon}
              activeIcon={item.activeIcon}
              label={item.title}
              route={item.target}
            />
          </div>)}
        <br />
        <hr className="opacity-20 mt-auto" />
      </nav>

      <div className="border rounded-md border-opacity-30 border-grey mx-4 mt-auto">
        {otherMenus.map(item => item.title === 'Logout' ?
          <div className="" onClick={() => setLogout(true)}>
            <SideNavButton
              key={item.title}
              icon={item.icon}
              label={item.title}
              route={item.target}
              otherTargets={[]}
            // clickAction={}
            />
          </div> :
          <div className="" >

            <SideNavButton
              key={props.userDetails?.data?.firstName + ' ' + userDetails?.data?.lastName}
              icon={item.title === 'Profile' ?
                <img src={userDetails?.data?.avatar}
                  className="text-lg border h-8 w-8 rounded-full bg-darkGrey font-medium" />
                : item.icon}
              label={item.title}
              activeIcon={item.title === 'Profile' ?
                <img src={userDetails?.data?.avatar} className="text-lg border h-8 w-8 rounded-full bg-darkGrey font-semibold" />
                : item.activeIcon}
              route={item.target}
              sub="Edit User Profile"

            />
            {item.title === 'Profile' &&
              <hr className="border-t w-10/12 mx-auto border-white border-opacity-30" />
            }
          </div>
        )}
      </div>
    </div>
    <CustomModal
      status={logOut}
      bgColor={""}
      component={<Logout action={() => logout(() => navigate(window && window.location.origin.includes('stagingapi') ? '/login' : '/'))} closeAction={() => setLogout(false)} />}
      toggle={() => setLogout(false)}
    />
  </div>
};


const menus = [
  {
    title: "Dashboard",
    target: "/dashboard",
    icon: <RxDashboard className="text-lg font-semibold" />,
    otherTargets: ['/dashboard/providers', '/dashboard/additional-info'],
    activeIcon: <RxDashboard className="text-lg text-white font-semibold" />
  },
  {
    title: "Users",
    target: "/dashboard/users",
    icon: <HiOutlineUsers className='text-xl text-darkGrey' />,
    otherTargets: ['/dashboard/users', '/dashboard/additional-info'],
    activeIcon: <HiOutlineUsers className='text-xl' />
  },
  {
    title: "Loan Management",
    target: "/dashboard/loan-management",
    icon: <HiOutlineBriefcase className='text-xl text-darkGrey' />,
    otherTargets: ['/dashboard/users', '/dashboard/additional-info'],
    activeIcon: <HiOutlineBriefcase />
  },
  {
    title: "Lenders Management",
    target: "/dashboard/lenders-management",
    icon: <HiOutlineBriefcase className='text-xl text-darkGrey' />,
    otherTargets: ['/dashboard/users', '/dashboard/additional-info'],
    activeIcon: <HiOutlineBriefcase />
  },
  // {
  //   title: "User Admin",
  //   target: "/dashboard/user-admin",
  //   icon: <LuUser2 className='text-xl text-darkGrey' />,
  //   otherTargets: ['/dashboard/user-admin', '/dashboard/additional-info'],
  //   activeIcon: <Wallet />
  // },
  // {
  //   title: "Audit Log",
  //   target: "/dashboard/audit-log",
  //   icon: <PiNotepadLight className='text-xl text-darkGrey' />,
  //   otherTargets: ['/dashboard/users', '/dashboard/additional-info'],
  //   activeIcon: <PiNotepadLight />
  // }
];

const otherMenus = [
  {
    title: "Profile",
    target: "/dashboard/profile",
    icon: <img src={''} className="text-lg h-8 w-8 rounded-full bg-darkGrey font-semibold" />,
    activeIcon: <img src='' className="text-lg h-8 w-8 rounded-full bg-darkGrey font-semibold" />
  },
  {
    title: "Logout",
    target: "#",
    icon: <TbLogout2 className="text-[22px]" />,
    activeIcon: <TbLogout2 className="text-[22px]" />
    // action:()=>alert('')
  }
]


export default SideBar;
