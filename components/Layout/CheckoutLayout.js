import { Layout } from "antd";

const CheckoutLayout = ({ children }) => {
  const { Content } = Layout;

  return (
    <Layout style={{ minHeight: 100 + "vh" }}>
      <Layout>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 20,
          }}
        >
          <div>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CheckoutLayout;
