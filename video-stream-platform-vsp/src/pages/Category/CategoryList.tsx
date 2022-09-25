import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CategoryListProps } from "../../DataProvider";
import {
  Navigate,
  useLocation,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

interface CategoryRowProps {
  category: CategoryListProps;
  onDeleteCategory?: () => void;
  visibleButton?: boolean;
  linkid?: true;
}

const CategoryList = ({
  category,
  onDeleteCategory,
  visibleButton,
  linkid,
}: CategoryRowProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {linkid ? (
        <Link
          to={"/category/" + category.slug}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            className="category-list"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <div>
              <h6>{category.categoryName}</h6>
            </div>

            {visibleButton && show && (
              <div>
                <button
                  style={{ marginRight: "20px" }}
                  className="btn btn-success"
                >
                  Edit
                </button>
                <button className="btn btn-danger" onClick={onDeleteCategory}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div
          className="category-list"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div
            style={{
              display: "flex",
              flex: "4",
            }}
          >
            <h6>{category.categoryName}</h6>
            <h6
              style={{ marginLeft: "40px" }}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              {show && <p> Created on: {category.date}</p>}
            </h6>
          </div>

          {visibleButton && show && (
            <div>
              <button
                style={{ marginRight: "20px" }}
                className="btn btn-success"
              >
                Edit
              </button>
              <button className="btn btn-danger" onClick={onDeleteCategory}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryList;
