import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  };
  const [userData, setUserData] = useState(initialState);
  const { register } = useContext(AuthContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(userData);
  };

  return (
    <div className="register">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/img/logo.png" />
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name" className="font-weight-bold">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="username"
            value={userData.username}
            onChange={handleChangeInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="font-weight-bold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userData.email}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted text-dark">
            We'll never share your email with anyone else.
          </small>
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

        <div className="form-group">
          <label htmlFor="exampleInputPassword2" className="font-weight-bold">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>

        <p className="my-2">
          Already have an account?
          <Link href="/signin" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
