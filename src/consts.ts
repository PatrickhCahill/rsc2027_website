// Site-wide settings. Edit this file to rebrand the theme — every page,
// the RSS feed, and Open Graph tags read from here.

import type { UIKey } from './i18n/en';

export const SITE = {
  /** BCP 47 language tag. Picks the UI dictionary in `src/i18n/`, and sets
   *  `<html lang>`, date formatting, and the RSS feed language. Dictionaries
   *  ship for `en` and `ja`; regional variants like `en-GB` reuse the base
   *  language's strings while keeping their own date format. */
  locale: 'en',
  /** Site name — used in the header brand, <title>, and og:site_name. */
  title: 'RSC 2027',
  /** Default meta description for pages that don't set their own. */
  description:
    "31 August 2027 to 4 September 2027 Research Students' Conference in Probability and Statistics",
  /** Description of the RSS feed at /rss.xml. */
  rssDescription: '31 August 2027 to 4 September 2027 Conference.',
  /** Default social share image, relative to the site root (see public/). */
  ogImage: '/og.jpg',
  /** Post author, emitted in JSON-LD BlogPosting structured data.
   *  Leave empty ('') to omit the author field. */
  author: 'Patrick H. Cahill',
  /** Official contact address. Linked from the footer and the contact page. */
  email: 'rsc2027imperial@gmail.com',
  /** Footer line. `{email}` is replaced with a mailto: link to `email`. */
  footerText:
    'The official email contact is {email}. Please disregard communication about the conference from any other source.',
} as const;

/** Icons bundled with the theme — see `src/components/SocialLinks.astro`. */
export type SocialIcon = 'github' | 'x' | 'linkedin' | 'rss' | 'email';

export interface SocialLink {
  /** Accessible name announced on the icon-only link. */
  label: string;
  /** Full URL, `mailto:` address, or site-root path (gets `base` applied). */
  href: string;
  icon: SocialIcon;
}

/** Social profiles rendered as inline SVG icons in the footer.
 *  Add or remove entries here — no template edits needed. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/PatrickhCahill/rsc2027_website', icon: 'github' },
  // { label: 'RSS feed', href: '/rss.xml', icon: 'rss' },
];

/** Conference venue — drives the map on /venue/ and the popup on its marker. */
export const VENUE = {
  name: 'Imperial College London',
  address: "180 Queen's Gate, South Kensington, London SW7 2AZ",
  /** WGS84 coordinates of the marker and map centre. */
  lat: 51.499,
  lng: -0.179,
  /** Initial zoom; 16 shows the campus and surrounding streets. */
  zoom: 15,
} as const;

/** Organising committee, in display order. Rendered on the home and about
 *  pages — edit here and both update. */
export const ORGANISERS: readonly string[] = [
  'William Allfrey',
  'Holly Bennett',
  'Patrick H. Cahill',
  'Maïté Guerin',
  'Rishi Kirithiran',
  'Skye Purchase',
  'Emma Rothwell',
  'Ashley Turner',
];

export interface Sponsor {
  /** Used as the logo's alt text. */
  name: string;
  /** Site-root path under `public/` (gets `base` applied). */
  logo: string;
  /** Intrinsic pixel size of the image, so the browser reserves space. */
  width: number;
  height: number;
  /** Optional link to the sponsor's site. */
  href?: string;
}

/** Sponsor logos for the home page hero. Placeholders for now — drop the
 *  real logos in `public/sponsor_logos/` and list them here. */
export const SPONSORS: readonly Sponsor[] = [
  { name: 'Sponsor', logo: '/sponsor_logos/sponsor0.png', width: 227, height: 30 },
  { name: 'Sponsor', logo: '/sponsor_logos/sponsor0.png', width: 227, height: 30 },
  { name: 'Sponsor', logo: '/sponsor_logos/sponsor0.png', width: 227, height: 30 },
];

export interface Speaker {
  name: string;
  affiliation: string;
  /** Site-root path to a square logo under `public/affiliation_logos/`
   *  (gets `base` applied). Omit to show the affiliation as text only. */
  affiliationLogo?: string;
  /** Talk title, once known. */
  talk?: string;
  /** Speaker's homepage; the name links out when set. */
  href?: string;
  /** Marks the keynote: the card is highlighted and labelled. */
  keynote?: boolean;
}

/** Confirmed speakers for the home page, in display order. Placeholders for
 *  now — replace as speakers are confirmed. */
export const SPEAKERS: readonly Speaker[] = [
  {
    name: 'Speaker to be announced',
    affiliation: 'Affiliation',
    // affiliationLogo: '/affiliation_logos/imperial.png',
    keynote: true,
  },
  {
    name: 'Speaker to be announced',
    affiliation: 'Affiliation',
    // affiliationLogo: '/affiliation_logos/cambridge.jpeg',
  },
  { name: 'Speaker to be announced', affiliation: 'Affiliation' },
];

