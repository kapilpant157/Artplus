import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      toast.error("Please verify the captcha!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/common/email/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subject, email, message }),
        }
      );

      if (response.ok) {
        toast.success("Email sent successfully!");
        // Clear form fields after a slight delay to ensure toast finishes rendering
        setTimeout(() => {
          setSubject("");
          setEmail("");
          setMessage("");
          setCaptchaVerified(false);
        }, 500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again later.");
    }
  };

  // Helper function to render social icons
  const getIconComponent = (icon) => {
    const iconSize = { width: 30, height: 30 };

    switch (icon) {
      case "facebook":
        return (
          <SocialIcon
            url="https://facebook.com"
            bgColor="#3b5998"
            style={iconSize}
          />
        );
      case "instagram":
        return (
          <SocialIcon
            url="https://instagram.com"
            bgColor="#E1306C"
            style={iconSize}
          />
        );
      case "linkedin":
        return (
          <SocialIcon
            url="https://linkedin.com"
            bgColor="#0077B5"
            style={iconSize}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="contact-page">
    <header className="Contact-header">
      <h1 className="faq-title text-4xl font-bold text-center py-6">Contact Us</h1>
    </header>
    <div style={{ display: "flex", padding: "20px" }}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

      {/* Contact Information */}
      <div style={{ flex: 1, padding: "20px", borderRight: "1px solid #ddd" }}>
        <h2>Art Plus</h2>
        <div style={{ marginBottom: "20px" }}>
          <p>Dhangadhi Kailali, Sudur Paschim, Nepal</p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>Phone:</strong> +977 9876 543 211 , +977 2311 456 789
          </p>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@sunilecommerce.com">info@sunilecommerce.com</a>
          </p>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Find us on:</strong>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {getIconComponent("facebook")}
          {getIconComponent("instagram")}
          {getIconComponent("linkedin")}
        </div>
      </div>

      {/* Contact Form */}
      <div style={{ flex: 1, padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Subject:
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">Select a subject</option>
                <option value="Customer service">Customer service</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Email address:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
                placeholder="Enter your email"
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
                placeholder="How can we help?"
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => setCaptchaVerified(e.target.checked)}
                checked={captchaVerified}
              />{" "}
              I'm not a robot
            </label>
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#6C63FF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactUs;
