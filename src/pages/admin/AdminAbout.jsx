import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Eye,
  FileText,
  Flag,
  Loader2,
  Rocket,
  Save,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import "./AdminAbout.css";

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "link",
];

const INITIAL_FORM = {
  heroTitle: "",
  heroDescription: "",
  introTitle: "",
  introLeadText: "",
  introContent: "",
  missionTitle: "",
  missionDescription: "",
  visionTitle: "",
  visionDescription: "",
};

const AdminAbout = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const fetchAboutInfo = async () => {
    try {
      setFetching(true);

      const { data } = await api.get("/about-info");

      if (data) {
        setForm({
          heroTitle: data.heroTitle || "",
          heroDescription: data.heroDescription || "",
          introTitle: data.introTitle || "",
          introLeadText: data.introLeadText || "",
          introContent: data.introContent || "",
          missionTitle: data.missionTitle || "",
          missionDescription: data.missionDescription || "",
          visionTitle: data.visionTitle || "",
          visionDescription: data.visionDescription || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch About Info:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "About page content load nahi ho paaya. Please try again.",
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAboutInfo();
  }, []);

  const plainIntroContent = useMemo(() => {
    return form.introContent
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .trim();
  }, [form.introContent]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setMessage({ type: "", text: "" });

    if (!plainIntroContent) {
      setMessage({
        type: "error",
        text: "Detailed introduction content is required.",
      });
      return;
    }

    try {
      setSaving(true);

      await api.put("/about-info", form);

      setMessage({
        type: "success",
        text: "About Us content updated successfully.",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("About page update failed:", error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "About page update nahi ho paaya. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <main className="ssa-admin-about-page">
        <section className="ssa-admin-about-hero">
          <div className="ssa-admin-about-hero__content">
            <span className="ssa-admin-about-hero__eyebrow">
              <Sparkles size={14} />
              Page Content Management
            </span>

            <h1>About Us Page Content</h1>

            <p>
              Update the public About page hero, introduction, mission
              and vision content from one organised workspace.
            </p>
          </div>

          <div className="ssa-admin-about-hero__summary">
            <div className="ssa-admin-about-hero__summary-icon">
              <BookOpen size={25} />
            </div>

            <div>
              <span>Editable Sections</span>
              <strong>4</strong>
            </div>
          </div>
        </section>

        {message.text && (
          <div
            className={`ssa-admin-about-message ${
              message.type === "success"
                ? "ssa-admin-about-message--success"
                : "ssa-admin-about-message--error"
            }`}
            role="status"
          >
            <div className="ssa-admin-about-message__content">
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

        {fetching ? (
          <section className="ssa-admin-about-loading">
            <Loader2
              size={34}
              className="ssa-admin-about-spin"
            />

            <h2>Loading About content</h2>

            <p>Please wait while the latest content is being loaded.</p>
          </section>
        ) : (
          <form
            onSubmit={submitHandler}
            className="ssa-admin-about-form"
          >
            <section className="ssa-admin-about-card">
              <header className="ssa-admin-about-card__header">
                <div className="ssa-admin-about-card__heading">
                  <div className="ssa-admin-about-card__number">
                    01
                  </div>

                  <div className="ssa-admin-about-card__icon">
                    <Rocket size={22} />
                  </div>

                  <div>
                    <span>Top section</span>
                    <h2>About Page Hero</h2>
                    <p>
                      This content appears at the top of the public
                      About page.
                    </p>
                  </div>
                </div>

                <span className="ssa-admin-about-card__badge">
                  Hero
                </span>
              </header>

              <div className="ssa-admin-about-grid">
                <div className="ssa-admin-about-field">
                  <label htmlFor="about-hero-title">
                    Hero Title <span>*</span>
                  </label>

                  <input
                    id="about-hero-title"
                    type="text"
                    required
                    maxLength={180}
                    value={form.heroTitle}
                    onChange={(event) =>
                      updateField("heroTitle", event.target.value)
                    }
                    placeholder="e.g. Building Skills That Create Real Careers"
                  />

                  <small>
                    Keep the title concise and impact-driven.
                  </small>
                </div>

                <div className="ssa-admin-about-field">
                  <label htmlFor="about-hero-description">
                    Hero Description <span>*</span>
                  </label>

                  <textarea
                    id="about-hero-description"
                    required
                    rows={5}
                    maxLength={400}
                    value={form.heroDescription}
                    onChange={(event) =>
                      updateField(
                        "heroDescription",
                        event.target.value
                      )
                    }
                    placeholder="Write the short hero description..."
                  />

                  <span className="ssa-admin-about-character-count">
                    {form.heroDescription.length}/400
                  </span>
                </div>
              </div>
            </section>

            <section className="ssa-admin-about-card">
              <header className="ssa-admin-about-card__header">
                <div className="ssa-admin-about-card__heading">
                  <div className="ssa-admin-about-card__number">
                    02
                  </div>

                  <div className="ssa-admin-about-card__icon">
                    <FileText size={22} />
                  </div>

                  <div>
                    <span>Main introduction</span>
                    <h2>Welcome &amp; Introduction</h2>
                    <p>
                      Explain the academy story, purpose and practical
                      learning approach.
                    </p>
                  </div>
                </div>

                <span className="ssa-admin-about-card__badge">
                  Introduction
                </span>
              </header>

              <div className="ssa-admin-about-field">
                <label htmlFor="about-intro-title">
                  Intro Section Title <span>*</span>
                </label>

                <input
                  id="about-intro-title"
                  type="text"
                  required
                  maxLength={180}
                  value={form.introTitle}
                  onChange={(event) =>
                    updateField("introTitle", event.target.value)
                  }
                  placeholder="e.g. Good Qualifications, Better Skills"
                />
              </div>

              <div className="ssa-admin-about-field">
                <label htmlFor="about-intro-lead">
                  Intro Lead Sub-text <span>*</span>
                </label>

                <textarea
                  id="about-intro-lead"
                  required
                  rows={4}
                  maxLength={500}
                  value={form.introLeadText}
                  onChange={(event) =>
                    updateField("introLeadText", event.target.value)
                  }
                  placeholder="Write a strong introductory paragraph..."
                />

                <span className="ssa-admin-about-character-count">
                  {form.introLeadText.length}/500
                </span>
              </div>

              <div className="ssa-admin-about-field">
                <label>
                  Detailed Introduction <span>*</span>
                </label>

                <div className="ssa-admin-about-quill">
                  <ReactQuill
                    theme="snow"
                    value={form.introContent}
                    onChange={(value) =>
                      updateField("introContent", value)
                    }
                    modules={QUILL_MODULES}
                    formats={QUILL_FORMATS}
                    placeholder="Write detailed introduction paragraphs..."
                  />
                </div>

                <small>
                  Use headings, paragraphs, lists and links to structure
                  this section properly.
                </small>
              </div>
            </section>

            <div className="ssa-admin-about-split-grid">
              <section className="ssa-admin-about-card ssa-admin-about-card--mission">
                <header className="ssa-admin-about-card__header">
                  <div className="ssa-admin-about-card__heading">
                    <div className="ssa-admin-about-card__number">
                      03
                    </div>

                    <div className="ssa-admin-about-card__icon">
                      <Target size={22} />
                    </div>

                    <div>
                      <span>Purpose</span>
                      <h2>Our Mission</h2>
                      <p>
                        Define what SkillServe Academy aims to achieve.
                      </p>
                    </div>
                  </div>
                </header>

                <div className="ssa-admin-about-field">
                  <label htmlFor="about-mission-title">
                    Mission Title <span>*</span>
                  </label>

                  <input
                    id="about-mission-title"
                    type="text"
                    required
                    maxLength={160}
                    value={form.missionTitle}
                    onChange={(event) =>
                      updateField("missionTitle", event.target.value)
                    }
                    placeholder="Enter mission title"
                  />
                </div>

                <div className="ssa-admin-about-field">
                  <label htmlFor="about-mission-description">
                    Mission Description <span>*</span>
                  </label>

                  <textarea
                    id="about-mission-description"
                    required
                    rows={7}
                    maxLength={700}
                    value={form.missionDescription}
                    onChange={(event) =>
                      updateField(
                        "missionDescription",
                        event.target.value
                      )
                    }
                    placeholder="Explain the academy mission..."
                  />

                  <span className="ssa-admin-about-character-count">
                    {form.missionDescription.length}/700
                  </span>
                </div>
              </section>

              <section className="ssa-admin-about-card ssa-admin-about-card--vision">
                <header className="ssa-admin-about-card__header">
                  <div className="ssa-admin-about-card__heading">
                    <div className="ssa-admin-about-card__number">
                      04
                    </div>

                    <div className="ssa-admin-about-card__icon">
                      <Eye size={22} />
                    </div>

                    <div>
                      <span>Future direction</span>
                      <h2>Our Vision</h2>
                      <p>
                        Describe the long-term future and impact you
                        want to create.
                      </p>
                    </div>
                  </div>
                </header>

                <div className="ssa-admin-about-field">
                  <label htmlFor="about-vision-title">
                    Vision Title <span>*</span>
                  </label>

                  <input
                    id="about-vision-title"
                    type="text"
                    required
                    maxLength={160}
                    value={form.visionTitle}
                    onChange={(event) =>
                      updateField("visionTitle", event.target.value)
                    }
                    placeholder="Enter vision title"
                  />
                </div>

                <div className="ssa-admin-about-field">
                  <label htmlFor="about-vision-description">
                    Vision Description <span>*</span>
                  </label>

                  <textarea
                    id="about-vision-description"
                    required
                    rows={7}
                    maxLength={700}
                    value={form.visionDescription}
                    onChange={(event) =>
                      updateField(
                        "visionDescription",
                        event.target.value
                      )
                    }
                    placeholder="Explain the academy vision..."
                  />

                  <span className="ssa-admin-about-character-count">
                    {form.visionDescription.length}/700
                  </span>
                </div>
              </section>
            </div>

            <div className="ssa-admin-about-actions">
              <div className="ssa-admin-about-actions__note">
                <Flag size={17} />

                <span>
                  Saving will immediately update the public About page.
                </span>
              </div>

              <button
                type="submit"
                className="ssa-admin-about-save-button"
                disabled={saving}
              >
                {saving ? (
                  <Loader2
                    size={18}
                    className="ssa-admin-about-spin"
                  />
                ) : (
                  <Save size={18} />
                )}

                {saving ? "Saving Changes..." : "Save About Content"}
              </button>
            </div>
          </form>
        )}
      </main>
    </AdminLayout>
  );
};

export default AdminAbout;