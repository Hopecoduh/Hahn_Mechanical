import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, Wrench, Wind, Thermometer, Snowflake, Zap, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Building2, title: "New Construction", desc: "Complete HVAC systems for new builds" },
  { icon: Wrench, title: "Retrofit Install", desc: "Upgrade your existing systems" },
  { icon: Wind, title: "Ductwork", desc: "Removal & replacement services" },
  { icon: Snowflake, title: "AC Services", desc: "Installation, repair & maintenance" },
  { icon: Thermometer, title: "Mini Splits", desc: "Ductless heating & cooling" },
  { icon: Zap, title: "Heat Pumps", desc: "Energy-efficient climate control" },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#ff7a0f] text-sm font-semibold uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#002b28] mt-3">
            Our Services
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#09ffee]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#09ffee] transition-colors">
                <service.icon className="w-7 h-7 text-[#002b28]" />
              </div>
              <h3 className="text-xl font-semibold text-[#002b28] mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={createPageUrl("Services")}
            className="inline-flex items-center gap-2 text-[#002b28] font-medium hover:text-[#ff7a0f] transition-colors"
          >
            View All Services
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}