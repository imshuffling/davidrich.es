import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Contact = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      });

      if (response.ok) {
        router.push("/thanks");
      } else {
        console.error("Form submission failed");
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section id="contact">
      <Head>
        <title>Contact - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {/* Add favicon logic here */}
      </Head>
      <div>
        <h1>Contact me</h1>
        <h2>
          I am available for small projects and contract work.
          <br />
          <span className="email">
            email me at&nbsp;
            <a href="mailto:hi@davidrich.es">
              <span>hi</span>
              <span>@</span>
              <span>d</span>
              <span>a</span>
              <span>v</span>
              <span>i</span>
              <span>d</span>
              <span>r</span>
              <span>i</span>
              <span>c</span>
              <span>h</span>
              <span>.</span>
              <span>e</span>
              <span>s</span>
            </a>
          </span>
        </h2>

        <form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input
                name="bot-field"
                aria-label="bot-field"
                onChange={handleChange}
              />
            </label>
          </p>
          <input
            type="email"
            aria-label="Enter your email"
            name="email"
            placeholder="Your email"
            required
            onChange={handleChange}
          />
          <textarea
            name="message"
            aria-label="Enter your message"
            placeholder="Your message"
            required
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
