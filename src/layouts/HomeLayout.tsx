import React from "react";
import { Outlet } from "react-router-dom";
// import { Footer } from "../../components/footer";
// import { Navbar } from "../../components/navbar";
// import { MobileNavbar } from "../../components/navbar/MobileNav";

export const HomeLayout=(props:{mobileNavOnly?:boolean})=> {
    return (
        <div className="h-full w-full bg-red-300">
  
            <Outlet/>
        </div>
    )
 }