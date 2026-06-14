/**
 * Real contact-form delivery.
 *
 * The site is a static front-end (no server), so submissions are delivered via
 * Web3Forms — a form-to-email relay whose access key is public by design. The
 * key is created against the destination inbox, so every submission lands in
 * connect@elomagroup.com.au.
 *
 * Setup (one time):
 *   1. Go to https://web3forms.com and "Create Access Key" using
 *      connect@elomagroup.com.au — the verification + all future submissions
 *      go to that inbox.
 *   2. Put the key in an `.env` file at the project root:
 *        VITE_WEB3FORMS_ACCESS_KEY=your-key-here
 *   3. Rebuild / restart the dev server.
 *
 * Deliverability (staying out of spam):
 *   - Web3Forms sends over an authenticated (SPF/DKIM) domain, and we set
 *     `replyto` to the visitor so replies go straight back to them.
 *   - A honeypot field blocks bot spam before it ever reaches the inbox.
 *   - For best inbox placement of *replies you send*, make sure
 *     elomagroup.com.au has SPF + DKIM + DMARC configured with your mail host.
 */

export interface ContactPayload {
  fullName: string;
  workEmail: string;
  company?: string;
  phone?: string;
  inquiryType?: string;
  message: string;
  /** Honeypot — must stay empty; if filled, the sender is a bot. */
  botcheck?: string;
}

export const CONTACT_RECIPIENT = 'connect@elomagroup.com.au';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

/** Build a clean, readable plain-text body for the mailto fallback. */
function plainBody(p: ContactPayload): string {
  return [
    `Inquiry type: ${p.inquiryType || '—'}`,
    `Name: ${p.fullName}`,
    `Email: ${p.workEmail}`,
    `Company: ${p.company || '—'}`,
    `Phone: ${p.phone || '—'}`,
    '',
    'Message:',
    p.message,
  ].join('\n');
}

/**
 * Deliver a contact submission. Resolves on success, throws on failure so the
 * UI can show an error state. Bot submissions resolve silently (dropped).
 */
export async function sendContact(p: ContactPayload): Promise<void> {
  // Honeypot tripped — pretend success, deliver nothing.
  if (p.botcheck) return;

  const subject = `New ${p.inquiryType || 'website'} inquiry — ${p.fullName}`;

  // No key configured yet → fall back to the visitor's own mail client,
  // pre-addressed to the group inbox with a tidy body.
  if (!ACCESS_KEY) {
    const href =
      `mailto:${CONTACT_RECIPIENT}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(plainBody(p))}`;
    window.location.href = href;
    return;
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject,
      from_name: 'Eloma Group — Website',
      replyto: p.workEmail,
      // Recipient is bound to the access key; included for auditing.
      to: CONTACT_RECIPIENT,
      // Fields render as a clean table in the delivered email.
      'Inquiry type': p.inquiryType || '—',
      'Full name': p.fullName,
      'Work email': p.workEmail,
      Company: p.company || '—',
      Phone: p.phone || '—',
      Message: p.message,
      botcheck: p.botcheck ?? '',
    }),
  });

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'We could not send your message. Please try again.');
  }
}
