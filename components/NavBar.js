import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import styles from "../styles/Navbar.module.css";
import Cart from "./cart";

function NavBar() {
  const router = useRouter();
  const { userData, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/categories" className="dropdown-item">
          Add Categories
        </Link>
        <Link href="/product/create-product" className="dropdown-item">
          Add Products
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle text-capitalize"
            href="#"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-user"></i> {userData.username}
          </a>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link href="/profile" className="dropdown-item">
              Profile
            </Link>
            <Link href="/order" className="dropdown-item">
              Pesanan
            </Link>
            {userData?.role === "ADMIN" && adminRouter()}
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={logout}>
              Logout
            </button>
          </div>
        </li>
        <li>
          {userData?.role !== "ADMIN" && (
            <div
              onClick={() => {
                showDrawer();
              }}
              style={{ paddingTop: 10 }}
            >
              <ShoppingCartOutlined
                style={{ color: "white", fontSize: 25 }}
              ></ShoppingCartOutlined>
            </div>
          )}
        </li>
        <Cart open={open} onClose={onClose} />
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link href="/">
        <div className={styles.item}>
          <div className={styles.callButton}>
            <img src="/img/logo.png" alt="" width="56" height="56" />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>Souvenir Murah</div>
            <div className={styles.text}>Banyuwangi</div>
          </div>
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div className="navbar-toggler-icon"></div>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end mx-5"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav p-1">
          <li className="nav-item">
            <Link href="/" className={"nav-link" + isActive("/")}>
              <i
                className="fas fa-home position-relative"
                aria-hidden="true"
              ></i>{" "}
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/product" className={"nav-link" + isActive("/product")}>
              <i
                className="fas fa-file position-relative"
                aria-hidden="true"
              ></i>{" "}
              Product
            </Link>
          </li>
          {!userData.login ? (
            <li className="nav-item">
              <Link href="/signin" className={"nav-link" + isActive("/signin")}>
                <i className="fas fa-user" aria-hidden="true"></i> Sign in
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
