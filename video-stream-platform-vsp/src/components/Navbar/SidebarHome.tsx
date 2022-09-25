import React, { useState } from "react";
import "./SidebarHome.css";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import SidebarListHomePage from "./SidebarListHomePage";

interface SidebarProps{
    expandSidebar?:boolean;
   
}


const SidebarHome = ({expandSidebar}:SidebarProps) => {
   
  return (
    <div className="container-fluid home-sidebar-section">
      <div className={expandSidebar ? "home-sidebar-expand home-sidebar":"home-sidebar"}>
        <SidebarListHomePage expandSidebar={expandSidebar}/>
      </div>

    </div>
  )
}

export default SidebarHome