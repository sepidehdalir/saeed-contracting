"use client";
import Link from "next/link";
import Script from "next/script";
import { useRef, useState, type FormEvent } from "react";
import { timings, validateQuote, quoteText } from "@/lib/quote";
import { Arrow } from "./brand";
type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
export function QuoteForm({
  options,
  initialService,
  direct,
  siteKey,
}: {
  options: { slug: string; name: string }[];
  initialService: string;
  direct: boolean;
  siteKey: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("");
  const [challengeError, setChallengeError] = useState(false);
  const challenge = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const started = useRef(0);
  const sending = useRef(false);
  const submission = useRef<{
    signature: string;
    submissionId: string;
    submittedAt: number;
  } | null>(null);
  const message = useRef<HTMLDivElement>(null);
  function renderChallenge() {
    if (challenge.current && window.turnstile && widget.current === undefined) {
      widget.current = window.turnstile.render(challenge.current, {
        sitekey: siteKey,
        action: "quote",
        callback: (t: string) => {
          setToken(t);
          setChallengeError(false);
        },
        "expired-callback": () => setToken(""),
        "error-callback": () => {
          setToken("");
          setChallengeError(true);
        },
      });
    }
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return;
    setError("");
    setCopied(false);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const checked = validateQuote(
      { ...data, consent: data.consent === "on" },
      options.map((s) => s.slug),
    );
    if (!checked.value) {
      setError(checked.error || "Please check your details.");
      return;
    }
    const quote = checked.value;
    const service =
      options.find((s) => s.slug === quote.service)?.name ||
      "Please help me choose";
    const text = quoteText(quote, service);
    if (!direct) {
      setDraft(text);
      requestAnimationFrame(() => message.current?.focus());
      return;
    }
    if (siteKey && !token) {
      setDraft(text);
      setError(
        "Please complete the security check, or email your request using the link below.",
      );
      return;
    }
    const signature = JSON.stringify(quote);
    if (!submission.current || submission.current.signature !== signature)
      submission.current = {
        signature,
        submissionId: crypto.randomUUID(),
        submittedAt: Date.now(),
      };
    sending.current = true;
    setDraft("");
    setBusy(true);
    try {
      const result = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...quote,
          submissionId: submission.current.submissionId,
          submittedAt: submission.current.submittedAt,
          website: data.website,
          token,
          startedAt: started.current,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const response = await result.json().catch(() => null);
      if (!result.ok || response?.ok !== true) {
        setDraft(text);
        setError(
          result.status === 429
            ? "Too many attempts. Please wait a few minutes before retrying, or call or email us."
            : "We could not confirm your request was sent. Please retry, or call or email us.",
        );
      } else {
        setSuccess(true);
        setDraft("");
        form.reset();
      }
    } catch {
      setDraft(text);
      setError(
        "We could not confirm that your request was sent. Please call or email us. Your details are preserved below.",
      );
    } finally {
      sending.current = false;
      setBusy(false);
      setToken("");
      if (window.turnstile && widget.current !== undefined)
        window.turnstile.reset(widget.current);
      requestAnimationFrame(() => message.current?.focus());
    }
  }
  const emailLink = `mailto:info@saeedcontracting.ca?subject=${encodeURIComponent("Website quote request")}&body=${encodeURIComponent(draft)}`;
  if (success)
    return (
      <div role="status" className="form-message" ref={message} tabIndex={-1}>
        <h2>
          Thanks — your project request has been sent to Saeed Contracting.
        </h2>
        <p style={{ marginTop: 16 }}>
          We’ll review your project and respond as soon as practical. A
          confirmation email is on its way. This is an enquiry, not a confirmed
          booking.
        </p>
        <p>
          If you need to check on your request, call{" "}
          <a href="tel:+16046270166" className="text-link">
            604-627-0166
          </a>
          .
        </p>
      </div>
    );
  return (
    <>
      <p className="form-note">
        {direct
          ? "Send the details below to request a quote."
          : "Complete the form to prepare an email to Saeed Contracting. You’ll review and send it in your email app."}{" "}
        All fields are required.
      </p>
      <form
        className="quote-form"
        onSubmit={submit}
        onFocusCapture={() => {
          if (!started.current) started.current = Date.now();
        }}
      >
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={32}
            placeholder="604-555-0123"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </div>
        <div className="field">
          <label htmlFor="city">City / neighbourhood</label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            maxLength={100}
            placeholder="e.g. Lynn Valley, North Vancouver"
          />
        </div>
        <div className="field">
          <label htmlFor="service">Service needed</label>
          <select
            id="service"
            name="service"
            required
            defaultValue={initialService}
          >
            <option value="" disabled>
              Select a service
            </option>
            {options.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
            <option value="not-sure">Not sure / multiple services</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="timing">Preferred timing</label>
          <select id="timing" name="timing" required defaultValue="">
            <option value="" disabled>
              Select timing
            </option>
            {timings.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field full-width">
          <label htmlFor="description">Tell us about the project</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            minLength={20}
            maxLength={1200}
            aria-describedby="description-help"
            placeholder="What needs doing? Include approximate dimensions, materials and access details."
          />
          <small id="description-help">
            20–1,200 characters. You can attach photos when emailing us. Please
            leave out access codes and sensitive information.
          </small>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave this blank</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="consent full-width">
          <input name="consent" type="checkbox" required />
          <span>
            I agree to be contacted about this project and have read the{" "}
            <Link href="/privacy">privacy notice</Link>.
          </span>
        </label>
        {direct && siteKey ? (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              onReady={renderChallenge}
              onError={() => setChallengeError(true)}
            />
            <div className="full-width">
              <div ref={challenge} />
              {challengeError ? (
                <p role="status" className="form-note">
                  Security check unavailable. You can still prepare your details
                  and use the email option.
                </p>
              ) : null}
            </div>
          </>
        ) : null}
        <div className="full-width">
          <button type="submit" className="button button-dark" disabled={busy}>
            {busy
              ? "Sending…"
              : direct
                ? "Send quote request"
                : "Prepare email request"}
            <Arrow diagonal />
          </button>
        </div>
      </form>
      <div
        ref={message}
        tabIndex={-1}
        className="full-width"
        style={{ marginTop: 24 }}
      >
        {error ? (
          <p role="alert" className="form-message form-error">
            {error}
          </p>
        ) : null}
        {draft ? (
          <div className="panel" aria-live="polite">
            <h2>
              {direct ? "Contact us directly" : "Your email is ready to send."}
            </h2>
            <p>
              {direct
                ? "We could not confirm online delivery. Retry the form or contact us directly."
                : "No request has been sent from this page."}{" "}
              Open your email app, add any photos and press Send. If no app
              opens, copy the details and email{" "}
              <a href="mailto:info@saeedcontracting.ca">
                info@saeedcontracting.ca
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+16046270166" className="text-link">
                Call 604-627-0166
              </a>
              <a className="button button-dark" href={emailLink}>
                Open email draft <Arrow diagonal />
              </a>
              <button
                type="button"
                className="text-link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(draft);
                    setCopied(true);
                  } catch {
                    setError(
                      "Copy is unavailable. Select the request details below and copy them manually.",
                    );
                  }
                }}
              >
                {copied ? "Details copied" : "Copy request details"}
              </button>
            </div>
            <details style={{ marginTop: 20 }}>
              <summary>Review request details</summary>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  fontSize: 14,
                  marginTop: 16,
                }}
              >
                {draft}
              </pre>
            </details>
          </div>
        ) : null}
      </div>
      <noscript>
        <p>
          Please call <a href="tel:+16046270166">604-627-0166</a> or email{" "}
          <a href="mailto:info@saeedcontracting.ca">info@saeedcontracting.ca</a>{" "}
          to request a quote.
        </p>
      </noscript>
    </>
  );
}
