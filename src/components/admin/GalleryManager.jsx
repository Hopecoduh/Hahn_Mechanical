import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Upload, Plus } from "lucide-react";

const CATEGORIES = [
  { value: "new_construction", label: "New Construction" },
  { value: "retrofit", label: "Retrofit" },
  { value: "ductwork", label: "Ductwork" },
  { value: "ac_services", label: "AC Services" },
  { value: "mini_splits", label: "Mini Splits" },
  { value: "heat_pumps", label: "Heat Pumps" },
];

export default function GalleryManager() {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({ title: "", category: "ac_services" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["galleryImages"],
    queryFn: () => base44.entities.GalleryImage.list("-created_date"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.GalleryImage.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["galleryImages"] }),
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !form.title) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file: selectedFile });
    await base44.entities.GalleryImage.create({ ...form, image_url: file_url });
    queryClient.invalidateQueries({ queryKey: ["galleryImages"] });
    setForm({ title: "", category: "ac_services" });
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
  };

  return (
    <div className="space-y-10">
      {/* Upload Form */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-semibold text-[#002b28] mb-6 flex items-center gap-2">
          <Plus size={18} />
          Add New Photo
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium">Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Mini Split Installation"
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-gray-700 font-medium">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-700 font-medium">Photo</Label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 w-full border-dashed"
              >
                <Upload size={16} className="mr-2" />
                {selectedFile ? selectedFile.name : "Choose Photo"}
              </Button>
            </div>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !form.title || uploading}
              className="w-full bg-[#002b28] hover:bg-[#003d38] text-white"
            >
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
          {preview && (
            <div className="flex items-center justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 w-full object-cover rounded-xl"
              />
            </div>
          )}
        </div>
      </div>

      {/* Image Grid */}
      <div>
        <h2 className="text-lg font-semibold text-[#002b28] mb-6">
          Gallery Photos ({images.length})
        </h2>
        {isLoading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : images.length === 0 ? (
          <div className="text-center py-10 text-gray-400 bg-white rounded-2xl border border-gray-100">
            No photos yet. Add your first photo above.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(img.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="p-2 bg-white">
                  <p className="text-xs font-medium text-[#002b28] truncate">{img.title}</p>
                  <p className="text-xs text-gray-400">
                    {CATEGORIES.find((c) => c.value === img.category)?.label || img.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}