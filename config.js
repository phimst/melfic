/**
 * config.js
 * ---------------------------------------------------------
 * Edit THIS file to customize the entire portfolio.
 * You should never need to touch index.html for normal
 * customization — everything below is rendered dynamically.
 * ---------------------------------------------------------
 */

const portfolioConfig = {

  // ---- Core identity -------------------------------------
  profile: {
    name: "Seraphim",
    brand: "Melfic",
    subtitle: "by seraphim",
    avatar: "", // leave empty to show the Melfic mark by default — set e.g. "./assets/profile.jpg" once you add your photo
    status: "Available for work",
    availability: "Freelance / Full-time"
  },

  // ---- SEO ------------------------------------------------
  // Used to populate <title>, meta description, Open Graph, Twitter
  // Card, canonical URL, and JSON-LD structured data automatically.
  // IMPORTANT: set `url` to your real GitHub Pages or custom domain
  // once deployed (e.g. "https://yourusername.github.io/melfic/").
  seo: {
    url: "https://seraphim.github.io/melfic/",
    title: "Melfic — by seraphim | Personal Developer Portfolio",
    description:
      "Melfic is the personal developer portfolio of Seraphim — clean, modern web projects, tools, and bots. Explore Melfic by seraphim's work.",
    ogImage: "./assets/og-image.jpg"
  },

  // ---- Hero section ---------------------------------------
  hero: {
    greeting: "Hi, I'm Seraphim 👋",
    title: "I build things for the web.",
    description:
      "I'm a passionate developer who loves turning ideas into real world solutions. I focus on building clean, modern, and user-friendly web experiences.",
    primaryCta: { label: "View Projects", href: "#projects" },
    secondaryCta: { label: "Contact Me", href: "#contact" }
  },

  // ---- Social links ----------------------------------------
  social: {
    github: "https://github.com/phimst",
    twitter: "https://x.com/username",
    linkedin: "https://linkedin.com/in/username",
    email: "mailto:hello@example.com"
  },

  // ---- CV / resume ------------------------------------------
  cv: {
    enabled: true,
    file: "./assets/cv.pdf"
  },

  // ---- About section -----------------------------------------
  about: {
    label: "ABOUT",
    heading: "Building with curiosity.",
    body:
      "I'm a developer who enjoys the whole arc of building software — from the first sketch of an idea to shipping something people actually use. Most of my recent work lives at the intersection of automation, bots, and small developer tools that remove friction from everyday workflows."
  },

  // ---- Projects ------------------------------------------------
  projects: [
    {
      name: "Melfic API",
      category: "API",
      image: "./assets/projects/melfic-api.svg",
      description:
        "REST API service for developers with real-time data and fast responses.",
      url: "https://example.com"
    },
    {
      name: "Seraphyne Bot",
      category: "Bot",
      image: "./assets/projects/seraphyne.svg",
      description:
        "WhatsApp & Telegram bot with powerful features and modern design.",
      url: "https://example.com"
    },
    {
      name: "Xhanthus Dashboard",
      category: "Dashboard",
      image: "./assets/projects/xhanthus.svg",
      description:
        "Control panel for managing bots and monitoring in real-time.",
      url: "https://example.com"
    },
    {
      name: "Myputra Landing",
      category: "Website",
      image: "./assets/projects/myputra.svg",
      description:
        "Landing page with modern and minimal design.",
      url: "https://example.com"
    }
  ],

  // ---- Skills ------------------------------------------------
  // `icon` maps to a key in the ICON_MAP inside script.js.
  // If a key has no matching icon, a generic glyph is used.
  skills: [
    { name: "HTML", icon: "html" },
    { name: "Node.js", icon: "node" },
    { name: "GitHub", icon: "github" }
 /* { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Node.js", icon: "node" },
    { name: "React", icon: "react" },
    { name: "Express.js", icon: "express" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "Flutter", icon: "flutter" },
    { name: "Laravel", icon: "laravel" },
    { name: "MySQL", icon: "mysql" }
    */
  ],

  // ---- Contact section -----------------------------------------
  contact: {
    label: "CONTACT",
    heading: "Let's build something.",
    description: "Have an idea or want to collaborate?",
    ctaLabel: "Get in touch"
  },

  // ---- Footer ------------------------------------------------
  footer: {
    copyright: "© 2026 Melfic by seraphim"
  }

};

// IMPORTANT: `const` at the top level does NOT attach to `window`
// (unlike `var`). script.js reads `window.portfolioConfig`, so this
// line is what actually makes your edits above take effect.
window.portfolioConfig = portfolioConfig;
