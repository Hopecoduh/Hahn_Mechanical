import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function SettingsManager() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: () => base44.entities.SiteSettings.list().then((list) => list[0] || null),
  });

  const updateMutation = useMutation({
    mutationFn: async (updates) => {
      if (settings?.id) {
        return base44.entities.SiteSettings.update(settings.id, updates);
      } else {
        return base44.entities.SiteSettings.create(updates);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["siteSettings"] }),
  });

  const testimonialsEnabled = settings?.testimonials_enabled ?? false;

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-[#002b28]">Site Settings</h2>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#002b28]">Testimonials Page</h3>
            <p className="text-sm text-gray-500 mt-1">
              Show the Testimonials page in the navigation once you have customer reviews.
            </p>
          </div>
          <button
            disabled={isLoading || updateMutation.isPending}
            onClick={() =>
              updateMutation.mutate({ testimonials_enabled: !testimonialsEnabled })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              testimonialsEnabled ? "bg-[#09ffee]" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                testimonialsEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p
          className={`mt-4 text-xs font-medium ${
            testimonialsEnabled ? "text-green-600" : "text-gray-400"
          }`}
        >
          {testimonialsEnabled
            ? "✓ Testimonials page is live"
            : "Testimonials page is hidden from visitors"}
        </p>
      </div>
    </div>
  );
}