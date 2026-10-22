"use client";
import { Mail } from "lucide-react";
import EnqueueLogo from "./Logo";

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const navLinks = [
  { label: "About",        href: "#about" },
  { label: "Services",     href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact",      href: "#contact" },
];

const serviceLinks = [
  "Website Creation & Development",
  "Product Management",
];

const socials = [
  { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/enqueue-7771ab410/", label: "LinkedIn" },
  { icon: <TwitterIcon />, href: "https://twitter.com/enqueue", label: "X/Twitter" },
  { icon: <InstagramIcon />, href: "https://www.instagram.com/enqueue_agencz?igsh=anExMGpqNGNuZDB1", label: "Instagram" },
  { icon: <WhatsAppIcon />, href: "https://wa.me/917305429059", label: "WhatsApp" },
  { icon: <Mail size={16} />, href: "mailto:hello@enqueue.co", label: "Email" },
];

export default function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(34,34,34,0.65)", backdropFilter: "blur(8px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "80px 48px 40px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 48, marginBottom: 64 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <EnqueueLogo variant="full" height={90} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, lineHeight: 1.75, fontWeight: 300, maxWidth: 340, marginBottom: 24 }}>
              Enqueue builds scalable digital solutions that combine technology, strategy, and innovation to help businesses grow confidently.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width: 38, height: 38, border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", textDecoration: "none", transition: "all 0.2s", background: "rgba(34,34,34,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#89E900"; e.currentTarget.style.color = "#89E900"; e.currentTarget.style.background = "rgba(137,233,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; e.currentTarget.style.background = "rgba(34,34,34,0.4)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", marginBottom: 20, display: "block" }}>Navigation</span>
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                style={{ fontSize: 14, color: "#ffffff", textDecoration: "none", display: "block", marginBottom: 12, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}>
                {l.label}
              </a>
            ))}
          </div>

          <div>
            <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ffffff", marginBottom: 20, display: "block" }}>Services</span>
            {serviceLinks.map(s => (
              <a key={s} href="#services"
                style={{ fontSize: 14, color: "#ffffff", textDecoration: "none", display: "block", marginBottom: 12, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={e => (e.currentTarget.style.color = "#ffffff")}>
                {s}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}>
            © {new Date().getFullYear()} Enqueue. All rights reserved.
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ffffff" }}>
            Technology. Strategy. Execution.
          </span>
        </div>
      </div>
    </footer>
  );
}
