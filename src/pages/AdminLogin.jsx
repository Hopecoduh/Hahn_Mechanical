import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { createPageUrl } from "@/utils";

export default function AdminLogin() {
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

  // If already logged in as admin, redirect to admin
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "admin") {
        window.location.href = createPageUrl("Admin");
      } else {
        // Logged in but not admin
        base44.auth.logout(window.location.href);
      }
    }
  }, [user, isLoading]);

  const handleLogin = () => {
    base44.auth.redirectToLogin(createPageUrl("Admin"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#002b28] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002b28] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-2">Hahn Mechanical — Staff Only</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <p className="text-gray-600 text-sm text-center mb-6">
            Sign in with your admin credentials to manage the website.
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-[#002b28] text-white font-medium rounded-xl hover:bg-[#003d38] transition-colors"
          >
            Sign In
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">
            Only authorized personnel may access this area.
          </p>
        </div>
      </div>
    </div>
  );
}