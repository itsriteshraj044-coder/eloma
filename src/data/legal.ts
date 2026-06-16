/* ------------------------------------------------------------------ */
/*  Legal documents — Privacy Policy, Terms of Use, Modern Slavery      */
/*  Statement. Plain, professional copy written for an Australian       */
/*  enterprise (Eloma Group). Rendered by src/pages/LegalPage.tsx.      */
/* ------------------------------------------------------------------ */

export interface LegalBlock {
  /** Optional sub-heading for the block. */
  heading?: string;
  /** Body paragraphs rendered in order. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  eyebrow: string;
  title: string;
  updated: string;
  intro: string[];
  blocks: LegalBlock[];
}

const COMPANY = 'Eloma Group';
const ABN = 'ABN 69 683 543 713';
const EMAIL = 'connect@elomagroup.com.au';

/* ── Privacy Policy ──────────────────────────────────────────────── */
const privacy: LegalDoc = {
  slug: 'privacy-policy',
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  updated: '1 June 2026',
  intro: [
    `${COMPANY} (${ABN}) ("we", "us", "our") is committed to protecting your privacy and handling your personal information in an open and transparent way. This Privacy Policy explains how we collect, use, disclose and safeguard your personal information when you interact with our websites, services and businesses.`,
    'We manage personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). By using our website or providing your information to us, you consent to the practices described in this policy.',
  ],
  blocks: [
    {
      heading: 'Information we collect',
      paragraphs: [
        'We collect personal information that is reasonably necessary for our business functions and activities. The types of information we may collect include:',
      ],
      list: [
        'Contact details such as your name, email address, phone number and postal address.',
        'Information you provide when you enquire about our services, apply for a role, or contact us.',
        'Business and professional details where you engage with us as a client, partner or supplier.',
        'Technical information such as your IP address, browser type, device information and pages visited.',
      ],
    },
    {
      heading: 'How we collect information',
      paragraphs: [
        'We collect personal information directly from you when you complete forms, send us an email, apply for employment, or otherwise communicate with us. We may also collect information automatically through cookies and similar technologies, and from third parties such as our group companies, partners and publicly available sources.',
      ],
    },
    {
      heading: 'How we use your information',
      paragraphs: ['We use personal information to:'],
      list: [
        'Provide, operate and improve our services and respond to your enquiries.',
        'Manage our relationships with clients, partners, suppliers and candidates.',
        'Process job applications and assess suitability for employment.',
        'Send you updates, marketing and information you have requested (you can opt out at any time).',
        'Meet our legal, regulatory and contractual obligations.',
      ],
    },
    {
      heading: 'Disclosure of your information',
      paragraphs: [
        'We may disclose your personal information to companies within the Eloma Group, our trusted service providers and contractors who assist us in operating our business, and to regulators or authorities where required or authorised by law. We do not sell your personal information.',
      ],
    },
    {
      heading: 'Cookies and analytics',
      paragraphs: [
        'Our website uses cookies and similar technologies to remember your preferences, understand how the site is used, and improve your experience. You can control or disable cookies through your browser settings, though some features of the website may not function correctly as a result.',
      ],
    },
    {
      heading: 'Overseas disclosure',
      paragraphs: [
        'As a global enterprise, some of our service providers and group companies may be located overseas. Where we disclose personal information internationally, we take reasonable steps to ensure it is handled consistently with the Australian Privacy Principles and this policy.',
      ],
    },
    {
      heading: 'Data security',
      paragraphs: [
        'We take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access, modification or disclosure. While we strive to safeguard your information, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You may request access to the personal information we hold about you and ask us to correct it if it is inaccurate, out of date or incomplete. You may also opt out of marketing communications at any time. To make a request, please contact us using the details below.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. The latest version will always be available on this page, with the effective date shown above.',
      ],
    },
    {
      heading: 'Contact us',
      paragraphs: [
        `If you have any questions about this Privacy Policy, or wish to make a request or complaint about how we handle your personal information, please contact us at ${EMAIL}. We will respond to your enquiry within a reasonable time.`,
      ],
    },
  ],
};

/* ── Terms of Use ────────────────────────────────────────────────── */
const terms: LegalDoc = {
  slug: 'terms-of-use',
  eyebrow: 'Legal',
  title: 'Terms of Use',
  updated: '1 June 2026',
  intro: [
    `These Terms of Use govern your access to and use of the websites and online services operated by ${COMPANY} (${ABN}) ("we", "us", "our"). By accessing or using our website, you agree to be bound by these terms. If you do not agree, please do not use the website.`,
  ],
  blocks: [
    {
      heading: 'Use of the website',
      paragraphs: [
        'You may use this website for lawful purposes and in accordance with these Terms of Use. You agree not to use the website in any way that may damage, disable or impair the site, or interfere with any other party’s use of it.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'All content on this website — including text, graphics, logos, images, design and software — is owned by or licensed to Eloma Group and is protected by copyright, trademark and other intellectual property laws. You may not reproduce, distribute, modify or republish any content without our prior written permission.',
      ],
    },
    {
      heading: 'Acceptable conduct',
      paragraphs: ['When using our website, you agree not to:'],
      list: [
        'Use the website in a manner that breaches any applicable law or regulation.',
        'Attempt to gain unauthorised access to any part of the website or its systems.',
        'Introduce viruses, malware or other harmful code.',
        'Use any automated means to access, scrape or collect content without our consent.',
      ],
    },
    {
      heading: 'Third-party links',
      paragraphs: [
        'Our website may contain links to third-party websites for your convenience. We do not control and are not responsible for the content, products or practices of those websites. Accessing third-party sites is at your own risk.',
      ],
    },
    {
      heading: 'Disclaimers',
      paragraphs: [
        'The information on this website is provided for general purposes only and is offered in good faith. While we take care to keep the content accurate and current, we make no warranties or representations about its completeness, reliability or suitability for any purpose. To the maximum extent permitted by law, the website is provided "as is" without warranties of any kind.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the extent permitted by law, Eloma Group will not be liable for any direct, indirect, incidental or consequential loss or damage arising from your access to, use of, or inability to use this website. Nothing in these terms excludes any rights or remedies you may have under the Australian Consumer Law that cannot lawfully be excluded.',
      ],
    },
    {
      heading: 'Indemnity',
      paragraphs: [
        'You agree to indemnify and hold harmless Eloma Group and its officers, employees and related entities against any claims, losses or expenses arising from your breach of these Terms of Use or your misuse of the website.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These Terms of Use are governed by the laws of Australia. You submit to the non-exclusive jurisdiction of the courts of Australia in relation to any dispute connected with these terms or your use of the website.',
      ],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'We may amend these Terms of Use at any time by posting an updated version on this page. Your continued use of the website after any changes constitutes acceptance of the revised terms.',
      ],
    },
    {
      heading: 'Contact us',
      paragraphs: [
        `If you have any questions about these Terms of Use, please contact us at ${EMAIL}.`,
      ],
    },
  ],
};

