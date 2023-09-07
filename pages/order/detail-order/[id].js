import {
  Button,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Upload,
  message,
} from "antd";
import React, { useContext, useEffect, useState } from "react";

import dayjs from "dayjs";
import { ButtonEdit } from "../../../components/Button";
import { TableBarang } from "../../../components/Table/TableBarang";
import { Paragraph, TitlePage, TitleSecond } from "../../../components/Title";
import api from "../../../config/axios";
import { AuthContext } from "../../../context/auth";
import { getDataUriFromFile } from "../../../utils";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import OrderStatus from "../../../components/OrderStatus";

const DetailPesanan = () => {
  const { query } = useRouter();
  const [data, setData] = useState({});
  const [fileList, setFileList] = useState(
    data.paymentProof ? [data.paymentProof] : []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const { userData } = useContext(AuthContext);
  const router = useRouter();
  const newListBarang = (data?.orderProduct || []).map(
    ({ product, quantity }) => {
      return {
        id: product.id,
        code: product.code,
        name: product.name,
        jumlah: quantity,
        harga: product.price,
      };
    }
  );

  const handleUploadImage = (options) => {
    getDataUriFromFile(options.file)
      .then(({ dataUri, fileName }) => {
        setFileList([...fileList, { fileName, url: dataUri }]);
      })
      .catch((error) => message.error(error.message));
  };

  const modalOke = () => {
    api
      .put(`/order/change-status/${data.id}`, { status: data.status })
      .then(() => {
        setModalOpen(false);
        message.success("ubah status berhasil");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = () => {
    window.location = `https://magenta-rose-ant-gear.cyclic.app/v1/order/print-order/${data.id}`;
  };

  const uploadPaymentProof = () => {
    api
      .put(`/order/upload-payment/${data.id}`, {
        paymentProof: fileList[0].url,
      })
      .then(({ data }) => {
        message.success("upload bukti berhasil");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    api
      .get(`/order/detail/${query.id}`)
      .then(({ data: resOrder }) => {
        setData(resOrder.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        paddingTop: "50px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Space
        direction="vertical"
        size="middle"
        style={{ marginBottom: 20, width: "900px" }}
      >
        <Button
          onClick={() => router.back()}
          type="link"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowLeftOutlined /> Kembali
        </Button>
        <TitlePage>Detail Pesanan {data.kodePesanan}</TitlePage>
        {userData?.role !== "ADMIN" ? (
          <>
            <Upload
              listType="picture-card"
              style={{ width: "100%" }}
              customRequest={handleUploadImage}
              onRemove={() => false}
              onPreview={() => false}
              fileList={fileList}
              accept=".jpg,.jpeg,.png,.webp"
            >
              {fileList.length === 0 && " Upload Bukti Transfer"}
            </Upload>
            <Button onClick={uploadPaymentProof} type="primary">
              Kirim Bukti Transfer
            </Button>
            <Button
              onClick={() => {
                handleDownload();
              }}
            >
              Cetak Pesanan
            </Button>
          </>
        ) : (
          <>
            <Image
              width={100}
              height={100}
              src={
                data.paymentProof
                  ? data.paymentProof.url
                  : "https://dummyimage.com/400x400/ababab/ffffff.jpg&text=belum+bayar"
              }
            />

            <ButtonEdit
              handleClick={() => {
                setModalOpen(true);
              }}
              label={"Ubah Status"}
            />
          </>
        )}
        <Row style={{ width: "100%" }} justify="space-between">
          <Col>
            <Space direction="vertical">
              <div>
                <TitleSecond level={5}>Status Pesanan</TitleSecond>
                <Paragraph>
                  <OrderStatus status={data.status} />
                </Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Nama Pemesan</TitleSecond>
                <Paragraph>{data.customerName}</Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Nomor Whatsapp</TitleSecond>
                <Paragraph>{data.whatsappNumber}</Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Kartu Ucapan</TitleSecond>
                <Paragraph>{data.description}</Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Tanggal Acara</TitleSecond>
                <Paragraph>
                  {dayjs(data.eventDate).format("YYYY/MM/DD")}
                </Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Tanggal Pengambilan</TitleSecond>
                <Paragraph>
                  {dayjs(data.pickupDate).format("YYYY/MM/DD")}
                </Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Tanggal Pemesanan</TitleSecond>
                <Paragraph>
                  {dayjs(data.orderDate).format("YYYY/MM/DD")}
                </Paragraph>
              </div>
              <div>
                <TitleSecond level={5}>Alamat</TitleSecond>
                <Paragraph>{data.address}</Paragraph>
              </div>
            </Space>
          </Col>
          <Col>
            <TitleSecond level={5}>Detail Barang</TitleSecond>
            <div style={{ borderBottom: "1px solid black" }}></div>
            <TableBarang display={true} data={newListBarang} />
          </Col>
        </Row>
      </Space>
      <Modal
        onOk={() => {
          modalOke();
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
        title="Ubah Status"
        open={modalOpen}
      >
        <div>
          <Select
            aria-hidden
            value={data.status}
            style={{ width: 200 }}
            placeholder="ubah status pemesanan"
            onSelect={(value) => {
              setData({ ...data, status: value });
            }}
            options={[
              { label: "pengecekan", value: "checking" },
              { label: "overload", value: "overload" },
              { label: "pembayaran", value: "payment" },
              { label: "proses", value: "proccess" },
              { label: "selesai", value: "done" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DetailPesanan;
