import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import api from "../../config/axios";
import { message } from "antd";
import { AuthContext } from "../../context/auth";

const Signin = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { login } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userData);
  };

  return (
    <div className="sign">
      <div className="container">
        <Head>
          <title>Sign in Page</title>
          <link rel="icon" href="/img/logo.png" />
        </Head>

        <form
          className="mx-auto my-4"
          style={{ maxWidth: "500px" }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="font-weight-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="font-weight-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={userData.password}
              onChange={handleChangeInput}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>

          <p className="my-2">
            You don't have an account?
            <Link href="/register" style={{ color: "crimson" }}>
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
