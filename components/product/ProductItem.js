import { Popconfirm } from "antd";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const ProductItem = ({ product, handleDelete }) => {
  const { userData } = useContext(AuthContext);

  const userLink = () => {
    return (
      <>
        <Link
          href={`product/detail-product/${product.id}`}
          className="btn btn-dark"
          style={{ marginRight: "5px", flex: 1 }}
        >
          Lihat
        </Link>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link
          href={`/product/create-product/${product.id}`}
          className="btn btn-dark"
          style={{ marginRight: "5px", flex: 1 }}
        >
          Edit
        </Link>
        <Popconfirm
          title="hapus produk ?"
          onConfirm={() => handleDelete(product.id)}
        >
          <button
            className="btn btn-danger"
            style={{ marginLeft: "5px", flex: 1 }}
          >
            Delete
          </button>
        </Popconfirm>
      </>
    );
  };

  return (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={product.images[0].url}
          alt={product.images[0].url}
        />
        <div className="card-body">
          <h5
            className="card-title text-capitalize text-center"
            title={product.name}
          >
            {product.name}
          </h5>

          <div className="row justify-content-between mx-0 mt-4">
            {userData?.role !== "ADMIN" ? userLink() : adminLink()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
