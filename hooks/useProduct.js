import { useEffect, useState } from "react";
import api from "../config/axios";
import { message } from "antd";

const useProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const { data: resProducts } = await api.get("/product");
      setProducts(resProducts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusProduk = async (product_id) => {
    try {
      await api.delete(`/product/delete/${product_id}`);
      message.success("berhasil hapus produk");
    } catch (error) {
      message.error("gagal hapus produk");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, hapusProduk, fetchData };
};

export { useProduct };
