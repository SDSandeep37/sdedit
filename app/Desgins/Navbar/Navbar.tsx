"use client";
import Link from "next/link";
import "./navbar.css";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`navbar ${scrolled ? "scroll" : ""} `}>
      <nav className="flex justify-between items-center">
        <div className="navlogo flex-2">
          <Link href="/">
            <img
              src="/icon.png"
              alt="SDEDIT-Smart Dynamic Environment for Dialogue, Interaction & Thought"
            />
          </Link>
        </div>
        <div className="navmenus flex-3">
          <ul className={`navmenu ${toggleMenu ? "active" : ""}`}>
            <li className="menulist" onClick={() => setToggleMenu(false)}>
              <Link href="/">Home</Link>
            </li>
            <li className="menulist" onClick={() => setToggleMenu(false)}>
              <Link href="#">Features</Link>
            </li>
            <li className="menulist" onClick={() => setToggleMenu(false)}>
              <Link href="#">About</Link>
            </li>
            <li className="menulist" onClick={() => setToggleMenu(false)}>
              <Link href="#">Community</Link>
            </li>
          </ul>
        </div>
        <div className="navoption flex-1">
          <div className="login">
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
        <div className="mobileMenu flex-1">
          {!toggleMenu && (
            <div className="open" onClick={() => setToggleMenu(true)}>
              <CiMenuFries size={25} />
            </div>
          )}
          {toggleMenu && (
            <div className="close" onClick={() => setToggleMenu(false)}>
              <IoMdClose size={30} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
