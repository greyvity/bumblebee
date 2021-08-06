import Link from "next/link";
import navStyles from "../styles/Nav.module.scss";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useEffect, useState } from "react";
import Search from "../Components/Search";
import { useAuth } from "../Context/AuthContext";
import LoginModal from "../Components/Modals/LoginModal";

const links = [
  { to: "", name: "Login", label: "login" },
  { to: "#projects", name: "Sign Up", label: "signup" },
];

const Nav = () => {
  const { loginVisible, setLoginVisible } = useAuth();

  return (
    <>
      <AnimateSharedLayout>
        <div className={navStyles.wrapper}>
          <header className={navStyles.header}>
            <div className={navStyles.logoContainer}>
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.1193 8.13825C23.1193 11.8402 20.1183 14.8412 16.4163 14.8412C12.7144 14.8412 9.71338 11.8402 9.71338 8.13825C9.71338 4.43631 12.7144 1.4353 16.4163 1.4353C20.1183 1.4353 23.1193 4.43631 23.1193 8.13825Z"
                  fill="#F45B49"
                />
                <path
                  d="M24.3416 26.0746C24.3416 30.4517 20.7932 34 16.4161 34C12.0391 34 8.49072 30.4517 8.49072 26.0746C8.49072 21.6975 12.0391 18.1492 16.4161 18.1492C20.7932 18.1492 24.3416 21.6975 24.3416 26.0746Z"
                  fill="#F45B49"
                />
                <path
                  d="M34.5603 29.0404C34.5603 30.4674 33.4035 31.6243 31.9764 31.6243C30.5494 31.6243 29.3926 30.4674 29.3926 29.0404C29.3926 27.6134 30.5494 26.4565 31.9764 26.4565C33.4035 26.4565 34.5603 27.6134 34.5603 29.0404Z"
                  fill="#F45B49"
                />
                <path
                  d="M3.43994 3.14404L3.43994 31.6242"
                  stroke="#F45B49"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={navStyles.searchContainer}>
              <Search />
            </div>
            <nav className={navStyles.nav}>
              <ul>
                {links.map((link, i) => (
                  <Item
                    key={i}
                    name={link.name}
                    to={link.to}
                    label={link.label}
                    onClick={() => {
                      // setActive(link.to);
                      if (link.label === "login") setLoginVisible(true);
                    }}
                  />
                ))}
              </ul>
            </nav>
          </header>
        </div>
      </AnimateSharedLayout>
      {/* {loginVisible && ( */}
      <LoginModal visible={loginVisible} setVisible={setLoginVisible} />
      {/* )} */}
    </>
  );
};

function Item({ to, onClick, name, label }) {
  return (
    <>
      <li className={navStyles.item} onClick={onClick}>
        <h1 className={navStyles[label]}>{name}</h1>
      </li>
    </>
  );
}

export default Nav;
