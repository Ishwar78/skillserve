import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";

import {
  Trash2,
  Edit2,
  Plus,
  X,
  ImagePlus,
  Layers3,
  ExternalLink,
  Save,
  Loader2,
  Tags,
} from "lucide-react";

import "./admin.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  // Add category states
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [addPreview, setAddPreview] = useState("");

  // Edit category states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCourses, setEditCourses] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // Add image preview
  useEffect(() => {
    if (!file) {
      setAddPreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(file);
    setAddPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  // Edit image preview
  useEffect(() => {
    if (!editFile) {
      setEditPreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(editFile);
    setEditPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [editFile]);

  const showMessage = (type, text) => {
    setMessage({
      type,
      text,
    });
  };

  const fetchCategories = async () => {
    try {
      setFetching(true);

      const { data } = await api.get("/categories");

      const categoryList = Array.isArray(data)
        ? data
        : Array.isArray(data?.categories)
          ? data.categories
          : [];

      setCategories(categoryList);
    } catch (error) {
      console.error("Failed to fetch categories", error);

      showMessage(
        "error",
        error.response?.data?.message ||
          "Failed to load categories. Please try again."
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetAddForm = () => {
    setTitle("");
    setCourses("");
    setLink("");
    setFile(null);
    setAddPreview("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!file) {
      showMessage("error", "Please select a category image.");
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("courses", courses);
    formData.append("link", link.trim());
    formData.append("image", file);

    try {
      await api.post("/categories", formData);

      showMessage("success", "Category added successfully!");

      resetAddForm();
      await fetchCategories();
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          error.message ||
          "Failed to add category."
      );
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (category) => {
    setEditingId(category._id);

    setEditTitle(category.title || "");
    setEditCourses(category.courses ?? "");
    setEditLink(category.link || "");
    setEditFile(null);
    setEditPreview("");

    setMessage({
      type: "",
      text: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditCourses("");
    setEditLink("");
    setEditFile(null);
    setEditPreview("");
  };

  const updateHandler = async (event) => {
    event.preventDefault();

    if (!editingId) {
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();

    formData.append("title", editTitle.trim());
    formData.append("courses", editCourses);
    formData.append("link", editLink.trim());

    if (editFile) {
      formData.append("image", editFile);
    }

    try {
      await api.put(`/categories/${editingId}`, formData);

      showMessage("success", "Category updated successfully!");

      cancelEdit();
      await fetchCategories();
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          error.message ||
          "Failed to update category."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/categories/${categoryId}`);

      showMessage("success", "Category deleted successfully!");

      if (editingId === categoryId) {
        cancelEdit();
      }

      await fetchCategories();
    } catch (error) {
      showMessage(
        "error",
        error.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };

  const getCategoryImage = (category) => {
    return (
      category?.image ||
      category?.img ||
      category?.categoryImage ||
      "/placeholder-image.png"
    );
  };

  return (
    <AdminLayout>
      <div className="admin-categories-page">
        {/* Page Header */}
        {/* <div className="admin-page-header">
          <div className="admin-page-header-content">
            <span className="admin-section-label">
              <Tags size={15} />
              Category Management
            </span>

            <h1>Manage Categories</h1>

            <p>
              Add, update and manage course categories displayed on the
              SkillServe Academy website.
            </p>
          </div>

          <div className="admin-page-count-card">
            <div className="admin-page-count-icon">
              <Layers3 size={24} />
            </div>

            <div>
              <span>Total Categories</span>
              <strong>{categories.length}</strong>
            </div>
          </div>
        </div> */}

        {/* Message */}
        {message.text && (
          <div
            className={`admin-message ${
              message.type === "error"
                ? "admin-message-error"
                : "admin-message-success"
            }`}
          >
            <span>{message.text}</span>

            <button
              type="button"
              onClick={() => setMessage({ type: "", text: "" })}
              aria-label="Close message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <div className="category-admin-grid">
          {/* Add/Edit Form */}
          <section className="admin-card category-form-card">
            <div className="admin-card-header">
              <div className="admin-card-header-icon">
                {editingId ? <Edit2 size={22} /> : <Plus size={22} />}
              </div>

              <div>
                <span>
                  {editingId ? "Update Details" : "Create Category"}
                </span>

                <h2>
                  {editingId ? "Edit Category" : "Add New Category"}
                </h2>
              </div>
            </div>

            <form
              onSubmit={editingId ? updateHandler : submitHandler}
              className="category-admin-form"
            >
              <div className="admin-form-field">
                <label htmlFor="category-title">
                  Category Title
                  <span>*</span>
                </label>

                <input
                  id="category-title"
                  type="text"
                  required
                  value={editingId ? editTitle : title}
                  onChange={(event) =>
                    editingId
                      ? setEditTitle(event.target.value)
                      : setTitle(event.target.value)
                  }
                  placeholder="e.g. Electric Vehicle"
                />
              </div>

              <div className="admin-form-field">
                <label htmlFor="category-courses">
                  Courses Count
                  <span>*</span>
                </label>

                <input
                  id="category-courses"
                  type="number"
                  min="0"
                  required
                  value={editingId ? editCourses : courses}
                  onChange={(event) =>
                    editingId
                      ? setEditCourses(event.target.value)
                      : setCourses(event.target.value)
                  }
                  placeholder="e.g. 3"
                />
              </div>

              <div className="admin-form-field">
                <label htmlFor="category-link">
                  Redirect Link
                  <span>*</span>
                </label>

                <div className="admin-input-icon-wrapper">
                  <ExternalLink size={17} />

                  <input
                    id="category-link"
                    type="text"
                    required
                    value={editingId ? editLink : link}
                    onChange={(event) =>
                      editingId
                        ? setEditLink(event.target.value)
                        : setLink(event.target.value)
                    }
                    placeholder="/courses/electric-vehicle-course"
                  />
                </div>
              </div>

              <div className="admin-form-field">
                <label>
                  {editingId
                    ? "Change Image (Optional)"
                    : "Category Image"}
                  {!editingId && <span>*</span>}
                </label>

                <label
                  htmlFor="category-image"
                  className="admin-file-upload"
                >
                  {(editingId ? editPreview : addPreview) ? (
                    <div className="admin-image-preview">
                      <img
                        src={editingId ? editPreview : addPreview}
                        alt="Selected category preview"
                      />

                      <div className="admin-image-preview-overlay">
                        <ImagePlus size={20} />
                        <span>Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="admin-upload-icon">
                        <ImagePlus size={27} />
                      </div>

                      <div className="admin-upload-text">
                        <strong>Upload category image</strong>
                        <span>PNG, JPG, JPEG or WebP</span>
                      </div>
                    </>
                  )}

                  <input
                    id="category-image"
                    type="file"
                    required={!editingId}
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(event) => {
                      const selectedFile = event.target.files?.[0] || null;

                      if (editingId) {
                        setEditFile(selectedFile);
                      } else {
                        setFile(selectedFile);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="admin-form-actions">
                <button
                  type="submit"
                  className="admin-primary-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={19}
                        className="admin-spinner"
                      />

                      {editingId ? "Saving..." : "Uploading..."}
                    </>
                  ) : editingId ? (
                    <>
                      <Save size={19} />
                      Update Category
                    </>
                  ) : (
                    <>
                      <Plus size={19} />
                      Add Category
                    </>
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="admin-secondary-btn"
                    onClick={cancelEdit}
                    disabled={loading}
                  >
                    <X size={19} />
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Existing Categories */}
          <section className="admin-card category-list-card">
            <div className="admin-card-header admin-list-card-header">
              <div className="admin-card-header-icon">
                <Layers3 size={22} />
              </div>

              <div>
                <span>Category Library</span>
                <h2>Existing Categories</h2>
              </div>

              <div className="category-total-pill">
                {categories.length}
              </div>
            </div>

            <div className="category-list-scroll">
              {fetching ? (
                <div className="admin-loading-state">
                  <Loader2
                    size={32}
                    className="admin-spinner"
                  />

                  <p>Loading categories...</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="admin-empty-state">
                  <div className="admin-empty-icon">
                    <Layers3 size={34} />
                  </div>

                  <h3>No categories found</h3>

                  <p>
                    Add your first course category using the form.
                  </p>
                </div>
              ) : (
                <div className="category-list">
                  {categories.map((category) => (
                    <article
                      key={category._id}
                      className={`category-list-item ${
                        editingId === category._id
                          ? "category-list-item-active"
                          : ""
                      }`}
                    >
                      <div className="category-list-image">
                        <img
                          src={getCategoryImage(category)}
                          alt={category.title}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src =
                              "/placeholder-image.png";
                          }}
                        />
                      </div>

                      <div className="category-list-content">
                        <div className="category-list-title-row">
                          <h3>{category.title}</h3>

                          <span className="category-course-count">
                            {category.courses} Courses
                          </span>
                        </div>

                        <p className="category-list-link">
                          <ExternalLink size={14} />
                          <span>{category.link}</span>
                        </p>
                      </div>

                      <div className="category-list-actions">
                        <button
                          type="button"
                          className="category-action-btn edit-action-btn"
                          onClick={() => startEdit(category)}
                          aria-label={`Edit ${category.title}`}
                          title="Edit category"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          type="button"
                          className="category-action-btn delete-action-btn"
                          onClick={() =>
                            deleteHandler(category._id)
                          }
                          aria-label={`Delete ${category.title}`}
                          title="Delete category"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;