"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  projectName: string;
  category: "E-Commerce" | "SaaS & Tech" | "Healthcare & Hospitality" | "Creative & Media";
  clientName: string;
  clientRole: string;
  clientAvatar: string;
  liveUrl: string;
  displayUrl: string;
  metric: string;
  quote: string;
  rating: number;
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    id: "dentico",
    projectName: "Dentico",
    category: "Healthcare & Hospitality",
    clientName: "Dr. Aris Thorne",
    clientRole: "Founder & Clinical Director, Dentico",
    clientAvatar: "AT",
    liveUrl: "https://dentico-nu.vercel.app/",
    displayUrl: "dentico-nu.vercel.app",
    metric: "+240% Patient Inquiries & Bookings",
    quote: "Enqueue transformed our patient onboarding and appointment scheduling experience. Their patient-first web architecture reduced booking friction, drastically cut no-shows, and gave our clinic a stunning, modern identity.",
    rating: 5,
    tags: ["Healthcare", "Online Booking", "Web App"],
  },
  {
    id: "charminar",
    projectName: "Charminar Traders",
    category: "E-Commerce",
    clientName: "Syed Farhan",
    clientRole: "Managing Director, Charminar Traders",
    clientAvatar: "SF",
    liveUrl: "https://chaminar-traders.vercel.app/",
    displayUrl: "chaminar-traders.vercel.app",
    metric: "3.4x Checkout Conversion & Zero Latency",
    quote: "From luxury product storytelling to instant cart responsiveness, Enqueue captured our brand heritage and built a digital storefront that handled high-volume festive traffic flawlessly without a single hitch.",
    rating: 5,
    tags: ["Luxury Gourmet", "E-Commerce", "Next.js"],
  },
  {
    id: "thukil",
    projectName: "THUKIL",
    category: "E-Commerce",
    clientName: "Kavitha Sundaram",
    clientRole: "Creative Director, THUKIL",
    clientAvatar: "KS",
    liveUrl: "https://clothing-ecommerce-kohl.vercel.app/",
    displayUrl: "clothing-ecommerce-kohl.vercel.app",
    metric: "Sub-Second Page Load & +180% Sales Surge",
    quote: "For an editorial fashion brand, typographic elegance and pacing are everything. Enqueue delivered a runway-caliber e-commerce experience with silky page transitions and an effortless shopping flow.",
    rating: 5,
    tags: ["Fashion Retail", "Editorial UI", "Fast Cart"],
  },
  {
    id: "nexgenhub",
    projectName: "Nexgenhub Studio",
    category: "Creative & Media",
    clientName: "Rohan Mehta",
    clientRole: "Co-Founder, Nexgenhub Studio",
    clientAvatar: "RM",
    liveUrl: "https://nexgenhub-studio.vercel.app/",
    displayUrl: "nexgenhub-studio.vercel.app",
    metric: "3x Surge in Tier-1 Global Client Pitches",
    quote: "Enqueue engineered our creative studio website with cinematic flair. Their mastery of interactive animations, dark-mode refinement, and crisp engineering gave us a distinct competitive edge when winning major accounts.",
    rating: 5,
    tags: ["Digital Studio", "Interactive Web", "Brand Showcase"],
  },
  {
    id: "flint",
    projectName: "FLINT",
    category: "SaaS & Tech",
    clientName: "Elena Rostova",
    clientRole: "Head of Product, FLINT",
    clientAvatar: "ER",
    liveUrl: "https://flint-orcin-ten.vercel.app/",
    displayUrl: "flint-orcin-ten.vercel.app",
    metric: "99.99% Uptime & Enterprise-Grade Auth",
    quote: "The authentication architecture, high-performance dashboards, and frontend data caching Enqueue implemented were rock-solid from day one. They are rare engineers who genuinely comprehend SaaS product strategy.",
    rating: 5,
    tags: ["SaaS Platform", "Cloud Architecture", "Auth System"],
  },
  {
    id: "luxestay",
    projectName: "LuxeStay Resorts",
    category: "Healthcare & Hospitality",
    clientName: "Antoine Mercier",
    clientRole: "VP Hospitality Operations, LuxeStay Group",
    clientAvatar: "AM",
    liveUrl: "https://nexgenhubstudio-glitch.github.io/Luxury-Hotel/",
    displayUrl: "luxestay.hotel",
    metric: "+160% Direct Bookings & Lower Commission Costs",
    quote: "Guests expect five-star luxury across every touchpoint, and Enqueue captured that atmosphere online. Direct room reservations jumped within months, saving us thousands in third-party aggregator commissions.",
    rating: 5,
    tags: ["Boutique Hotel", "Reservation Flow", "Luxury UI"],
  },
  {
    id: "samplestore",
    projectName: "SampleStore",
    category: "E-Commerce",
    clientName: "Marcus Vance",
    clientRole: "Head of E-Commerce Growth, SampleStore",
    clientAvatar: "MV",
    liveUrl: "https://sample-ecommerce-lilac.vercel.app/",
    displayUrl: "sample-ecommerce-lilac.vercel.app",
    metric: "1.2s Average Global Load & 45% Lower Bounce",
    quote: "The headless storefront Enqueue developed for us is blazingly fast. Instant catalog search, seamless filtering, and clean visual hierarchy dropped our bounce rate to historic lows and propelled customer retention.",
    rating: 5,
    tags: ["Headless Retail", "High-Performance", "Instant Search"],
  },
  {
    id: "commercials",
    projectName: "Ad Campaigns & Commercials",
    category: "Creative & Media",
    clientName: "Devon Brooks",
    clientRole: "Growth Marketing Director, Apex Brand Media",
    clientAvatar: "DB",
    liveUrl: "https://legend-spike-385.notion.site/AD-s-Made-by-us-271f5ecce2188082ba17cbde705a16cf",
    displayUrl: "notion.site/AD-s-Made-by-us",
    metric: "10M+ Collective Impressions & 4.2x ROAS",
    quote: "The video commercial edits, motion sequences, and high-converting ad campaign creative assets produced by Enqueue generated our highest return-on-ad-spend across all paid performance channels this year.",
    rating: 5,
    tags: ["Ad Production", "Motion Graphics", "Video Editing"],
  },
];

