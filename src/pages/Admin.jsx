import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Images, MessageSquare, Settings, LogOut } from "lucide-react";
import { createPageUrl } from "@/utils";
import GalleryManager from "../components/admin/GalleryManager";
import TestimonialsManager from "../components/admin/TestimonialsManager";
import SettingsManager from "../components/admin/SettingsManager";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("gallery");

  // Add noindex meta
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const auth = await base44.auth.isAuthenticated();
      if (!auth) return null;
      return base44.auth.me();
    },
    retry: false,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = createPageUrl("AdminLogin");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl border border-gray-100 shadow-sm max-w-sm">
          <p className="text-5xl mb-4">🚫</p>
          <h2 className="text-xl font-bold text-[#002b28] mb-2">403 — Forbidden</h2>
          <p className="text-gray-500 text-sm mb-6">You don't have permission to access this page.</p>
          <a href="/" className="text-sm text-[#002b28] underline">Go to Homepage</a>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#002b28] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Manage your website content</p>
            </div>
            <button
              onClick={() => base44.auth.logout(createPageUrl("AdminLogin"))}
              className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          <div className="flex gap-6 mt-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-all ${
                    activeTab === tab.id
                      ? "border-[#09ffee] text-[#09ffee]"
                      : "border-transparent text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === "gallery" && <GalleryManager />}
        {activeTab === "testimonials" && <TestimonialsManager />}
        {activeTab === "settings" && <SettingsManager />}
      </div>
    </div>
  );
}