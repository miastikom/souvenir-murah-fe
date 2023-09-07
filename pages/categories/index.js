import Head from "next/head";

import { useState } from "react";
import { Popconfirm } from "antd";
import { UseCategories } from "../../hooks/useCategories";

const Categories = () => {
  const { categories, createCategory, deleteCategory, updateCategory } =
    UseCategories();
  const [name, setName] = useState("");
  const [id, setId] = useState(null);

  const handleEdit = (category) => {
    setName(category.name);
    setId(category.id);
  };

  const handleCreate = () => {
    if (!id) {
      createCategory({ name }).then(() => {
        setName("");
      });

      return;
    }

    updateCategory({ name }, id).then(() => {
      setName("");
      setId(null);
    });
  };

  return (
    <div className="categori">
      <div className="container">
        <div className="col-md-6 mx-auto my-3">
          <Head>
            <title>Categories</title>
            <link rel="icon" href="/img/logo.png" />
          </Head>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button className="btn btn-success ml-1" onClick={handleCreate}>
              {id ? "Update" : "Create"}
            </button>
          </div>

          {categories?.map((category) => (
            <div key={category.id} className="card my-2 text-capitalize">
              <div className="card-body d-flex justify-content-between">
                {category.name}

                <div style={{ cursor: "pointer" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(category)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <Popconfirm
                    title="hapus data ?"
                    onConfirm={() => deleteCategory(category.id)}
                  >
                    <button className="btn btn-danger">Delete</button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
