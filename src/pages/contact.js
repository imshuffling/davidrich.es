import React, { useState } from "react";
import { navigate } from "gatsby-link";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";

const Contact = () => {
  const [text, setText] = useState({});

  function encode(data) {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...text }),
    })
      .then(() => navigate("/thanks/"))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact - David Riches</title>
      </Helmet>

      <section id="contact">
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
            action="/thanks"
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
    </Layout>
  );
};

export default Contact;
