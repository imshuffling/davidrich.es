"use client";

import React from "react";
import { FeedbackForm } from "@/components/Feedback-form";

export function ContactClient() {
  return (
    <section id="contact">
      <div>
        <h1>Contact me</h1>
        <h2>
          I am available for small projects and contract work.
          <br />
          <span className="email">
            email me at&nbsp;
            <a href="mailto:hi@davidrich.es">
              <span>h</span>
              <span>i</span>
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
}