/* ── Modern Slavery Statement ────────────────────────────────────── */
const modernSlavery: LegalDoc = {
  slug: 'modern-slavery-statement',
  eyebrow: 'Legal',
  title: 'Modern Slavery Statement',
  updated: '1 June 2026',
  intro: [
    `${COMPANY} (${ABN}) is committed to acting ethically and with integrity across all of our operations and supply chains. This statement sets out the steps we take to identify, prevent and address the risks of modern slavery and human trafficking in our business, consistent with the principles of the Modern Slavery Act 2018 (Cth).`,
    'We have zero tolerance for modern slavery in all its forms, including forced labour, debt bondage, human trafficking and child labour.',
  ],
  blocks: [
    {
      heading: 'Our business',
      paragraphs: [
        'Eloma Group is a diversified enterprise operating across logistics and transportation, digital and technology, customer experience, travel and tourism, and virtual security. We work with clients, partners and suppliers in Australia and internationally through our group of companies.',
      ],
    },
    {
      heading: 'Our operations and supply chains',
      paragraphs: [
        'Our supply chains include providers of technology and software, professional services, facilities and office services, equipment, travel services and outsourced labour. We recognise that the breadth and global nature of these supply chains can give rise to modern slavery risks, particularly where activities extend into higher-risk industries or geographies.',
      ],
    },
    {
      heading: 'Assessing our risks',
      paragraphs: [
        'We assess modern slavery risks by considering the sector, geography, workforce and nature of the goods and services involved. Where we identify potential exposure, we prioritise engagement with the relevant suppliers and apply enhanced due diligence.',
      ],
    },
    {
      heading: 'Actions we take',
      paragraphs: ['To address modern slavery risks, we:'],
      list: [
        'Expect our suppliers and partners to comply with applicable laws and uphold fundamental human and labour rights.',
        'Include ethical-conduct and compliance expectations within our supplier engagement and contracting processes.',
        'Conduct due diligence on higher-risk suppliers and relationships.',
        'Maintain channels through which concerns can be raised confidentially and without fear of reprisal.',
      ],
    },
    {
      heading: 'Our policies',
      paragraphs: [
        'Our approach is supported by internal policies covering ethical business conduct, workplace standards, and whistleblower protections. These policies reinforce our commitment to fair, safe and lawful working conditions throughout our operations.',
      ],
    },
    {
      heading: 'Training and awareness',
      paragraphs: [
        'We promote awareness of modern slavery risks among our people and continue to build the capability of relevant teams to recognise and respond appropriately to potential indicators of modern slavery.',
      ],
    },
    {
      heading: 'Assessing effectiveness',
      paragraphs: [
        'We review our practices on an ongoing basis and seek to continuously improve the way we identify and manage modern slavery risks. We will refine our approach as our business, supply chains and understanding of these risks evolve.',
      ],
    },
    {
      heading: 'Approval and contact',
      paragraphs: [
        `This statement reflects our commitment to combating modern slavery and was approved by the leadership of Eloma Group. If you have any questions or wish to raise a concern, please contact us at ${EMAIL}.`,
      ],
    },
  ],
};

export const LEGAL_DOCS = {
  'privacy-policy': privacy,
  'terms-of-use': terms,
  'modern-slavery-statement': modernSlavery,
} satisfies Record<string, LegalDoc>;

export type LegalSlug = keyof typeof LEGAL_DOCS;
