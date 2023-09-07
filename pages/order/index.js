import { Space, message } from "antd";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { TitlePage } from "../../components/Title";
import api from "../../config/axios";
import { AuthContext } from "../../context/auth";
import { getToken } from "../../utils";
import TablePesanan from "./TablePesanan";

const ListPesanan = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [listPesanan, setListPesanan] = useState([]);

  const handleDelete = (record) => {
    api
      .delete(`/order/delete/${record.id}`)
      .then(() => {
        fetchData();
      })
      .catch(() => {
        message.error("hapus pesanan gagal");
      });
  };

  const handleDetail = (record) => {
    router.push(`/order/detail-order/${record.id}`);
  };

  const fetchData = () => {
    userData?.role === "USER"
      ? api
          .get("/order/user", getToken())
          .then(({ data }) => {
            setListPesanan(data.data);
          })
          .catch((error) => {
            console.log(error);
          })
      : api
          .get("/order")
          .then(({ data }) => {
            setListPesanan(data.data);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: `30px 100px` }}>
      <TitlePage>List Pesanan</TitlePage>
      <Space direction="vertical">
        {/* <Input
          placeholder="Cari kode pesanan"
          allowClear={true}
          // onChange={onChange}
          style={{
            width: 300,
          }}
        /> */}
        <TablePesanan
          listPesanan={listPesanan}
          loading={loading}
          handleDelete={handleDelete}
          handleDetail={handleDetail}
        />
      </Space>
    </div>
  );
};

export default ListPesanan;
