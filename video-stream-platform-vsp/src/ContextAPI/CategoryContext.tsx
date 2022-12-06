import React, { useState, createContext, useEffect, FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getCategoryList } from "../API";

export const CategoryContext = createContext<null | any>(null);

type CategoryContextProviderProps = {
  children: React.ReactNode;
};

export const CategoryProvider: FC<CategoryContextProviderProps> = ({
  children,
}) => {
  const [category, setCategory] = useState<any[]>([]);

  const loadCategory = async () => {
    try {
      const res = await getCategoryList();
      setCategory(res.data);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return (
    <CategoryContext.Provider value={category}>
      {children}
      <ToastContainer autoClose={8000} />
    </CategoryContext.Provider>
  );
};
