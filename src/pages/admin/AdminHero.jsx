import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Save,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
  Plus
} from "lucide-react";
import api, { baseURL } from "../../utils/api";
import "./AdminHero.css";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const AdminHero = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
  });

  const [existingImages, setExistingImages] = useState([]); // List of image paths from DB
  const [newFiles, setNewFiles] = useState([]); // List of File objects selected by user
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef(null);

  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }
    const normalizedBase = String(baseURL || "").replace(/\/+$/, "");
    const normalizedPath = String(imagePath).replace(/^\/+/, "");
    return normalizedBase
      ? `${normalizedBase}/${normalizedPath}`
      : `/${normalizedPath}`;
  };

  const fetchHeroInfo = async () => {
    try {
      setFetching(true);
      setMessage({ type: "", text: "" });

      const { data } = await api.get("/hero-info");

      if (data) {
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
        });

        // Initialize images array from DB or single image fallback
        if (Array.isArray(data.images) && data.images.length > 0) {
          setExistingImages(data.images);
        } else if (data.image) {
          setExistingImages([data.image]);
        } else {
          setExistingImages([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch hero info:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to load hero section data. Please try again.",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchHeroInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles = [];
    let errorMessage = "";

    for (const file of files) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        errorMessage = "Invalid image type. Please select PNG, JPG, JPEG, or WEBP.";
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        errorMessage = "File size exceeds 5MB limit.";
        continue;
      }
      validFiles.push(file);
    }

    if (errorMessage && validFiles.length === 0) {
      setMessage({ type: "error", text: errorMessage });
      return;
    }

    setNewFiles((prev) => [...prev, ...validFiles]);
    setMessage({ type: "", text: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemoveNewFile = (indexToRemove) => {
    setNewFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.subtitle.trim()) {
      setMessage({
        type: "error",
        text: "Title and subtitle cannot be empty.",
      });
      return;
    }

    if (existingImages.length === 0 && newFiles.length === 0) {
      setMessage({
        type: "error",
        text: "Please keep or upload at least one image for the hero section.",
      });
      return;
    }

    try {
      setSaving(true);
      setMessage({ type: "", text: "" });

      const formPayload = new FormData();
      formPayload.append("title", formData.title.trim());
      formPayload.append("subtitle", formData.subtitle.trim());
      formPayload.append("existingImages", JSON.stringify(existingImages));

      newFiles.forEach((file) => {
        formPayload.append("images", file);
      });

      const { data } = await api.put("/hero-info", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({
        type: "success",
        text: "Hero Section updated successfully!",
      });

      if (data) {
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
        });
        if (Array.isArray(data.images)) {
          setExistingImages(data.images);
        }
        setNewFiles([]);
      }
    } catch (error) {
      console.error("Failed to update Hero Info:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to update Hero Section. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="admin-loading-container">
          <Loader2 className="admin-spinner" size={32} />
          <p>Loading Hero Section settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-hero-editor-container">
        {/* Header */}
        <div className="admin-content-header">
          <div>
            <span className="admin-section-label">
              <Sparkles size={15} /> Homepage Customization
            </span>
            <h2>Hero Section Editor</h2>
            <p>
              Manage hero headlines, descriptions, and multiple sliding hero images.
            </p>
          </div>
        </div>

        {/* Message Banner */}
        {message.text && (
          <div className={`admin-hero-alert alert-${message.type}`}>
            {message.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message.text}</span>
            <button
              type="button"
              className="alert-close-btn"
              onClick={() => setMessage({ type: "", text: "" })}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Main Form */}
        <div className="admin-hero-card">
          <form onSubmit={handleSubmit} className="admin-hero-form">
            <div className="hero-form-group">
              <label htmlFor="title">Main Title (Headline)</label>
              <textarea
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Learn the Skills Top Companies Seek"
                required
                rows={2}
                className="hero-textarea-title"
              />
            </div>

            <div className="hero-form-group">
              <label htmlFor="subtitle">Subtitle (Description)</label>
              <textarea
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="e.g. Don't stay behind in this fast world..."
                required
                rows={3}
              />
            </div>

            {/* Multiple Images Gallery & Upload */}
            <div className="hero-form-group">
              <label>Hero Slider Images ({existingImages.length + newFiles.length} total)</label>
              
              <div className="hero-images-grid">
                {/* Existing Images from DB */}
                {existingImages.map((imgPath, index) => (
                  <div key={`existing-${index}`} className="hero-image-tile">
                    <img
                      src={resolveImageUrl(imgPath)}
                      alt={`Hero Slide ${index + 1}`}
                      className="tile-img"
                    />
                    <div className="tile-badge">Slide {index + 1}</div>
                    <button
                      type="button"
                      className="tile-delete-btn"
                      onClick={() => handleRemoveExistingImage(index)}
                      title="Delete this image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                {/* Staged New Files */}
                {newFiles.map((file, index) => {
                  const previewUrl = URL.createObjectURL(file);
                  return (
                    <div key={`new-${index}`} className="hero-image-tile tile-staged">
                      <img
                        src={previewUrl}
                        alt={`New Slide ${index + 1}`}
                        className="tile-img"
                      />
                      <div className="tile-badge badge-new">New</div>
                      <button
                        type="button"
                        className="tile-delete-btn"
                        onClick={() => handleRemoveNewFile(index)}
                        title="Remove file"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  );
                })}

                {/* Add Image Button Box */}
                <div
                  className="hero-image-add-box"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus size={28} />
                  <span>Add Images</span>
                </div>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                multiple
                hidden
              />
              <p className="hero-upload-help">
                You can select multiple images. They will automatically slide on the homepage.
              </p>
            </div>

            {/* Actions */}
            <div className="hero-form-actions">
              <button
                type="submit"
                className="btn-save-hero"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="admin-spinner" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>Update Hero Section</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHero;