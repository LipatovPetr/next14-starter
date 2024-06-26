"use client";

import s from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";
import Image from "next/image";
import { handleLogout } from "@/lib/action";

const links = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
  { title: "Blog", path: "/blog" },
];

const Links = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={s.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>

      <Image
        className={s.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className={s.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
