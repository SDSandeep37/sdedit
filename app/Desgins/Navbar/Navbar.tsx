"use client";
import Link from "next/link";
import "./navbar.css";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "@/Contexts/AuthContext";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const auth = useContext(UserAuthContext);

  if (!auth) return null;

  const { user, loading } = auth;
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
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const logoutResult = await response.json();
      if (!response.ok) {
        alert("Falied logout");
        console.error(logoutResult.message);
      } else {
        alert("Logout Successful!");
        console.log(logoutResult.message);
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("logout failed:", error);
    }
  };
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
              <Link href="/#features">Features</Link>
            </li>
            {/* <li className="menulist" onClick={() => setToggleMenu(false)}>
              <Link href="#">About</Link>
            </li> */}
            <li className="menulist" onClick={() => setToggleMenu(false)}>
              <Link href="/#community">Community</Link>
            </li>
          </ul>
        </div>
        <div className="navoption flex-1">
          {/* <div className="login">
            {user ? (
              <Link href="/dashboard">
                <button>Dashboard</button>
              </Link>
            ) : (
              <Link href="/login">
                <button>Login</button>
              </Link>
            )}
          </div> */}
          <div className="login">
            {!user ? (
              <Link href="/login">
                <button className="loginButtonNavbar">Login</button>
              </Link>
            ) : pathname === "/user" ? (
              <button
                className="bg-red-500 hover:bg-red-400 text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link href="/user">
                <button className="bg-green-600 hover:bg-green-400">
                  Dashboard
                </button>
              </Link>
            )}
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
