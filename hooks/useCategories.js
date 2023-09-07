import { useEffect, useState } from "react";
import api from "../config/axios";
import { message } from "antd";

const UseCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const { data: resCategories } = await api.get("/category");
      setCategories(resCategories.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (payload) => {
    try {
      await api.post("/category/create", payload);
      fetchData();
    } catch (error) {
      console.log(error);
      message.error("failed create category");
    }
  };

  const updateCategory = async (payload, category_id) => {
    try {
      await api.put(`/category/update/${category_id}`, payload);
      fetchData();
    } catch (error) {
      console.log(error);
      message.error("failed update category");
    }
  };

  const deleteCategory = async (category_id) => {
    try {
      await api.delete(`/category/delete/${category_id}`);
      fetchData();
    } catch (error) {
      console.log(error);
      message.error("failed delete category");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { categories, createCategory, deleteCategory, updateCategory };
};

export { UseCategories };
