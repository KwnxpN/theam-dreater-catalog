import { useState } from "react";
import { Button } from "./ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Leaf, Menu, Search, ShoppingCart, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navLinks = ["Shop", "Collections", "Sustainability", "Our Story"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-muted shadow-md relative">
      <div className="flex mx-auto justify-between items-center px-4 py-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary">
              <Leaf className="text-white" />
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-2xl tracking-wide">TerraModern</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <span
              key={link}
              className="font-medium text-secondary-foreground cursor-pointer hover:text-primary transition-colors"
            >
              {link}
            </span>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <InputGroup className="p-5 rounded-3xl shadow-2xs border-2 border-muted">
            <InputGroupInput placeholder="Search products..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button className="p-5 rounded-2xl">
            <ShoppingCart />
            Cart
          </Button>
          <Avatar className="border-2 border-primary" size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-muted px-4 py-4 flex flex-col gap-4 bg-background">
          {/* Search */}
          <InputGroup className="p-3 rounded-3xl shadow-2xs border-2 border-muted">
            <InputGroupInput placeholder="Search products..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          {/* Nav Links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <span
                key={link}
                className="font-medium text-secondary-foreground cursor-pointer hover:text-primary transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </span>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button className="p-5 rounded-2xl flex-1">
              <ShoppingCart />
              Cart
            </Button>
            <Avatar className="border-2 border-primary" size="lg">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
