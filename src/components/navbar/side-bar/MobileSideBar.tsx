import React, { useState } from "react";
import {RxDashboard} from 'react-icons/rx'
// import ServicesIcon from '../../assets/images/icons/services-icon.svg'
// import ClaimsIcon from '../../assets/images/icons/claims-icon.svg'
// import SavedIcon from '../../assets/images/icons/saved-docs-icon.svg'
// import ReportsIcon from '../../assets/images/icons/report-icon.svg'
// import certificatesIcon from '../../assets/images/icons/certificates-icon.svg'
// import LogoutIcon from '../../assets/images/icons/logout-icon.svg'
// import ProfileIcon from '../../assets/images/icons/Profile.svg';
import {IoClose} from 'react-icons/io5'
import { MobileSideNavButton } from "../../buttons/SideNavButton";


interface sideBarModel {
    isOpen:boolean, 
    toggle:Function 
}
const MobileSideBar = (props:sideBarModel) => {

  const [openLoans, setOpaneLoan] = useState<boolean>(false);
  const [openInsurance, setOpenInsurance] = useState<boolean>(false);
  return (
  <div className="w-full px-2">
    <div className="w-full flex pb-10">
      <span onClick={()=>props.toggle()} className="rounded-full ml-auto w-fit bg-darkGrey bg-opacity-20">
        <IoClose className="m-1.5 text-xl"/>
      </span>
    </div>

    <div className="side-menu  w-full">
      <nav  className="list-unstyled w-full  space-y-4 px-3">
            {
            menus.map(item=>
            <div onClick={()=>props.toggle()}>
              <MobileSideNavButton  icon={item.icon} label={item.title} route={item.target}/>
            </div>)
            }

          <div  className={`w-full pt-5 `}>
            <div className="flex justify-between py-2 mb-3 ml-5 text-xs font-poppins 
              font-medium my-auto">
              <span className="opacity-50">LOAN</span>
              {/* <span><IoIosArrowDown className="text-base"/></span> */}
            </div>
           
          </div>
            {otherMenus.map(item=>
            <div onClick={()=>props.toggle()}>
              <MobileSideNavButton icon={item.icon} label={item.title} route={item.target}/>
            </div>
            )}
      </nav>
    </div>
  </div>
  )
};


const menus = [
    {title: "Dashboard", target: "/dashboard",icon: <RxDashboard className="text-sm font-semibold"/> },
    // {title: "Services", target: "/dashboard/services",icon: <img alt="services" src={ServicesIcon}/> },
    {title: "Certificates", target: "/dashboard/certificates",icon: <img alt="claims" src={''}/> },
    {title: "Reports", target: "/dashboard/reports",icon: <img src={''} className='w-3.5' alt="reports" /> },
      {title: "Vault", target: "/dashboard/saved",icon: <img src={''} alt="saved docs" className="w-3.5" /> }   
];



const otherMenus = [
    {title: "Profile", target: "/dashboard/profile",icon: <img src={''} alt="profile" /> },
    {title: "Logout", target: "#",icon: <img src={''} alt="log out" /> }  
]


export default MobileSideBar;
