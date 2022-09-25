import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import DashboarPageLayout from "../PageLayout/DashboarPageLayout";
import CardLayout from "../../components/CardLayout";
import "./CreateCategory.css";
import CategoryList from "./CategoryList";
import {
  CreateCategoryProps,
  createCategory,
  getCategoryList,
  deleteCategory
} from "../../API";

const CreateCategory = () => {
  const [category, setCategory] = useState<string>("");

  const [categoryList, setCategoryList] = useState<any[]>([]);

  // // to create category
  const onSubmitCreateCategory = async (e: any) => {
    e.preventDefault();
    try {
      const payload: CreateCategoryProps = {
        categoryName: category,
      };
      const res = await createCategory(payload);
      if (res) {
        toast.success("Category Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCategory("");
        getAllCategoryList();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to get all the category

  const getAllCategoryList = async () => {
    try {
      const res = await getCategoryList();
      setCategoryList(res.data);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };



  // // to delete category

  const onDeleteSingleCategory = async (id: number) => {
    try {
      const res = await deleteCategory(id);

      if (res) {
        toast.success("Category Deleted Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getAllCategoryList();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    getAllCategoryList();
  }, []);

  return (
    <DashboarPageLayout>
      <div className="category-main">
        <CardLayout title="Create Category" backgroun_color="white">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="form-designs">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-control"
                      placeholder="Category name..."
                    />
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={(e) => onSubmitCreateCategory(e)}
                    >
                      Create Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CardLayout>

        {/* to show list of category */}
        <CardLayout backgroun_color="white">
          {categoryList &&
            categoryList.map((item, index) => (
              <CategoryList
                category={item}
                key={index}
                visibleButton={true}
                onDeleteCategory={() => onDeleteSingleCategory(item._id)}
              />
            ))}
        </CardLayout>

        <ToastContainer autoClose={8000} />
      </div>
    </DashboarPageLayout>
  );
};

export default CreateCategory;
