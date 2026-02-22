import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#002b28] via-[#003d38] to-[#002b28]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#09ffee] rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ff7a0f] rounded-full blur-3xl" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-[#09ffee]/10 text-[#09ffee] text-sm font-medium rounded-full mb-6 border border-[#09ffee]/20">
              Professional HVAC Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
          >
            Comfort You Can
            <span className="text-[#09ffee]"> Count On</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-10 leading-relaxed"
          >
            Expert HVAC installation, repair, and maintenance for homes and businesses. 
            Quality work, fair prices, lasting results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="tel:+14084605304"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff7a0f] text-white font-medium rounded-full hover:bg-[#e66d0d] transition-all shadow-lg shadow-orange-500/30"
            >
              <Phone size={18} />
              (408) 460-5304
            </a>
            <a
              href="sms:+14084605304"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
            >
              <MessageCircle size={18} />
              Text Us
            </a>
            <Link
              to={createPageUrl("Contact")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#09ffee] text-[#002b28] font-medium rounded-full hover:bg-[#00e6d6] transition-all"
            >
              Get a Quote
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}