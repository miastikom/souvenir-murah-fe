import React, { useContext } from "react";
import { Table, Space, Popconfirm, Button } from "antd";
import { ButtonDelete, ButtonDetail } from "../../components/Button";
import { AuthContext } from "../../context/auth";
import dayjs from "dayjs";
import OrderStatus from "../../components/OrderStatus";

const TablePesanan = ({ listPesanan, loading, handleDelete, handleDetail }) => {
  const { userData } = useContext(AuthContext);

  const data = listPesanan?.map((data, i) => {
    return { ...data, key: i };
  });

  const columns = [
    {
      title: "Kode Pesanan",
      dataIndex: "orderCode",
      key: "kodePesanan",
    },
    {
      title: "Nama Pemesan",
      dataIndex: "customerName",
      key: "namaPemesan",
    },
    {
      title: "Nomor Whatsapp",
      dataIndex: "whatsappNumber",
      key: "noWa",
    },
    {
      title: "Tanggal Pemesanan",
      dataIndex: "tanggalPesanan",
      key: "tanggalPemesanan",
      render: (_, { orderDate }) => dayjs(orderDate).format("YYYY/MM/DD"),
    },
    {
      title: "Tanggal Pengambilan",
      dataIndex: "tanggalPengambilan",
      key: "tanggalPengambilan",
      render: (_, { pickupDate }) => dayjs(pickupDate).format("YYYY/MM/DD"),
    },
    {
      title: "Tanggal Acara",
      dataIndex: "tanggalPengambilan",
      key: "tanggalPengambilan",
      render: (_, { eventDate }) => dayjs(eventDate).format("YYYY/MM/DD"),
    },
    {
      title: "Status Pemesanan",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => <OrderStatus status={status} />,
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      render: (_, record) => (
        <Space>
          <ButtonDetail
            label="Detail"
            handleClick={() => {
              handleDetail(record);
            }}
          />

          {userData?.role !== "USER" ? (
            <Popconfirm
              title="hapus data?"
              onConfirm={() => {
                handleDelete(record);
              }}
            >
              <Button type="primary" danger>
                Hapus
              </Button>
            </Popconfirm>
          ) : (
            false
          )}
        </Space>
      ),
    },
  ];
  return (
    <Table
      scroll={{ x: true }}
      pagination={{ pageSize: 5 }}
      loading={loading}
      columns={columns}
      dataSource={data}
    />
  );
};

export default TablePesanan;
