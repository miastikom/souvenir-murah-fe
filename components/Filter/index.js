import React, { useState } from "react";
import { UseCategories } from "../../hooks/useCategories";

const Filter = ({ handleSearch }) => {
  const [search, setSearch] = useState({ category: null, name: null });
  const { categories } = UseCategories();

  const onSearch = (e) => {
    if (e.target.value === "all") {
      setSearch({ ...search, [e.target.name]: null });
      handleSearch({ ...search, [e.target.name]: null });
      return;
    }
    setSearch({ ...search, [e.target.name]: e.target.value });
    handleSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <div className="container page_product">
      <center>
        <div className="input-group pt-3">
          <div className="input-group-prepend col-md-2 px-0 mt-2">
            <select
              name="category"
              placeholder="Pilih Kategori"
              className="custom-select text-capitalize"
              value={search.category}
              onChange={(e) => {
                onSearch(e);
              }}
            >
              <option value="all">Semua Produk</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <form autoComplete="off" className="mt-2 col-md-10 px-0">
            <input
              type="text"
              name="name"
              className="form-control"
              list="title_product"
              value={search.name?.toLowerCase()}
              onChange={(e) => onSearch(e)}
            />
          </form>
        </div>
      </center>
    </div>
  );
};

export default Filter;
