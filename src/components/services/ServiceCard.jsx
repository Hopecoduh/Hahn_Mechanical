import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-8 text-left flex items-start justify-between gap-4"
      >
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 bg-[#09ffee]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <service.icon className="w-7 h-7 text-[#002b28]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#002b28] mb-1">
              {service.title}
            </h3>
            <p className="text-gray-500 text-sm">{service.shortDesc}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-0">
              <div className="border-t border-gray-100 pt-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                {service.features && (
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-[#09ffee]/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#002b28]" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to={createPageUrl("ServiceInquiry") + `?service=${encodeURIComponent(service.title)}`}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#ff7a0f] text-white font-medium rounded-full hover:bg-[#e66d0d] transition-all"
                >
                  Request This Service
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}