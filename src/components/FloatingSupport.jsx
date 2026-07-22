import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  MessageCircle,
  Phone,
  Send,
  X,
  RotateCcw,
  LoaderCircle,
} from "lucide-react";

import api from "../utils/api";
import "./FloatingSupport.css";

const CONTACT_NUMBER = "9484794843";
const WHATSAPP_NUMBER = "919484794843";

const chatbotQuestions = [
  {
    key: "name",
    message: "Hello! May I know your name?",
    placeholder: "Type your name...",
  },
  {
    key: "mobile",
    message: "Please enter your 10-digit mobile number.",
    placeholder: "Enter mobile number...",
  },
  {
    key: "email",
    message: "Please enter your email address.",
    placeholder: "Enter email address...",
  },
  {
    key: "message",
    message:
      "How can we help you? Please mention the course or service you are interested in.",
    placeholder: "Write your inquiry...",
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hello! Welcome to SkillServe Academy 👋",
  },
  {
    id: 2,
    sender: "bot",
    text: chatbotQuestions[0].message,
  },
];

const FloatingSupport = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isChatOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => clearTimeout(focusTimer);
  }, [messages, isChatOpen, currentStep]);

  const addMessage = (sender, text) => {
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender,
        text,
      },
    ]);
  };

  const validateInput = (key, value) => {
    const cleanedValue = value.trim();

    if (key === "name") {
      if (cleanedValue.length < 2) {
        return "Please enter your correct name.";
      }
    }

    if (key === "mobile") {
      const cleanedMobile = cleanedValue.replace(/\D/g, "");

      if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
        return "Please enter a valid 10-digit Indian mobile number.";
      }
    }

    if (key === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(cleanedValue)) {
        return "Please enter a valid email address.";
      }
    }

    if (key === "message") {
      if (cleanedValue.length < 3) {
        return "Please write a short message about your inquiry.";
      }
    }

    return "";
  };

  const submitInquiry = async (updatedFormData) => {
    try {
      setIsSubmitting(true);

      await api.post("/inquiries", {
        name: updatedFormData.name,
        mobile: updatedFormData.mobile,
        email: updatedFormData.email,
        message: updatedFormData.message,
        source: "Chatbot",
        course: "",
        domain: "",
      });

      addMessage(
        "bot",
        `Thank you ${updatedFormData.name}! Your inquiry has been submitted successfully.`
      );

      setTimeout(() => {
        addMessage(
          "bot",
          `Our team will contact you shortly on ${updatedFormData.mobile}.`
        );
      }, 500);

      setIsCompleted(true);
    } catch (error) {
      console.error("Chatbot inquiry submission error:", error);

      addMessage(
        "bot",
        "Sorry, your inquiry could not be submitted. Please try again or contact us through WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (isSubmitting || isCompleted) return;

    const cleanedValue = inputValue.trim();

    if (!cleanedValue) return;

    const currentQuestion = chatbotQuestions[currentStep];
    const validationError = validateInput(
      currentQuestion.key,
      cleanedValue
    );

    if (validationError) {
      addMessage("bot", validationError);
      return;
    }

    let finalValue = cleanedValue;

    if (currentQuestion.key === "mobile") {
      finalValue = cleanedValue.replace(/\D/g, "");
    }

    addMessage("user", finalValue);

    const updatedFormData = {
      ...formData,
      [currentQuestion.key]: finalValue,
    };

    setFormData(updatedFormData);
    setInputValue("");

    const isLastQuestion =
      currentStep === chatbotQuestions.length - 1;

    if (isLastQuestion) {
      await submitInquiry(updatedFormData);
      return;
    }

    const nextStep = currentStep + 1;

    setCurrentStep(nextStep);

    setTimeout(() => {
      addMessage("bot", chatbotQuestions[nextStep].message);
    }, 400);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setCurrentStep(0);
    setInputValue("");
    setIsCompleted(false);
    setIsSubmitting(false);

    setFormData({
      name: "",
      mobile: "",
      email: "",
      message: "",
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello SkillServe Academy, I want to know more about your courses and services."
    );

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const callNow = () => {
    window.location.href = `tel:${CONTACT_NUMBER}`;
  };

  return (
    <>
      {isChatOpen && (
        <section className="support-chatbox">
          <div className="support-chatbox__header">
            <div className="support-chatbox__profile">
              <div className="support-chatbox__avatar">
                <Bot size={23} />
              </div>

              <div>
                <h3>SkillServe Assistant</h3>

                <div className="support-chatbox__status">
                  <span />
                  Online
                </div>
              </div>
            </div>

            <button
              type="button"
              className="support-chatbox__close"
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={24} />
            </button>
          </div>

          <div className="support-chatbox__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`support-message support-message--${message.sender}`}
              >
                {message.sender === "bot" && (
                  <div className="support-message__avatar">
                    <Bot size={16} />
                  </div>
                )}

                <div className="support-message__bubble">
                  {message.text}
                </div>
              </div>
            ))}

            {isSubmitting && (
              <div className="support-message support-message--bot">
                <div className="support-message__avatar">
                  <Bot size={16} />
                </div>

                <div className="support-message__bubble support-message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="support-chatbox__footer">
            {isCompleted ? (
              <button
                type="button"
                className="support-chatbox__restart"
                onClick={resetChat}
              >
                <RotateCcw size={18} />
                Start New Chat
              </button>
            ) : (
              <div className="support-chatbox__input-wrapper">
                {currentStep === chatbotQuestions.length - 1 ? (
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    className="support-chatbox__input support-chatbox__textarea"
                    placeholder={
                      chatbotQuestions[currentStep].placeholder
                    }
                    onChange={(event) =>
                      setInputValue(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    rows={1}
                    disabled={isSubmitting}
                  />
                ) : (
                  <input
                    ref={inputRef}
                    type={
                      chatbotQuestions[currentStep].key === "email"
                        ? "email"
                        : chatbotQuestions[currentStep].key === "mobile"
                          ? "tel"
                          : "text"
                    }
                    value={inputValue}
                    className="support-chatbox__input"
                    placeholder={
                      chatbotQuestions[currentStep].placeholder
                    }
                    onChange={(event) =>
                      setInputValue(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                    maxLength={
                      chatbotQuestions[currentStep].key === "mobile"
                        ? 10
                        : undefined
                    }
                  />
                )}

                <button
                  type="button"
                  className="support-chatbox__send"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isSubmitting}
                  aria-label="Send message"
                >
                  {isSubmitting ? (
                    <LoaderCircle
                      size={20}
                      className="support-chatbox__spinner"
                    />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            )}

            <p className="support-chatbox__privacy">
              Your information is safe with SkillServe Academy.
            </p>
          </div>
        </section>
      )}

      <div className="floating-support">
        <div className="floating-support__item">
          <span className="floating-support__label">
            Chat with us
          </span>

          <button
            type="button"
            className={`floating-support__button floating-support__button--chat ${
              isChatOpen ? "floating-support__button--active" : ""
            }`}
            onClick={() => setIsChatOpen((previous) => !previous)}
            aria-label="Open chatbot"
          >
            {isChatOpen ? <X size={28} /> : <MessageCircle size={29} />}
          </button>
        </div>

        <div className="floating-support__item">
          <span className="floating-support__label">
            WhatsApp
          </span>

          <button
            type="button"
            className="floating-support__button floating-support__button--whatsapp"
            onClick={openWhatsApp}
            aria-label="Contact on WhatsApp"
          >
            <svg
              viewBox="0 0 32 32"
              width="30"
              height="30"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M16.04 3C9.42 3 4.05 8.27 4.05 14.77c0 2.28.67 4.5 1.93 6.4L4 28.36l7.45-1.94a12.1 12.1 0 0 0 4.58.9h.01c6.62 0 12-5.27 12-11.77A11.82 11.82 0 0 0 16.04 3Zm0 22.33h-.01a10 10 0 0 1-4.07-.85l-.29-.13-4.42 1.15 1.18-4.22-.19-.3a9.65 9.65 0 0 1-1.53-5.21c0-5.4 4.46-9.79 9.95-9.79 2.66 0 5.16 1.02 7.03 2.86a9.63 9.63 0 0 1 2.91 6.93c0 5.4-4.46 9.8-9.95 9.8Zm5.46-7.34c-.3-.15-1.77-.86-2.04-.95-.27-.1-.47-.15-.67.14-.2.3-.77.95-.94 1.14-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.46a8.93 8.93 0 0 1-1.66-2.03c-.17-.3-.02-.45.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.58-.91-2.17-.24-.57-.49-.49-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1-1.04 2.44s1.07 2.83 1.21 3.03c.15.2 2.1 3.15 5.1 4.42.71.3 1.27.49 1.7.62.72.22 1.37.19 1.88.12.58-.08 1.77-.71 2.02-1.39.25-.68.25-1.26.17-1.39-.07-.12-.27-.2-.57-.34Z"
              />
            </svg>
          </button>
        </div>

        <div className="floating-support__item">
          <span className="floating-support__label">
            Call Now
          </span>

          <button
            type="button"
            className="floating-support__button floating-support__button--call"
            onClick={callNow}
            aria-label="Call SkillServe Academy"
          >
            <Phone size={27} />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingSupport;