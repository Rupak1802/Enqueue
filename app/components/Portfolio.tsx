"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const cats = ["All", "E-Commerce", "SaaS & Web Apps", "Healthcare & Hospitality", "Creative & Media"];

interface Project {
  title: string;
  cat: string;
  year: string;
  status: "Live" | "Delivered";
  desc: string;
  tech: string[];
  url: string;
}

const projects: Project[] = [
  {
    title: "Charminar Traders",
    cat: "E-Commerce",
    year: "2024",
    status: "Live",
    desc: "Luxury dry fruits, gourmet dates, and saffron e-commerce experience with editorial visuals, fast cart, and high-conversion festive merchandising.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP"],
    url: "https://chaminar-traders.vercel.app/",
  },
  {
    title: "Dentico Dental Care",
    cat: "Healthcare & Hospitality",
    year: "2024",
    status: "Live",
    desc: "Modern orthodontic and dental clinic web application featuring treatment visualizers, streamlined appointment booking, and patient onboarding.",
    tech: ["React", "Vite", "Tailwind CSS", "Booking API"],
    url: "https://dentico-nu.vercel.app/",
  },
  {
    title: "THUKIL Editorial Fashion",
    cat: "E-Commerce",
    year: "2024",
    status: "Live",
    desc: "Minimalist fashion and apparel direct-to-consumer store with magazine-style editorial typography, swift checkout, and responsive collection filters.",
    tech: ["React", "Tailwind CSS", "Editorial UI", "Fast Cart"],
    url: "https://clothing-ecommerce-kohl.vercel.app/",
  },
  {
    title: "Nexgenhub Studio",
    cat: "Creative & Media",
    year: "2024",
    status: "Live",
    desc: "High-impact interactive creative studio website with cinematic transitions, dynamic cursor effects, and sleek portfolio presentations.",
    tech: ["React", "Interactive Canvas", "Motion Design"],
    url: "https://nexgenhub-studio.vercel.app/",
  },
  {
    title: "FLINT SaaS Platform",
    cat: "SaaS & Web Apps",
    year: "2024",
    status: "Live",
    desc: "Enterprise cloud application with secure authentication flows, responsive interface design, and resilient architecture.",
    tech: ["React", "Secure Auth", "Cloud UI", "Vite"],
    url: "https://flint-orcin-ten.vercel.app/",
  },
  {
    title: "LuxeStay Luxury Hotel",
    cat: "Healthcare & Hospitality",
    year: "2024",
    status: "Live",
    desc: "Boutique luxury resort showcase and reservation interface designed to elevate guest booking conversion and eliminate intermediary commissions.",
    tech: ["HTML5", "CSS Grid", "Booking Flow", "FontAwesome"],
    url: "https://nexgenhubstudio-glitch.github.io/Luxury-Hotel/",
  },
  {
    title: "SampleStore Retail Engine",
    cat: "E-Commerce",
    year: "2024",
    status: "Live",
    desc: "Ultra-fast headless commerce platform engineered with sub-second page loads, real-time product filtering, and lightweight cart orchestration.",
    tech: ["React", "Vite", "Modular CSS", "Search API"],
    url: "https://sample-ecommerce-lilac.vercel.app/",
  },
  {
    title: "Brand Commercials & Video Ads",
    cat: "Creative & Media",
    year: "2024",
    status: "Delivered",
    desc: "Portfolio of commercial advertising campaigns, high-converting performance video edits, and motion graphic sequences generating over 10M+ impressions.",
    tech: ["Video Production", "Motion Graphics", "Sound Design"],
    url: "https://legend-spike-385.notion.site/AD-s-Made-by-us-271f5ecce2188082ba17cbde705a16cf",
  },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter(p => p.cat === active);

  return (
    <section id="portfolio" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(34,34,34,0.55)", backdropFilter: "blur(2px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: "#42C8D6", boxShadow: "0 0 10px #42C8D6" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#42C8D6" }}>Our Work</span>
        </motion.div>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 40, lineHeight: 1.05 }}>
          Projects We've Built &amp; Shipped
        </motion.h2>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)}
              style={{
                padding: "8px 16px",
                fontSize: 10,
                fontFamily: "monospace",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                background: active === c ? "#42C8D6" : "rgba(34,34,34,0.5)",
                color: active === c ? "#222222" : "#ffffff",
                border: active === c ? "1px solid #42C8D6" : "1px solid rgba(255,255,255,0.2)",
                fontWeight: active === c ? 700 : 400,
                backdropFilter: "blur(4px)",
              }}>
              {c}
            </button>
          ))}
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
          {filtered.map((p, i) => (
            <motion.div key={p.title}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{
                background: "rgba(20,20,20,0.8)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "36px 32px",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#42C8D6";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 16px 40px -10px rgba(66, 200, 214,0.15)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.18em", textTransform: "uppercase", color: "#42C8D6", border: "1px solid rgba(66, 200, 214,0.4)", padding: "3px 8px", background: "rgba(66, 200, 214,0.06)" }}>
                    {p.cat}
                  </span>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#42C8D6",
                      border: "1px solid rgba(66, 200, 214,0.4)",
                      padding: "3px 8px",
                      background: "rgba(66, 200, 214,0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#42C8D6", boxShadow: "0 0 6px #42C8D6" }} />
                      {p.status}
                    </span>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>{p.year}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, textTransform: "uppercase", color: "#ffffff", marginBottom: 12, letterSpacing: "0.03em", lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.7, fontWeight: 300, marginBottom: 20 }}>
                  {p.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ fontSize: 10, fontFamily: "monospace", color: "#42C8D6", background: "rgba(66, 200, 214,0.08)", border: "1px solid rgba(66, 200, 214,0.2)", padding: "4px 10px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Live Project link */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  background: "rgba(34,34,34,0.6)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontFamily: "monospace",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  transition: "all 0.2s ease",
                  marginTop: 8,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#42C8D6";
                  e.currentTarget.style.color = "#222222";
                  e.currentTarget.style.borderColor = "#42C8D6";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(34,34,34,0.6)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                }}>
                <span>Explore Live Project</span>
                <span style={{ fontSize: 13 }}>↗</span>
              </a>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
