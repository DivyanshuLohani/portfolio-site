"use client";
import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Building2,
  Target,
  Wrench,
  Handshake,
  MessageSquare,
  TrendingUp,
  Code2,
  BrainCircuit,
  Phone,
  FileSearch,
  PenTool,
  Hammer,
  Rocket,
  ArrowRight,
  Plus,
  X,
  Globe,
  Clock,
  CheckCircle,
} from "lucide-react";

const ACCENT = "#0159a4";
const ACCENT_DIM = "rgba(1,89,164,0.12)";
const ACCENT_BORDER = "rgba(1,89,164,0.25)";

const LOGOS = [
  { name: "Freshworks", w: 110 },
  { name: "Zomato", w: 80 },
  { name: "Razorpay", w: 100 },
  { name: "Meesho", w: 90 },
  { name: "CRED", w: 60 },
  { name: "Groww", w: 70 },
];

const METRICS = [
  { value: "3.2×", label: "Avg. conversion lift" },
  { value: "98", label: "PageSpeed score" },
  { value: "40+", label: "Projects delivered" },
  { value: "<48h", label: "Response time" },
];

const TESTIMONIALS = [
  {
    quote:
      "Our leads doubled within 3 weeks of launch. The attention to detail and speed was unreal.",
    name: "Aarav Mehta",
    role: "Founder, GreenBox",
    initials: "AM",
    color: "#0159a4",
    bg: "rgba(1,89,164,0.15)",
  },
  {
    quote:
      "Handed us exactly what we asked for — clean, fast, and built to convert. No hand-holding needed.",
    name: "Priya Sharma",
    role: "CEO, Launchify",
    initials: "PS",
    color: "#4a9edd",
    bg: "rgba(74,158,221,0.12)",
  },
  {
    quote:
      "The best freelance developer we've worked with. Thinks like a marketer, builds like an engineer.",
    name: "Rohan Das",
    role: "Marketing Lead, UrbanNest",
    initials: "RD",
    color: "#7b9fd4",
    bg: "rgba(123,159,212,0.12)",
  },
];

const CASE_STUDIES = [
  {
    label: "SaaS Startup",
    title: "Launchify — 0 to 1 Landing Page",
    problem:
      "No online presence. The team had a product but zero marketing surface and were losing leads to competitors.",
    solution:
      "Built a high-intent landing page with clear value props, social proof, and a streamlined free-trial CTA flow.",
    outcome:
      "312% increase in trial signups in the first month. Bounce rate dropped from 78% to 41%.",
    tags: ["Landing Page", "Conversion CRO", "Webflow"],
    accent: "#0159a4",
    accentBg: "rgba(1,89,164,0.06)",
    mockupLines: [
      { w: "60%", h: 18, r: 6, c: "#0159a4", op: 0.9 },
      { w: "85%", h: 10, r: 4, c: "#ffffff", op: 0.15 },
      { w: "40%", h: 10, r: 4, c: "#ffffff", op: 0.1 },
      { w: "30%", h: 36, r: 8, c: "#0159a4", op: 0.9 },
    ],
  },
  {
    label: "Local Brand",
    title: "Kafe Kross — Local Café Website",
    problem:
      "A beautiful café with zero digital presence. Customers couldn't find hours, menus, or reserve tables online.",
    solution:
      "Designed and built a mobile-first website with menu showcase, reservation form, and Google Maps integration.",
    outcome:
      "Weekend footfall up 60%. Owner reports 15–20 daily reservation form fills consistently.",
    tags: ["Business Website", "Local SEO", "Next.js"],
    accent: "#BA7517",
    accentBg: "rgba(186,117,23,0.08)",
    mockupLines: [
      { w: "55%", h: 18, r: 6, c: "#BA7517", op: 0.9 },
      { w: "80%", h: 10, r: 4, c: "#ffffff", op: 0.15 },
      { w: "45%", h: 10, r: 4, c: "#ffffff", op: 0.1 },
      { w: "28%", h: 36, r: 8, c: "#BA7517", op: 0.9 },
    ],
  },
  {
    label: "Agency White-Label",
    title: "AgencyX — White-label Sprint",
    problem:
      "A busy design agency needed a reliable dev partner for a 3-client sprint without hiring in-house.",
    solution:
      "Joined as embedded dev, built 3 responsive sites in parallel — scoped, built, and QA'd in 18 days.",
    outcome:
      "All 3 sites shipped on time. Agency renewed for ongoing partnership. Zero revision requests post-launch.",
    tags: ["White-label", "React", "Speed"],
    accent: "#534AB7",
    accentBg: "rgba(83,74,183,0.08)",
    mockupLines: [
      { w: "65%", h: 18, r: 6, c: "#534AB7", op: 0.9 },
      { w: "88%", h: 10, r: 4, c: "#ffffff", op: 0.15 },
      { w: "50%", h: 10, r: 4, c: "#ffffff", op: 0.1 },
      { w: "32%", h: 36, r: 8, c: "#534AB7", op: 0.9 },
    ],
  },
];

