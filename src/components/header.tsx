"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Brand, Arrow } from "./brand";
const links = [
  ["Services", "/services"],
  ["Service areas", "/service-areas"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const path = usePathname();
  function close() {
    setOpen(false);
  }
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          close();
          button.current?.focus();
        }
      }}
    >
      <div className="container header-inner">
        <Link href="/" aria-label="Saeed Contracting home" onClick={close}>
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/request-a-quote"
          className="button button-light header-quote"
        >
          Get a quote <Arrow diagonal />
        </Link>
        <button
          ref={button}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
      >
        {links.map(([label, href]) => (
          <Link
            onClick={close}
            key={href}
            href={href}
            aria-current={path === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
        <Link onClick={close} href="/request-a-quote">
          Request a quote
        </Link>
        <a href="tel:+16046270166">Call 604-627-0166</a>
      </nav>
    </header>
  );
}
