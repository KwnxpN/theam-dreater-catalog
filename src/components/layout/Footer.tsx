import { CheckCircle2, Eye, Filter, Package, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FeedbackForm from "./FeedbackForm";
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

const catalogHighlights = [
  {
    title: "Visual-First Discovery",
    description: "Explore products with clear images and practical details before opening each item.",
    icon: Eye,
  },
  {
    title: "Smart Filtering",
    description: "Narrow catalogs quickly by category to find relevant options faster.",
    icon: Filter,
  },
  {
    title: "Trusted Information",
    description: "Every listing is reviewed for consistency, so specs and descriptions stay accurate and useful.",
    icon: CheckCircle2,
  },
];

const Footer = () => {
  return (
    <footer className="bg-background border-t-2 border-border py-6 px-8 shadow-md flex flex-col gap-4">
      {/* Footer Content */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Grid 3: Strength */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">What makes us different?</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {catalogHighlights.map((point) => {
              const Icon = point.icon;

              return (
                <li key={point.title} className="flex items-start gap-2">
                  <Icon className="size-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground">{point.title}</p>
                    <p>{point.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Grid 4: Feedback Form */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Send us a message</h3>
          <FeedbackForm />
        </div>
      </section>

      {/* Copyright */}
      <div className="mt-2 border-t border-border pt-4 text-sm text-muted-foreground">
        <p>&copy; 2026 Theam Dreater. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer