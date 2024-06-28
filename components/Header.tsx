"use client";
import Link from "next/link";
import { useState } from "react";

/* Components */
import { MajesticonsMenu } from "./ui/MajesticonsMenu";
import { MajesticonsClose } from "./ui/MajesticonsClose";

/* Styles */
import styles from "../styles/header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (active: boolean) => setIsOpen(active);

  const menu = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Portfolio",
      url: "/portfolio",
    },
    {
      title: "Studies",
      url: "/studies",
    },
    {
      title: "Training",
      url: "/training",
    },
    {
      title: "Experiences",
      url: "/experiences",
    },
    {
      title: "Contact",
      url: "/contact",
    },
  ];

  return (
    <header className={styles.Header}>
      <button className="openCloseMenuBtn" onClick={() => handleClick(true)}>
        <MajesticonsMenu className="size-12 text-primary" />
      </button>
      <nav id="menu" className={isOpen ? "right-0" : "right-[-100%]"}>
        <div>
          <button
            onClick={() => handleClick(false)}
            className="openCloseMenuBtn"
          >
            <MajesticonsClose className="size-12 text-primary" />
          </button>
        </div>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              <Link onClick={() => handleClick(false)} href={item.url}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
