import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";

import {
  Trash2,
  ImagePlus,
  X,
} from "lucide-react";

import "./admin.css";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [file, setFile] = useState(null);

  // Image preview state
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get("/reviews");

      setReviews(
        Array.isArray(data)
          ? data
          : data?.reviews || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch reviews",
        error
      );
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /*
   * Selected image ka preview create hoga.
   * New image select hone par old preview clean hoga.
   */
  useEffect(() => {
    if (!file) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  const handleImageChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    // Sirf image files accept hongi
    if (!selectedFile.type.startsWith("image/")) {
      setMessage(
        "Please select a valid image file."
      );

      event.target.value = "";
      setFile(null);
      return;
    }

    // Maximum 5MB image
    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage(
        "Image size must be less than 5MB."
      );

      event.target.value = "";
      setFile(null);
      return;
    }

    setMessage("");
    setFile(selectedFile);
  };

  const removeSelectedImage = () => {
    setFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setQuote("");
    setFile(null);
    setImagePreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage(
        "Please select a student image."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();

    formData.append("name", name.trim());
    formData.append("company", company.trim());
    formData.append("quote", quote.trim());

    // Backend ka existing field same rakha hai
    formData.append("img", file);

    try {
      await api.post("/reviews", formData);

      setMessage(
        "Review added successfully!"
      );

      resetForm();
      await fetchReviews();
    } catch (error) {
      setMessage(
        "Failed to add review: " +
          (
            error.response?.data?.message ||
            error.message
          )
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/reviews/${id}`);
      await fetchReviews();
    } catch (error) {
      console.error(
        "Failed to delete review",
        error
      );
    }
  };

  const getReviewImage = (review) => {
    return (
      review?.img ||
      review?.image ||
      "/placeholder-image.png"
    );
  };

  return (
    <AdminLayout>
      <div className="admin-content-header">
        <h2>Manage Reviews</h2>

        <p>
          Add student success stories or remove
          existing ones.
        </p>
      </div>

      <div className="reviews-admin-container">
        {/* Add Review Form */}
        <div className="admin-card review-form-card">
          <h3>Add New Review</h3>

          {message && (
            <div className="admin-message">
              {message}
            </div>
          )}

          <form
            onSubmit={submitHandler}
            className="review-form"
          >
            <div className="form-group">
              <label>Student Name</label>

              <input
                type="text"
                required
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="e.g. John Doe"
              />
            </div>

            <div className="form-group">
              <label>Company / Role</label>

              <input
                type="text"
                required
                value={company}
                onChange={(event) =>
                  setCompany(event.target.value)
                }
                placeholder="e.g. Microsoft"
              />
            </div>

            <div className="form-group">
              <label>
                Quote (Review Text)
              </label>

              <textarea
                required
                value={quote}
                onChange={(event) =>
                  setQuote(event.target.value)
                }
                rows="4"
                placeholder="Enter review text here..."
              />
            </div>

            {/* Image Upload With Preview */}
            <div className="form-group">
              <label>Student Image</label>

              <div className="review-upload-wrapper">
                <label
                  htmlFor="student-review-image"
                  className="review-image-upload"
                >
                  {imagePreview ? (
                    <div className="review-preview-box">
                      <img
                        src={imagePreview}
                        alt="Selected student preview"
                      />

                      <div className="review-preview-overlay">
                        <ImagePlus size={19} />
                        <span>
                          Click to change image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="review-upload-empty">
                      <div className="review-upload-icon">
                        <ImagePlus size={28} />
                      </div>

                      <div>
                        <strong>
                          Select student image
                        </strong>

                        <span>
                          PNG, JPG, JPEG or WebP
                        </span>
                      </div>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    id="student-review-image"
                    type="file"
                    accept="image/*"
                    required={!file}
                    onChange={handleImageChange}
                  />
                </label>

                {file && (
                  <div className="review-selected-file">
                    <span title={file.name}>
                      {file.name}
                    </span>

                    <button
                      type="button"
                      onClick={removeSelectedImage}
                    >
                      <X size={16} />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="admin-btn"
              disabled={loading}
            >
              {loading
                ? "Uploading..."
                : "Add Review"}
            </button>
          </form>
        </div>

        {/* Existing Reviews */}
        <div className="admin-card reviews-list-card">
          <h3>Existing Reviews</h3>

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p>No reviews added yet.</p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="review-list-item"
                >
                  <img
                    src={getReviewImage(review)}
                    alt={review.name}
                    className="review-list-img"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src =
                        "/placeholder-image.png";
                    }}
                  />

                  <div className="review-list-info">
                    <h4>{review.name}</h4>

                    <span className="review-list-company">
                      {review.company}
                    </span>

                    <p className="review-list-quote">
                      “
                      {review.quote?.length > 50
                        ? `${review.quote.substring(
                            0,
                            50
                          )}...`
                        : review.quote}
                      ”
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      deleteHandler(review._id)
                    }
                    className="delete-btn"
                    aria-label="Delete review"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;