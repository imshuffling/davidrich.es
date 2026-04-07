"use client";

import React from "react";
import { FeedbackForm } from "@/components/Feedback-form";

export function ContactClient() {
  return (
    <>
      {/* Hero */}
      <header className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter leading-tight">
          Let&apos;s Build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Something Great
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          Currently looking for new challenges and creative collaborations. If
          you have a project in mind or just want to chat, feel free to reach
          out.
        </p>
      </header>

      {/* Content Grid */}
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-20">
        {/* Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-12 rounded-xl ambient-shadow" style={{ background: "var(--form-color)" }}>
            <FeedbackForm />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 font-label">
              Contact Details
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(99, 14, 212, 0.15)", color: "#630ed4" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lg mb-0" style={{ color: "var(--heading-color)" }}>
                    <a href="mailto:hi@davidrich.es" style={{ color: "var(--heading-color)" }} className="!border-none !bg-none hover:!text-primary">
                      hi@davidrich.es
                    </a>
                  </p>
                  <p className="text-sm mb-0" style={{ color: "var(--text-color)" }}>Always happy to chat</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(0, 84, 121, 0.15)", color: "#005479" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-lg mb-0" style={{ color: "var(--heading-color)" }}>London, UK</p>
                  <p className="text-sm mb-0" style={{ color: "var(--text-color)" }}>Remote worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-6 font-label">
              Socials
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                className="btn-secondary !py-3 !px-6 !text-sm"
                href="https://www.github.com/imshuffling"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="btn-secondary !py-3 !px-6 !text-sm"
                href="https://resume.davidrich.es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
