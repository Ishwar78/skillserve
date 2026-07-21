import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";

import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Clock3,
  Edit2,
  ImagePlus,
  IndianRupee,
  Layers3,
  Loader2,
  MapPin,
  Palette,
  Plus,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";

import "./admin.css";

const createDefaultForm = (defaultCategory = "") => ({
  title: "",
  category: defaultCategory,
  badge: "",
  badgeColor: "badge-orange",
  rating: "4.5",
  reviews: "100",
  duration: "",
  location: "Gurugram",
  price: "",
  titleColor: "text-blue",
  overview: "",
  featuresText: "",
  isFeatured: false,
});

const createDefaultCurriculum = () => [
  {
    title: "",
    desc: "",
  },
];

const getCategorySlug = (category) => {
  if (category?.slug) {
    return category.slug;
  }

  if (category?.link) {
    return category.link
      .split("/")
      .filter(Boolean)
      .pop();
  }

  return "";
};

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(
    createDefaultForm()
  );

  const [curriculum, setCurriculum] = useState(
    createDefaultCurriculum()
  );

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] =
    useState("");

  const [currentImage, setCurrentImage] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchingCourses, setFetchingCourses] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [message, setMessage] = useState(null);

  const fileInputRef = useRef(null);
  const formCardRef = useRef(null);

  const fetchCourses = async () => {
    setFetchingCourses(true);

    try {
      const { data } = await api.get("/courses");

      setCourses(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch courses",
        error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Courses could not be loaded.",
      });
    } finally {
      setFetchingCourses(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get(
        "/categories"
      );

      const categoryList = Array.isArray(data)
        ? data
        : [];

      setCategories(categoryList);

      if (categoryList.length > 0) {
        const firstCategorySlug =
          getCategorySlug(categoryList[0]);

        setForm((previous) => ({
          ...previous,
          category:
            previous.category ||
            firstCategorySlug,
        }));
      }
    } catch (error) {
      console.error(
        "Failed to fetch categories",
        error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Course categories could not be loaded.",
      });
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  /*
   * Local selected image ka preview.
   */
  useEffect(() => {
    if (!file) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  const filteredCourses = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return courses;
    }

    return courses.filter((course) => {
      const searchableText = [
        course.title,
        course.category,
        course.duration,
        course.price,
        course.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [courses, searchTerm]);

  const displayedImage =
    imagePreview || currentImage;

  const updateFormField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (
      !selectedFile.type.startsWith("image/")
    ) {
      setMessage({
        type: "error",
        text: "Please select a valid image file.",
      });

      event.target.value = "";
      return;
    }

    const maximumSize = 5 * 1024 * 1024;

    if (selectedFile.size > maximumSize) {
      setMessage({
        type: "error",
        text:
          "Course image must be smaller than 5 MB.",
      });

      event.target.value = "";
      return;
    }

    setFile(selectedFile);
    setMessage(null);
  };

  const clearSelectedImage = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addModuleInput = () => {
    setCurriculum((previous) => [
      ...previous,
      {
        title: "",
        desc: "",
      },
    ]);
  };

  const removeModuleInput = (index) => {
    setCurriculum((previous) => {
      if (previous.length === 1) {
        return previous;
      }

      return previous.filter(
        (_, moduleIndex) =>
          moduleIndex !== index
      );
    });
  };

  const handleModuleChange = (
    index,
    field,
    value
  ) => {
    setCurriculum((previous) =>
      previous.map((module, moduleIndex) =>
        moduleIndex === index
          ? {
              ...module,
              [field]: value,
            }
          : module
      )
    );
  };

  const resetForm = () => {
    const defaultCategory =
      categories.length > 0
        ? getCategorySlug(categories[0])
        : "";

    setForm(
      createDefaultForm(defaultCategory)
    );

    setCurriculum(
      createDefaultCurriculum()
    );

    setEditingId(null);
    setFile(null);
    setCurrentImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!form.category) {
      setMessage({
        type: "error",
        text:
          "Please create or select a category before saving the course.",
      });

      return;
    }

    const parsedFeatures =
      form.featuresText
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean);

    const parsedCurriculum = curriculum
      .map((module) => ({
        title: module.title.trim(),
        desc: module.desc.trim(),
      }))
      .filter(
        (module) =>
          module.title || module.desc
      );

    if (parsedCurriculum.length === 0) {
      setMessage({
        type: "error",
        text:
          "Please add at least one curriculum module.",
      });

      return;
    }

    setLoading(true);
    setMessage(null);

    const requestData = new FormData();

    requestData.append("title", form.title);
    requestData.append(
      "category",
      form.category
    );
    requestData.append("badge", form.badge);
    requestData.append(
      "badgeColor",
      form.badgeColor
    );
    requestData.append(
      "rating",
      form.rating
    );
    requestData.append(
      "reviews",
      form.reviews
    );
    requestData.append(
      "duration",
      form.duration
    );
    requestData.append(
      "location",
      form.location
    );
    requestData.append("price", form.price);
    requestData.append(
      "titleColor",
      form.titleColor
    );
    requestData.append(
      "overview",
      form.overview
    );
    requestData.append(
      "isFeatured",
      String(form.isFeatured)
    );

    requestData.append(
      "features",
      JSON.stringify(parsedFeatures)
    );

    requestData.append(
      "curriculum",
      JSON.stringify(parsedCurriculum)
    );

    if (file) {
      requestData.append("img", file);
    }

    try {
      if (editingId) {
        await api.put(
          `/courses/${editingId}`,
          requestData
        );

        setMessage({
          type: "success",
          text: "Course updated successfully!",
        });
      } else {
        await api.post(
          "/courses",
          requestData
        );

        setMessage({
          type: "success",
          text: "Course created successfully!",
        });
      }

      resetForm();
      await fetchCourses();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Course could not be saved.",
      });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (course) => {
    const features = Array.isArray(
      course.features
    )
      ? course.features
      : [];

    const courseCurriculum =
      Array.isArray(course.curriculum) &&
      course.curriculum.length > 0
        ? course.curriculum.map((module) => ({
            title: module.title || "",
            desc: module.desc || "",
          }))
        : createDefaultCurriculum();

    setEditingId(course._id);

    setForm({
      title: course.title || "",
      category: course.category || "",
      badge: course.badge || "",
      badgeColor:
        course.badgeColor ||
        "badge-orange",
      rating: String(course.rating ?? "4.5"),
      reviews: String(
        course.reviews ?? "100"
      ),
      duration: course.duration || "",
      location:
        course.location || "Gurugram",
      price: course.price || "",
      titleColor:
        course.titleColor || "text-blue",
      overview: course.overview || "",
      featuresText: features.join("\n"),
      isFeatured: Boolean(
        course.isFeatured
      ),
    });

    setCurriculum(courseCurriculum);
    setCurrentImage(
      course.img || course.image || ""
    );

    setFile(null);
    setMessage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.requestAnimationFrame(() => {
      formCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const cancelEdit = () => {
    resetForm();

    setMessage({
      type: "success",
      text: "Edit mode cancelled.",
    });
  };

  const deleteHandler = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!shouldDelete) {
      return;
    }

    setDeletingId(id);
    setMessage(null);

    try {
      await api.delete(`/courses/${id}`);

      if (editingId === id) {
        resetForm();
      }

      setCourses((previous) =>
        previous.filter(
          (course) => course._id !== id
        )
      );

      setMessage({
        type: "success",
        text: "Course deleted successfully!",
      });
    } catch (error) {
      console.error(
        "Failed to delete course",
        error
      );

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Course could not be deleted.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-courses-page">
        {/* Page hero */}
        <section className="admin-page-header admin-courses-hero">
          <div className="admin-page-header-content">
            <span className="admin-section-label">
              <Sparkles size={15} />
              Course Management
            </span>

            <h1>Manage Academy Courses</h1>

            <p>
              Create courses, add curriculum
              modules, upload course images and
              manage all published programmes from
              one place.
            </p>
          </div>

          <div className="admin-page-count-card">
            <div className="admin-page-count-icon">
              <BookOpen size={23} />
            </div>

            <div>
              <span>Total Courses</span>
              <strong>{courses.length}</strong>
            </div>
          </div>
        </section>

        {/* Message */}
        {message && (
          <div
            className={`admin-message ${
              message.type === "success"
                ? "admin-message-success"
                : "admin-message-error"
            }`}
          >
            <div className="admin-course-message-content">
              {message.type === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}

              <span>{message.text}</span>
            </div>

            <button
              type="button"
              onClick={() => setMessage(null)}
              aria-label="Close message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="course-admin-workspace">
          {/* Course editor */}
          <section
            ref={formCardRef}
            className="admin-card course-editor-card"
          >
            <div className="course-editor-header">
              <div className="course-editor-heading">
                <div className="course-editor-icon">
                  {editingId ? (
                    <Edit2 size={23} />
                  ) : (
                    <Plus size={23} />
                  )}
                </div>

                <div>
                  <span>
                    {editingId
                      ? "Editing Existing Course"
                      : "Create New Programme"}
                  </span>

                  <h2>
                    {editingId
                      ? "Edit Course Details"
                      : "Add New Course"}
                  </h2>
                </div>
              </div>

              {editingId && (
                <span className="course-edit-mode-pill">
                  Edit Mode
                </span>
              )}
            </div>

            <form
              onSubmit={submitHandler}
              className="course-admin-form"
            >
              {/* Basic details */}
              <div className="course-form-section">
                <div className="course-section-heading">
                  <div className="course-section-icon">
                    <BookOpen size={20} />
                  </div>

                  <div>
                    <span>Section 01</span>
                    <h3>Basic Course Details</h3>
                  </div>
                </div>

                <div className="course-form-grid">
                  <div className="course-form-field">
                    <label htmlFor="course-title">
                      Course Title
                      <span>*</span>
                    </label>

                    <input
                      id="course-title"
                      type="text"
                      value={form.title}
                      onChange={(event) =>
                        updateFormField(
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="e.g. CNC Program Operator"
                      required
                    />
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="course-category">
                      Category
                      <span>*</span>
                    </label>

                    <select
                      id="course-category"
                      value={form.category}
                      onChange={(event) =>
                        updateFormField(
                          "category",
                          event.target.value
                        )
                      }
                      disabled={
                        categories.length === 0
                      }
                      required
                    >
                      {categories.length === 0 ? (
                        <option value="">
                          No categories available
                        </option>
                      ) : (
                        categories.map(
                          (categoryItem) => {
                            const slug =
                              getCategorySlug(
                                categoryItem
                              );

                            return (
                              <option
                                key={
                                  categoryItem._id ||
                                  slug
                                }
                                value={slug}
                              >
                                {
                                  categoryItem.title
                                }
                              </option>
                            );
                          }
                        )
                      )}
                    </select>
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="course-duration">
                      Duration
                      <span>*</span>
                    </label>

                    <div className="course-input-icon-wrapper">
                      <Clock3 size={18} />

                      <input
                        id="course-duration"
                        type="text"
                        value={form.duration}
                        onChange={(event) =>
                          updateFormField(
                            "duration",
                            event.target.value
                          )
                        }
                        placeholder="e.g. 45 Days"
                        required
                      />
                    </div>
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="course-price">
                      Course Fee
                      <span>*</span>
                    </label>

                    <div className="course-input-icon-wrapper">
                      <IndianRupee size={18} />

                      <input
                        id="course-price"
                        type="text"
                        value={form.price}
                        onChange={(event) =>
                          updateFormField(
                            "price",
                            event.target.value
                          )
                        }
                        placeholder="e.g. ₹24,999"
                        required
                      />
                    </div>
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="course-location">
                      Location
                    </label>

                    <div className="course-input-icon-wrapper">
                      <MapPin size={18} />

                      <input
                        id="course-location"
                        type="text"
                        value={form.location}
                        onChange={(event) =>
                          updateFormField(
                            "location",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Gurugram"
                      />
                    </div>
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="course-badge">
                      Badge Title
                    </label>

                    <input
                      id="course-badge"
                      type="text"
                      value={form.badge}
                      onChange={(event) =>
                        updateFormField(
                          "badge",
                          event.target.value
                        )
                      }
                      placeholder="e.g. PLC Automation"
                    />
                  </div>
                </div>
              </div>

              {/* Rating and colors */}
              <div className="course-form-section">
                <div className="course-section-heading">
                  <div className="course-section-icon">
                    <Palette size={20} />
                  </div>

                  <div>
                    <span>Section 02</span>
                    <h3>
                      Display &amp; Rating Settings
                    </h3>
                  </div>
                </div>

                <div className="course-form-grid course-form-grid-four">
                  <div className="course-form-field">
                    <label htmlFor="course-rating">
                      Rating
                    </label>

                    <div className="course-input-icon-wrapper">
                      <Star size={18} />

                      <input
                        id="course-rating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={form.rating}
                        onChange={(event) =>
                          updateFormField(
                            "rating",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="course-reviews">
                      Reviews Count
                    </label>

                    <input
                      id="course-reviews"
                      type="number"
                      min="0"
                      value={form.reviews}
                      onChange={(event) =>
                        updateFormField(
                          "reviews",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="badge-color">
                      Badge Color
                    </label>

                    <select
                      id="badge-color"
                      value={form.badgeColor}
                      onChange={(event) =>
                        updateFormField(
                          "badgeColor",
                          event.target.value
                        )
                      }
                    >
                      <option value="badge-orange">
                        Orange
                      </option>

                      <option value="badge-green">
                        Green
                      </option>

                      <option value="badge-yellow">
                        Yellow
                      </option>

                      <option value="badge-teal">
                        Teal
                      </option>

                      <option value="badge-blue">
                        Blue
                      </option>
                    </select>
                  </div>

                  <div className="course-form-field">
                    <label htmlFor="title-color">
                      Title Color
                    </label>

                    <select
                      id="title-color"
                      value={form.titleColor}
                      onChange={(event) =>
                        updateFormField(
                          "titleColor",
                          event.target.value
                        )
                      }
                    >
                      <option value="text-blue">
                        Blue
                      </option>

                      <option value="text-orange">
                        Orange
                      </option>
                    </select>
                  </div>
                </div>

                <label className="course-feature-toggle">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) =>
                      updateFormField(
                        "isFeatured",
                        event.target.checked
                      )
                    }
                  />

                  <span className="course-feature-switch">
                    <span />
                  </span>

                  <span className="course-feature-content">
                    <strong>
                      Show as Featured Course
                    </strong>

                    <small>
                      Display this course in the
                      featured section on the home page.
                    </small>
                  </span>

                  <Sparkles size={19} />
                </label>
              </div>

              {/* Image */}
              <div className="course-form-section">
                <div className="course-section-heading">
                  <div className="course-section-icon">
                    <ImagePlus size={20} />
                  </div>

                  <div>
                    <span>Section 03</span>
                    <h3>Course Image</h3>
                  </div>
                </div>

                <div className="course-image-upload-wrapper">
                  <input
                    ref={fileInputRef}
                    id="course-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={
                      !editingId &&
                      !currentImage
                    }
                  />

                  <label
                    htmlFor="course-image"
                    className={`course-image-upload ${
                      displayedImage
                        ? "has-image"
                        : ""
                    }`}
                  >
                    {displayedImage ? (
                      <div className="course-image-preview">
                        <img
                          src={displayedImage}
                          alt="Course preview"
                        />

                        <div className="course-image-preview-overlay">
                          <UploadCloud size={18} />

                          <span>
                            Click to change course image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="course-image-empty">
                        <div className="course-upload-icon">
                          <UploadCloud size={28} />
                        </div>

                        <div>
                          <strong>
                            Upload Course Image
                          </strong>

                          <p>
                            PNG, JPG, JPEG or WebP,
                            maximum 5 MB
                          </p>
                        </div>
                      </div>
                    )}
                  </label>

                  {(file || currentImage) && (
                    <div className="course-selected-image-bar">
                      <div>
                        <ImagePlus size={17} />

                        <span>
                          {file
                            ? file.name
                            : "Current course image"}
                        </span>
                      </div>

                      {file && (
                        <button
                          type="button"
                          onClick={clearSelectedImage}
                        >
                          <X size={15} />
                          Remove Selection
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="course-form-section">
                <div className="course-section-heading">
                  <div className="course-section-icon">
                    <Layers3 size={20} />
                  </div>

                  <div>
                    <span>Section 04</span>
                    <h3>
                      Overview &amp; Highlights
                    </h3>
                  </div>
                </div>

                <div className="course-form-field">
                  <label htmlFor="course-overview">
                    Course Overview
                    <span>*</span>
                  </label>

                  <textarea
                    id="course-overview"
                    value={form.overview}
                    onChange={(event) =>
                      updateFormField(
                        "overview",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Write a clear overview of the course..."
                    required
                  />
                </div>

                <div className="course-form-field">
                  <label htmlFor="course-features">
                    Highlights / Features
                  </label>

                  <textarea
                    id="course-features"
                    value={form.featuresText}
                    onChange={(event) =>
                      updateFormField(
                        "featuresText",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder={
                      "Enter one feature per line\n100% Placement Assistance\nExpert Industry Trainers"
                    }
                  />

                  <small className="course-field-help">
                    Add only one course feature on each
                    line.
                  </small>
                </div>
              </div>

              {/* Curriculum */}
              <div className="course-form-section course-curriculum-section">
                <div className="course-curriculum-header">
                  <div className="course-section-heading">
                    <div className="course-section-icon">
                      <Layers3 size={20} />
                    </div>

                    <div>
                      <span>Section 05</span>
                      <h3>Course Curriculum</h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addModuleInput}
                    className="course-add-module-btn"
                  >
                    <Plus size={17} />
                    Add Module
                  </button>
                </div>

                <div className="course-modules-list">
                  {curriculum.map(
                    (module, index) => (
                      <div
                        key={index}
                        className="course-module-card"
                      >
                        <div className="course-module-header">
                          <div className="course-module-number">
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </div>

                          <div>
                            <span>
                              Curriculum Module
                            </span>

                            <h4>
                              Module {index + 1}
                            </h4>
                          </div>

                          {curriculum.length >
                            1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeModuleInput(
                                  index
                                )
                              }
                              className="course-remove-module-btn"
                              aria-label={`Remove module ${
                                index + 1
                              }`}
                            >
                              <Trash2 size={17} />
                            </button>
                          )}
                        </div>

                        <div className="course-module-fields">
                          <div className="course-form-field">
                            <label>
                              Module Title
                              <span>*</span>
                            </label>

                            <input
                              type="text"
                              value={module.title}
                              onChange={(event) =>
                                handleModuleChange(
                                  index,
                                  "title",
                                  event.target.value
                                )
                              }
                              placeholder="e.g. Introduction to CNC"
                              required
                            />
                          </div>

                          <div className="course-form-field">
                            <label>
                              Module Description
                              <span>*</span>
                            </label>

                            <textarea
                              value={module.desc}
                              onChange={(event) =>
                                handleModuleChange(
                                  index,
                                  "desc",
                                  event.target.value
                                )
                              }
                              rows={3}
                              placeholder="Explain what students will learn in this module."
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="course-form-actions">
                <button
                  type="submit"
                  className="course-save-btn"
                  disabled={
                    loading ||
                    categories.length === 0
                  }
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={19}
                        className="admin-spinner"
                      />

                      Saving Course...
                    </>
                  ) : (
                    <>
                      <Save size={19} />

                      {editingId
                        ? "Update Course"
                        : "Create Course"}
                    </>
                  )}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="course-cancel-btn"
                    disabled={loading}
                  >
                    <RotateCcw size={18} />
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* Course library */}
          <aside className="admin-card course-library-card">
            <div className="course-library-header">
              <div>
                <span>Published Programmes</span>

                <h2>Courses List</h2>
              </div>

              <span className="course-library-count">
                {filteredCourses.length}
              </span>
            </div>

            <div className="course-search-box">
              <Search size={18} />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search courses..."
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear course search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="admin-course-list-scroll">
              {fetchingCourses ? (
                <div className="admin-course-loading">
                  <Loader2
                    size={30}
                    className="admin-spinner"
                  />

                  <p>Loading courses...</p>
                </div>
              ) : filteredCourses.length === 0 ? (
                <div className="admin-course-empty">
                  <div>
                    <BookOpen size={31} />
                  </div>

                  <h3>No Courses Found</h3>

                  <p>
                    {searchTerm
                      ? "No course matches your search."
                      : "Create your first course using the form."}
                  </p>
                </div>
              ) : (
                <div className="admin-course-list">
                  {filteredCourses.map(
                    (course) => (
                      <article
                        key={course._id}
                        className={`admin-course-list-item ${
                          editingId ===
                          course._id
                            ? "is-editing"
                            : ""
                        }`}
                      >
                        <div className="admin-course-image">
                          {course.img ||
                          course.image ? (
                            <img
                              src={
                                course.img ||
                                course.image
                              }
                              alt={course.title}
                            />
                          ) : (
                            <BookOpen size={25} />
                          )}

                          {course.isFeatured && (
                            <span className="admin-featured-badge">
                              <Sparkles
                                size={11}
                              />
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="admin-course-info">
                          <h3>
                            {course.title}
                          </h3>

                          <div className="admin-course-category">
                            {course.category}
                          </div>

                          <div className="admin-course-meta">
                            <span>
                              <Clock3 size={13} />
                              {course.duration ||
                                "No duration"}
                            </span>

                            <span>
                              <MapPin size={13} />
                              {course.location ||
                                "No location"}
                            </span>
                          </div>

                          <div className="admin-course-price-row">
                            <strong>
                              {course.price ||
                                "Fee not added"}
                            </strong>

                            <span>
                              <Star
                                size={13}
                                fill="currentColor"
                              />
                              {course.rating ??
                                "0"}
                            </span>
                          </div>
                        </div>

                        <div className="admin-course-actions">
                          <button
                            type="button"
                            onClick={() =>
                              startEdit(course)
                            }
                            className="admin-course-edit-btn"
                            aria-label={`Edit ${course.title}`}
                          >
                            <Edit2 size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteHandler(
                                course._id
                              )
                            }
                            className="admin-course-delete-btn"
                            aria-label={`Delete ${course.title}`}
                            disabled={
                              deletingId ===
                              course._id
                            }
                          >
                            {deletingId ===
                            course._id ? (
                              <Loader2
                                size={17}
                                className="admin-spinner"
                              />
                            ) : (
                              <Trash2 size={17} />
                            )}
                          </button>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;