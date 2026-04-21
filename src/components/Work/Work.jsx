import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Work.css";

// ── SVG Decorations ──────────────────────────────────────────
const PushPin = ({ color = "#FF4F00", style }) => (
  <svg
    className="pushpin"
    viewBox="0 0 40 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M20 4C13.373 4 8 9.373 8 16C8 22.627 13.373 28 20 28C26.627 28 32 33.373 32 40V44H8V48H32V44L26.5 38.5C30.641 34.359 33 28.627 33 22C33 12.611 25.389 5 16 5H14C12.895 5 12 5.895 12 7V7C12 8.105 12.895 9 14 9H16C19.866 9 23 12.134 23 16C23 19.866 19.866 23 16 23C12.134 23 9 19.866 9 16C9 12.134 12.134 9 16 9H20C21.105 9 22 8.105 22 7V7C22 5.895 21.105 5 20 5C17.791 5 16 6.791 16 9V9"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="20" cy="48" r="4" fill={color} />
  </svg>
);

const WashiTape = ({ color = "#FFB800", angle = -3, width = 80, style }) => (
  <div
    className="washi-tape"
    style={{
      background: `repeating-linear-gradient(
      90deg,
      ${color} 0px,
      ${color} 4px,
      transparent 4px,
      transparent 8px
    )`,
      width,
      height: 24,
      transform: `rotate(${angle}deg)`,
      opacity: 0.85,
      ...style,
    }}
  />
);

const StampMark = ({ text, color = "#E53935" }) => (
  <div
    className="stamp-mark"
    style={{
      borderColor: color,
      color,
    }}
  >
    <span>{text}</span>
  </div>
);

const StringConnection = ({ x1, y1, x2, y2, color = "#1d1d1f" }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} Q ${midX} ${midY + 30} ${x2} ${y2}`;
  return (
    <svg
      className="string-connection"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 1,
      }}
    >
      <path
        d={d}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="6 4"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
};

const PostItNote = ({ text, color = "#FFE066" }) => (
  <div className="postit-note" style={{ background: color }}>
    <span>{text}</span>
  </div>
);

// ── Throttle helper ──────────────────────────────────────────
function rafThrottle(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}

// ── Polaroid Card ────────────────────────────────────────────
const PolaroidCard = ({ project, index, onOpen, cardRef }) => {
  const innerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rotations = [3, -4, 5, -2, 4, -3, 2, -5];
  const rot = rotations[index % rotations.length];

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    // Use quickTo for faster GSAP property updates (avoids tween object creation each frame)
    const quickX = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: "power2.out" });
    const quickY = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: "power2.out" });
    const quickScale = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power2.out" });

    const handleMouseMove = rafThrottle((e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      quickX(dx * 12);
      quickY(-dy * 8);
      quickScale(1.06);
    });

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: rot,
        rotateX: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      });
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rot]);

  return (
    <div
      ref={cardRef}
      className={`polaroid-card polaroid-${index % 6}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      {/* Pushpin */}
      <div className="polaroid-pin">
        <PushPin color={project.color} />
      </div>

      {/* Polaroid frame */}
      <div
        ref={innerRef}
        className="polaroid-inner"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <div className="polaroid-img-wrap">
          <img
            src={project.img}
            alt={project.title}
            className="polaroid-img"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
          />
          <div
            className="polaroid-overlay"
            style={{ opacity: hovered ? 1 : 0, pointerEvents: hovered ? "auto" : "none" }}
          >
            <button className="polaroid-view-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              View
            </button>
          </div>
        </div>
        <div className="polaroid-label">
          <span className="polaroid-title">{project.title}</span>
          <span className="polaroid-category">{project.category}</span>
        </div>
      </div>

      {/* Washi tape decoration */}
      <div className="polaroid-tape">
        <WashiTape color={project.color} width={70} angle={rot - 8} />
      </div>

      {/* Stamp */}
      <div className="polaroid-stamp">
        <StampMark text={project.year} color={project.color} />
      </div>
    </div>
  );
};

