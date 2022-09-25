import React, { ReactNode, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarMobileView from "../../components/Navbar/NavbarMobileView";
import SidebarHome from "../../components/Navbar/SidebarHome";
import "./PageLayout.css";

interface IPropsPageLayout {
  children: ReactNode;
}

const PageLayout = ({ children }: IPropsPageLayout) => {
  const [expandSidebar, setExpandSidebar] = useState(true);

  const handleExpandClick = () => {
    setExpandSidebar(!expandSidebar);
  };

  return (
    <div className="container-fluid">
      <Navbar handleExpandClick={handleExpandClick} />
      <NavbarMobileView />

      <div className="row">
        <div className={expandSidebar ? "col-xl-2" : "col-xl-1"}>
          <div className="sidebar-margin">
            <SidebarHome expandSidebar={expandSidebar} />
          </div>
        </div>
        <div className={expandSidebar ? "col-xl-10" : "col-xl-11"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
