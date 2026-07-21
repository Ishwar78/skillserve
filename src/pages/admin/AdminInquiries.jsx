import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../utils/api";
import {
  Trash2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from "lucide-react";
import "./admin.css";

const ITEMS_PER_PAGE = 12;

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSource, setFilterSource] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/inquiries");

      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const deleteHandler = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!isConfirmed) return;

    try {
      await api.delete(`/inquiries/${id}`);

      setInquiries((previousInquiries) =>
        previousInquiries.filter((inquiry) => inquiry._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
      window.alert("Failed to delete inquiry. Please try again.");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const searchValue = search.trim().toLowerCase();

    const searchableValues = [
      inq?.name,
      inq?.fatherName,
      inq?.email,
      inq?.mobile,
      inq?.course,
      inq?.domain,
      inq?.state,
      inq?.district,
    ];

    const matchesSearch =
      searchValue === "" ||
      searchableValues.some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(searchValue)
      );

    const matchesSource =
      filterSource === "All" || inq?.source === filterSource;

    return matchesSearch && matchesSource;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterSource]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedInquiries = filteredInquiries.slice(
    startIndex,
    endIndex
  );

  const showingFrom =
    filteredInquiries.length === 0 ? 0 : startIndex + 1;

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

    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
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
      return [1, 2, 3, 4, 5, "right-ellipsis", totalPages];
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

  return (
    <AdminLayout>
      <div className="admin-content-header inquiries-page-header">
        <div className="inquiries-header-content">
          <span className="inquiries-header-label">
            Lead Management
          </span>

          <h2>User Inquiries</h2>

          <p>
            View and manage all lead submissions received from the
            website popup and contact page.
          </p>
        </div>

        <div className="inquiries-header-stat">
          <span>Total Inquiries</span>
          <strong>{inquiries.length}</strong>
        </div>
      </div>

      <div className="inquiries-admin-container">
        {/* Search and filter */}
        <div className="admin-card inquiries-filters-card">
          <div className="inquiries-filters-flex">
            <div className="inquiry-filter-group inquiry-search-group">
              <label htmlFor="inquiry-search">
                Search inquiries
              </label>

              <div className="search-box-wrapper">
                <Search size={19} className="search-icon" />

                <input
                  id="inquiry-search"
                  type="text"
                  placeholder="Search name, email, phone, course..."
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
                <Filter size={18} className="filter-icon" />

                <select
                  id="inquiry-source"
                  value={filterSource}
                  onChange={(event) =>
                    setFilterSource(event.target.value)
                  }
                >
                  <option value="All">All Sources</option>
                  <option value="Popup">Popup Modal</option>
                  <option value="Contact Page">
                    Contact Page
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries list */}
        <div className="admin-card inquiries-list-card">
          <div className="inquiries-list-header">
            <div>
              <span className="inquiries-list-label">
                Website leads
              </span>

              <h3>Recent Inquiries</h3>

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
              <p>Please wait while inquiries are being loaded.</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="inquiries-empty-state">
              <div className="inquiries-empty-icon">
                <Inbox size={33} />
              </div>

              <h4>No inquiries found</h4>

              <p>
                No inquiries match your current search or source
                filter.
              </p>
            </div>
          ) : (
            <>
              <div className="inquiries-table-wrapper">
                <table className="inquiries-table">
                  <thead>
                    <tr>
                      <th>Student Information</th>
                      <th>Location</th>
                      <th>Course Requested</th>
                      <th>Message</th>
                      <th>Source &amp; Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedInquiries.map((inq) => (
                      <tr key={inq._id}>
                        <td data-label="Student Info">
                          <div className="inq-student-cell">
                            <strong>
                              {inq.name || "Unknown Student"}
                            </strong>

                            <span className="sub-text">
                              Father: {inq.fatherName || "N/A"}
                            </span>

                            <span className="sub-text">
                              Mobile: {inq.mobile || "N/A"}
                            </span>

                            <span className="sub-text inq-email-text">
                              Email: {inq.email || "N/A"}
                            </span>
                          </div>
                        </td>

                        <td data-label="Location">
                          <div className="inq-location-cell">
                            <strong>{inq.state || "N/A"}</strong>

                            <span className="sub-text">
                              {inq.district || "N/A"}
                            </span>
                          </div>
                        </td>

                        <td data-label="Course">
                          <div className="inq-course-cell">
                            <span className="inq-domain">
                              {inq.domain || "General"}
                            </span>

                            <strong className="inq-course">
                              {inq.course || "N/A"}
                            </strong>
                          </div>
                        </td>

                        <td
                          data-label="Message"
                          className="inq-message-table-cell"
                        >
                          <div className="inq-message-cell">
                            <p>
                              {inq.message ||
                                "No message provided"}
                            </p>
                          </div>
                        </td>

                        <td data-label="Source & Date">
                          <div className="inq-source-cell">
                            <span
                              className={`source-badge ${
                                inq.source === "Popup"
                                  ? "badge-popup"
                                  : "badge-contact"
                              }`}
                            >
                              {inq.source || "Unknown"}
                            </span>

                            <span className="inq-date">
                              {formatDate(inq.createdAt)}
                            </span>
                          </div>
                        </td>

                        <td data-label="Action">
                          <div className="inq-action-cell">
                            <button
                              type="button"
                              onClick={() =>
                                deleteHandler(inq._id)
                              }
                              className="inquiry-delete-btn"
                              aria-label={`Delete inquiry from ${
                                inq.name || "student"
                              }`}
                              title="Delete inquiry"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="inquiries-pagination-footer">
                <div className="pagination-results-text">
                  Page <strong>{currentPage}</strong> of{" "}
                  <strong>{totalPages}</strong>
                  <span>•</span>
                  12 records per page
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
                      disabled={currentPage === totalPages}
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