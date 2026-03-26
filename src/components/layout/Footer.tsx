import { Package, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import KwnxpN from "@/assets/images/KwnxpN.jpg";
import ExxiDaus from "@/assets/images/ExxiDaus.png";
import SRYT4E from "@/assets/images/SRYT4E.jpg";

export type Developer = {
  name: string;
  avatar: string;
  github?: string;
};

const developers: Developer[] = [
  {
    name: "KwnxpN",
    avatar: KwnxpN,
    github: "https://github.com/KwnxpN",
  },
  {
    name: "ExxiDaus",
    avatar: ExxiDaus,
    github: "https://github.com/ExxiDauS",
  },
  {
    name: "SRYT4E",
    avatar: SRYT4E,
    github: "https://github.com/Danny2Forever",
  },
];

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

        {/* Grid 2: Made by */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Made with ❤️ by</h3>
          <div className="flex flex-col justify-center gap-4">

            {developers.map((dev) => (
              <div className="flex items-center gap-2" key={dev.name}>
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary">
                    <User className="text-white" />
                  </AvatarFallback>
                  <AvatarImage src={dev.avatar} alt={dev.name} />
                </Avatar>
                {dev.github
                  ? (
                    <a href={dev.github} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {dev.name}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{dev.name}</span>
                  )
                }

              </div>
            ))}
          </div>
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