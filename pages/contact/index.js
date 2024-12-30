"use client";

import React from "react";
import Head from "next/head";
import { FeedbackForm } from "../../components/Feedback-form";

const Contact = () => {
  return (
    <section id="contact">
      <Head>
        <title>Contact - David Riches</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        <FeedbackForm />
      </div>
    </section>
  );
};

export default Contact;
