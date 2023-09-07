import { Button, Form, Steps, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import api from "../../config/axios";
import { getToken } from "../../utils";
import FormPembelian from "./FormPembelian";
import ListBarang from "./ListBarang";
import ValidasiCheckout from "./ValidasiCheckout";
import { useRouter } from "next/router";

const StepCheckout = () => {
  const [current, setCurrent] = useState(0);
  const { isEmpty, items, emptyCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const router = useRouter();

  const handleSelesai = async () => {
    setLoading(true);
    const dataPemesanan = {
      customerName: data.namaPemesan[0],
      whatsappNumber: data.noWa[0],
      description: data.kartuUcapan[0],
      eventDate: dayjs(data.tanggalAcara[0]),
      pickupDate: dayjs(data.tanggalPengambilan[0]),
      address: data.alamat[0],
      status: "checking",
    };

    const listBarang = items.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    });

    const dataForm = { ...dataPemesanan, orderProduct: listBarang };

    try {
      await api.post("/order/create", dataForm, getToken()).then(() => {
        emptyCart();
        router.push("/order");
      });
      message.success("checkout berhasil");
    } catch (error) {
      message.error("checkout gagal");
    }

    setLoading(false);
  };

  const handleChange = (value) => {
    setData({
      ...data,
      [Object.keys(value)]: Object.values(value),
    });
  };

  const steps = [
    {
      title: "List Barang",
      content: <ListBarang />,
    },
    {
      title: "Data Pembelian",
      content: <FormPembelian form={form} handleChange={handleChange} />,
    },
    {
      title: "Validasi",
      content: <ValidasiCheckout data={data} listBarang={items} />,
    },
  ];

  const itemsStep = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const next = () => {
    if (current === 0 && isEmpty) {
      message.warning("Tambahkan Barang Terlebih Dahulu");
    } else if (current === 1) {
      form.validateFields().then(() => setCurrent(current + 1));
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    form.setFieldValue(data);
  }, [form, data]);

  return (
    <>
      <Steps
        current={current}
        size="small"
        items={itemsStep}
        style={{ width: 700 }}
      />
      <div className="steps-content" style={{ marginTop: 20 }}>
        {steps[current].content}
      </div>
      <div className="steps-action" style={{ marginBottom: 20 }}>
        {current > 0 && (
          <Button
            style={{
              marginRight: "8px",
            }}
            onClick={() => prev()}
          >
            Sebelumnya
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Selanjutnya
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            loading={loading}
            type="primary"
            onClick={() => {
              handleSelesai();
            }}
          >
            Selesai
          </Button>
        )}
      </div>
    </>
  );
};

export default StepCheckout;
