import React from "react";
import { List, Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCart } from "react-use-cart";

const ListBarang = () => {
  const { items, removeItem, updateItemQuantity } = useCart();

  const handleDelete = (item) => {
    removeItem(item.id);
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              danger
              onClick={() => {
                handleDelete(item);
              }}
              icon={<DeleteOutlined />}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={
              <img
                width={140}
                height={140}
                style={{ objectFit: "cover", borderRadius: 5 }}
                src={item.images[0].url}
                alt="product img"
              />
            }
            title={<h3>{item.name}</h3>}
            description={<h4>Rp {item.price}</h4>}
          />
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => {
              updateItemQuantity(item.id, value);
            }}
          />
        </List.Item>
      )}
    />
  );
};

export default ListBarang;
