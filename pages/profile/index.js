import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import Head from "next/head";

const Profile = () => {
  const { userData, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({});

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleUpdateProfile = () => {
    updateUser(formData);
  };

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  return (
    <div className="page_product">
      <div className="container" style={{ minHeight: "100vh" }}>
        <div className="profile_page">
          <Head>
            <title>Profile</title>
            <link rel="icon" href="/img/logo.png" />
          </Head>

          <section className="row-profile text-secondary">
            <div className="col">
              <h3 className="text-center text-uppercase text-dark font-weight-bold text-dark">
                {userData.role === "USER" ? "User Profile" : "Admin Profile"}
              </h3>

              {/* <div className="avatar">
                <img src={formData?.avatar} alt="avatar" />
                <span>
                  <i className="fas fa-camera"></i>
                  <p>Change</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    accept="image/*"
                    // onChange={changeAvatar}
                  />
                </span>
              </div> */}

              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold text-dark">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData?.username}
                  className="form-control"
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="font-weight-bold text-dark">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  defaultValue={formData?.email}
                  className="form-control"
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="password"
                  className="font-weight-bold text-dark"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData?.password}
                  className="form-control"
                  placeholder="Your new password"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="cf_password"
                  className="font-weight-bold text-dark"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  className="form-control"
                  placeholder="Confirm new password"
                  onChange={handleChange}
                />
              </div>

              <center>
                <button className="btn btn-dark" onClick={handleUpdateProfile}>
                  Update
                </button>
              </center>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
