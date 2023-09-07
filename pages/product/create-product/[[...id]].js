import Head from "next/head";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Upload, message } from "antd";
import { getDataUriFromFile } from "../../../utils";
import { useRouter } from "next/router";

const ProductsManager = () => {
  const initialState = {
    code: "",
    name: "",
    price: 0,
    description: "",
    category: "",
    images: [],
  };

  const [product, setProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useRouter().query;

  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const category = categories.find(
      (category) => category.name === product.category
    );
    const imageList = product.images.map((file) => file.url);

    const payload = { ...product, category: category.id, images: imageList };

    if (id) {
      api
        .put(`/product/update/${id}`, payload)
        .then(() => {
          message.success("berhasil update produk");
        })
        .catch(() => {
          message.error("update produk gagal");
        });

      setLoading(false);
      return;
    }

    api
      .post("/product/create", payload)
      .then(() => {
        message.success("berhasil tambah produk");
      })
      .catch(() => {
        message.error("tambah produk gagal");
      });

    setLoading(false);
  };

  const handleUploadImage = (options) => {
    getDataUriFromFile(options.file)
      .then(({ dataUri, fileName }) => {
        const images = [...product.images, { fileName, url: dataUri }];
        setProduct({ ...product, images });
      })
      .catch((error) => message.error(error.message));
  };

  const handleRemoveUpdloadImage = (file) => {
    const filterArr = product.images.filter(
      (item) => item.fileName !== file.fileName
    );
    setProduct({ ...product, images: filterArr });
  };

  useEffect(() => {
    setLoading(true);
    api.get("/category").then(({ data }) => {
      setCategories(data.data);
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (id) {
      api
        .get(`/product/detail/${id}`)
        .then(({ data }) => {
          const images = data.data.images.map((image) => {
            return { fileName: image.name, url: image.url };
          });
          const productData = {
            ...data.data,
            images,
            category: data.data.category.name,
          };
          setProduct(productData);
        })
        .catch((error) => {
          message.error("data tidak ditemukan");
        });
    }
    setLoading(false);
  }, [id]);

  return (
    <div className="page_product">
      <div className="container">
        <div className="products_manager">
          <Head>
            <title>Products Manager</title>
            <link rel="icon" href="/img/logo.png" />
          </Head>
          <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <input
                type="text"
                name="code"
                value={product.code}
                placeholder="Kode Barang"
                className="d-block my-4 w-100 p-2 rounded"
                onChange={handleChangeInput}
              />
              <div className="row">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    placeholder="Nama Barang"
                    className="d-block w-100 p-2 rounded"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    placeholder="Price"
                    className="d-block w-100 p-2 rounded"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="4"
                placeholder="Deskripsi"
                onChange={handleChangeInput}
                className="d-block my-4 w-100 p-2 rounded"
                value={product.description}
              />
              <div className="input-group-prepend px-0 my-2 rounded">
                <select
                  name="category"
                  id="category"
                  value={product.category}
                  onChange={handleChangeInput}
                  className="custom-select text-capitalize"
                >
                  <option value="all">Kategori Barang</option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-dark my-2 px-4"
              >
                {id ? "Update Barang" : "Tambah Barang"}
              </button>
            </div>
            <div className="col-md-6 my-4">
              <div className="input-group mb-3 rounded">
                <div className="input-group-prepend">
                  <Upload
                    customRequest={handleUploadImage}
                    accept=".jpg,.jpeg,.png,.webp"
                    showUploadList={false}
                  >
                    <span className="input-group-text bg-dark text-white">
                      Masukkan Gambar
                    </span>
                  </Upload>
                </div>
              </div>

              <div className="row img-up mx-0">
                {product.images.map((img, index) => (
                  <div key={index} className="file_img my-1">
                    <img
                      src={img.url}
                      alt=""
                      className="img-thumbnail rounded"
                    />
                    <span onClick={() => handleRemoveUpdloadImage(img)}>X</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsManager;
