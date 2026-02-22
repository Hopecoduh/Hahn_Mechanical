import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ServiceInquiry() {
  const [serviceName, setServiceName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get("service");
    if (service) {
      setServiceName(service);
    }
  }, []);

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      // Save to database
      await base44.entities.ContactSubmission.create({
        ...data,
        service_type: serviceName
      });

      // Send email notification
      await base44.integrations.Core.SendEmail({
        to: "info@hahnmechanical.com",
        subject: `New Service Request: ${serviceName}`,
        body: `
New Service Inquiry Received

Service Requested: ${serviceName}

Customer Information:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}

Message:
${data.message || "No message provided"}

---
This inquiry was submitted via the Hahn Mechanical website.
        `.trim()
      });
    },
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
      <section className="bg-[#002b28] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#09ffee] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
          <Link
            to={createPageUrl("Services")}
            className="inline-flex items-center gap-2 text-[#09ffee] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Request This Service
            </h1>
            {serviceName && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#09ffee]/20 text-[#09ffee] rounded-full border border-[#09ffee]/30">
                <span className="text-sm font-medium">{serviceName}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-10 border border-gray-100 shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-[#09ffee]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#002b28]" />
              </div>
              <h3 className="text-2xl font-bold text-[#002b28] mb-3">
                Request Received!
              </h3>
              <p className="text-gray-600 mb-2">
                Thank you for your interest in our {serviceName} service.
              </p>
              <p className="text-gray-600 mb-8">
                We'll contact you within 24 hours to discuss your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to={createPageUrl("Services")}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#002b28] text-[#002b28] font-medium rounded-full hover:bg-[#002b28] hover:text-white transition-all"
                >
                  View Other Services
                </Link>
                <Link
                  to={createPageUrl("Home")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff7a0f] text-white font-medium rounded-full hover:bg-[#e66d0d] transition-all"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-lg">
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Fill out the form below and we'll get back to you with a quote and next steps.
                </p>

                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                      className="mt-2 h-12 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@email.com"
                      className="mt-2 h-12 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(123) 456-7890"
                      className="mt-2 h-12 border-gray-200 focus:border-[#09ffee] focus:ring-[#09ffee]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Additional Details (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your project..."
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
                        Submit Request
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500 pt-2">
                    Or call us directly at{" "}
                    <a href="tel:+14084605304" className="text-[#ff7a0f] font-medium hover:underline">
                      (408) 460-5304
                    </a>
                  </p>
                </div>
              </form>

              {/* Quick Contact Options */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <a
                  href="tel:+14084605304"
                  className="flex items-center justify-center gap-3 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-[#ff7a0f]/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#ff7a0f]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Prefer to call?</p>
                    <p className="text-sm font-semibold text-[#002b28]">(408) 460-5304</p>
                  </div>
                </a>

                <a
                  href="mailto:info@hahnmechanical.com"
                  className="flex items-center justify-center gap-3 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 bg-[#09ffee]/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#002b28]" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Email us instead</p>
                    <p className="text-sm font-semibold text-[#002b28]">info@hahnmechanical.com</p>
                  </div>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}