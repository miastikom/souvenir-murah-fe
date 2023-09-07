import { Button, Result } from "antd";
import CheckoutLayout from "../../components/Layout/CheckoutLayout";
import Link from "next/link";

const DoneCheckout = () => {
  return (
    <CheckoutLayout>
      <Result
        status="success"
        title="Berhasil Membuat Pesanan"
        subTitle={`Pesanan kamu sudah terkirim silahkan tunggu konfirmasi dari admin`}
        extra={[
          <Link href="/katalog" key="buy">
            <Button>Kembali</Button>
          </Link>,
        ]}
      />
    </CheckoutLayout>
  );
};

export default DoneCheckout;
