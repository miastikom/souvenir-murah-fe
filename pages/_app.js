import { CartProvider } from "react-use-cart";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/auth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
