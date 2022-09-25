import React,{FC} from 'react'

import "./DropDownCard.css";

interface DropDownCardProps{
    title?: string;
    backGroundColor?: string;
    height?: string;
    icon?: any; 
}


const DropDownCard:FC <DropDownCardProps> = ({title,backGroundColor,height,icon}) => {
  return (
    <div className='drop-down-card' style={{backgroundColor:backGroundColor,height:height}}>

        <p>{icon}</p>
        <p>{title}</p>

    </div>
  )
}

export default DropDownCard