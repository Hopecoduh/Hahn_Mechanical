import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => base44.entities.Testimonial.filter({ is_published: true }, "-created_date"),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#002b28] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#09ffee] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[#09ffee] text-sm font-semibold uppercase tracking-wider">
              Customer Reviews
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              What Our Customers Say
            </h1>
            <p className="text-gray-300 max-w-xl">
              Real feedback from our valued customers.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20 text-gray-400">Loading...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">No reviews yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={idx < t.rating ? "fill-[#ff7a0f] text-[#ff7a0f]" : "text-gray-200"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  <p className="font-semibold text-[#002b28] text-sm">— {t.customer_name}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}