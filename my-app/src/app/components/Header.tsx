"use client"
import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const NavBar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "offer", label: "Offer" },

    { to: "service", label: "Services" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <nav className="bg-slate-800">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-6 flex items-center justify-between">
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-400">
          Logo
        </span>
        <div className="hidden lg:flex items-center gap-8 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              className="cursor-pointer hover:text-fuchsia-600 transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={handleClick}
            aria-expanded={click}
            role="button"
          >
            {click ? <FaTimes /> : <CiMenuFries />}
          </button>
        </div>
      </div>
      {click && (
        <div className="bg-slate-900 py-4">
          <div className="container mx-auto text-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                spy={true}
                smooth={true}
                onClick={handleClick}
                className="block py-2 text-white hover:bg-slate-800 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