const SERVICES = [
  {
    Icon: Zap,
    title: "Landing Pages",
    desc: "Single-page conversion machines built around your offer. Designed to rank, load fast, and turn traffic into action.",
    scope: "1–3 pages · Custom design · CTA-optimised",
    time: "7–12 days",
    accent: ACCENT,
  },
  {
    Icon: Building2,
    title: "Business Websites",
    desc: "Multi-page websites that build trust, showcase your work, and generate consistent inbound leads for your business.",
    scope: "5–10 pages · CMS-ready · SEO foundation",
    time: "2–4 weeks",
    accent: "#2176c7",
  },
  {
    Icon: Target,
    title: "Funnel Design",
    desc: "Full-funnel builds — opt-in pages, upsells, thank-you flows — engineered for revenue, not just aesthetics.",
    scope: "3–7 steps · Email integration · Analytics",
    time: "10–18 days",
    accent: "#BA7517",
  },
  {
    Icon: Wrench,
    title: "Website Optimisation",
    desc: "Speed audits, CRO testing, and redesign sprints that fix what's leaking in your existing site or funnel.",
    scope: "Audit · Fixes · A/B setup",
    time: "5–10 days",
    accent: "#993556",
  },
  {
    Icon: Handshake,
    title: "Agency White-label",
    desc: "I embed into your agency workflow as a silent dev partner. Clean code, tight timelines, zero drama.",
    scope: "Per-project or retainer · NDA-ready",
    time: "Scoped per sprint",
    accent: "#534AB7",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery",
    Icon: Phone,
    desc: "30-minute call to understand your business, goals, audience, and what success looks like for this project.",
  },
  {
    num: "02",
    title: "Strategy",
    Icon: FileSearch,
    desc: "Scope, sitemap, tech stack, and content plan. You get a clear brief before a single line of code is written.",
  },
  {
    num: "03",
    title: "Design",
    Icon: PenTool,
    desc: "High-fidelity mockups in Figma. We align on look, feel, and flow before moving to build phase.",
  },
  {
    num: "04",
    title: "Build",
    Icon: Hammer,
    desc: "Clean, fast, responsive code. I keep you in the loop with weekly updates and staging links.",
  },
  {
    num: "05",
    title: "Launch",
    Icon: Rocket,
    desc: "QA, performance audit, deployment, and handoff. You get full ownership — domain, hosting, code.",
  },
];

const WHYME = [
  {
    Icon: MessageSquare,
    title: "Fast communication",
    desc: "You'll never wait more than 24h for a reply. I treat your timeline like it's mine.",
  },
  {
    Icon: TrendingUp,
    title: "Conversion-first",
    desc: "Every decision is measured against one question: does this help convert a visitor?",
  },
  {
    Icon: Code2,
    title: "Technical depth",
    desc: "I write clean, maintainable code. No bloated page builders or mystery plugins.",
  },
  {
    Icon: BrainCircuit,
    title: "Business thinking",
    desc: "I'm not just a dev-for-hire. I understand marketing, positioning, and what makes people click.",
  },
];

const FAQS = [
  {
    q: "Do you handle domain and hosting?",
    a: "Yes. I can set everything up for you end-to-end, or work within your existing infrastructure. You retain full ownership of your domain and hosting — always.",
  },
  {
    q: "How long does a typical project take?",
    a: "Landing pages: 7–12 days. Business websites: 2–4 weeks. Timelines depend on content readiness and feedback speed. I'll give you a clear timeline in the proposal.",
  },
  {
    q: "Who owns the website after it's built?",
    a: "You do. 100%. All code, assets, and accounts are transferred to you at handoff. No lock-in, no ongoing dependency on me unless you want it.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Minor tweaks are included for 14 days post-launch. Beyond that, I offer flexible support packages or one-off fixes at an hourly rate.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Absolutely. I work with clients globally. Payments via bank transfer, Wise, or PayPal. Time zones are manageable with async communication.",
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimSection({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function MockupVisual({ lines }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.07)",
        padding: "20px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", gap: 5, marginBottom: 2 }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
          <div
            key={c}
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: c,
              opacity: 0.75,
            }}
          />
        ))}
      </div>
      {lines.map((l, i) => (
        <div
          key={i}
          style={{
            width: l.w,
            height: l.h,
            borderRadius: l.r,
            background: l.c,
            opacity: l.op,
          }}
        />
      ))}
    </div>
  );
}

