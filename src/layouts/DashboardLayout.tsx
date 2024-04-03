import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Protected from "../routes/protectedRoute";
import { DashboardNavbar } from "../components/navbar/dashboardNav";
import SideBar from "../components/navbar/side-bar/SideBar";
import MobileSideBar from "../components/navbar/side-bar/MobileSideBar";
import './layout.css'
import { useRequest } from "../shared/hooks/useRequest";
import { ENDPOINTS } from "../shared/constants";
export const DashboardLayout=()=> {
    const [isOpen, setIsOpen] = useState(false)
    const userDetails = useRequest(ENDPOINTS.GET_PROFILE,
        'get',
        'get-user-profile')?.data
    
// console.log('eee', userDetails)
    const handleToggle=()=>{
        setIsOpen(!isOpen)
    }


    return (
        <Protected isSignedIn={true} children={
        <div className="flex h-[100vh] w-full overflow-y-hidden overflow-x-hidden bg-grey bg-opacity-50">
            <div className="lg:flex hidden h-full lg:w-[16rem] w-[16rem] overflow-y-hidden  
               menu">
                <SideBar userDetails={userDetails} isOpen={isOpen} toggle={handleToggle} />
            </div>
            <div className={`flex z-50 ${isOpen?'':'hidden'}  h-full w-10/12 pt-12 bg-white fixed  
             border-r border-r-darkGrey border-opacity-30 `}>
                <MobileSideBar isOpen={isOpen} toggle={handleToggle} />
            </div>
            <div className="lg:w-10/12 w-full h-full overflow-y-scroll overflow-x-hidden">
                <div className="pb-1 ">
                <span className=""><DashboardNavbar/></span>
                {/* <span className="lg:hidden flex"><MobileNavbar/></span>  */}
                </div>
                <div className="mt-20  w-[100%] h-full pb-96 lg:ml-aut ml-0 md:px-8 px-3">
                    <Outlet/>
                </div>
            </div>
        </div>
        } />
    )
 }