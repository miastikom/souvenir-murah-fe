import React from "react";
import { Table, Space, Popconfirm } from "antd";
import { ButtonDelete, ButtonEdit } from "../Button";

export const TableBarang = ({ data, handleEdit, onOkDelete, display }) => {
  const columns = [
    {
      title: "Kode Barang",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nama Barang",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      key: "jumlah",
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      render: (number) => `Rp. ${number}`,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space size="middle">
          <ButtonEdit
            handleClick={() => {
              handleEdit(record);
            }}
            label="Edit"
          />
          <Popconfirm
            title="Hapus data?"
            onConfirm={() => {
              onOkDelete(record);
            }}
          >
            <ButtonDelete label="Hapus" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const kali = (a, b) => {
    return a * b;
  };

  const columnsDisplay = [
    {
      title: "Kode Barang",
      dataIndex: "code",
      key: "kodeBarang",
    },
    {
      title: "Nama Barang",
      dataIndex: "name",
      key: "namaBarang",
    },
    {
      title: "Jumlah",
      dataIndex: "jumlah",
      key: "jumlah",
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      render: (number) => `Rp. ${number}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, record) => `Rp. ${kali(record.harga, record.jumlah)}`,
    },
  ];

  const dataUpdate = data?.map((data, key) => {
    return { ...data, key };
  });

  const countTotal = (arr) => {
    let total = 0;
    arr?.forEach((value) => {
      total += value.jumlah * value.harga;
    });
    return total;
  };

  return (
    <Table
      size="middle"
      columns={display ? columnsDisplay : columns}
      dataSource={dataUpdate}
      pagination={false}
      footer={
        display
          ? (data) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total :</span>
                <span>Rp. {countTotal(data)}</span>
              </div>
            )
          : ""
      }
    />
  );
};
