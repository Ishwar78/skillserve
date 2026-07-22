import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";

import {
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Bot,
  MessageSquare,
  FileText,
  ClipboardList,
  RefreshCw,
  Loader2,
} from "lucide-react";

import "./admin.css";

const ITEMS_PER_PAGE = 12;

/*
 * Inquiry source normalize karta hai.
 * Backend me capitalization ya source name thoda different ho
 * tab bhi filter correctly work karega.
 */
const normalizeSource = (source) => {
  const value = String(source || "")
    .trim()
    .toLowerCase();

  if (value.includes("chatbot") || value.includes("chat bot")) {
    return "Chatbot";
  }

  if (value.includes("popup") || value.includes("modal")) {
    return "Popup";
  }

  if (value.includes("contact")) {
    return "Contact Page";
  }

  /*
   * Course Request form ke possible source names.
   */
  if (
    value.includes("category/about") ||
    value.includes("category form") ||
    value.includes("about form") ||
    value.includes("section form") ||
    value.includes("home form") ||
    value.includes("course form") ||
    value.includes("category section") ||
    value.includes("about section")
  ) {
    return "Course Request";
  }

  return source ? String(source).trim() : "Unknown";
};

const getSourceBadgeClass = (source) => {
  const normalizedSource = normalizeSource(source);

  if (normalizedSource === "Popup") {
    return "badge-popup";
  }

  if (normalizedSource === "Contact Page") {
    return "badge-contact";
  }

  if (normalizedSource === "Chatbot") {
    return "badge-chatbot";
  }

  if (normalizedSource === "Course Request") {
    return "badge-section-form";
  }

  return "badge-unknown";
};

