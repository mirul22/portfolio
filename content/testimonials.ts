export interface Testimonial {
  name: string;
  role: string;
  company: string;
  /** How they know Amirul, e.g. "Managed Amirul directly at Vorto". */
  relationship: string;
  /** Exact quote text, copied verbatim from the source. Never paraphrase. */
  quote: string;
  /** Optional link to the source, e.g. the LinkedIn recommendation. */
  sourceUrl?: string;
}

// TODO(owner): paste real LinkedIn recommendations here, verbatim, with permission.
// While this array is empty the testimonials section is not rendered anywhere.
export const testimonials: Testimonial[] = [];
