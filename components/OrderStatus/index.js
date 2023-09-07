import { Tag } from "antd";

/**
 *
 * @typedef {import('antd').TagProps} IAntdTag
 *
 * @typedef {Object} IOrderStatus
 * @property {"payment"|"checking"|"done"|"overload"} status
 *
 * @param {IAntdTag & IOrderStatus} props
 */
export default function OrderStatus({ status }) {
  const statusMap = {
    done: { color: "green", label: "Selesai" },
    proccess: { color: "magenta", label: "Diproses" },
    overload: { color: "red", label: "Overload" },
    payment: { color: "yellow", label: "Pembayaran" },
    checking: { color: "blue", label: "Pengecekan" },
  };

  const { color, label } = statusMap[status] || { color: "", label: "" };

  return <Tag color={color}>{label}</Tag>;
}