// ── Magazine Feature Card ──────────────────────────────────────
const MagazineCard = ({ project, onOpen }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = rafThrottle((e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`magazine-card ${hovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    >
      <div className="magazine-img-wrap">
        <img
          src={project.img}
          alt={project.title}
          className="magazine-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
        <div className="magazine-img-overlay" />
        <div
          className="magazine-category-tag"
          style={{ "--mc": project.color }}
        >
          {project.category}
        </div>
        <div className="magazine-number">
          {String(project.id).padStart(2, "0")}
        </div>
      </div>

      <div className="magazine-content">
        <div className="magazine-meta">
          <span className="magazine-year">{project.year}</span>
          <span className="magazine-sep">—</span>
          <span className="magazine-tech">{project.tech[0]}</span>
        </div>
        <h3 className="magazine-title">{project.title}</h3>
        <p className="magazine-desc">{project.description}</p>

        <div className="magazine-tech-list">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="magazine-tech-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="magazine-cta">
          <span>Explore Project</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Tear/rough edge top */}
      <div className="magazine-tear-top" />
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────
const FALLBACK_IMG =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23f5f5f7" width="800" height="600"/%3E%3Ctext x="400" y="310" text-anchor="middle" fill="%238e8e93" font-family="system-ui" font-size="16"%3EImage unavailable%3C/text%3E%3C/svg%3E';

const projects = [
  {
    id: 1,
    slug: "caad-erp-solution",
    title: "CAAD ERP Solution",
    category: "Enterprise ERP",
    description:
      "Comprehensive ERP platform integrating inventory, billing, CRM, and reporting modules. Designed for enterprise scalability and real-time data handling, improving operational efficiency across departments.",
    tech: ["NestJS", "Angular 18", "MongoDB"],
    img: "/projects/caaderp/image1.webp",
    gallery: [
      "/projects/caaderp/image1.webp",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=85",
    ],
    color: "#FF4F00",
    year: "2025",
    stats: [
      { value: 98, suffix: "%", label: "Efficiency Gain" },
      { value: 4, suffix: "x", label: "Faster Processing" },
      { value: 50, suffix: "+", label: "Enterprise Users" },
    ],
    features: [
      "Real-time inventory synchronization",
      "Multi-branch management",
      "Advanced reporting & analytics",
      "Role-based access control",
      "Custom billing workflows",
      "API-driven integrations",
    ],
  },
  
  {
    id: 2,
    slug: "melizzo-ecommerce",
    title: "Melizzo E-Commerce",
    category: "E-Commerce",
    description:
      "Production-deployed full-stack e-commerce platform for Melizzo — a multi-category online retail business. I architected and built the complete system end-to-end: React SPA storefront, ASP.NET Core Web API, SQL Server database, Stripe payment integration, and Azure DevOps CI/CD pipeline. The platform handles product catalogs, cart management, order lifecycle, admin dashboard, and real-time analytics with 99.9% uptime.",
    tech: ["React 18", "ASP.NET Core 8", "SQL Server", "Entity Framework Core", "Stripe", "Azure DevOps", "Azure App Service", "Azure Blob Storage", "JWT", "CloudFlare CDN"],
    img: "/projects/melizzo/Screenshot 2026-04-21 121006.webp",
    gallery: [
      "/projects/melizzo/Screenshot 2026-04-21 121006.webp",
      "/projects/melizzo/Screenshot 2026-04-21 121025.webp",
      "/projects/melizzo/Screenshot 2026-04-21 121039.webp",
      "/projects/melizzo/Screenshot 2026-04-21 121103.webp",
      "/projects/melizzo/Screenshot 2026-04-21 121123.webp",
    ],
    color: "#6366f1",
    year: "2025",
    stats: [
      { value: 99, suffix: "%", label: "Uptime SLA" },
      { value: 4, suffix: "K+", label: "Products" },
      { value: 3, suffix: "x", label: "Conversion Rate" },
      { value: 25, suffix: "ms", label: "Avg Load Time" },
    ],
    features: [
      "Full-stack ownership: React SPA + ASP.NET Core Web API + SQL Server",
      "Stripe payment gateway with 3D Secure, refund & dispute handling",
      "Admin dashboard with product, order, customer, and coupon management",
      "Azure DevOps CI/CD pipeline: Build → Staging → Production gate → Deploy",
      "Azure Blob Storage for media assets + CloudFlare CDN for global delivery",
      "JWT authentication with refresh token rotation and role-based access",
    ],
  },
   {
    id: 3,
    slug: "aiserwin-lms",
    title: "AISERWIN LMS — Winfocus",
    category: "Enterprise EdTech",
    description:
      "Enterprise-grade Learning Management System for Winfocus — a multinational educational organization operating across 8 countries. A full-stack .NET 10 + Angular 20 application with 40+ API endpoints, 60+ database entities, 7 user roles, and complete Azure DevOps CI/CD deployment pipeline.",
    tech: [".NET 10", "Angular 20", "SQL Server", "Azure DevOps"],
    img: "/projects/aiserwin/Screenshot 2026-04-21 102806.webp",
    gallery: [
      "/projects/aiserwin/A8. Student Dashboard.webp",
      "/projects/aiserwin/A3. Register Sucess Popup.webp",
      "/projects/aiserwin/A4. Register Preview.webp",
      "/projects/aiserwin/A5.Register Preview - 2.webp",
      "/projects/aiserwin/D8. Students Exam Time Table- Exam Detail-Start Exam.webp",
      "/projects/aiserwin/D10. Students Exam Time Table- Exam Detail- Correct Question Paper.webp",
      "/projects/aiserwin/Screenshot 2026-04-21 104209.webp",
      "/projects/aiserwin/Screenshot 2026-04-21 104425.webp",
      "/projects/aiserwin/Screenshot 2026-04-21 102806.webp",
      "/projects/aiserwin/Screenshot 2026-04-21 102911.webp",
    ],
    color: "#3b82f6",
    year: "2025",
    stats: [
      { value: 8, suffix: "", label: "Countries" },
      { value: 40, suffix: "+", label: "API Endpoints" },
      { value: 60, suffix: "+", label: "DB Entities" },
    ],
    features: [
      "Clean Architecture + DDD (.NET 10 backend)",
      "Angular 20 Zoneless + Signals frontend",
      "Multi-country multi-role portal (7 roles)",
      "Student registration with approval workflow",
      "Online exam portal with timer & navigation",
      "Azure DevOps CI/CD full pipeline",
    ],
  },
 
  {
    id: 4,
    slug: "expense-tracker",
    title: "Expense Tracker",
    category: "FinTech",
    description:
      "Full-stack enterprise financial management and analytics platform with role-based dashboards, expense/income management, approval workflows, and 17+ interactive analytics dashboards including profitability, anomaly detection, and budget vs actual tracking.",
    tech: ["Angular 19", "ASP.NET Core 8", "SQL Server", "Chart.js", "ApexCharts"],
    img: "/projects/expenseTracker/Screenshot 2026-04-20 210000.webp",
    gallery: [
      "/projects/expenseTracker/Screenshot 2026-04-20 205858.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 205909.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210000.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210311.webp",
    ],
    color: "#84cc16",
    year: "2025",
    stats: [
      { value: 17, suffix: "+", label: "Analytics Dashboards" },
      { value: 4, suffix: "", label: "User Roles" },
      { value: 10, suffix: "+", label: "Core Modules" },
    ],
    features: [
      "JWT auth with email OTP verification and multi-stage user approvals",
      "Role-based access for Admin, Accountant, Viewer, and User",
      "Expense & income CRUD with outstanding balance tracking",
      "Master data management (countries, locations, categories, currencies, taxes)",
      "17+ interactive analytics dashboards with Chart.js and ApexCharts",
      "Exportable financial reports to Excel (XLSX) and CSV",
    ],
  },
  {
    id: 5,
    slug: "self-food-ordering-kiosk",
    title: "Self Food Ordering Kiosk",
    category: "Self-Service",
    description:
      "Self-service food ordering system allowing customers to browse menus, customize orders, and complete transactions without staff intervention. Built with responsive UI and real-time order management.",
    tech: ["NestJS", "Angular", "MongoDB"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=85",
    ],
    color: "#ef4444",
    year: "2024",
    stats: [
      { value: 15, suffix: "%", label: "Avg Order Value" },
      { value: 30, suffix: "s", label: "Order Time" },
      { value: 98, suffix: "%", label: "Order Accuracy" },
    ],
    features: [
      "Touch-optimized UI",
      "Customizable combos",
      "Dietary filter system",
      "Kitchen display integration",
      "Multi-language support",
      "Real-time kitchen queue",
    ],
  },

  
  {
    id: 6,
    slug: "al-bayan-businessmen",
    title: "Al Bayan Businessmen",
    category: "Business Network",
    description:
      "Business networking and management platform for professionals. Features include member profiles, business directory, event management, and collaborative tools.",
    tech: ["NestJS", "Angular", "MongoDB"],
    img: "/projects/albayanbusinessmen/albayan.webp",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=85",
    ],
    color: "#8b5cf6",
    year: "2024",
    stats: [
      { value: 200, suffix: "+", label: "Active Members" },
      { value: 50, suffix: "+", label: "Events Hosted" },
      { value: 30, suffix: "+", label: "Business Matches" },
    ],
    features: [
      "Member profile builder",
      "Smart business directory",
      "Event scheduling & RSVP",
      "Private messaging system",
      "Lead generation tools",
      "Referral tracking engine",
    ],
  },
   {
    id: 7,
    slug: "sales-app",
    title: "Sales App",
    category: "Sales Management",
    description:
      "Dynamic sales management application for sales representatives and administrators. Enables creating, updating, and managing customer orders, handling returns, and tracking daily sales with reporting and performance analytics.",
    tech: ["NestJS", "Angular", "MongoDB"],
    img: "/projects/salesApp/salesApp.webp",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=85",
    ],
    color: "#f97316",
    year: "2024",
    stats: [
      { value: 35, suffix: "%", label: "Revenue Growth" },
      { value: 2, suffix: "x", label: "Sales Velocity" },
      { value: 100, suffix: "%", label: "Territory Coverage" },
    ],
    features: [
      "Route-optimized visit planning",
      "Real-time GPS tracking",
      "Instant quote generation",
      "Sales pipeline dashboard",
      "Return & refund handling",
      "Performance leaderboards",
    ],
  },
 
  {
    id: 8,
    slug: "mark-media-platform",
    title: "Mark Media Platform",
    category: "Digital Media",
    description:
      "Digital media management platform built with React frontend and ASP.NET Core backend. Enables content creation, publishing workflows, and media asset management.",
    tech: ["React", "ASP.NET Core", "SQL Server"],
    img: "/projects/markMedia/markmedia1.webp",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85",
    ],
    color: "#f59e0b",
    year: "2024",
    stats: [
      { value: 10, suffix: "TB+", label: "Media Processed" },
      { value: 500, suffix: "+", label: "Content Creators" },
      { value: 99, suffix: "%", label: "Asset Availability" },
    ],
    features: [
      "Drag-and-drop media upload",
      "Automated transcoding pipeline",
      "Version control for assets",
      "Team collaboration workflows",
      "Custom metadata tagging",
      "CDN delivery integration",
    ],
  },

  {
    id: 9,
    slug: "cartx-ecommerce",
    title: "CartX — UAE Grocery Delivery",
    category: "E-Commerce",
    description:
      "CartX is a multi-vendor grocery and restaurant delivery platform for the UAE market, enabling users to shop from supermarkets, pharmacies, restaurants, furniture stores, and more — all in one app with real-time order tracking.",
    tech: ["React Native", "Node.js", "MongoDB"],
    img: "/projects/cartx/Preview.webp",
    gallery: [
      "/projects/cartx/Preview.webp",
      "/projects/cartx/Login.webp",
      "/projects/cartx/Home.webp",
      "/projects/cartx/Order Now.webp",
      "/projects/cartx/Supermarkets.webp",
      "/projects/cartx/Lulu Hypermarket.webp",
      "/projects/cartx/Dairy & Ice Creams.webp",
      "/projects/cartx/Restaurants.webp",
    ],
    color: "#22C55E",
    year: "2024",
    stats: [
      { value: 8, suffix: "+", label: "Store Categories" },
      { value: 50, suffix: "K+", label: "Products Listed" },
      { value: 99, suffix: "%", label: "Order Accuracy" },
    ],
    features: [
      "Multi-vendor marketplace (supermarkets, restaurants, pharmacies, furniture)",
      "Real-time delivery tracking with live map",
      "Item customisation with size, add-ons, and modifiers",
      "Smart product search with category filtering",
      "Web + Mobile responsive design (dual-platform screens)",
      "Store ratings, discount badges, and promotional banners",
    ],
  },
  {
    id: 10,
    slug: "jetfuel-corporate",
    title: "JetFuel Corporate",
    category: "Corporate Web",
    description:
      "Corporate web application delivering a high-performance, responsive user experience with dynamic content management, optimized page load, and seamless backend integration.",
    tech: ["ASP.NET Core", "Angular", "SQL Server"],
    img: "/projects/jetfuel/jetfuel.webp",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85",
    ],
    color: "#10b981",
    year: "2024",
    stats: [
      { value: 100, suffix: "%", label: "Lighthouse Score" },
      { value: 0, suffix: "ms", label: "TTFB" },
      { value: 5, suffix: "ms", label: "LCP Score" },
    ],
    features: [
      "Dynamic CMS integration",
      "SSR-optimized pages",
      "SEO meta automation",
      "Internationalization ready",
      "Analytics dashboard",
      "Document management",
    ],
  },

  {
    id: 11,
    slug: "job-portal-system",
    title: "Job Portal System",
    category: "Job Platform",
    description:
      "Full-featured Angular 16 job portal with employer dashboard, job lifecycle management, applicant tracking, interview scheduling, and company administration. Built with reactive forms, lazy-loaded modules, and Angular Material dialogs integrated with an ASP.NET Core Web API.",
    tech: ["Angular 16", "ASP.NET Core Web API", "Bootstrap 5", "Angular Material", "RxJS", "AOS", "TypeScript"],
    img: "/projects/jobportal/Screenshot 2026-04-21 003606.webp",
    gallery: [
      "/projects/jobportal/Screenshot 2026-04-21 003606.webp",
      "/projects/jobportal/Screenshot 2026-04-21 092919.webp",
      "/projects/jobportal/Screenshot 2026-04-21 092926.webp",
      "/projects/jobportal/Screenshot 2026-04-21 092949.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093009.webp",
    ],
    color: "#8b5cf6",
    year: "2025",
    stats: [
      { value: 9, suffix: "", label: "Dashboard Modules" },
      { value: 3, suffix: "", label: "Auth Screens" },
      { value: 3, suffix: "", label: "API Services" },
    ],
    features: [
      "Three-step auth: signup, email verification, password set",
      "Job Provider dashboard with live clock and interview list",
      "Post, list, edit (via Material dialog), delete jobs",
      "Applicant tracking and interview scheduling",
      "Company management with full CRUD",
      "Expandable sidebar navigation with Bootstrap Icons",
    ],
  },
  {
    id: 12,
    slug: "cyanstore-ecommerce",
    title: "CYANSTORE E-Commerce",
    category: "Full-Stack E-Commerce",
    description:
      "Full-stack Angular 16 + .NET e-commerce SPA with cinematic fashion brand aesthetic. Features lazy-loaded modules, phone/email OTP authentication, Swiper video galleries, and GSAP cinematic animations.",
    tech: ["Angular 16", "ASP.NET Core", "SQL Server", "Bootstrap 5", "GSAP", "Swiper.js"],
    img: "/projects/cyanstore/1.webp",
    gallery: [
      "/projects/cyanstore/1.webp",
      "/projects/cyanstore/2.webp",
      "/projects/cyanstore/3 (1).webp",
      "/projects/cyanstore/3 (2).webp",
      "/projects/cyanstore/3 (3).webp",
      "/projects/cyanstore/3 (4).webp",
    ],
    color: "#06b6d4",
    year: "2024",
    stats: [
      { value: 3, suffix: "", label: "Lazy Modules" },
      { value: 6, suffix: "+", label: "Feature Modules" },
      { value: 2, suffix: "", label: "OTP Flows" },
    ],
    features: [
      "Lazy-loaded feature modules (Landing, Auth, CyanFasion, Cartx)",
      "Dual-mode OTP auth — phone SMS and email verification",
      "6-digit auto-focus OTP input with countdown timer",
      "Reactive forms with custom validators",
      "Swiper.js 11 fashion video gallery with hover-to-play",
      "GSAP cinematic scroll animations and micro-interactions",
    ],
  },
  {
    id: 13,
    slug: "library-management-system",
    title: "Library Management System",
    category: "Library",
    description:
      "Complete library solution for managing book inventories, user roles, and borrowing activities with secure authentication and real-time updates.",
    tech: ["ASP.NET Core", "Angular", "SQL Server", "JWT"],
    img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=85",
    ],
    color: "#a855f7",
    year: "2023",
    stats: [
      { value: 15, suffix: "K+", label: "Books Cataloged" },
      { value: 5, suffix: "K+", label: "Active Members" },
      { value: 99, suffix: "%", label: "Availability Rate" },
    ],
    features: [
      "Barcode/ISBN scanning",
      "Automated due date reminders",
      "Fine calculation engine",
      "Reservation system",
      "Digital catalog search",
      "Membership management",
    ],
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const polaroidRefs = useRef([]);
  const magazineRefs = useRef([]);

  const openProject = useCallback((project) => {
    navigate(`/project/${project.slug}`);
  }, [navigate]);

  // ── Scroll-triggered animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header — clip-path + scale
      gsap.fromTo(
        ".fw-header-anim",
        { opacity: 0, y: 50, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".fw-header-anim", start: "top 82%" },
        },
      );

      // Header counter blocks stagger
      gsap.fromTo(
        ".fw-counter-block",
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.5)",
          stagger: 0.12,
          scrollTrigger: { trigger: ".fw-header-right", start: "top 82%" },
          delay: 0.4,
        },
      );

      // Scrapbook grid — removed (was causing scroll jank, minimal visual gain)
      // Polaroid cards — batched for performance
      ScrollTrigger.batch(polaroidRefs.current.filter(Boolean), {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.6, y: 60 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.8)", stagger: 0.1 }
          );
        },
        start: "top 88%",
      });

      // Magazine cards — batched
      ScrollTrigger.batch(magazineRefs.current.filter(Boolean), {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 80, scale: 0.9, clipPath: "inset(100% 0 0 0)" },
            { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power4.out", stagger: 0.12 }
          );
        },
        start: "top 88%",
      });

      // Post-it notes — batched
      ScrollTrigger.batch(".postit-note", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0, rotate: -15 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(2.5)", stagger: 0.08 }
          );
        },
        start: "top 90%",
      });

      // Stamp marks — batched
      ScrollTrigger.batch(".stamp-mark", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 2.5, rotate: 25 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(3)", stagger: 0.08 }
          );
        },
        start: "top 90%",
      });

      // Magazine header line — draw
      gsap.fromTo(
        ".fw-magazine-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          stagger: 0.15,
          scrollTrigger: { trigger: ".fw-magazine-header", start: "top 85%" },
          delay: 0.2,
        },
      );

      // Magazine heading — fade + rise
      gsap.fromTo(
        ".fw-magazine-heading",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".fw-magazine-header", start: "top 85%" },
          delay: 0.3,
        },
      );

      // Floating decorative elements
      gsap.fromTo(
        ".fw-deco",
        { opacity: 0, scale: 0.5, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".fw-deco", start: "top 90%" },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featured = useMemo(() => projects.slice(0, 4), []);
  const rest = useMemo(() => projects.slice(4), []);

  return (
    <section ref={sectionRef} className="work-section" id="work">
      {/* ── SECTION HEADER ── */}
      <div className="section-container">
        <div className="fw-header-anim">
          <div className="fw-section-label label-chip accent">
            <svg width="8" height="8" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="4" fill="currentColor" />
            </svg>
            Portfolio Work
          </div>
          <div className="fw-header-row">
            <div className="fw-header-left">
              <h2 className="fw-main-title">
                Selected
                <br />
                <em>Works</em>
              </h2>
              <p className="fw-header-desc">
                A curated collection of projects that showcase full-stack
                craftsmanship, from enterprise systems to pixel-perfect web
                experiences.
              </p>
            </div>
            <div className="fw-header-right">
              <div className="fw-counter-block">
                <span className="fw-counter-num">{projects.length}</span>
                <span className="fw-counter-label">
                  Projects
                  <br />
                  Showcased
                </span>
              </div>
              <div className="fw-counter-block">
                <span className="fw-counter-num">6+</span>
                <span className="fw-counter-label">
                  Tech
                  <br />
                  Stacks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCATTERED POLAROID GRID ── */}
      <div className="section-container">
        <div className="fw-scrapbook-grid">
          {/* String connections */}
          <StringConnection x1={180} y1={120} x2={420} y2={80} />
          <StringConnection
            x1={520}
            y1={200}
            x2={680}
            y2={350}
            color="#FF4F00"
          />
          <StringConnection
            x1={100}
            y1={380}
            x2={300}
            y2={420}
            color="#6366f1"
          />

          {/* Decorative post-it notes */}
          <PostItNote text="Full Stack" color="#FFE066" />
          <PostItNote text="NestJS + Angular 19 + MongoDB" color="#C8E6C9" />
          <PostItNote text="React + .NetCore 10 + SQL" color="#B3E5FC" />
          <PostItNote text=".NetCore + Angular 19 + SQL" color="#FFCDD2" />

          {/* Polaroid cards */}
          {featured.map((project, i) => (
            <PolaroidCard
              key={project.id}
              project={project}
              index={i}
              onOpen={openProject}
              cardRef={(el) => {
                polaroidRefs.current[i] = el;
              }}
            />
          ))}

          {/* Decorative stamps */}
          <div className="fw-deco-stamp fw-deco">
            <StampMark text="AWARD" color="#E53935" />
          </div>
          <div className="fw-deco-stamp2 fw-deco">
            <StampMark text="TOP" color="#1E88E5" />
          </div>
        </div>
      </div>

      {/* ── MAGAZINE FEATURE SECTION ── */}
      <div className="fw-magazine-section">
        <div className="section-container">
          <div className="fw-magazine-header">
            <div className="fw-magazine-header-line fw-deco" />
            <h3 className="fw-magazine-heading">More Projects</h3>
            <div className="fw-magazine-header-line fw-deco" />
          </div>

          <div className="fw-magazine-grid">
            {rest.map((project, i) => (
              <MagazineCard
                key={project.id}
                project={project}
                onOpen={openProject}
                ref={(el) => {
                  magazineRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
