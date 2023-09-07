import { Button, message } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import api from "../../../config/axios";
import { useRouter } from "next/router";
import { getToken } from "../../../utils";
import { AuthContext } from "../../../context/auth";

const DetailProduct = () => {
  const { query } = useRouter();
  const [data, setData] = useState({});
  const [tab, setTab] = useState(0);
  const { addItem } = useCart();
  const { userData } = useContext(AuthContext);

  const isActive = (index) => {
    if (tab === index) return " active";
    return "";
  };

  const addToCart = () => {
    const productCart = {
      id: data?.id,
      ...data,
    };

    if (!userData) {
      message.info("login terlebih dahulu");
      return;
    }

    addItem(productCart);
    message.success("berhasil memasukan keranjang");
  };

  useEffect(() => {
    api
      .get(`/product/detail/${query.id}`, getToken())
      .then(({ data: resProduk }) => {
        setData(resProduk.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="page_product">
      <div className="container">
        <div className="pt-4">
          <Link href="/product">
            <button className="btn btn-dark">
              <i className="fas fa-arrow-left"></i> Back to Product
            </button>
          </Link>
        </div>
        <div className="row detail_page">
          <Head>
            <title>Detail Product</title>
            <link rel="icon" href="/img/logo.png" />
          </Head>

          <div className="col-md-6">
            <img
              src={(data?.images || [])[tab]?.url}
              className="d-block img-thumbnail rounded mt-4 w-100"
              style={{ height: "500px" }}
            />

            <div className="row mx-0" style={{ cursor: "pointer" }}>
              {(data?.images || []).map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.url}
                  className={`img-thumbnail rounded ${isActive(index)}`}
                  style={{ height: "80px", width: "20%" }}
                  onClick={() => setTab(index)}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <h2 className="text-capitalize">{data?.name}</h2>
            <h5 className="text-danger">Rp. {data?.price}</h5>

            <div className="my-2">{data?.description}</div>
            <div className="my-2">{data?.content}</div>

            <Button onClick={addToCart}>Masukan Keranjang</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