/** Third-party embeds (forms, calendars, maps), rendered by
 *  `src/components/Embed.astro`. Keep the URLs here so a form can be swapped
 *  without opening a page template.
 *
 *  `height` is the iframe's height as a CSS length. A cross-origin iframe
 *  cannot measure its own content, so this has to be set by hand: make it a
 *  little taller than the form renders at, and the form will not need its
 *  own scrollbar. Forms reflow taller on narrow screens, so use `max()` to
 *  give phones more room. An empty `src` renders only the fallback link. */
export interface EmbedConfig {
  src: string;
  /** Accessible name for the iframe, e.g. "Registration form". */
  title: string;
  /** CSS height, e.g. '1400px' or 'max(1400px, 170vh)'. */
  height: string;
}

export const EMBEDS = {
  registrationForm: {
    src: 'https://forms.cloud.microsoft/e/6vM1sDaUN5?embed=true',
    title: 'Registration form',
    height: 'max(880px, 90vh)',
  },
  /** Google Calendar in agenda mode, shown under the programme so readers can
   *  add sessions to their own calendar. Empty until the calendar exists:
   *  Google Calendar → Settings → Integrate calendar → Embed code, then
   *  set `mode=AGENDA` in the URL. */
  calendar: {
    src: '',
    title: 'Conference calendar',
    height: '600px',
  },
} as const satisfies Record<string, EmbedConfig>;

/** Giscus — GitHub Discussions-backed comments on blog posts.
 *  See `GISCUS` below; values come from https://giscus.app. */
export interface GiscusConfig {
  /** Master switch. While `false`, no Giscus markup, CSS, or script is emitted. */
  enabled: boolean;
  /** Target repository, `owner/name`. Needs public Discussions and the
   *  giscus GitHub App installed. */
  repo: string;
  /** Repository ID from giscus.app (starts with `R_`). */
  repoId: string;
  /** Discussion category name, e.g. `Announcements`. */
  category: string;
  /** Category ID from giscus.app (starts with `DIC_`). */
  categoryId: string;
  /** How a post maps to its discussion. `pathname` is the safest default —
   *  it survives retitling, unlike `title`. */
  mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
  /** Use a strict title match when looking up the discussion. */
  strict: boolean;
  /** Show the reaction bar above the comment list. */
  reactionsEnabled: boolean;
  /** Put the comment box above (`top`) or below (`bottom`) the thread. */
  inputPosition: 'top' | 'bottom';
  /** Giscus UI language, e.g. `en`, `ja`, `fr`. */
  lang: string;
  /** Giscus theme used while the site is in light mode. */
  lightTheme: string;
  /** Giscus theme used while the site is in dark mode. The widget is told to
   *  switch live when the header toggle flips. */
  darkTheme: string;
}

/** Comments are **off by default** — the theme ships no third-party JavaScript
 *  unless you ask for it. To turn them on: enable Discussions on your repo,
 *  install the giscus app (https://github.com/apps/giscus), fill in the IDs
 *  from https://giscus.app, and set `enabled: true`. */
export const GISCUS: GiscusConfig = {
  enabled: false,
  repo: '',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  strict: true,
  reactionsEnabled: true,
  inputPosition: 'bottom',
  lang: 'en',
  // Other options include `preferred_color_scheme`, `transparent_dark`,
  // `noborder_light`, `cobalt`, or a URL to your own theme CSS.
  lightTheme: 'light',
  darkTheme: 'dark',
};

/** A label is either a literal string or a key into the UI dictionary —
 *  exactly one of the two. */
type NavLabel = { label: string; labelKey?: never } | { labelKey: UIKey; label?: never };

/** A single navigation link. */
export type NavLink = NavLabel & { href: string; children?: never };

/** A dropdown group: a labelled disclosure that reveals its `children`.
 *  Rendered as a native `<details>` element, so it needs no JavaScript and
 *  works on touch. Groups do not nest. */
export type NavGroup = NavLabel & { href?: never; children: readonly NavLink[] };

export type NavItem = NavLink | NavGroup;

/** Header navigation. `href` is relative to the site root; the configured
 *  `base` is applied automatically via `withBase()`. The bundled entries
 *  localize through the UI dictionary; give a page you add yourself a literal
 *  `label` instead — one of the two is required. An entry with `children`
 *  instead of `href` renders as a dropdown. */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/about/', labelKey: 'nav.about' },
  {
    labelKey: 'nav.conference',
    children: [
      { href: '/registration/', labelKey: 'nav.registration' },
      { href: '/submission/', labelKey: 'nav.submission' },
      { href: '/programme/', labelKey: 'nav.programme' },
      { href: '/venue/', labelKey: 'nav.venue' },
      { href: '/accommodation/', labelKey: 'nav.accommodation' },
    ],
  },
  { href: '/sponsorship/', labelKey: 'nav.sponsorship' },
  { href: '/contact/', labelKey: 'nav.contact' },
  // { href: '/works/', labelKey: 'nav.works' },
  // { href: '/blog/', labelKey: 'nav.blog' },
  // { href: '/search/', labelKey: 'nav.search' },
];
