"use client";
import { Menu } from "lucide-react";
import React from "react";

const navItems = [
  {
    name: "Features",
    link: "#",
  },
  {
    name: "Method",
    link: "#",
  },
  {
    name: "Customers",
    link: "#",
  },
  {
    name: "Changelog",
    link: "#",
  },
  {
    name: "Integrations",
    link: "#",
  },
  {
    name: "Pricing",
    link: "#",
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <img
              src="/clyrox.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-white">Clyrox</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-white/70 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <a href="#" className="text-white/70 hover:text-white">
            Contact Sales
          </a>
          <a href="#" className="text-white/70 hover:text-white">
            Log in
          </a>
          <a
            href="#"
            className="rounded-md bg-white px-4 py-2 text-slate-900"
          >
            Sign up
          </a>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="container mx-auto mt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-white/70 hover:text-white"
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              <a href="#" className="text-white/70 hover:text-white">
                Contact Sales
              </a>
              <a href="#" className="text-white/70 hover:text-white">
                Log in
              </a>
              <a
                href="#"
                className="rounded-md bg-white px-4 py-2 text-slate-900"
              >
                Sign up
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};