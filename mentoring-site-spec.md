# 1:1 mentoring site — reference inventory and build specification

Prepared 22 September 2026. Reference: [Android Engineers 1:1 Mentorship](https://www.androidengineers.in/masterclass/one-to-one-mentoring). This document describes the public page and supplies original copy for a similar site. It does not reproduce the source site's full text, photos, logos, or testimonials.

## 1. Goal and scope

Build a responsive landing page that explains a single mentoring offer and turns visitors into paid bookings. The page should make the mentor, outcome, session format, price, and next step clear without requiring an account. An owner should be able to update the offer, price, availability, and testimonials without editing page code.

### Core pages

| Route | Purpose |
| --- | --- |
| `/` | Optional home page or redirect to the mentoring offer. |
| `/mentoring` | Main sales page, with every section below. |
| `/book` | Intake and checkout entry point. |
| `/booking/success` | Payment confirmation and scheduling instructions. |
| `/booking/cancelled` | Clear retry path after an abandoned or failed payment. |
| `/privacy`, `/terms`, `/refunds` | Policies written for the actual business and payment provider. |
| `/contact` | Support contact and response expectations. |

The first version can be a single landing page plus a hosted checkout and simple policy pages.

## 2. Reference page inventory

The reference page presents a promotional banner, site navigation, a second course announcement, a back link, the mentoring hero, social proof, a mentor card, price and booking buttons, a session overview, curriculum, mentor biography, features, prerequisites, tools, testimonials, and footer links. Its public details include a **90-minute single session**, scheduling arranged **by email after booking**, a displayed price of **₹4,999** against **₹7,999**, and a **38% off** badge. It also displays enrollment/rating and learner counts; these are the reference business's claims and must not be reused without evidence. [Source page](https://www.androidengineers.in/masterclass/one-to-one-mentoring).

The curriculum shown publicly names career assessment (20 minutes), strategic planning (25 minutes), and Q&A/implementation (15 minutes). These add to 60 minutes, though the offer says 90 minutes. Confirm the missing 30 minutes before using that exact agenda. The page lists resume and LinkedIn review, interview preparation, a personalized roadmap, resources, and follow-up email as features. [Source page](https://www.androidengineers.in/masterclass/one-to-one-mentoring).

The visible page says the buyer receives an email to schedule after booking. Its booking controls appear as buttons, so the public text extraction does not establish the checkout provider, form fields, payment steps, or exact destination. Treat the flow below as the proposed implementation, not a verified copy of the source flow.

## 3. Page sections and original draft copy

Replace bracketed fields with the actual business details before launch. The copy below is new text intended for this build.

### A. Announcement and navigation

- Optional announcement: **New mentoring appointments are available this month.** Link: **See the session** → `/mentoring#booking`.
- Brand: `[Brand name]` → `/`.
- Navigation: **How it works** → `#how-it-works`; **Session plan** → `#curriculum`; **Your mentor** → `#mentor`; **Reviews** → `#reviews`; **Book a session** → `#booking`.
- Mobile: accessible menu button, same links, visible booking action.

### B. Hero

- Eyebrow: **Personal career mentoring**.
- H1: **Make your next career move with a clear plan.**
- Lead: **Bring your interview questions, career decisions, resume, or portfolio to a focused one-to-one conversation. We will identify the most useful next steps and turn them into a practical plan.**
- Key facts: **[90] minutes** · **Live video call** · **A time arranged around your availability**.
- Primary CTA: **Book your session** → `#booking`.
- Secondary CTA: **See what we cover** → `#curriculum`.
- Visual: licensed mentor portrait or original illustration, with descriptive alt text.
- Trust line: show a verified rating or booking count only if independently documented; otherwise omit.

### C. Offer card / pricing

- Title: **One session, built around your goals**.
- Price: **[currency][current price]**. Show an old price or discount only when it is a genuine, current promotion.
- Includes: **[90]-minute private call; pre-session goal review; written action plan; [number]-day email follow-up**. Adjust to what the mentor will actually deliver.
- Availability: **Times are confirmed after checkout** or **Choose a time before payment**, matching the selected booking design.
- CTA: **Continue to booking** → `/book`.
- Payment note: **Secure payment. Confirmation sent to your email.**
- Policy links: **Cancellation and refunds** → `/refunds`; **Terms** → `/terms`.
- Desktop: card can remain visible while the visitor reads. Mobile: place it near the hero and repeat a compact CTA at the end.

### D. About the session

- H2: **A useful conversation, tailored to you**.
- Body: **We start with the challenge you want to solve. Together we review your current position, identify the gaps that matter, and choose a realistic set of actions for the next few weeks.**
- Outcome cards: **A clearer goal**; **Specific feedback**; **A practical next-step plan**.

### E. Who it is for

- H2: **Who this session helps**.
- Bullets: **People preparing for a technical interview; developers considering a new role or specialization; professionals who want feedback on a resume or portfolio; people who need help prioritizing what to learn next.**
- Qualification note: **Bring one or two priorities so we can use the time well.**

### F. Curriculum / session plan

Use an agenda that totals the advertised duration. Suggested 90-minute plan:

| Time | Block | What happens |
| --- | --- | --- |
| 0–20 min | Goals and current position | Clarify the decision, deadline, experience, and constraints. |
| 20–45 min | Review and feedback | Review a resume, portfolio, interview approach, or technical growth area chosen in the intake form. |
| 45–75 min | Strategy | Develop priorities, practice points, and a realistic short-term roadmap. |
| 75–90 min | Questions and next actions | Resolve open questions and agree on the first actions after the call. |

Each row can expand for detail. Avoid presenting fixed outcomes as guaranteed.

### G. What is included

- Private one-to-one video session.
- Pre-session intake questionnaire.
- Feedback on the selected focus area.
- Personal action plan or summary delivered after the call.
- Resource recommendations relevant to the participant's goal.
- Optional follow-up by email, with a stated time window.

### H. Mentor profile

- H2: **Meet your mentor**.
- Name: **[Mentor name]**.
- Credentials: **[Current role, relevant experience, verified credentials]**.
- Bio draft: **I help [audience] make better decisions about [specialty]. My mentoring sessions combine direct feedback with a plan you can put to work immediately.**
- Portrait, links to the mentor's own LinkedIn/GitHub/site, and a concise credentials list. Verify every credential and employer mention.

### I. Testimonials / proof

- H2: **What participants say**.
- Show 3–6 real, permissioned testimonials. Each card needs quote, name or approved initials, role/context, and date if available.
- Do not use the reference site's quotes, names, ratings, company logos, or learner counts as claims for the new business.
- Before testimonials exist, use a **What you'll leave with** section instead of invented reviews.

### J. How it works

1. **Tell us your goal.** Complete a short intake form.
2. **Complete your booking.** Pay through a trusted checkout.
3. **Choose or confirm a time.** Receive a scheduling link or arrange the call by email.
4. **Join the call.** The confirmation contains the video link and preparation notes.
5. **Get your next steps.** Receive the promised summary/resources afterward.

### K. FAQ

**Do I need to prepare?** Bring the goal you want to work on and any document you want reviewed. The confirmation email lists optional preparation.

**How is the time scheduled?** [Explain whether the buyer chooses a slot before paying or receives a scheduling link afterward.]

**Can I reschedule?** [State the actual cutoff and process from the booking policy.]

**Will the call be recorded?** [State the actual consent and access policy.]

**What if my question is outside the mentor's expertise?** Contact [support email] before booking to check fit.

### L. Final CTA and footer

- Closing heading: **Ready to make a plan for your next step?**
- Closing text: **Book a focused session and leave with actions you can start this week.**
- Button: **Book a session** → `/book`.
- Footer: brand description, support email, social links, Privacy, Terms, Refunds, Contact, copyright with current year.

## 4. Booking flow and states

| Step | Visitor experience | System behavior |
| --- | --- | --- |
| 1. Start | Click any booking CTA. | Open `/book` with offer ID and current price set server-side. |
| 2. Intake | Enter name, email, time zone, main goal, optional resume/portfolio link, and accessibility needs if relevant. | Validate fields, show privacy notice, store only needed data. Never collect payment card details directly. |
| 3. Schedule | Preferred option: choose an available slot before payment. Alternative: explicitly promise a scheduling email after payment. | Hold slot briefly if scheduled first; prevent double booking. |
| 4. Pay | See the final price, currency, tax if applicable, policy links, and secure checkout. | Create payment session with server-side price. Handle success/failure webhooks idempotently. |
| 5. Confirm | Success page shows booking reference, next step, and support contact. | Send receipt and booking email. Create or confirm calendar event and video link when a time is set. |
| 6. Prepare | Receive reminder and preparation instructions. | Send reminders according to stated schedule. |
| 7. Follow up | Receive promised summary/resources and a way to ask support questions. | Track fulfillment without exposing private intake data. |

**Required edge cases:** payment succeeds but browser closes; webhook arrives twice; selected slot expires; email bounces; user requests rescheduling; refund or cancellation; time zone/DST changes. The confirmation email and owner dashboard must reflect the same booking status.

### Suggested data model

- `Offer`: ID, title, description, duration, currency, amount, active status, inclusions, cancellation rules.
- `Mentor`: name, bio, portrait URL, verified credentials, contact links.
- `Booking`: ID, offer ID, customer name/email, time zone, goal, document URLs, scheduled start/end, status, payment reference, consent timestamps.
- `Testimonial`: quote, attribution, consent record, publication status.

### Owner functions

- Update copy, offer, price, and availability.
- View bookings and intake responses securely.
- Reschedule, cancel, and mark sessions complete.
- Trigger or verify confirmation and reminder emails.
- Publish only approved testimonials.

## 5. Links and navigation map

### Links to create for the new site

| Label | Target |
| --- | --- |
| Brand/Home | `/` |
| How it works | `/mentoring#how-it-works` |
| Session plan | `/mentoring#curriculum` |
| Your mentor | `/mentoring#mentor` |
| Reviews | `/mentoring#reviews` |
| Book a session | `/book` |
| Contact | `/contact` or `mailto:[support email]` |
| Privacy | `/privacy` |
| Terms | `/terms` |
| Cancellation and refunds | `/refunds` |
| Mentor social links | Verified personal URLs supplied by the mentor |

### Reference links observed

These identify the source site's surrounding navigation; they are **research links**, not links the new site should inherit.

| Reference item | URL |
| --- | --- |
| Mentoring offer | https://www.androidengineers.in/masterclass/one-to-one-mentoring |
| Home | https://www.androidengineers.in/ |
| Masterclasses | https://www.androidengineers.in/masterclass |
| AI Hub | https://www.androidengineers.in/ai |
| Interview questions | https://www.androidengineers.in/questions |
| Learning roadmap | https://www.androidengineers.in/roadmap |
| Codelabs | https://www.androidengineers.in/codelabs |
| Blog | https://www.androidengineers.in/blogs |
| Interview plan | https://www.androidengineers.in/android-interview-plan |
| Books | https://www.androidengineers.in/books |
| Resume builder | https://www.androidengineers.in/online-resume |
| Resources | https://www.androidengineers.in/resources |
| About | https://www.androidengineers.in/about |
| Privacy policy | https://www.androidengineers.in/privacy-policy |
| Terms | https://www.androidengineers.in/terms-and-conditions |
| Refund policy | https://www.androidengineers.in/cancellation-refund-policy |
| Promoted course | https://courses.androidengineers.in/courses/810268 |

The reference page also shows a community link and a **Book Now** control. The retrieved public page does not expose reliable final destinations for those controls. [Source page](https://www.androidengineers.in/masterclass/one-to-one-mentoring).

## 6. Design and behavior requirements

### Recommended color direction

Use a calm, credible palette with a fresh teal booking action. This is an original direction for the new brand, not a copy of the reference site.

| Role | Color | Hex | Use |
| --- | --- | --- | --- |
| Main background | Soft off-white | `#F7FAF8` | Page background and long reading sections. |
| Main text / dark surface | Deep blue-green | `#12313B` | Headings, body text, footer, dark hero area. |
| Primary action | Deep teal | `#0F766E` | Booking buttons and selected states, with white text. |
| Light accent | Pale mint | `#B8EEE3` | Highlight panels and dark-section buttons, with deep blue-green text. |
| Surface | White | `#FFFFFF` | Pricing card, curriculum, FAQ cards. |
| Secondary text | Slate | `#61737A` | Supporting text on the off-white background. |

Use deep blue-green for a dark hero or footer, off-white for the main page, and teal for the primary CTA. Keep decorative accent colors out of body text. The checked text pairings have approximate contrast ratios of 13.08:1 (main text/off-white), 5.47:1 (white/teal CTA), 10.72:1 (dark text/mint), and 4.71:1 (secondary text/off-white). Recheck all final color combinations in the browser, including hover and disabled states. WCAG AA calls for at least 4.5:1 for ordinary text and 3:1 for essential control boundaries and states: [text contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum), [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast).

- Mobile-first layout; clear CTA above the fold at common phone widths.
- Semantic headings and landmarks; keyboard-accessible menu, accordions, and forms; visible focus; useful image alt text; readable contrast.
- Responsive pricing card; no content hidden behind a sticky footer CTA.
- Fast loading with optimized images and limited third-party scripts.
- Form errors next to the affected field; loading and retry states on checkout.
- Search metadata: unique title/description, canonical URL, social preview image, and appropriate structured data only for verified facts.
- Analytics events for CTA clicks, intake start/submit, checkout start, payment success, and booking completion. Do not send personal intake text to analytics.
- Consent-aware analytics and a privacy policy that matches actual data use.

## 7. Inputs needed to replace placeholders

Brand name and domain; mentor name, biography, portrait, and credentials; target audience and session promise; duration and deliverables; price/currency/tax; payment provider; scheduling method and availability; contact email; cancellation/refund rules; recording policy; approved testimonials; links to mentor profiles. The live checkout and policy wording depend on these facts.

## 8. Suggested implementation and acceptance checks

A practical stack is Next.js or another familiar web framework, a hosted payment checkout, a scheduling provider or calendar integration, an email service, and a small database for booking state. Provider choice can follow the existing GitHub project and the business's country/payment requirements.

The site is ready when a visitor can read the offer on mobile, understand price and scheduling, complete intake and payment, receive an accurate confirmation, and reach support or policy pages. The owner can verify the booking and deliver the session without manually reconciling payment records.

## 9. Transactional emails and fulfillment

Specify the sender address and owner of each email before launch. Send an email only after the corresponding booking state has been confirmed server-side.

| Trigger | Recipient | Required content |
| --- | --- | --- |
| Payment completed | Buyer | Booking reference, amount paid, receipt link, scheduling next step, support contact, policy links. |
| Payment completed | Owner | Booking reference, offer, buyer contact, intake summary, scheduling status. |
| Time confirmed | Buyer and mentor | Start time with time zone, calendar invitation, video link, reschedule instructions. |
| Before session | Buyer and mentor | Reminder, preparation checklist, documents to bring, join link. |
| Session completed | Buyer | Promised summary/resources, follow-up window, support contact. |
| Cancelled or refunded | Buyer and owner | Status, refund amount and expected timing where applicable, support contact. |

Email templates need a text version, clear subject, and no sensitive intake content in the subject line. Failed sends should be visible to the owner and retry safely.

## 10. Trust, privacy, and operational details

- Add a visible support address near the booking CTA, not only in the footer.
- State who the session is suitable for, what is included, and whether a job offer or interview result is guaranteed. Do not imply outcomes that cannot be supported.
- Show the final payable amount and any tax before redirecting to checkout. Make refund and rescheduling rules reachable at that point.
- Minimize stored intake data, restrict owner access, set a retention period, and provide a way to request deletion.
- Protect the intake form from spam and repeated submissions without making booking difficult for real visitors.
- Keep payment secrets server-side; verify checkout webhooks and prevent duplicate booking or confirmation emails.
- Add monitoring for failed checkout/webhooks and an owner alert for paid bookings that have no confirmed time.
- Decide whether the booking flow needs language or currency localization. Display time zones explicitly in all scheduling screens and emails.

## 11. Launch checklist and unanswered decisions

- Test a successful purchase, failed payment, abandoned checkout, duplicate webhook, cancellation, refund, and reschedule in the payment provider's test environment.
- Test booking on a narrow phone screen and with keyboard-only navigation; check screen-reader labels and form errors.
- Confirm every CTA and footer link resolves, all placeholders are replaced, all claims are substantiated, and real testimonials have publication permission.
- Verify the page title, social preview, analytics events, cookie consent if used, and transactional email delivery.
- Confirm who handles customer support, how quickly they reply, and who steps in if the mentor cannot attend.

Decisions still needed: scheduling before or after payment; exact intake fields; price and tax; cancellation window; recording policy; follow-up duration; supported countries/currencies; owner workflow; whether an admin dashboard is required for the first release.

## 12. Sources and limits

- [Reference mentoring page](https://www.androidengineers.in/masterclass/one-to-one-mentoring)
- [Reference masterclasses page](https://www.androidengineers.in/masterclass)
- [Scrapling tutorial](https://scrapling.readthedocs.io/en/latest/tutorials/replacing_ai.html#conclusion)

The public page was inspected through web retrieval, not a completed Scrapling run. Dynamic checkout behavior remains unverified. Prices, claims, and links may change, so verify them against the live site before treating them as current facts.
