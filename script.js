/**
 * script.js
 * ---------------------------------------------------------
 * Modular structure:
 *  1) ICON_MAP        - inline SVG source per skill/social key
 *  2) Theme            - theme read/write/apply
 *  3) Render functions  - renderProfile, renderHero, renderSocialLinks,
 *                          renderProjects, renderSkills, renderAbout,
 *                          renderContact, renderFooter
 *  4) UI interactions   - navbar scroll state, mobile menu, active link
 * ---------------------------------------------------------
 */

(function () {
  "use strict";

  /* ======================================================
     1) ICONS
     ====================================================== */
  const SOCIAL_ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.65.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.22-3.37-1.22-.46-1.19-1.11-1.51-1.11-1.51-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z" fill="currentColor"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17.53 3H21l-7.5 8.57L22 21h-6.53l-5.12-6.7L4.4 21H1l8.02-9.17L2 3h6.68l4.63 6.13L17.53 3Zm-1.15 16.17h1.83L7.7 4.75H5.73l10.65 14.42Z" fill="currentColor"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A1.94 1.94 0 1 0 5.27 7.4 1.94 1.94 0 0 0 5.25 3.5ZM20.5 20.5h-3.37v-6.19c0-1.48-.03-3.38-2.06-3.38-2.07 0-2.39 1.62-2.39 3.28v6.29H9.31V8.5h3.24v1.64h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.68 2.27 4.68 5.22V20.5Z" fill="currentColor"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`
  };

  // Skill glyph: single letter/mark + a signature color per tech.
  // Kept intentionally simple (no external icon CDN dependency).
  const ICON_MAP = {
    html:       { glyph: "◆", color: "#E44D26" },
    css:        { glyph: "◆", color: "#2965F1" },
    javascript: { glyph: "JS", color: "#F0DB4F" },
    typescript: { glyph: "TS", color: "#3178C6" },
    node:       { glyph: "◆", color: "#3C873A" },
    react:      { glyph: "⚛", color: "#61DAFB" },
    express:    { glyph: "EX", color: "#8f8f8f" },
    mongodb:    { glyph: "◆", color: "#47A248" },
    git:        { glyph: "◆", color: "#F05032" },
    github:     { glyph: "◆", color: "#8f8f8f" },
    flutter:    { glyph: "◆", color: "#02569B" },
    laravel:    { glyph: "◆", color: "#FF2D20" },
    mysql:      { glyph: "◆", color: "#4479A1" },
    default:    { glyph: "●", color: "var(--accent)" }
  };

  const cfg = window.portfolioConfig || {};
  const DEFAULT_MARK = "./assets/logo-mark.png"; // Melfic "M" + ring mark, used when no avatar is configured
  const DEFAULT_PROJECT_IMAGE = "./assets/logo-mark.png"; // used when a project has no `image` set

  /* ======================================================
     2) THEME
     ====================================================== */
  const THEME_KEY = "melfic-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  function getStoredPref() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function resolveTheme(pref) {
    if (pref === "light" || pref === "dark") return pref;
    return media.matches ? "dark" : "light";
  }

  function applyTheme(pref) {
    const resolved = resolveTheme(pref);
    root.setAttribute("data-theme", resolved);
    root.setAttribute("data-theme-pref", pref);
  }

  function setThemePref(pref) {
    try { localStorage.setItem(THEME_KEY, pref); } catch (e) { /* storage unavailable */ }
    applyTheme(pref);
  }

  function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const current = resolveTheme(getStoredPref() || "system");
      const next = current === "dark" ? "light" : "dark";
      setThemePref(next);
    });

    // Follow system changes only while the user hasn't picked manually
    media.addEventListener("change", () => {
      const pref = getStoredPref() || "system";
      if (pref === "system") applyTheme("system");
    });
  }

  /* ======================================================
     3) RENDER FUNCTIONS
     ====================================================== */
  function renderProfile() {
    const p = cfg.profile || {};
    document.title = `${p.brand || "Melfic"} — ${p.subtitle || ""}`.trim();

    ["brand-name", "footer-brand-name"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = p.brand || "Melfic";
    });
    ["brand-sub", "footer-brand-sub"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = p.subtitle || "";
    });

    const avatar = document.getElementById("avatar-img");
    if (avatar) {
      avatar.src = p.avatar || DEFAULT_MARK;
      avatar.alt = p.avatar
        ? `Portrait of ${p.name || "the developer"}`
        : `${p.brand || "Melfic"} logo mark`;
    }

    const statusTitle = document.getElementById("status-title");
    const statusSub = document.getElementById("status-sub");
    if (statusTitle) statusTitle.textContent = p.status || "Available for work";
    if (statusSub) statusSub.textContent = p.availability || "";

    const cvLink = document.getElementById("cv-link");
    if (cvLink) {
      const cv = cfg.cv || {};
      if (cv.enabled && cv.file) {
        cvLink.href = cv.file;
        cvLink.removeAttribute("aria-disabled");
      } else {
        cvLink.style.display = "none";
      }
    }
  }

  function renderHero() {
    const h = cfg.hero || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };
    set("hero-greeting", h.greeting || "");
    set("hero-title", h.title || "");
    set("hero-desc", h.description || "");

    const primary = document.getElementById("hero-primary-cta");
    if (primary && h.primaryCta) {
      primary.href = h.primaryCta.href || "#projects";
      primary.childNodes[0].textContent = (h.primaryCta.label || "View Projects") + " ";
    }
    const secondary = document.getElementById("hero-secondary-cta");
    if (secondary && h.secondaryCta) {
      secondary.href = h.secondaryCta.href || "#contact";
      secondary.childNodes[0].textContent = (h.secondaryCta.label || "Contact Me") + " ";
    }
  }

  function buildSocialList(container) {
    if (!container) return;
    const social = cfg.social || {};
    const order = ["github", "twitter", "linkedin", "email"];
    container.innerHTML = "";
    order.forEach(key => {
      const url = social[key];
      if (!url) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url;
      a.setAttribute("aria-label", key.charAt(0).toUpperCase() + key.slice(1));
      if (key !== "email") {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.innerHTML = SOCIAL_ICONS[key] || "";
      li.appendChild(a);
      container.appendChild(li);
    });
  }

  function renderSocialLinks() {
    buildSocialList(document.getElementById("social-row"));
  }

  function renderProjects() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;
    const projects = cfg.projects || [];

    grid.innerHTML = "";
    projects.forEach(project => {
      const card = document.createElement("article");
      card.className = "project-card";

      const media = document.createElement("div");
      media.className = "project-card__media";
      const img = document.createElement("img");
      img.src = project.image || DEFAULT_PROJECT_IMAGE;
      img.alt = `${project.name} preview`;
      img.loading = "lazy";
      if (!project.image) img.classList.add("project-card__media--fallback");
      media.appendChild(img);

      const body = document.createElement("div");
      body.className = "project-card__body";

      const top = document.createElement("div");
      top.className = "project-card__top";
      const name = document.createElement("h3");
      name.className = "project-card__name";
      name.textContent = project.name;
      top.appendChild(name);
      if (project.category) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = project.category;
        top.appendChild(badge);
      }

      const desc = document.createElement("p");
      desc.className = "project-card__desc";
      desc.textContent = project.description || "";

      body.append(top, desc);

      if (project.url) {
        const link = document.createElement("a");
        link.className = "project-card__link";
        link.href = project.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `View Project <svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        body.appendChild(link);
      }

      card.append(media, body);
      grid.appendChild(card);
    });
  }

  function renderSkills() {
    const list = document.getElementById("skill-pills");
    if (!list) return;
    const skills = cfg.skills || [];

    list.innerHTML = "";
    skills.forEach(skill => {
      const meta = ICON_MAP[skill.icon] || ICON_MAP.default;
      const li = document.createElement("li");
      li.className = "skill-pill";
      li.innerHTML = `<span class="skill-pill__dot" style="background:${meta.color}"></span>${skill.name}`;
      list.appendChild(li);
    });
  }

  function renderAbout() {
    const a = cfg.about || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };
    set("about-label", a.label);
    set("about-heading", a.heading);
    set("about-body", a.body);
  }

  function renderContact() {
    const c = cfg.contact || {};
    const set = (id, text) => {
      const el = document.getElementById(id);
      if (el && text) el.textContent = text;
    };
    set("contact-heading", c.heading);
    set("contact-desc", c.description);

    const cta = document.getElementById("contact-cta");
    if (cta) {
      const email = (cfg.social || {}).email || "#";
      cta.href = email;
      cta.childNodes[0].textContent = (c.ctaLabel || "Get in touch") + " ";
    }

    const emailEl = document.getElementById("contact-email");
    if (emailEl) {
      const email = (cfg.social || {}).email || "";
      if (email.startsWith("mailto:")) {
        emailEl.href = email;
        emailEl.textContent = email.replace("mailto:", "");
        emailEl.style.display = "";
      } else {
        emailEl.style.display = "none";
      }
    }

    buildSocialList(document.getElementById("contact-social-row"));
  }

  function renderSEO() {
    const seo = cfg.seo || {};
    const p = cfg.profile || {};
    const social = cfg.social || {};
    const url = seo.url || window.location.href;
    const title = seo.title || `${p.brand || "Melfic"} — ${p.subtitle || ""}`.trim();
    const description = seo.description || (cfg.hero || {}).description || "";
    const ogImage = seo.ogImage
      ? new URL(seo.ogImage, url).href
      : new URL("./assets/og-image.jpg", url).href;

    const setAttr = (id, attr, value) => {
      const el = document.getElementById(id);
      if (el && value) el.setAttribute(attr, value);
    };

    document.title = title;
    setAttr("meta-description", "content", description);
    setAttr("canonical-link", "href", url);

    setAttr("og-url", "content", url);
    setAttr("og-site-name", "content", p.brand || "Melfic");
    setAttr("og-title", "content", title);
    setAttr("og-description", "content", description);
    setAttr("og-image", "content", ogImage);

    setAttr("twitter-title", "content", title);
    setAttr("twitter-description", "content", description);
    setAttr("twitter-image", "content", ogImage);

    // Keep JSON-LD structured data in sync with config too
    const websiteLd = document.getElementById("ld-website");
    if (websiteLd) {
      websiteLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: p.brand || "Melfic",
        alternateName: `${p.brand || "Melfic"} ${p.subtitle || ""}`.trim(),
        url,
        description,
        publisher: { "@type": "Person", name: p.name || "Seraphim" }
      });
    }
    const personLd = document.getElementById("ld-person");
    if (personLd) {
      const sameAs = [social.github, social.twitter, social.linkedin].filter(Boolean);
      personLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: p.name || "Seraphim",
        alternateName: p.brand || "Melfic",
        url,
        jobTitle: "Developer",
        sameAs
      });
    }
  }

  function renderFooter() {
    const f = cfg.footer || {};
    const el = document.getElementById("footer-copy");
    if (el && f.copyright) el.textContent = f.copyright;
  }

  /* ======================================================
     4) UI INTERACTIONS
     ====================================================== */
  function initNavbarScroll() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initActiveNavLink() {
    const sections = ["home", "about", "projects", "skills", "contact"]
      .map(id => document.getElementById(id))
      .filter(Boolean);
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    if (!sections.length || !navLinks.length) return;

    const setActive = (id) => {
      navLinks.forEach(link => {
        link.classList.toggle("is-active", link.dataset.nav === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
  }

  /* ======================================================
     INIT
     ====================================================== */
  function init() {
    applyTheme(getStoredPref() || "system");
    initThemeToggle();

    renderProfile();
    renderSEO();
    renderHero();
    renderSocialLinks();
    renderProjects();
    renderSkills();
    renderAbout();
    renderContact();
    renderFooter();

    initNavbarScroll();
    initMobileNav();
    initActiveNavLink();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
