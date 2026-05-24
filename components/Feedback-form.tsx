"use client";

import { useState, FormEvent } from "react";

type FormStatus = 'idle' | 'pending' | 'ok' | 'error';

export function FeedbackForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setStatus("pending");
      setError(null);
      const myForm = event.currentTarget;
      const formData = new FormData(myForm);
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.status === 200) {
        setStatus("ok");
        myForm.reset();
      } else {
        setStatus("error");
        setError(`${res.status} ${res.statusText}`);
      }
    } catch (e) {
      setStatus("error");
      setError(String(e));
    }
  };

  return (
    <form
      name="feedback"
      onSubmit={handleFormSubmit}
      className="space-y-6"
      aria-describedby={status === "error" ? "form-error" : undefined}
    >
      <input type="hidden" name="form-name" value="feedback" />

      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-primary mb-3 font-label">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          aria-required="true"
          aria-invalid={status === "error"}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-primary mb-3 font-label">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="hello@example.com"
          required
          aria-required="true"
          aria-invalid={status === "error"}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-primary mb-3 font-label">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          rows={4}
          required
          aria-required="true"
          aria-invalid={status === "error"}
        />
      </div>

      <div className="button-wrap pt-2">
        <button
          type="submit"
          disabled={status === "pending"}
          aria-busy={status === "pending"}
          className="btn-primary w-full md:w-auto cursor-pointer active:scale-95"
        >
          {status === "pending" ? "Sending..." : "Send Message"}
        </button>
        {status === "ok" && (
          <div className="notification text-primary" role="status" aria-live="polite">
            Message sent successfully!
          </div>
        )}
        {status === "error" && (
          <div id="form-error" className="notification text-error" role="alert" aria-live="assertive">
            Error: {error}
          </div>
        )}
      </div>
    </form>
  );
}
