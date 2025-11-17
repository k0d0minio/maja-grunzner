"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { content } from "../lib/content";
import Button from "./Button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["hero", "about", "services", "testimonials", "articles", "faq"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-[#4a90e2] transition-colors"
            onClick={(e) => handleLinkClick(e, "#hero")}
          >
            {content.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className={`text-sm font-medium transition-colors ${
                activeSection === "about"
                  ? "text-[#4a90e2]"
                  : "text-gray-700 hover:text-[#4a90e2]"
              }`}
              onClick={(e) => handleLinkClick(e, "#about")}
            >
              About Me
            </Link>
            <div className="relative group">
              <button
                className={`text-sm font-medium transition-colors flex items-center ${
                  activeSection === "services"
                    ? "text-[#4a90e2]"
                    : "text-gray-700 hover:text-[#4a90e2]"
                }`}
              >
                Services
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    href="#services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleLinkClick(e, "#services")}
                  >
                    All Services
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleLinkClick(e, "#services")}
                  >
                    Individual Therapy
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleLinkClick(e, "#services")}
                  >
                    Couples Therapy
                  </Link>
                  <Link
                    href="#services"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => handleLinkClick(e, "#services")}
                  >
                    Family Therapy
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="#articles"
              className={`text-sm font-medium transition-colors ${
                activeSection === "articles"
                  ? "text-[#4a90e2]"
                  : "text-gray-700 hover:text-[#4a90e2]"
              }`}
              onClick={(e) => handleLinkClick(e, "#articles")}
            >
              Articles
            </Link>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#hero");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Start Your Journey
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#4a90e2] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-200">
          <Link
            href="#about"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#4a90e2] hover:bg-gray-50 rounded-md"
            onClick={(e) => handleLinkClick(e, "#about")}
          >
            About Me
          </Link>
          <Link
            href="#services"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#4a90e2] hover:bg-gray-50 rounded-md"
            onClick={(e) => handleLinkClick(e, "#services")}
          >
            Services
          </Link>
          <Link
            href="#articles"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#4a90e2] hover:bg-gray-50 rounded-md"
            onClick={(e) => handleLinkClick(e, "#articles")}
          >
            Articles
          </Link>
          <div className="pt-2">
            <Button
              variant="primary"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const element = document.querySelector("#hero");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

