import React from "react";
import { Col, Row, Space } from "antd";
import { Paragraph, TitleSecond } from "../../components/Title";
import { TableBarang } from "../../components/Table/TableBarang";

const ValidasiCheckout = ({ data, listBarang }) => {
  const newListBarang = listBarang?.map(
    ({ id, code, name, quantity, price }) => {
      return { id, code, name, jumlah: quantity, harga: price };
    }
  );

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ marginBottom: 20, width: "100%" }}
    >
      <TitleSecond level={3}>Validasi</TitleSecond>
      <Row justify={"space-between"}>
        <Col>
          <Space direction="vertical">
            <div>
              <TitleSecond level={5}>Nama Pemesan</TitleSecond>
              <Paragraph>{data?.namaPemesan}</Paragraph>
            </div>
            <div>
              <TitleSecond level={5}>Nomor Whatsapp</TitleSecond>
              <Paragraph>{data?.noWa}</Paragraph>
            </div>
            <div>
              <TitleSecond level={5}>Tanggal Acara</TitleSecond>
              <Paragraph>{data?.tanggalAcara[0]}</Paragraph>
            </div>
            <div>
              <TitleSecond level={5}>Nama Untuk Kartu Ucapan</TitleSecond>
              <Paragraph>{data?.kartuUcapan}</Paragraph>
            </div>
            <div>
              <TitleSecond level={5}>Tanggal Pengambilan</TitleSecond>
              <Paragraph>{data?.tanggalPengambilan[0]}</Paragraph>
            </div>
            <div>
              <TitleSecond level={5}>Alamat</TitleSecond>
              <Paragraph>{data?.alamat}</Paragraph>
            </div>
          </Space>
        </Col>
        <Col>
          <TitleSecond level={5}>List Barang</TitleSecond>
          <TableBarang display={true} data={newListBarang} />
        </Col>
      </Row>
    </Space>
  );
};

export default ValidasiCheckout;
