"use client";

const footerNavs = [
  {
    label: "Product",
    items: [
      {
        href: "#",
        name: "Features",
      },
      {
        href: "#",
        name: "Integrations",
      },
      {
        href: "#",
        name: "Pricing",
      },
      {
        href: "#",
        name: "Changelog",
      },
      {
        href: "#",
        name: "Docs",
      },
      {
        href: "#",
        name: "Linear Method",
      },
      {
        href: "#",
        name: "Download",
      },
    ],
  },
  {
    label: "Company",
    items: [
      {
        href: "#",
        name: "About us",
      },
      {
        href: "#",
        name: "Blog",
      },
      {
        href: "#",
        name: "Careers",
      },
      {
        href: "#",
        name: "Customers",
      },
      {
        href: "#",
        name: "Brand",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      {
        href: "#",
        name: "Community",
      },
      {
        href: "#",
        name: "Contact",
      },
      {
        href: "#",
        name: "Dribbble",
      },
      {
        href: "#",
        name: "GitHub",
      },
      {
        href: "#",
        name: "Terms of service",
      },
      {
        href: "#",
        name: "Privacy policy",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        href: "#",
        name: "API",
      },
      {
        href: "#",
        name: "Status",
      },
      {
        href: "#",
        name: "GitHub",
      },
      {
        href: "#",
        name: "README",
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {footerNavs.map((nav, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-medium text-white">{nav.label}</h3>
              <ul className="mt-4 space-y-2">
                {nav.items.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-white/70 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};