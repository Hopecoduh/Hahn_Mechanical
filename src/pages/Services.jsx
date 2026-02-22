import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Building2, Wrench, Wind, Snowflake, Thermometer, Zap, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import ServiceCard from "../components/services/ServiceCard";

const services = [
  {
    icon: Building2,
    title: "New Construction Installs",
    shortDesc: "Complete HVAC systems for new builds",
    description: "We design and install complete HVAC systems for new residential and commercial construction projects. Our team works directly with builders to ensure seamless integration.",
    features: [
      "Custom system design",
      "Energy-efficient solutions",
      "Code-compliant installation",
      "Warranty included"
    ]
  },
  {
    icon: Wrench,
    title: "Retrofit Installation",
    shortDesc: "Upgrade your existing systems",
    description: "Upgrade your current HVAC system without major construction. We specialize in fitting modern, efficient equipment into existing spaces while minimizing disruption.",
    features: [
      "Minimal downtime",
      "Improved efficiency",
      "Modern equipment",
      "Cost-effective solutions"
    ]
  },
  {
    icon: Wind,
    title: "Duct Removal & Replacement",
    shortDesc: "Complete ductwork services",
    description: "Old or damaged ductwork reduces efficiency and air quality. We remove outdated systems and install new, properly sealed ductwork for optimal airflow.",
    features: [
      "Full system assessment",
      "Leak-free installation",
      "Improved air quality",
      "Better energy efficiency"
    ]
  },
  {
    icon: Snowflake,
    title: "AC Services",
    shortDesc: "Installation, repair & maintenance",
    description: "From new installations to repairs and annual maintenance, we keep your air conditioning running at peak performance all season long.",
    features: [
      "New system installation",
      "Emergency repairs",
      "Preventive maintenance",
      "All major brands serviced"
    ]
  },
  {
    icon: Thermometer,
    title: "Mini Splits",
    shortDesc: "Ductless heating & cooling",
    description: "Ductless mini-split systems offer efficient zone control without the need for ductwork. Perfect for additions, converted spaces, or homes without existing ducts.",
    features: [
      "Zone temperature control",
      "No ductwork needed",
      "Quiet operation",
      "Energy savings"
    ]
  },
  {
    icon: Zap,
    title: "Heat Pumps",
    shortDesc: "Energy-efficient climate control",
    description: "Heat pumps provide both heating and cooling in one efficient system. We install, repair, and maintain all types of heat pump systems.",
    features: [
      "Year-round comfort",
      "Lower energy bills",
      "Eco-friendly option",
      "Rebate-eligible systems"
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#002b28] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#09ffee] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#09ffee] text-sm font-semibold uppercase tracking-wider">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Our Services
            </h1>
            <p className="text-gray-300 max-w-xl">
              Professional HVAC solutions for every need. Click any service to learn more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#002b28] mb-3">
              Need Help Choosing?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Not sure which service you need? Contact us for a free consultation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+14084605304"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff7a0f] text-white font-medium rounded-full hover:bg-[#e66d0d] transition-all"
              >
                <Phone size={18} />
                (408) 460-5304
              </a>
              <Link
                to={createPageUrl("Contact")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#002b28] text-white font-medium rounded-full hover:bg-[#003d38] transition-all"
              >
                Get a Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}