function HeroMockup() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(1,89,164,0.07) 0%, rgba(83,74,183,0.05) 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 20,
          padding: "20px",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: c,
              }}
            />
          ))}
          <div
            style={{
              flex: 1,
              height: 10,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 5,
              marginLeft: 8,
            }}
          />
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            padding: 20,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: "70%",
              height: 12,
              background: "rgba(255,255,255,0.18)",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              width: "50%",
              height: 8,
              background: "rgba(255,255,255,0.09)",
              borderRadius: 4,
              marginBottom: 16,
            }}
          />
          <div
            style={{
              width: 100,
              height: 32,
              background: ACCENT,
              borderRadius: 8,
              opacity: 0.9,
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}
        >
          {[ACCENT, "#2176c7", "#3a8fd8"].map((c, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: 12,
                  background: c,
                  borderRadius: 4,
                  marginBottom: 6,
                  opacity: 0.75,
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: 7,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Floating badge 1 */}
      <div
        style={{
          position: "absolute",
          bottom: -28,
          left: -32,
          zIndex: 3,
          background: "rgba(10,10,20,0.88)",
          border: "1px solid rgba(255,255,255,0.11)",
          borderRadius: 14,
          padding: "12px 16px",
          boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: ACCENT_DIM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TrendingUp size={16} color={ACCENT} />
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            +312% Signups
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            Month 1 · Launchify
          </div>
        </div>
      </div>

      {/* Floating badge 2 */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -28,
          zIndex: 3,
          background: "rgba(10,10,20,0.88)",
          border: "1px solid rgba(255,255,255,0.11)",
          borderRadius: 14,
          padding: "12px 16px",
          boxShadow: "0 16px 32px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: ACCENT_DIM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zap size={16} color={ACCENT} />
        </div>
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.3px",
            }}
          >
            98 / 100
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            PageSpeed Score
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length),
      4200,
    );
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{
        background: "#0A0A0F",
        color: "#E8E8F0",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(1,89,164,0.3); color: #fff; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        body {
		background: #0A0A0F;
	}
        .btn-primary {
          background: #0159a4; color: #fff; border: none; border-radius: 10px;
          padding: 14px 28px; font-size: 15px; font-weight: 600; cursor: pointer;
          letter-spacing: -0.2px; font-family: inherit;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-primary:hover { background: #0147840; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(1,89,164,0.35); }
        .btn-primary:active { transform: scale(0.98); }

        .btn-ghost {
          background: transparent; color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 13px 24px; font-size: 15px; font-weight: 500;
          cursor: pointer; font-family: inherit; transition: all 0.2s; letter-spacing: -0.2px;
          display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.2); }

        .service-card { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        .service-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(0,0,0,0.35) !important; }

        .case-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .case-card:hover { transform: translateY(-6px); box-shadow: 0 32px 64px rgba(0,0,0,0.4) !important; }

        .why-card { transition: background 0.2s, border-color 0.2s; }
        .why-card:hover { background: rgba(1,89,164,0.04) !important; border-color: rgba(1,89,164,0.2) !important; }

        .process-step { transition: background 0.2s; }
        .process-step:hover { background: rgba(255,255,255,0.03) !important; }

        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.06); }
        .logo-el { opacity: 0.22; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #fff; transition: opacity 0.3s; }
        .logo-el:hover { opacity: 0.42; }

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "100px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "45%",
            transform: "translate(-50%,-50%)",
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(1,89,164,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            right: "8%",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(83,74,183,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Copy */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: ACCENT_DIM,
                border: `1px solid ${ACCENT_BORDER}`,
                borderRadius: 100,
                padding: "6px 14px 6px 8px",
                marginBottom: 32,
              }}
            >
              <span
                className="pulse-dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: ACCENT,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: ACCENT,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                Available for projects · 2 spots open
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(40px, 5.5vw, 66px)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-2px",
                color: "#fff",
                marginBottom: 24,
              }}
            >
              Websites That Turn
              <br />
              <em style={{ color: ACCENT, fontStyle: "italic" }}>
                Visitors Into
              </em>
              <br />
              Customers
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.48)",
                maxWidth: 460,
                marginBottom: 40,
                letterSpacing: "-0.2px",
              }}
            >
              I design and build fast, conversion-focused websites and landing
              pages for businesses that care about growth.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                className="btn-primary"
                onClick={() => scrollTo("contact")}
              >
                Get in Touch <ArrowRight size={16} />
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("work")}>
                View Work
              </button>
            </div>

            <div style={{ display: "flex", gap: 36, marginTop: 52 }}>
              {[
                { v: "40+", l: "Projects" },
                { v: "3.2×", l: "Avg. Lift" },
                { v: "98", l: "PageSpeed" },
              ].map((m) => (
                <div key={m.l}>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "-1px",
                    }}
                  >
                    {m.v}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.38)",
                      marginTop: 3,
                    }}
                  >
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="float-anim">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <AnimSection>
        <section style={{ padding: "80px 24px" }}>
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
            }}
          >
            {METRICS.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  background: i === 0 ? ACCENT_DIM : "rgba(255,255,255,0.02)",
                  borderRadius:
                    i === 0 ? "16px 0 0 16px" : i === 3 ? "0 16px 16px 0" : 0,
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: i > 0 ? "none" : undefined,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 44,
                    fontWeight: 400,
                    color: i === 0 ? ACCENT : "#fff",
                    letterSpacing: "-2px",
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.38)",
                    marginTop: 8,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimSection>

      {/* ── TESTIMONIALS ── */}

      {/* ── WORK ── */}
      <section
        id="work"
        style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ marginBottom: 64 }}>
              <div
                style={{
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Featured Work
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 400,
                  letterSpacing: "-2px",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Projects that moved
                <br />
                <em style={{ fontStyle: "italic" }}>the needle</em>
              </h2>
            </div>
          </AnimSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 20,
            }}
          >
            {CASE_STUDIES.map((c, i) => (
              <AnimSection key={i} delay={i * 100}>
                <div
                  className="case-card"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      padding: "24px 24px 16px",
                      background: c.accentBg,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <MockupVisual lines={c.mockupLines} />
                  </div>
                  <div style={{ padding: "24px" }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: c.accent,
                        background: `${c.accent}15`,
                        borderRadius: 100,
                        padding: "4px 10px",
                        letterSpacing: "0.5px",
                        display: "inline-block",
                        marginBottom: 16,
                      }}
                    >
                      {c.label}
                    </span>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 20,
                        letterSpacing: "-0.4px",
                      }}
                    >
                      {c.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      {[
                        { label: "Problem", text: c.problem, Icon: X },
                        {
                          label: "Solution",
                          text: c.solution,
                          Icon: BrainCircuit,
                        },
                        {
                          label: "Outcome",
                          text: c.outcome,
                          Icon: TrendingUp,
                          accent: true,
                        },
                      ].map((item) => (
                        <div key={item.label}>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: item.accent
                                ? c.accent
                                : "rgba(255,255,255,0.3)",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              marginBottom: 4,
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <item.Icon size={11} /> {item.label}
                          </div>
                          <p
                            style={{
                              fontSize: 13.5,
                              color: item.accent
                                ? "rgba(255,255,255,0.78)"
                                : "rgba(255,255,255,0.45)",
                              lineHeight: 1.65,
                            }}
                          >
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 20,
                      }}
                    >
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: 11,
                            color: "rgba(255,255,255,0.32)",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: 6,
                            padding: "3px 8px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ marginBottom: 64 }}>
              <div
                style={{
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Services
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                  gap: 20,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(32px, 4vw, 52px)",
                    fontWeight: 400,
                    letterSpacing: "-2px",
                    color: "#fff",
                    lineHeight: 1.1,
                  }}
                >
                  What I build
                  <br />
                  <em style={{ fontStyle: "italic" }}>for you</em>
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.38)",
                    maxWidth: 320,
                    lineHeight: 1.65,
                  }}
                >
                  No fixed packages. Every project is scoped based on your
                  goals. Projects start from ₹25,000+.
                </p>
              </div>
            </div>
          </AnimSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {SERVICES.map((s, i) => (
              <AnimSection key={i} delay={i * 75}>
                <div
                  className="service-card"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 18,
                    padding: "28px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: `${s.accent}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <s.Icon size={20} color={s.accent} />
                  </div>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 10,
                      letterSpacing: "-0.4px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.42)",
                      lineHeight: 1.72,
                      marginBottom: 24,
                      flex: 1,
                    }}
                  >
                    {s.desc}
                  </p>
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      paddingTop: 20,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <Globe
                          size={13}
                          color="rgba(255,255,255,0.28)"
                          style={{ marginTop: 2, flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.55)",
                          }}
                        >
                          {s.scope}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <Clock
                          size={13}
                          color="rgba(255,255,255,0.28)"
                          style={{ flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: s.accent,
                            fontWeight: 600,
                          }}
                        >
                          {s.time}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn-ghost"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        fontSize: 13,
                        padding: "10px 16px",
                        borderColor: `${s.accent}30`,
                        color: s.accent,
                      }}
                      onClick={() => scrollTo("contact")}
                    >
                      Get Custom Quote <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        id="process"
        style={{
          padding: "100px 24px",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ marginBottom: 64 }}>
              <div
                style={{
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Process
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 400,
                  letterSpacing: "-2px",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                From first call
                <br />
                <em style={{ fontStyle: "italic" }}>to live site</em>
              </h2>
            </div>
          </AnimSection>

          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {PROCESS.map((step, i) => (
              <AnimSection key={i} delay={i * 70}>
                <div
                  className="process-step"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "72px 1fr 48px",
                    alignItems: "center",
                    gap: 28,
                    padding: "28px 24px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 44,
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.07)",
                      lineHeight: 1,
                      letterSpacing: "-2px",
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: 5,
                        letterSpacing: "-0.4px",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.38)",
                        lineHeight: 1.65,
                        maxWidth: 580,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: ACCENT_DIM,
                      border: `1px solid ${ACCENT_BORDER}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      justifySelf: "end",
                    }}
                  >
                    <step.Icon size={16} color={ACCENT} />
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ME ── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ marginBottom: 64, textAlign: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Why Me
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 400,
                  letterSpacing: "-2px",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Not just another{" "}
                <em style={{ fontStyle: "italic" }}>freelancer</em>
              </h2>
            </div>
          </AnimSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {WHYME.map((w, i) => (
              <AnimSection key={i} delay={i * 75}>
                <div
                  className="why-card"
                  style={{
                    padding: "32px 28px",
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: ACCENT_DIM,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <w.Icon size={20} color={ACCENT} />
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 10,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {w.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.72,
                    }}
                  >
                    {w.desc}
                  </p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        id="faq"
        style={{
          padding: "100px 24px",
          background: "rgba(255,255,255,0.01)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ marginBottom: 64, textAlign: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                FAQ
              </div>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 400,
                  letterSpacing: "-2px",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Common questions
              </h2>
            </div>
          </AnimSection>

          {FAQS.map((f, i) => (
            <AnimSection key={i} delay={i * 55}>
              <div className="faq-item">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    fontFamily: "inherit",
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#fff",
                      textAlign: "left",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background:
                        openFaq === i ? ACCENT : "rgba(255,255,255,0.06)",
                      border:
                        openFaq === i
                          ? "none"
                          : "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    <Plus size={14} color="#fff" />
                  </span>
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: openFaq === i ? 220 : 0,
                    transition: "max-height 0.35s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,0.48)",
                      lineHeight: 1.72,
                      paddingBottom: 24,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        style={{
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(1,89,164,0.07) 0%, transparent 68%)",
            pointerEvents: "none",
          }}
        />
        <AnimSection>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 32,
                background: ACCENT_DIM,
                border: `1px solid ${ACCENT_BORDER}`,
                borderRadius: 100,
                padding: "6px 14px 6px 8px",
              }}
            >
              <CheckCircle size={14} color={ACCENT} />
              <span
                style={{
                  fontSize: 12,
                  color: ACCENT,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                2 project slots open for June
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(36px, 5vw, 62px)",
                fontWeight: 400,
                letterSpacing: "-2.5px",
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: 24,
              }}
            >
              Let's build something
              <br />
              <em style={{ fontStyle: "italic", color: ACCENT }}>
                people actually remember.
              </em>
            </h2>

            <p
              style={{
                fontSize: 17,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.72,
                maxWidth: 480,
                margin: "0 auto 48px",
              }}
            >
              Start with a free 30-minute discovery call. No pitch, no pressure
              — just clarity on what's possible.
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-primary"
                style={{ fontSize: 16, padding: "16px 32px" }}
              >
                Schedule a Call <ArrowRight size={16} />
              </button>
              <button
                className="btn-ghost"
                style={{ fontSize: 16, padding: "15px 28px" }}
              >
                Send a Message
              </button>
            </div>

            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.22)",
                marginTop: 24,
              }}
            >
              Projects start from ₹25,000+ · Response within 24h
            </p>
          </div>
        </AnimSection>
      </section>
    </div>
  );
}
