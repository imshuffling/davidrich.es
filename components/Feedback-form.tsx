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
      className="text-black flex flex-col gap-3 align-center"
      aria-describedby={status === "error" ? "form-error" : undefined}
    >
      <input type="hidden" name="form-name" value="feedback" />
      <label htmlFor="name" className="sr-only">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        required
        aria-required="true"
        aria-invalid={status === "error"}
      />
      <label htmlFor="email" className="sr-only">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        aria-required="true"
        aria-invalid={status === "error"}
      />
      <label htmlFor="message" className="sr-only">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        required
        aria-required="true"
        aria-invalid={status === "error"}
      />
      <div className="button-wrap">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "pending"}
          aria-busy={status === "pending"}
        >
          {status === "pending" ? "Sending..." : "Submit"}
        </button>
        {status === "ok" && (
          <div className="notification alert alert-success" role="status" aria-live="polite">
            Message sent successfully!
          </div>
        )}
        {status === "error" && (
          <div id="form-error" className="notification alert alert-error" role="alert" aria-live="assertive">
            Error: {error}
          </div>
        )}
      </div>
    </form>
  );
}