const categories = [
  "All",
  "E-Commerce",
  "SaaS & Tech",
  "Healthcare & Hospitality",
  "Creative & Media",
] as const;

const trustStats = [
  { label: "Live Client Deployments", value: "8+" },
  { label: "Average Client Rating", value: "5.0 ★" },
  { label: "Average Client ROI Surge", value: "3.4x" },
  { label: "Deployment Reliability", value: "99.9%" },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filtered = activeTab === "All"
    ? testimonials
    : testimonials.filter(t => t.category === activeTab);

  return (
    <section id="testimonials" style={{ padding: "120px 48px", position: "relative" }}>
      {/* Dark frosted overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(20,20,20,0.82)", backdropFilter: "blur(3px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Section Pill */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 8, height: 8, background: "#42C8D6", boxShadow: "0 0 10px #42C8D6" }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "#42C8D6" }}>
            Client Validations · Verified Deployments
          </span>
        </motion.div>

        {/* Header & Subhead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ maxWidth: 680 }}>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", lineHeight: 1.05, marginBottom: 16 }}>
              Real Products.<br />Measurable Impact.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.75, fontWeight: 300 }}>
              Every testimonial below is tied directly to a live, production-grade deployment built and shipped by Enqueue. Click any live project to explore the architecture and design firsthand.
            </p>
          </motion.div>

          {/* Quick live indicator */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "10px 18px", background: "rgba(66, 200, 214,0.08)",
              border: "1px solid rgba(66, 200, 214,0.3)", backdropFilter: "blur(8px)",
            }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#42C8D6",
              boxShadow: "0 0 12px #42C8D6", display: "inline-block",
              animation: "pulseGlow 2s infinite ease-in-out",
            }} />
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#ffffff", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              8 Verified Active Sites
            </span>
          </motion.div>
        </div>

        {/* Trust Stats Bar */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 1, background: "rgba(255,255,255,0.1)", marginBottom: 44,
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
          {trustStats.map(stat => (
            <div key={stat.label} style={{ background: "rgba(26,26,26,0.85)", padding: "24px 20px", backdropFilter: "blur(6px)" }}>
              <div style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 700, color: "#42C8D6", letterSpacing: "0.02em", marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: 0.25 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40 }}>
          {categories.map(tab => {
            const count = tab === "All" ? testimonials.length : testimonials.filter(t => t.category === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "9px 18px",
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  background: isActive ? "#42C8D6" : "rgba(34,34,34,0.6)",
                  color: isActive ? "#222222" : "#ffffff",
                  border: isActive ? "1px solid #42C8D6" : "1px solid rgba(255,255,255,0.2)",
                  fontWeight: isActive ? 700 : 400,
                  backdropFilter: "blur(6px)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#42C8D6";
                    e.currentTarget.style.color = "#42C8D6";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}>
                <span>{tab}</span>
                <span style={{
                  fontSize: 9,
                  opacity: isActive ? 0.9 : 0.6,
                  background: isActive ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.1)",
                  padding: "2px 6px",
                  borderRadius: 2,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 24,
          }}>
          <AnimatePresence>
            {filtered.map((item, index) => {
              const isHovered = hoveredCard === item.id;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isHovered ? "rgba(28,28,28,0.92)" : "rgba(22,22,22,0.8)",
                    border: isHovered ? "1px solid #42C8D6" : "1px solid rgba(255,255,255,0.12)",
                    padding: "36px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    transition: "border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: isHovered ? "0 18px 45px -12px rgba(66, 200, 214,0.18)" : "none",
                    backdropFilter: "blur(10px)",
                  }}>

                  {/* Top Header: Category & Live Indicator */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
                      <span style={{
                        fontSize: 10,
                        fontFamily: "monospace",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#42C8D6",
                        border: "1px solid rgba(66, 200, 214,0.35)",
                        padding: "4px 10px",
                        background: "rgba(66, 200, 214,0.06)",
                      }}>
                        {item.category}
                      </span>

                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: "50%", background: "#42C8D6",
                          boxShadow: "0 0 8px #42C8D6",
                        }} />
                        <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
                          Live Deployment
                        </span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 style={{
                      fontSize: 22,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "#ffffff",
                      letterSpacing: "0.04em",
                      marginBottom: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                      <span>{item.projectName}</span>
                    </h3>

                    {/* Metric Highlight Pill */}
                    <div style={{
                      padding: "10px 14px",
                      background: isHovered ? "rgba(66, 200, 214,0.12)" : "rgba(66, 200, 214,0.07)",
                      border: "1px solid rgba(66, 200, 214,0.28)",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "background 0.3s ease",
                    }}>
                      <span style={{ color: "#42C8D6", fontSize: 13 }}>✦</span>
                      <span style={{
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "#ffffff",
                        letterSpacing: "0.12em",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}>
                        {item.metric}
                      </span>
                    </div>

                    {/* Quote */}
                    <div style={{ position: "relative", marginBottom: 28 }}>
                      <span style={{
                        position: "absolute",
                        top: -12,
                        left: -6,
                        fontSize: 48,
                        lineHeight: 1,
                        color: "rgba(66, 200, 214,0.18)",
                        fontFamily: "'Playfair Display', Georgia, serif",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}>“</span>
                      <p style={{
                        color: "rgba(255,255,255,0.85)",
                        fontSize: 14,
                        lineHeight: 1.8,
                        fontWeight: 300,
                        position: "relative",
                        zIndex: 1,
                        paddingLeft: 4,
                      }}>
                        {item.quote}
                      </p>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: "monospace",
                          fontSize: 9,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.5)",
                          background: "rgba(255,255,255,0.04)",
                          padding: "3px 8px",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Client Info & Live Project Link */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20 }}>
                    {/* Stars + Rating */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <div style={{ display: "flex", gap: 3 }}>
                        {[...Array(item.rating)].map((_, sIdx) => (
                          <span key={sIdx} style={{ color: "#42C8D6", fontSize: 13 }}>★</span>
                        ))}
                      </div>
                      <span style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                        5.0 VERIFIED
                      </span>
                    </div>

                    {/* Author & Role */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <div style={{
                        width: 38,
                        height: 38,
                        border: "1px solid #42C8D6",
                        background: "rgba(66, 200, 214,0.1)",
                        color: "#42C8D6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        flexShrink: 0,
                      }}>
                        {item.clientAvatar}
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontWeight: 700, color: "#ffffff", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                          {item.clientName}
                        </div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 2, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                          {item.clientRole}
                        </div>
                      </div>
                    </div>

                    {/* Live URL Link Button */}
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 18px",
                        background: isHovered ? "#42C8D6" : "rgba(34,34,34,0.6)",
                        color: isHovered ? "#222222" : "#ffffff",
                        border: isHovered ? "1px solid #42C8D6" : "1px solid rgba(255,255,255,0.22)",
                        textDecoration: "none",
                        fontFamily: "monospace",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "#42C8D6";
                        e.currentTarget.style.color = "#222222";
                        e.currentTarget.style.borderColor = "#42C8D6";
                      }}
                      onMouseLeave={e => {
                        if (!isHovered) {
                          e.currentTarget.style.background = "rgba(34,34,34,0.6)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                        }
                      }}>
                      <span>Visit Live Project</span>
                      <span style={{ fontSize: 14 }}>↗</span>
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 64,
            padding: "36px 40px",
            border: "1px solid rgba(66, 200, 214,0.3)",
            background: "rgba(66, 200, 214,0.05)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 24,
          }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#42C8D6", marginBottom: 8 }}>
              Ready To Build Yours?
            </div>
            <div style={{ fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 700, textTransform: "uppercase", color: "#ffffff", letterSpacing: "0.04em" }}>
              Join Our Portfolio Of Thriving Client Deployments
            </div>
          </div>

          <a
            href="#contact"
            style={{
              padding: "14px 32px",
              background: "#42C8D6",
              color: "#222222",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#ffffff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#42C8D6";
            }}>
            <span>Start Your Project</span>
            <span>→</span>
          </a>
        </motion.div>

      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
