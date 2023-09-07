import Head from "next/head";
import { useEffect, useState } from "react";

import { message } from "antd";
import { useRouter } from "next/router";
import ProductItem from "../../components/product/ProductItem";
import api from "../../config/axios";
import Filter from "../../components/Filter";

const Product = (props) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({});
  const router = useRouter();

  const fetchData = async () => {
    try {
      const { data: resProducts } = await api.get("/product", { params });
      setProducts(resProducts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const hapusProduk = async (product_id) => {
    try {
      await api.delete(`/product/delete/${product_id}`);
      message.success("berhasil hapus produk");
      fetchData();
    } catch (error) {
      message.error("gagal hapus produk");
    }
  };

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  const handleFilter = (searchParams) => {
    setParams(searchParams);
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  return (
    <div className="page_product">
      <Head>
        <title>Product</title>
        <link rel="icon" href="/img/logo.png" />
      </Head>

      <Filter handleSearch={handleFilter} />

      <div className="container" style={{ minHeight: "100vh" }}>
        <div className="products">
          {products.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                handleDelete={hapusProduk}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
