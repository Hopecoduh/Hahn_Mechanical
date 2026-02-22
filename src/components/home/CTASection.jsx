import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#002b28] rounded-3xl p-12 md:p-16 overflow-hidden"
        >
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#09ffee] rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ff7a0f] rounded-full blur-3xl opacity-10" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-10">
              Contact us today for a free consultation. We're here to help with all your HVAC needs.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+14084605304"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff7a0f] text-white font-medium rounded-full hover:bg-[#e66d0d] transition-all shadow-lg"
              >
                <Phone size={18} />
                (408) 460-5304
              </a>
              <Link
                to={createPageUrl("Contact")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#09ffee] text-[#002b28] font-medium rounded-full hover:bg-[#00e6d6] transition-all"
              >
                Request Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}