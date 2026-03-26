import { useState } from "react";
import { Package, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { NavLink } from 'react-router-dom';
import ToggleDark from "./ToggleDark";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalog" },
  { name: "Our Story", path: "/our-story" },
]

// React Router's NavLink provides an isActive prop to determine if the link is active
const desktopNavClass = ({ isActive }: { isActive: boolean }) =>
  `relative font-medium transition-colors
  ${isActive ?
    "text-primary" :
    "text-secondary-foreground hover:text-primary"
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `font-medium transition-colors
  ${isActive ? "text-primary" :
    "text-secondary-foreground hover:text-primary"
  }`;


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-md">
      <div className="flex mx-auto justify-between items-center px-4 py-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-primary">
                <Package className="text-white" />
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-2xl tracking-wide">Theam Dreater</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink to={link.path} key={link.path} className={desktopNavClass} end={link.path === "/"}>
                {({ isActive }) => (
                  <span className="relative inline-block cursor-pointer pb-1">
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-primary transition-transform duration-200
                      ${isActive ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ToggleDark />

          {/* Hamburger Button (mobile only) */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="border-t border-muted px-4 py-4 flex flex-col gap-4 bg-background">

          {/* Nav Links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className={mobileNavClass}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-2 cursor-pointer">
                    <span className={`h-2 w-2 rounded-full bg-primary transition-opacity
                      ${isActive ? "opacity-100" : "opacity-0"}`} />
                    {link.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
