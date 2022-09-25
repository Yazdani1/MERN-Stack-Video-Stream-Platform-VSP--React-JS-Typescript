import React,{ReactNode} from 'react'
import Sidebar from "../../components/Sidebar/Sidebar"

interface IPropsDahboardPageLayout {
    children: ReactNode;
  }

const DashboarPageLayout = ({children}:IPropsDahboardPageLayout) => {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-xl-2'>
                <Sidebar/>
            </div>
            <div className='col-xl-10'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboarPageLayout