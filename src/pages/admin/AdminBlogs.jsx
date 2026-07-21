import React, { useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Clock3,
  Edit2,
  FileText,
  HelpCircle,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Search,
  Tags,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import "./admin.css";
import "./AdminBlogs.css";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

const DEFAULT_FORM = {
  title: "",
  category: "",
  readTime: "5 min read",
  author: "SkillServe Academy",
  content: "",
  metaKeywords: "",
  metaDescription: "",
  faqs: [],
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const editorCardRef = useRef(null);

  const filePreview = useMemo(() => {
    if (!file) return "";

    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addFaqItem = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: "", answer: "" }],
    }));
  };

  const updateFaqItem = (index, field, value) => {
    setForm((prev) => {
      const updatedFaqs = [...(prev.faqs || [])];
      updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
      return { ...prev, faqs: updatedFaqs };
    });
  };

  const removeFaqItem = (index) => {
    setForm((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, idx) => idx !== index),
    }));
  };

  const fetchBlogs = async () => {
    try {
      setFetching(true);

      const { data } = await api.get("/blogs");
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Blogs load nahi ho paaye. Please try again.",
      });

      setBlogs([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setForm(DEFAULT_FORM);
    setFile(null);
    setExistingImage("");
    setEditingId(null);
    setFileInputKey((current) => current + 1);
  };

  const validateContent = () => {
    const plainText = form.content
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .trim();

    return plainText.length > 0;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateContent()) {
      setMessage({
        type: "error",
        text: "Blog content is required.",
      });
      return;
    }

    if (!editingId && !file) {
      setMessage({
        type: "error",
        text: "Blog cover image is required.",
      });
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("category", form.category.trim());
    formData.append("readTime", form.readTime.trim());
    formData.append("author", form.author.trim());
    formData.append("content", form.content);
    formData.append("metaKeywords", form.metaKeywords.trim());
    formData.append("metaDescription", form.metaDescription.trim());
    formData.append("faqs", JSON.stringify(form.faqs || []));

    if (file) {
      formData.append("image", file);
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/blogs/${editingId}`, formData);

        setMessage({
          type: "success",
          text: "Blog updated successfully.",
        });
      } else {
        await api.post("/blogs", formData);

        setMessage({
          type: "success",
          text: "Blog published successfully.",
        });
      }

      resetForm();
      await fetchBlogs();
    } catch (error) {
      console.error("Blog save failed:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Blog save nahi ho paaya. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (blog) => {
    setEditingId(blog._id);

    setForm({
      title: blog.title || "",
      category: blog.category || "",
      readTime: blog.readTime || "5 min read",
      author: blog.author || "SkillServe Academy",
      content: blog.content || "",
      metaKeywords: blog.metaKeywords || "",
      metaDescription: blog.metaDescription || "",
      faqs: Array.isArray(blog.faqs) ? blog.faqs : [],
    });

    setExistingImage(blog.image || "");
    setFile(null);
    setFileInputKey((current) => current + 1);
    setMessage({ type: "", text: "" });

    window.setTimeout(() => {
      editorCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const cancelEdit = () => {
    resetForm();
    setMessage({ type: "", text: "" });
  };

  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/blogs/${id}`);

      setBlogs((currentBlogs) =>
        currentBlogs.filter((blog) => blog._id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setMessage({
        type: "success",
        text: "Blog deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete blog:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Blog delete nahi ho paaya. Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const removeSelectedImage = () => {
    setFile(null);
    setFileInputKey((current) => current + 1);
  };

  const filteredBlogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return blogs;

    return blogs.filter((blog) => {
      const values = [
        blog.title,
        blog.category,
        blog.author,
        blog.readTime,
      ];

      return values.some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [blogs, searchTerm]);

  const displayedImage = filePreview || existingImage;

  return (
    <AdminLayout>
      <main className="ssa-admin-blogs-page">
        <section className="ssa-admin-blogs-hero">
          <div className="ssa-admin-blogs-hero__content">
            <span className="ssa-admin-blogs-hero__eyebrow">
              <FileText size={14} />
              Content Management
            </span>

            <h1>Manage Blogs</h1>

            <p>
              Create professional articles, manage SEO information,
              update existing posts and keep your blog library organised.
            </p>
          </div>

          <div className="ssa-admin-blogs-total">
            <div className="ssa-admin-blogs-total__icon">
              <BookOpen size={25} />
            </div>

            <div>
              <span>Total Blogs</span>
              <strong>{blogs.length}</strong>
            </div>
          </div>
        </section>

        {message.text && (
          <div
            className={`ssa-admin-blogs-message ${
              message.type === "success"
                ? "ssa-admin-blogs-message--success"
                : "ssa-admin-blogs-message--error"
            }`}
            role="status"
          >
            <div className="ssa-admin-blogs-message__content">
              {message.type === "success" ? (
                <CheckCircle2 size={19} />
              ) : (
                <AlertCircle size={19} />
              )}

              <span>{message.text}</span>
            </div>

            <button
              type="button"
              onClick={() => setMessage({ type: "", text: "" })}
              aria-label="Close message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <div className="ssa-admin-blogs-workspace">
          <section
            ref={editorCardRef}
            className="ssa-admin-blogs-card ssa-admin-blogs-editor"
          >
            <header className="ssa-admin-blogs-card-header">
              <div className="ssa-admin-blogs-card-heading">
                <div className="ssa-admin-blogs-card-heading__icon">
                  {editingId ? (
                    <Edit2 size={23} />
                  ) : (
                    <FileText size={23} />
                  )}
                </div>

                <div>
                  <span>
                    {editingId ? "Update article" : "New article"}
                  </span>

                  <h2>
                    {editingId
                      ? "Edit Blog Post"
                      : "Create New Blog Post"}
                  </h2>
                </div>
              </div>

              {editingId && (
                <span className="ssa-admin-blogs-editing-pill">
                  Editing Mode
                </span>
              )}
            </header>

            <form
              onSubmit={submitHandler}
              className="ssa-admin-blogs-form"
            >
              <section className="ssa-admin-blogs-form-section">
                <div className="ssa-admin-blogs-section-heading">
                  <div className="ssa-admin-blogs-section-heading__icon">
                    <FileText size={20} />
                  </div>

                  <div>
                    <span>Article details</span>
                    <h3>Basic Information</h3>
                  </div>
                </div>

                <div className="ssa-admin-blogs-field">
                  <label htmlFor="ssa-blog-title">
                    Blog Title <span>*</span>
                  </label>

                  <input
                    id="ssa-blog-title"
                    type="text"
                    required
                    maxLength={180}
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="e.g. AutoCAD vs SolidWorks vs Siemens NX"
                  />
                </div>

                <div className="ssa-admin-blogs-form-grid">
                  <div className="ssa-admin-blogs-field">
                    <label htmlFor="ssa-blog-category">
                      Category <span>*</span>
                    </label>

                    <div className="ssa-admin-blogs-input-icon">
                      <Tags size={17} />

                      <input
                        id="ssa-blog-category"
                        type="text"
                        required
                        value={form.category}
                        onChange={(event) =>
                          updateField("category", event.target.value)
                        }
                        placeholder="e.g. CNC Manufacturing"
                      />
                    </div>
                  </div>

                  <div className="ssa-admin-blogs-field">
                    <label htmlFor="ssa-blog-read-time">
                      Read Time
                    </label>

                    <div className="ssa-admin-blogs-input-icon">
                      <Clock3 size={17} />

                      <input
                        id="ssa-blog-read-time"
                        type="text"
                        value={form.readTime}
                        onChange={(event) =>
                          updateField("readTime", event.target.value)
                        }
                        placeholder="e.g. 7 min read"
                      />
                    </div>
                  </div>
                </div>

                <div className="ssa-admin-blogs-form-grid">
                  <div className="ssa-admin-blogs-field">
                    <label htmlFor="ssa-blog-author">
                      Author
                    </label>

                    <div className="ssa-admin-blogs-input-icon">
                      <UserRound size={17} />

                      <input
                        id="ssa-blog-author"
                        type="text"
                        value={form.author}
                        onChange={(event) =>
                          updateField("author", event.target.value)
                        }
                        placeholder="Author name"
                      />
                    </div>
                  </div>

                  <div className="ssa-admin-blogs-field">
                    <label>
                      Blog Cover Image{" "}
                      {!editingId && <span>*</span>}
                    </label>

                    <label className="ssa-admin-blogs-upload">
                      <input
                        key={fileInputKey}
                        type="file"
                        required={!editingId}
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={(event) =>
                          setFile(event.target.files?.[0] || null)
                        }
                      />

                      <div className="ssa-admin-blogs-upload__icon">
                        <ImagePlus size={22} />
                      </div>

                      <div className="ssa-admin-blogs-upload__text">
                        <strong>
                          {file
                            ? file.name
                            : editingId
                              ? "Choose replacement image"
                              : "Choose blog cover image"}
                        </strong>

                        <span>
                          PNG, JPG or WEBP • Recommended 1200 × 630
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {displayedImage && (
                  <div className="ssa-admin-blogs-image-preview">
                    <img
                      src={displayedImage}
                      alt="Blog cover preview"
                    />

                    <div className="ssa-admin-blogs-image-preview__bar">
                      <span>
                        {file
                          ? "New image selected"
                          : "Current blog image"}
                      </span>

                      {file && (
                        <button
                          type="button"
                          onClick={removeSelectedImage}
                        >
                          <X size={15} />
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </section>

              <section className="ssa-admin-blogs-form-section ssa-admin-blogs-form-section--seo">
                <div className="ssa-admin-blogs-section-heading">
                  <div className="ssa-admin-blogs-section-heading__icon">
                    <Tags size={20} />
                  </div>

                  <div>
                    <span>Search optimisation</span>
                    <h3>SEO Meta Information</h3>
                  </div>
                </div>

                <div className="ssa-admin-blogs-field">
                  <label htmlFor="ssa-meta-keywords">
                    Meta Keywords
                  </label>

                  <input
                    id="ssa-meta-keywords"
                    type="text"
                    value={form.metaKeywords}
                    onChange={(event) =>
                      updateField("metaKeywords", event.target.value)
                    }
                    placeholder="e.g. cnc training, vmc courses, mechanical design"
                  />

                  <small>
                    Separate every keyword using a comma.
                  </small>
                </div>

                <div className="ssa-admin-blogs-field">
                  <label htmlFor="ssa-meta-description">
                    Meta Description
                  </label>

                  <textarea
                    id="ssa-meta-description"
                    value={form.metaDescription}
                    onChange={(event) =>
                      updateField("metaDescription", event.target.value)
                    }
                    rows={4}
                    maxLength={170}
                    placeholder="Write a short SEO description for search engines..."
                  />

                  <span className="ssa-admin-blogs-character-count">
                    {form.metaDescription.length}/170
                  </span>
                </div>
              </section>

              <section className="ssa-admin-blogs-form-section">
                <div className="ssa-admin-blogs-section-heading">
                  <div className="ssa-admin-blogs-section-heading__icon">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <span>Main article</span>
                    <h3>Blog Content</h3>
                  </div>
                </div>

                <div className="ssa-admin-blogs-field">
                  <label>
                    Write Blog Content <span>*</span>
                  </label>

                  <div className="ssa-admin-blog-quill">
                    <ReactQuill
                      theme="snow"
                      value={form.content}
                      onChange={(value) =>
                        updateField("content", value)
                      }
                      modules={QUILL_MODULES}
                      formats={QUILL_FORMATS}
                      placeholder="Write your blog post content here..."
                    />
                  </div>
                </div>
              </section>

              {/* Frequently Asked Questions (FAQs) Section */}
              <section className="ssa-admin-blogs-form-section">
                <div className="ssa-admin-blogs-section-heading" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="ssa-admin-blogs-section-heading__icon">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <span>Article FAQs</span>
                      <h3>Frequently Asked Questions</h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ssa-admin-blogs-add-faq-btn"
                    onClick={addFaqItem}
                  >
                    <Plus size={16} /> Add FAQ
                  </button>
                </div>

                {(form.faqs || []).length === 0 ? (
                  <div className="ssa-admin-blogs-faq-empty">
                    <p>No FAQs added yet. Click "+ Add FAQ" above to add questions and answers.</p>
                  </div>
                ) : (
                  <div className="ssa-admin-blogs-faq-list">
                    {(form.faqs || []).map((faq, idx) => (
                      <div key={idx} className="ssa-admin-blogs-faq-card">
                        <div className="ssa-admin-blogs-faq-header">
                          <span className="faq-badge">FAQ #{idx + 1}</span>
                          <button
                            type="button"
                            className="ssa-admin-blogs-faq-delete-btn"
                            onClick={() => removeFaqItem(idx)}
                            title="Remove FAQ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="ssa-admin-blogs-field" style={{ marginBottom: '12px' }}>
                          <label>Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaqItem(idx, "question", e.target.value)}
                            placeholder="e.g. What is the fee structure?"
                          />
                        </div>
                        <div className="ssa-admin-blogs-field">
                          <label>Answer</label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFaqItem(idx, "answer", e.target.value)}
                            rows={3}
                            placeholder="Write a clear, detailed answer..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <div className="ssa-admin-blogs-form-actions">
                <button
                  type="submit"
                  className="ssa-admin-blogs-primary-button"
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2
                      size={18}
                      className="ssa-admin-blogs-spin"
                    />
                  ) : (
                    <Save size={18} />
                  )}

                  {saving
                    ? "Saving Blog..."
                    : editingId
                      ? "Update Blog"
                      : "Publish Blog"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="ssa-admin-blogs-secondary-button"
                    disabled={saving}
                  >
                    <X size={18} />
                    Cancel Editing
                  </button>
                )}
              </div>
            </form>
          </section>

          <aside className="ssa-admin-blogs-card ssa-admin-blogs-library">
            <header className="ssa-admin-blogs-library-header">
              <div>
                <span>Published content</span>
                <h2>Blogs Library</h2>
              </div>

              <strong>{filteredBlogs.length}</strong>
            </header>

            <div className="ssa-admin-blogs-search">
              <Search size={17} />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search blogs..."
                aria-label="Search blogs"
              />
            </div>

            <div className="ssa-admin-blogs-list">
              {fetching ? (
                <div className="ssa-admin-blogs-state">
                  <Loader2
                    size={31}
                    className="ssa-admin-blogs-spin"
                  />
                  <h3>Loading blogs</h3>
                  <p>Please wait while the blog library loads.</p>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="ssa-admin-blogs-state">
                  <div className="ssa-admin-blogs-state__icon">
                    <BookOpen size={29} />
                  </div>

                  <h3>
                    {searchTerm
                      ? "No matching blogs"
                      : "No blogs found"}
                  </h3>

                  <p>
                    {searchTerm
                      ? "Try another title, category or author."
                      : "Create your first blog using the form."}
                  </p>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <article
                    key={blog._id}
                    className={`ssa-admin-blogs-list-item ${
                      editingId === blog._id
                        ? "ssa-admin-blogs-list-item--active"
                        : ""
                    }`}
                  >
                    <div className="ssa-admin-blogs-list-item__image">
                      {blog.image ? (
                        <img
                          src={blog.image}
                          alt={blog.title || "Blog"}
                          loading="lazy"
                        />
                      ) : (
                        <div className="ssa-admin-blogs-list-item__placeholder">
                          <ImagePlus size={23} />
                        </div>
                      )}
                    </div>

                    <div className="ssa-admin-blogs-list-item__content">
                      <span className="ssa-admin-blogs-category">
                        {blog.category || "General"}
                      </span>

                      <h3>{blog.title || "Untitled Blog"}</h3>

                      <div className="ssa-admin-blogs-list-item__meta">
                        <span>
                          <Clock3 size={12} />
                          {blog.readTime || "5 min read"}
                        </span>

                        <span>
                          <UserRound size={12} />
                          {blog.author || "SkillServe Academy"}
                        </span>
                      </div>
                    </div>

                    <div className="ssa-admin-blogs-list-item__actions">
                      <button
                        type="button"
                        onClick={() => startEdit(blog)}
                        className="ssa-admin-blogs-action ssa-admin-blogs-action--edit"
                        aria-label={`Edit ${blog.title || "blog"}`}
                        title="Edit blog"
                      >
                        <Edit2 size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteHandler(blog._id)}
                        className="ssa-admin-blogs-action ssa-admin-blogs-action--delete"
                        aria-label={`Delete ${blog.title || "blog"}`}
                        title="Delete blog"
                        disabled={deletingId === blog._id}
                      >
                        {deletingId === blog._id ? (
                          <Loader2
                            size={17}
                            className="ssa-admin-blogs-spin"
                          />
                        ) : (
                          <Trash2 size={17} />
                        )}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </aside>
        </div>
      </main>
    </AdminLayout>
  );
};

export default AdminBlogs;