import React, { ReactNode } from "react";
import { Interface } from "readline";
import "./CardLayout.css";

interface IPropsCardLayout {
  title?: string;
  cardHeight?: string;
  children?: ReactNode;
  buttonColor?: string;
  backgroun_color?: string,
  closeButton?: () => void;
  closeButtonText?: string;
  postCount?: number;
}
const CardLayout = ({
  children,
  title,
  cardHeight,
  buttonColor,
  closeButton,
  closeButtonText,
  backgroun_color,
  postCount
}: IPropsCardLayout) => {
  return (
    <div className="card-layout-design" style={{ height: cardHeight,backgroundColor:backgroun_color }}>
      <h5>{title} {postCount}</h5>
      {children}
     
        {closeButton && (
          <button
            type="submit"
            name="btnSubmit"
            style={{ color: buttonColor }}
            className="btn btn-danger"
            onClick={closeButton}
          >
            {closeButtonText}
          </button>
        )}
    </div>
  );
};

export default CardLayout;
