const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      index: true,
    },

    author: {
      type: String,
      default: "SkillServe Academy",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    metaKeywords: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    readTime: {
      type: String,
      default: "5 min read",
    },

    comments: {
      type: Number,
      default: 0,
    },

    /* Blog FAQs */
    faqs: {
      type: [faqSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model(
  "Blog",
  blogSchema
);

module.exports = Blog;