const SourceIcon = ({ source, size = 13 }) => {
  const normalizedSource = normalizeSource(source);

  if (normalizedSource === "Chatbot") {
    return <Bot size={size} />;
  }

  if (normalizedSource === "Popup") {
    return <MessageSquare size={size} />;
  }

  if (normalizedSource === "Course Request") {
    return <ClipboardList size={size} />;
  }

  return <FileText size={size} />;
};

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const fetchInquiries = async (showRefreshLoader = false) => {
    try {
      setError("");

      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const { data } = await api.get("/inquiries");

      /*
       * Dono backend response formats handle honge:
       *
       * 1. Direct array:
       *    [inquiry1, inquiry2]
       *
       * 2. Object:
       *    { success: true, inquiries: [...] }
       */
      const receivedInquiries = Array.isArray(data)
        ? data
        : Array.isArray(data?.inquiries)
          ? data.inquiries
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setInquiries(receivedInquiries);
    } catch (fetchError) {
      console.error("Failed to fetch inquiries:", fetchError);

      setInquiries([]);

      setError(
        fetchError?.response?.data?.message ||
          "Inquiries load nahi ho paayi. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const deleteHandler = async (id, name) => {
    const isConfirmed = window.confirm(
      `${name || "User"} ki inquiry delete karni hai?`
    );

    if (!isConfirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await api.delete(`/inquiries/${id}`);

      setInquiries((previousInquiries) =>
        previousInquiries.filter(
          (inquiry) => inquiry._id !== id
        )
      );
    } catch (deleteError) {
      console.error("Failed to delete inquiry:", deleteError);

      setError(
        deleteError?.response?.data?.message ||
          "Inquiry delete nahi ho paayi. Please try again."
      );
    } finally {
      setDeletingId("");
    }
  };

  /*
   * Source counts
   */
  const sourceCounts = useMemo(() => {
    return inquiries.reduce(
      (counts, inquiry) => {
        const source = normalizeSource(inquiry?.source);

        if (source === "Chatbot") return counts;

        counts.all += 1;

        if (source === "Popup") {
          counts.popup += 1;
        } else if (source === "Contact Page") {
          counts.contact += 1;
        }  else if (source === "Course Request") {
          counts.sectionForm += 1;
        } else {
          counts.unknown += 1;
        }

        return counts;
      },
      {
        all: 0,
        popup: 0,
        contact: 0,
        
        sectionForm: 0,
        unknown: 0,
      }
    );
  }, [inquiries]);

  /*
   * Search and source filtering
   */
  const filteredInquiries = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const searchableValues = [
        inquiry?.name,
        inquiry?.fatherName,
        inquiry?.email,
        inquiry?.mobile,
        inquiry?.phone,
        inquiry?.course,
        inquiry?.domain,
        inquiry?.state,
        inquiry?.district,
        inquiry?.message,
        inquiry?.source,
      ];

      const matchesSearch =
        searchValue === "" ||
        searchableValues.some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(searchValue)
        );

      const normalizedInquirySource = normalizeSource(
        inquiry?.source
      );

      if (normalizedInquirySource === "Chatbot") return false;

      const matchesSource =
        filterSource === "All" ||
        normalizedInquirySource === filterSource;

      return matchesSearch && matchesSource;
    });
  }, [inquiries, search, filterSource]);

  /*
   * Search ya source filter change hone par page 1.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterSource]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredInquiries.length / ITEMS_PER_PAGE
    )
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedInquiries = filteredInquiries.slice(
    startIndex,
    endIndex
  );

  const showingFrom =
    filteredInquiries.length === 0
      ? 0
      : startIndex + 1;

  const showingTo = Math.min(
    endIndex,
    filteredInquiries.length
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const changePage = (pageNumber) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages ||
      pageNumber === currentPage
    ) {
      return;
    }

    setCurrentPage(pageNumber);

    document
      .querySelector(".inquiries-list-card")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const getPaginationItems = () => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 4) {
      return [
        1,
        2,
        3,
        4,
        5,
        "right-ellipsis",
        totalPages,
      ];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "left-ellipsis",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "left-ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "right-ellipsis",
      totalPages,
    ];
  };

  const getSelectedSourceCount = () => {
    if (filterSource === "Popup") {
      return sourceCounts.popup;
    }

    if (filterSource === "Contact Page") {
      return sourceCounts.contact;
    }

    if (filterSource === "Chatbot") {
      return sourceCounts.chatbot;
    }

    if (filterSource === "Course Request") {
      return sourceCounts.sectionForm;
    }

    return sourceCounts.all;
  };

  const getListTitle = () => {
    if (filterSource === "Popup") {
      return "Popup Inquiries";
    }

    if (filterSource === "Contact Page") {
      return "Contact Page Inquiries";
    }

    if (filterSource === "Chatbot") {
      return "Chatbot Inquiries";
    }

    if (filterSource === "Course Request") {
      return "Course Request Inquiries";
    }

    return "Recent Inquiries";
  };

  const getEmptyTitle = () => {
    if (filterSource === "Chatbot") {
      return "No chatbot inquiries found";
    }

    if (filterSource === "Course Request") {
      return "No category/about form inquiries found";
    }

    return "No inquiries found";
  };

  const getEmptyMessage = () => {
    if (search) {
      return "Search se matching inquiry nahi mili.";
    }

    if (filterSource === "Chatbot") {
      return "Chatbot se inquiry receive hone ke baad yahan show hogi.";
    }

    if (filterSource === "Course Request") {
      return "Course Request form se inquiry receive hone ke baad yahan show hogi.";
    }

    return "Current source filter me koi inquiry available nahi hai.";
  };

  return (
    <AdminLayout>
      <div className="admin-content-header inquiries-page-header">
        <div className="inquiries-header-content">
          <span className="inquiries-header-label">
            Lead Management
          </span>

          <h2>User Inquiries</h2>

          <p>
            Website popup, contact page, chatbot aur
            Course Request forms se received leads
            manage karein.
          </p>
        </div>

        <div className="inquiries-header-actions">
          <div className="inquiries-header-stat">
            <span>
              {filterSource === "All"
                ? "Total Inquiries"
                : `${filterSource} Inquiries`}
            </span>

            <strong>{getSelectedSourceCount()}</strong>
          </div>

          <button
            type="button"
            className="inquiries-refresh-btn"
            onClick={() => fetchInquiries(true)}
            disabled={refreshing}
          >
            <RefreshCw
              size={17}
              className={
                refreshing ? "inquiries-spin" : ""
              }
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="inquiries-admin-container">
        <div className="admin-card inquiries-filters-card">
          <div className="inquiries-filters-flex">
            <div className="inquiry-filter-group inquiry-search-group">
              <label htmlFor="inquiry-search">
                Search inquiries
              </label>

              <div className="search-box-wrapper">
                <Search
                  size={19}
                  className="search-icon"
                />

                <input
                  id="inquiry-search"
                  type="search"
                  placeholder="Search name, email, mobile, course or message..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>
            </div>

            <div className="inquiry-filter-group inquiry-source-group">
              <label htmlFor="inquiry-source">
                Filter by source
              </label>

              <div className="source-filter-wrapper">
                <Filter
                  size={18}
                  className="filter-icon"
                />

                <select
                  id="inquiry-source"
                  value={filterSource}
                  onChange={(event) =>
                    setFilterSource(event.target.value)
                  }
                >
                  <option value="All">
                    All Sources ({sourceCounts.all})
                  </option>

                  <option value="Popup">
                    Popup Modal ({sourceCounts.popup})
                  </option>

                  <option value="Contact Page">
                    Contact Page ({sourceCounts.contact})
                  </option>

                  

                  <option value="Course Request">
                    Course Request (
                    {sourceCounts.sectionForm})
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick source filter buttons */}
          <div className="inquiries-source-tabs">
            <button
              type="button"
              className={
                filterSource === "All" ? "active" : ""
              }
              onClick={() => setFilterSource("All")}
            >
              All
              <span>{sourceCounts.all}</span>
            </button>

            <button
              type="button"
              className={
                filterSource === "Popup"
                  ? "active popup-active"
                  : ""
              }
              onClick={() => setFilterSource("Popup")}
            >
              <MessageSquare size={15} />

              Popup

              <span>{sourceCounts.popup}</span>
            </button>

            <button
              type="button"
              className={
                filterSource === "Contact Page"
                  ? "active contact-active"
                  : ""
              }
              onClick={() =>
                setFilterSource("Contact Page")
              }
            >
              <FileText size={15} />

              Contact Page

              <span>{sourceCounts.contact}</span>
            </button>

            

            <button
              type="button"
              className={
                filterSource === "Course Request"
                  ? "active section-form-active"
                  : ""
              }
              onClick={() =>
                setFilterSource("Course Request")
              }
            >
              <ClipboardList size={15} />

              Course Request

              <span>{sourceCounts.sectionForm}</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="inquiries-error-message">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        <div className="admin-card inquiries-list-card">
          <div className="inquiries-list-header">
            <div>
              <span className="inquiries-list-label">
                {filterSource === "All"
                  ? "Website Leads"
                  : `${filterSource} Leads`}
              </span>

              <h3>{getListTitle()}</h3>

              <p>
                Showing {showingFrom}–{showingTo} of{" "}
                {filteredInquiries.length} inquiries
              </p>
            </div>

            <div className="inquiries-count-pill">
              {filteredInquiries.length} Records
            </div>
          </div>

          {loading ? (
            <div className="inquiries-loading-state">
              <div className="inquiries-loading-spinner" />

              <h4>Loading inquiries</h4>

              <p>
                Please wait while inquiries are being
                loaded.
              </p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="inquiries-empty-state">
              <div className="inquiries-empty-icon">
                {filterSource === "Chatbot" ? (
                  <Bot size={33} />
                ) : filterSource ===
                  "Course Request" ? (
                  <ClipboardList size={33} />
                ) : (
                  <Inbox size={33} />
                )}
              </div>

              <h4>{getEmptyTitle()}</h4>

              <p>{getEmptyMessage()}</p>
            </div>
          ) : (
            <>
              <div className="inquiries-table-wrapper">
                <table className="inquiries-table">
                  <thead>
                    <tr>
                      <th>User Information</th>
                      <th>Location</th>
                      <th>Course Requested</th>
                      <th>Message</th>
                      <th>Source &amp; Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedInquiries.map(
                      (inquiry) => {
                        const normalizedSource =
                          normalizeSource(
                            inquiry?.source
                          );

                        const phoneNumber =
                          inquiry?.mobile ||
                          inquiry?.phone ||
                          "N/A";

                        const isDeleting =
                          deletingId === inquiry._id;

                        return (
                          <tr key={inquiry._id}>
                            <td data-label="User Information">
                              <div className="inq-student-cell">
                                <strong>
                                  {inquiry.name ||
                                    "Unknown User"}
                                </strong>

                                {inquiry.fatherName && (
                                  <span className="sub-text">
                                    Father:{" "}
                                    {inquiry.fatherName}
                                  </span>
                                )}

                                <span className="sub-text">
                                  Mobile: {phoneNumber}
                                </span>

                                <span className="sub-text inq-email-text">
                                  Email:{" "}
                                  {inquiry.email || "N/A"}
                                </span>
                              </div>
                            </td>

                            <td data-label="Location">
                              <div className="inq-location-cell">
                                <strong>
                                  {inquiry.state || "N/A"}
                                </strong>

                                <span className="sub-text">
                                  {inquiry.district || "N/A"}
                                </span>
                              </div>
                            </td>

                            <td data-label="Course">
                              <div className="inq-course-cell">
                                <span className="inq-domain">
                                  {inquiry.domain ||
                                    (normalizedSource ===
                                    "Course Request"
                                      ? "Section Form"
                                      : normalizedSource ===
                                          "Chatbot"
                                        ? "Chatbot Lead"
                                        : "General")}
                                </span>

                                <strong className="inq-course">
                                  {inquiry.course ||
                                    "Not specified"}
                                </strong>
                              </div>
                            </td>

                            <td
                              data-label="Message"
                              className="inq-message-table-cell"
                            >
                              <div className="inq-message-cell">
                                <p>
                                  {inquiry.message ||
                                    "No message provided"}
                                </p>
                              </div>
                            </td>

                            <td data-label="Source & Date">
                              <div className="inq-source-cell">
                                <span
                                  className={`source-badge ${getSourceBadgeClass(
                                    inquiry.source
                                  )}`}
                                >
                                  <SourceIcon
                                    source={inquiry.source}
                                  />

                                  {normalizedSource}
                                </span>

                                <span className="inq-date">
                                  {formatDate(
                                    inquiry.createdAt
                                  )}
                                </span>
                              </div>
                            </td>

                            <td data-label="Action">
                              <div className="inq-action-cell">
                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteHandler(
                                      inquiry._id,
                                      inquiry.name
                                    )
                                  }
                                  className="inquiry-delete-btn"
                                  disabled={isDeleting}
                                  aria-label={`Delete inquiry from ${
                                    inquiry.name || "user"
                                  }`}
                                  title="Delete inquiry"
                                >
                                  {isDeleting ? (
                                    <Loader2
                                      size={18}
                                      className="inquiries-spin"
                                    />
                                  ) : (
                                    <Trash2 size={18} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>

              <div className="inquiries-pagination-footer">
                <div className="pagination-results-text">
                  Page <strong>{currentPage}</strong> of{" "}
                  <strong>{totalPages}</strong>

                  <span>•</span>

                  {ITEMS_PER_PAGE} records per page
                </div>

                {totalPages > 1 && (
                  <div className="inquiries-pagination">
                    <button
                      type="button"
                      className="pagination-nav-btn"
                      onClick={() =>
                        changePage(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={17} />
                      <span>Previous</span>
                    </button>

                    <div className="pagination-page-numbers">
                      {getPaginationItems().map(
                        (pageItem, index) => {
                          if (
                            typeof pageItem === "string"
                          ) {
                            return (
                              <span
                                key={`${pageItem}-${index}`}
                                className="pagination-ellipsis"
                              >
                                ...
                              </span>
                            );
                          }

                          return (
                            <button
                              type="button"
                              key={pageItem}
                              onClick={() =>
                                changePage(pageItem)
                              }
                              className={`pagination-number-btn ${
                                currentPage === pageItem
                                  ? "active"
                                  : ""
                              }`}
                              aria-current={
                                currentPage === pageItem
                                  ? "page"
                                  : undefined
                              }
                            >
                              {pageItem}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <button
                      type="button"
                      className="pagination-nav-btn"
                      onClick={() =>
                        changePage(currentPage + 1)
                      }
                      disabled={
                        currentPage === totalPages
                      }
                    >
                      <span>Next</span>
                      <ChevronRight size={17} />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInquiries;