import type { LegalDoc, LegalDocId } from "@/content/legalDocs"

/**
 * English versions of the new-design imprint and privacy policy.
 * The German texts in legalDocs.ts remain the authoritative originals.
 */
export const legalDocsEn: Record<Exclude<LegalDocId, "agb">, LegalDoc> = {
  impressum: {
    title: "Imprint",
    updated: "As of July 2026",
    intro: "Information pursuant to § 5 ECG, § 25 MedienG and § 63 GewO.",
    sections: [
      {
        h: "Media owner & service provider",
        p: [
          "120 Ventures GmbH",
          "Baumgasse 129, 1030 Vienna, Austria",
          "Nutriful is a project of 120 Ventures GmbH.",
        ],
      },
      {
        h: "Contact",
        p: ["Email: office@120.ventures", "Web: 120.ventures"],
      },
      {
        h: "Authorised representative",
        p: ["Managing director: Sebastian Hermans"],
      },
      {
        h: "Company details",
        p: [
          "Company register number: FN 617650",
          "Commercial court: Handelsgericht Wien",
          "VAT number: ATU80155458",
          "Business purpose: in-house and contract research, and the development of innovative digital business models",
        ],
      },
      {
        h: "Chamber membership & applicable law",
        p: [
          "Member of the Vienna Economic Chamber (Wirtschaftskammer Wien).",
          "Applicable statute: Austrian Trade Act (Gewerbeordnung, GewO), available at ris.bka.gv.at.",
        ],
      },
      {
        h: "Online dispute resolution",
        p: [
          "The European Commission provides a platform for online dispute resolution (ODR): ec.europa.eu/consumers/odr. We are not obliged, and are generally not willing, to take part in dispute-resolution proceedings before a consumer arbitration board.",
        ],
      },
      {
        h: "Health notice",
        p: [
          "Nutriful is a digital tool for supporting nutrition counselling and is not a medical device within the meaning of Regulation (EU) 2017/745 (MDR). Nutriful does not provide a medical diagnosis and does not replace professional or medical advice, examination or treatment.",
        ],
      },
      {
        h: "Liability for content & links",
        p: [
          "The contents of this website were prepared with the greatest possible care. We accept no liability for their accuracy, completeness or timeliness. The operators of external linked websites are solely responsible for their content.",
        ],
      },
      {
        h: "Copyright",
        p: ["All content on this website (text, graphics, logo) is protected by copyright."],
      },
    ],
  },
  datenschutz: {
    title: "Privacy policy",
    updated: "As of July 2026",
    intro:
      "Protecting your personal data matters to us. We process your data only within the statutory framework (GDPR and the Austrian Data Protection Act). This notice explains what we process, how much of it, and why.",
    sections: [
      {
        h: "1. Controller",
        p: [
          "120 Ventures GmbH, Baumgasse 129, 1030 Vienna, Austria.",
          "Email: office@120.ventures",
        ],
      },
      {
        h: "2. Data we process",
        list: [
          "Contact details: your name and email address, when you use the form to request an introductory call about the pilot programme.",
          "Technical data: data generated when the website is accessed, such as IP address, time and browser type (user agent).",
        ],
      },
      {
        h: "3. Purposes and legal bases",
        list: [
          "Contact about the pilot programme and arranging an introductory call — on the basis of your consent (Art. 6 (1) (a) GDPR), which you may withdraw at any time.",
          "Operating, securing and improving the website — legitimate interest (Art. 6 (1) (f) GDPR).",
        ],
      },
      {
        h: "4. Services we use (processors)",
        list: [
          "Supabase (Supabase Inc.) — database and backend used to store your contact request.",
          "Netlify — hosting of the website.",
          "PostHog (PostHog Inc., EU hosting in Frankfurt am Main) — anonymous product and usage analysis (reach, click behaviour) to improve the website. Loaded only after your explicit consent; without consent, no analytics cookies are set. The data is processed within the EU.",
          "Cookiebot (Usercentrics A/S, Denmark) — consent management. Cookiebot displays the cookie notice, records your decision and stores an anonymous identifier together with your truncated IP address. This processing is required so we can demonstrate consent, and it takes place within the EU.",
        ],
        p: [
          "Data-processing agreements under Art. 28 GDPR are, or will be, in place with all providers. Where data is transferred to third countries, appropriate safeguards are used (for example EU standard contractual clauses).",
        ],
      },
      {
        h: "5. Cookies and consent",
        p: [
          "We always use storage that is technically necessary (for example your cookie decision). We set PostHog analytics cookies only with your explicit consent. Cookiebot provides the cookie notice; you can change or withdraw your decision at any time via “Cookie settings” in the footer. We do not set marketing cookies.",
        ],
      },
      {
        h: "6. How long we keep data",
        p: [
          "We keep your data for as long as the purposes above require, or until you withdraw consent. It is then deleted, unless a statutory retention duty says otherwise.",
        ],
      },
      {
        h: "7. Your rights",
        p: [
          "You have the right of access, rectification, erasure, restriction of processing, data portability and objection. You may withdraw consent at any time with effect for the future — contact office@120.ventures.",
          "You also have the right to lodge a complaint with the Austrian Data Protection Authority (dsb.gv.at).",
        ],
      },
      {
        h: "8. Data security",
        p: [
          "Transmission is encrypted (TLS/HTTPS). We take appropriate technical and organisational measures to protect your data.",
        ],
      },
    ],
  },
}
