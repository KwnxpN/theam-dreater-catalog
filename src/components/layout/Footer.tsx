import { Package } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-muted py-6 px-8 shadow-md flex flex-col gap-4">
      {/* Footer Content */}
      <section className="grid grid-cols-4 gap-x-8">
        {/* Grid 1: Company Info */}
        <div className="space-y-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Avatar size="default">
              <AvatarFallback className="bg-primary">
                <Package className="text-white" />
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-xl tracking-wide">Theam Dreater</span>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            We believe in quality without compromise. Every product in our catalog
            is selected with care to ensure reliability, consistency, and lasting value.
          </p>
        </div>
      </section>

      {/* Copyright */}
      <div className="text-sm text-muted-foreground">
        <p>&copy; 2026 Theam Dreater. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer