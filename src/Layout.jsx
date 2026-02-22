import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: settings } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => base44.entities.SiteSettings.list().then((list) => list[0] || null),
    staleTime: 5 * 60 * 1000,
  });

  const testimonialsEnabled = settings?.testimonials_enabled;

  const navLinks = [
    { name: "Home", page: "Home" },
    { name: "Services", page: "Services" },
    { name: "Gallery", page: "Gallery" },
    ...(testimonialsEnabled ? [{ name: "Testimonials", page: "Testimonials" }] : []),
    { name: "Contact", page: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --primary: #09ffee;
          --accent: #ff7a0f;
          --dark: #002b28;
        }
      `}</style>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-6xl mx-auto px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969491ff80d4e14b8d4ac77/b86c7f9c9_hahnlogo.png"
                alt="Hahn Mechanical"
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-xs lg:text-sm font-medium transition-colors ${
                    currentPageName === link.page
                      ? "text-[#002b28]"
                      : "text-gray-500 hover:text-[#002b28]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <a
                href="tel:+14084605304"
                className="px-4 lg:px-5 py-2 lg:py-2.5 bg-[#ff7a0f] text-white text-xs lg:text-sm font-medium rounded-full hover:bg-[#e66d0d] transition-all shadow-lg shadow-orange-500/20"
              >
                (408) 460-5304
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#002b28]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-base font-medium ${
                      currentPageName === link.page ? "text-[#002b28]" : "text-gray-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="flex gap-3 pt-4">
                  <a
                    href="tel:+14084605304"
                    className="flex-1 py-3 bg-[#ff7a0f] text-white text-center text-sm font-medium rounded-full"
                  >
                    <Phone size={16} className="inline mr-2" />
                    Call
                  </a>
                  <a
                    href="sms:+14084605304"
                    className="flex-1 py-3 bg-[#002b28] text-white text-center text-sm font-medium rounded-full"
                  >
                    <MessageCircle size={16} className="inline mr-2" />
                    Text
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20 md:pt-24 lg:pt-28">{children}</main>

      {/* Footer */}
      <footer className="bg-[#002b28] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Hahn Mechanical</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Professional HVAC services for residential and commercial properties.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#09ffee]">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="block text-gray-300 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-[#09ffee]">Contact</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="mailto:info@hahnmechanical.com"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  info@hahnmechanical.com
                </a>
                <a
                  href="tel:+14084605304"
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  (408) 460-5304
                </a>
                <p className="text-gray-300 mt-4">LIC. 1128875</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Hahn Mechanical. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}