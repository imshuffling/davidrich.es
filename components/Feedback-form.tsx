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
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (res.status === 200) {
        setStatus("ok");
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
    >
      <input type="hidden" name="form-name" value="feedback" />
      <input name="name" type="text" placeholder="Name" required />
      <input name="email" type="text" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <div className="button-wrap">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === "pending"}
        >
          Submit
        </button>
        {status === "ok" && (
          <h5 className="notification alert alert-success">Message sent...</h5>
        )}
        {status === "error" && (
          <h5 className="notification alert alert-error">{error}</h5>
        )}
      </div>
    </form>
  );
}
