import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Star, Eye, EyeOff } from "lucide-react";

export default function TestimonialsManager() {
  const [form, setForm] = useState({ customer_name: "", text: "", rating: 5, is_published: true });
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["allTestimonials"],
    queryFn: () => base44.entities.Testimonial.list("-created_date"),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Testimonial.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTestimonials"] });
      setForm({ customer_name: "", text: "", rating: 5, is_published: true });
      setShowForm(false);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_published }) =>
      base44.entities.Testimonial.update(id, { is_published }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allTestimonials"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Testimonial.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allTestimonials"] }),
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#002b28]">
          Testimonials ({testimonials.length})
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#002b28] hover:bg-[#003d38] text-white"
        >
          <Plus size={16} className="mr-2" />
          Add Testimonial
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-semibold text-[#002b28]">New Testimonial</h3>
          <div>
            <Label>Customer Name</Label>
            <Input
              value={form.customer_name}
              onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
              placeholder="John Smith"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Testimonial</Label>
            <Textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              placeholder="What did the customer say?"
              rows={3}
              className="mt-2 resize-none"
            />
          </div>
          <div>
            <Label>Rating</Label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setForm({ ...form, rating: star })}>
                  <Star
                    size={24}
                    className={
                      star <= form.rating
                        ? "fill-[#ff7a0f] text-[#ff7a0f]"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => createMutation.mutate(form)}
              disabled={!form.customer_name || !form.text || createMutation.isPending}
              className="bg-[#ff7a0f] hover:bg-[#e66d0d] text-white"
            >
              {createMutation.isPending ? "Saving..." : "Save Testimonial"}
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-white rounded-2xl border border-gray-100">
          No testimonials yet. Add your first one above.
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p className="font-semibold text-[#002b28]">{t.customer_name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < t.rating
                              ? "fill-[#ff7a0f] text-[#ff7a0f]"
                              : "text-gray-200"
                          }
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        t.is_published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.is_published ? "Published" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{t.text}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      toggleMutation.mutate({ id: t.id, is_published: !t.is_published })
                    }
                    className="h-8 w-8"
                    title={t.is_published ? "Hide" : "Publish"}
                  >
                    {t.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => deleteMutation.mutate(t.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:border-red-300"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}