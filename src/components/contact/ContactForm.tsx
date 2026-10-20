"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef, useState } from "react";
import { SegmentedCapsule, type Segment } from "@/components/kit";
import { site } from "@/lib/site";

type Topic = "hiring" | "project" | "speaking" | "other";

const icon = (d: string) => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Topics, icons and message prompts from 07-contact.
const TOPICS: (Segment<Topic> & { prompt: string })[] = [
  { value: "hiring", label: "Hiring", icon: icon("M4 8h16v11H4zM9 8V5h6v3M4 13h16"), prompt: "Tell me about the role, team and stack." },
  { value: "project", label: "Project", icon: icon("M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"), prompt: "What are you building, and where does security fit?" },
  { value: "speaking", label: "Speaking", icon: icon("M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4"), prompt: "Event, audience and topic you have in mind." },
  { value: "other", label: "Other", icon: icon("M4 5h16v11H9l-5 4zM9 10.5h.01M12 10.5h.01M15 10.5h.01"), prompt: "How can I help?" },
];

const SEND = "M4 12l16-8-6 16-3-7z";

/**
 * Topic capsule and Formspree form (07-contact). The topic travels with the
 * message. On success the fields clear and a confirmation shows until the
 * visitor starts a new message; errors show per field or for the whole form.
 */
export function ContactForm() {
  const [topic, setTopic] = useState<Topic>("hiring");
  const current = TOPICS.find((t) => t.value === topic)!;
  const [state, handleSubmit, resetState] = useForm<{ name: string; email: string; message: string }>(site.formspreeId, {
    data: { topic: current.label, _subject: `Portfolio contact: ${current.label}` },
  });
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.succeeded) form.current?.reset();
  }, [state.succeeded]);

  // A new edit after a send (or a failed send) starts a fresh submission.
  const onEdit = () => {
    if (state.succeeded || state.errors) resetState();
  };

  const formErrors = state.errors?.getFormErrors() ?? [];
  const label = state.submitting ? "Sending…" : state.succeeded ? "Sent. Talk soon" : "Send message";

  return (
    <>
      <p className="pg-lab">
        WHAT’S IT ABOUT
      </p>
      <SegmentedCapsule label="Topic" options={TOPICS} value={topic} onChange={setTopic} />
      <form ref={form} className="ff" onSubmit={handleSubmit} onInput={onEdit} aria-busy={state.submitting}>
        <label className="fl">
          <span>NAME</span>
          <input type="text" name="name" placeholder="Your name" autoComplete="name" required maxLength={120} />
        </label>
        <ValidationError className="ff-err" field="name" prefix="Name" errors={state.errors} />
        <label className="fl">
          <span>EMAIL</span>
          <input type="email" name="email" placeholder="you@company.com" autoComplete="email" required maxLength={200} />
        </label>
        <ValidationError className="ff-err" field="email" prefix="Email" errors={state.errors} />
        <label className="fl">
          <span>MESSAGE</span>
          <textarea name="message" placeholder={current.prompt} required maxLength={5000} />
        </label>
        <ValidationError className="ff-err" field="message" prefix="Message" errors={state.errors} />
        {/* Formspree honeypot: bots fill it, people never see it. */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="ff-hp" />
        <button type="submit" className="btn-p rim ff-send" disabled={state.submitting}>
          <span className="grain" aria-hidden="true" />
          <span className="pdisc" aria-hidden="true">
            {icon(SEND)}
          </span>
          <span className="ff-send-l">{label}</span>
        </button>
        <div role="status" aria-live="polite" className="ff-live">
          {state.succeeded ? (
            <p className="sent">
              {icon("M5 12l4 4L19 6")}
              Message sent. Thanks for reaching out.
            </p>
          ) : null}
        </div>
        {formErrors.length ? (
          <p className="ff-fail" role="alert">
            {formErrors.some((e) => e.code !== "UNSPECIFIED") ? `${formErrors[0].message}. ` : "That didn’t go through. "}
            Try again, or email me at <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        ) : null}
        <span className="ff-note">
          <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Your details are only used to reply to you.
        </span>
      </form>
    </>
  );
}
