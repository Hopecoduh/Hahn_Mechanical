import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Send, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useMutation({
    mutationFn: (data) => base44.entities.ContactSubmission.create(data),
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-[#002b28] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#09ffee] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#09ffee] text-sm font-semibold uppercase tracking-wider">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-300 max-w-xl">
              Ready to discuss your HVAC needs? Reach out and we'll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#002b28] mb-6">
                Let's Talk
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed">
                Whether you need a new installation, repair, or just have questions about your HVAC system, we're here to help.
              </p>

              <div className="space-y-6">
                <a
                  href="tel:+14084605304"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-[#ff7a0f]/10 rounded-xl flex items-center justify-center group-hover:bg-[#ff7a0f] transition-colors">
                    <Phone className="w-6 h-6 text-[#ff7a0f] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us</p>
                    <p className="text-lg font-semibold text-[#002b28]">(408) 460-5304</p>
                  </div>
                </a>

                <a
                  href="sms:+14084605304"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-[#09ffee]/10 rounded-xl flex items-center justify-center group-hover:bg-[#09ffee] transition-colors">
                    <MessageCircle className="w-6 h-6 text-[#002b28]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Text us</p>
                    <p className="text-lg font-semibold text-[#002b28]">(408) 460-5304</p>
                  </div>
                </a>

                <a
                  href="mailto:info@hahnmechanical.com"
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-[#002b28]/10 rounded-xl flex items-center justify-center group-hover:bg-[#002b28] transition-colors">
                    <Mail className="w-6 h-6 text-[#002b28] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us</p>
                    <p className="text-lg font-semibold text-[#002b28]">info@hahnmechanical.com</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-lg text-center">
                  <div className="w-20 h-20 bg-[#09ffee]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#002b28]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#002b28] mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-[#002b28] text-[#002b28] hover:bg-[#002b28] hover:text-white"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg">
                  <h3 className="text-xl font-bold text-[#002b28] mb-6">
                    Request a Quote
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="mt-2 h-12 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="mt-2 h-12 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        className="mt-2 h-12 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your HVAC needs..."
                        rows={4}
                        className="mt-2 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee] resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="w-full h-12 bg-[#ff7a0f] hover:bg-[#e66d0d] text-white font-medium rounded-full shadow-lg shadow-orange-500/20"
                    >
                      {submitMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}