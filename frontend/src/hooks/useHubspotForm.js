import { useRef, useState, useCallback } from "react";
import { submitToHubspot } from "@/lib/hubspot";

// Reject submissions faster than this after mount — real users don't fill a form
// in under a second; bots do. Paired with a honeypot for cheap spam defense.
const MIN_SUBMIT_MS = 1200;

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/**
 * Shared submit logic for every lead form: HubSpot POST, email validation,
 * in-flight state (to disable the button and block double-submit), honest error
 * reporting, and honeypot + min-time spam guards.
 *
 * Usage:
 *   const { submit, submitting, error, honeypotProps } = useHubspotForm("inquiry");
 *   const ok = await submit({ email, firstname: name, region });
 *   if (ok) { setSent(true); trackLead({ form: "inquiry", region }); }
 *
 * When HubSpot is not yet configured, submit() resolves true immediately, so the
 * form keeps its current optimistic behavior until integration day.
 */
export const useHubspotForm = (formKey) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const mountedAt = useRef(Date.now());
  const honeypotRef = useRef("");

  const submit = useCallback(
    async (fields = {}) => {
      if (submitting) return false; // guard against double-submit
      setError(null);

      // Honeypot tripped or submitted implausibly fast → treat as bot. Pretend
      // success (don't tip off the bot) but send nothing.
      const tooFast = Date.now() - mountedAt.current < MIN_SUBMIT_MS;
      if (honeypotRef.current || tooFast) return true;

      if (fields.email !== undefined && !isValidEmail(fields.email)) {
        setError("Please enter a valid email address.");
        return false;
      }

      setSubmitting(true);
      const result = await submitToHubspot(formKey, fields);
      setSubmitting(false);

      if (!result.ok) {
        setError(
          "Something went wrong on our end. Please try again, or email hello@golf-in-mexico.com."
        );
        return false;
      }
      return true;
    },
    [formKey, submitting]
  );

  // Spread onto a visually-hidden text input. Real users never see or fill it.
  const honeypotProps = {
    type: "text",
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": true,
    onChange: (e) => {
      honeypotRef.current = e.target.value;
    },
    style: {
      position: "absolute",
      left: "-9999px",
      width: "1px",
      height: "1px",
      opacity: 0,
      pointerEvents: "none",
    },
  };

  return { submit, submitting, error, honeypotProps };
};
