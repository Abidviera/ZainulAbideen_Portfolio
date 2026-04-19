import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ProjectDetail.css";

const projectsData = [
  {
    id: 1,
    slug: "self-food-ordering-kiosk",
    title: "Self Food Ordering Kiosk",
    category: "Self-Service",
    subcategory: "Interactive Kiosk",
    description:
      "A premium self-service food ordering system redefining the dining experience. Customers browse beautifully designed menus, customize their orders with real-time pricing, and complete transactions seamlessly — all without staff intervention. Built with responsive UI, real-time kitchen queue management, and multi-language support.",
    longDescription:
      "This enterprise-grade kiosk solution transforms how restaurants handle orders. The interface was designed from the ground up for touch-first interactions, with large touch targets, smooth animations, and an intuitive flow that reduces order time while increasing average order value. Every micro-interaction was crafted to feel premium and responsive.",
    tech: ["NestJS", "Angular", "MongoDB", "TypeScript"],
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=85",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#ef4444",
    accentColor: "#dc2626",
    year: "2024",
    domain: "https://example-kiosk.com",
    awards: ["Best UX Design 2024", "Innovation Award"],
    stats: [
      { value: 15, suffix: "%", label: "Avg Order Value Increase" },
      { value: 30, suffix: "s", label: "Average Order Time" },
      { value: 98, suffix: "%", label: "Order Accuracy" },
      { value: 12, suffix: "+", label: "Languages Supported" },
    ],
    features: [
      { title: "Touch-Optimized UI", desc: "Large, responsive touch targets designed for 100% touch interaction" },
      { title: "Customizable Combos", desc: "Build complex meal combos with real-time price calculations" },
      { title: "Dietary Filter System", desc: "Filter menu items by allergen, diet type, and nutritional info" },
      { title: "Kitchen Display Integration", desc: "Real-time order queue with live status updates to kitchen screens" },
      { title: "Multi-Language Support", desc: "12 languages with dynamic RTL support" },
      { title: "Real-Time Kitchen Queue", desc: "Live order tracking from placement to fulfillment" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with custom component library" },
      { label: "Backend", value: "NestJS with microservices architecture" },
      { label: "Database", value: "MongoDB with replica set for high availability" },
      { label: "Real-Time", value: "WebSocket for live kitchen queue updates" },
      { label: "Deployment", value: "Docker containers on Kubernetes cluster" },
    ],
  },
  {
    id: 2,
    slug: "melizzo-ecommerce",
    title: "Melizzo E-Commerce",
    category: "E-Commerce",
    subcategory: "Full-Stack Platform",
    description:
      "A comprehensive e-commerce platform combining a React-powered storefront with an ASP.NET Core backend. Features include product catalog management, shopping cart, wishlist, secure payment processing, order tracking, and a powerful admin dashboard.",
    longDescription:
      "Melizzo represents the pinnacle of modern e-commerce architecture. Every pixel was crafted with conversion in mind. The storefront delivers sub-25ms page loads through aggressive caching and code splitting. The backend handles thousands of concurrent transactions with a distributed architecture ensuring 99.9% uptime.",
    tech: ["React", "ASP.NET Core", "SQL Server", "JWT", "Stripe"],
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#6366f1",
    accentColor: "#4f46e5",
    year: "2025",
    domain: "https://melizzo.com",
    awards: ["Awwwards Honorable Mention", "CSS Design Awards"],
    stats: [
      { value: 99, suffix: "%", label: "Uptime SLA" },
      { value: 3, suffix: "x", label: "Conversion Rate Improvement" },
      { value: 25, suffix: "ms", label: "Average Load Time" },
      { value: 4, suffix: "K+", label: "Products Listed" },
    ],
    features: [
      { title: "Product Catalog Management", desc: "Rich product data with variants, bundles, and dynamic pricing" },
      { title: "Secure Payment Gateway", desc: "PCI-compliant Stripe integration with 3D Secure support" },
      { title: "Shopping Cart & Wishlist", desc: "Persistent cart with real-time sync across devices" },
      { title: "Order Tracking & History", desc: "Complete order lifecycle with real-time status updates" },
      { title: "Customer Reviews & Ratings", desc: "Verified purchase reviews with photo uploads" },
      { title: "Discount & Coupon Engine", desc: "Flexible promo rules with usage limits and conditions" },
    ],
    techDetails: [
      { label: "Frontend", value: "React 18 with Server Components" },
      { label: "Backend", value: "ASP.NET Core 8 with Clean Architecture" },
      { label: "Database", value: "SQL Server with query optimization" },
      { label: "Auth", value: "JWT with refresh token rotation" },
      { label: "CDN", value: "CloudFlare for global asset delivery" },
    ],
  },
  {
    id: 3,
    slug: "sales-app",
    title: "Sales App",
    category: "Sales Management",
    subcategory: "Mobile & Web",
    description:
      "A dynamic sales management application empowering field sales representatives. Create orders, manage returns, track daily performance, and access powerful analytics — all from a beautifully crafted interface that works flawlessly on any device.",
    longDescription:
      "Built for speed and reliability in the field. The app works fully offline with intelligent sync when connectivity returns. Every feature was stress-tested with real sales teams to ensure it fits naturally into their daily workflow.",
    tech: ["NestJS", "Angular", "MongoDB", "PWA"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=85",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#f97316",
    accentColor: "#ea580c",
    year: "2024",
    domain: "https://salesapp.example.com",
    awards: ["Enterprise App of the Year"],
    stats: [
      { value: 35, suffix: "%", label: "Revenue Growth" },
      { value: 2, suffix: "x", label: "Sales Velocity" },
      { value: 100, suffix: "%", label: "Territory Coverage" },
      { value: 500, suffix: "+", label: "Active Sales Reps" },
    ],
    features: [
      { title: "Route-Optimized Planning", desc: "AI-powered visit scheduling for maximum efficiency" },
      { title: "Real-Time GPS Tracking", desc: "Live location tracking with geofencing alerts" },
      { title: "Instant Quote Generation", desc: "Create professional quotes in under 30 seconds" },
      { title: "Sales Pipeline Dashboard", desc: "Visual pipeline with deal probability scoring" },
      { title: "Return & Refund Handling", desc: "Streamlined RMA process with photo evidence" },
      { title: "Performance Leaderboards", desc: "Gamified leaderboards driving healthy competition" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 PWA with offline-first architecture" },
      { label: "Backend", value: "NestJS with event-driven microservices" },
      { label: "Database", value: "MongoDB with time-series optimization" },
      { label: "Maps", value: "Mapbox for route optimization" },
      { label: "Offline", value: "IndexedDB + Service Workers for PWA" },
    ],
  },
  {
    id: 4,
    slug: "travel-expense-tracker",
    title: "Travel Expense Tracker",
    category: "FinTech",
    subcategory: "Financial Management",
    description:
      "A sophisticated travel expense and income management system with multi-role support, trip tracking, automated expense logging, reimbursement workflows, and powerful financial reporting in real-time.",
    longDescription:
      "Expense management reimagined. The system eliminates the tedious manual expense reporting process through automated receipt scanning, smart categorization, and intelligent policy enforcement.",
    tech: ["ASP.NET Core", "Angular 18", "SQL Server", "Azure"],
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#84cc16",
    accentColor: "#65a30d",
    year: "2024",
    domain: "https://expensetrack.example.com",
    awards: ["FinTech Innovation Award 2024"],
    stats: [
      { value: 40, suffix: "%", label: "Cost Reduction" },
      { value: 8, suffix: "min", label: "Expense Filing Time" },
      { value: 100, suffix: "%", label: "Audit Compliance" },
      { value: 30, suffix: "+", label: "Countries Supported" },
    ],
    features: [
      { title: "Multi-Currency Support", desc: "Real-time exchange rates with automatic conversion" },
      { title: "Receipt Scanning (OCR)", desc: "AI-powered receipt extraction with 98% accuracy" },
      { title: "Approval Workflow Engine", desc: "Configurable multi-level approval chains" },
      { title: "Expense Policy Enforcement", desc: "Automated checks against configurable policies" },
      { title: "Real-Time Financial Reports", desc: "Interactive dashboards with drill-down capability" },
      { title: "Export to Accounting Software", desc: "Direct integration with QuickBooks and Xero" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with real-time WebSocket" },
      { label: "Backend", value: "ASP.NET Core 8 with CQRS pattern" },
      { label: "Database", value: "SQL Server with columnstore indexes" },
      { label: "OCR", value: "Azure Computer Vision API" },
      { label: "Infrastructure", value: "Azure App Service with auto-scaling" },
    ],
  },
  {
    id: 5,
    slug: "caad-erp-solution",
    title: "CAAD ERP Solution",
    category: "Enterprise ERP",
    subcategory: "Business Management",
    description:
      "A comprehensive ERP platform unifying inventory, billing, CRM, and reporting into a single cohesive system. Designed for enterprise scale with real-time data synchronization across all modules.",
    longDescription:
      "CAAD ERP replaces a fragmented ecosystem of disconnected tools with a unified platform. The architecture supports thousands of concurrent users across multiple branches, with real-time data consistency guaranteed by event sourcing.",
    tech: ["NestJS", "Angular 18", "MongoDB", "Redis", "Docker"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=85",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#FF4F00",
    accentColor: "#e03800",
    year: "2025",
    domain: "https://caad-erp.example.com",
    awards: ["Best Enterprise Solution 2025", "Technology Excellence Award"],
    stats: [
      { value: 98, suffix: "%", label: "Efficiency Gain" },
      { value: 4, suffix: "x", label: "Faster Processing" },
      { value: 50, suffix: "+", label: "Enterprise Users" },
      { value: 5, suffix: "+", label: "Branches Managed" },
    ],
    features: [
      { title: "Real-Time Inventory Sync", desc: "Stock levels updated across all branches instantly" },
      { title: "Multi-Branch Management", desc: "Centralized control with decentralized operations" },
      { title: "Advanced Reporting & Analytics", desc: "Customizable dashboards with drill-through reports" },
      { title: "Role-Based Access Control", desc: "Granular permissions with audit logging" },
      { title: "Custom Billing Workflows", desc: "Configurable invoicing with multiple tax rules" },
      { title: "API-Driven Integrations", desc: "RESTful APIs for third-party system connectivity" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with NX monorepo" },
      { label: "Backend", value: "NestJS with event sourcing" },
      { label: "Database", value: "MongoDB with sharded cluster" },
      { label: "Cache", value: "Redis for session and data caching" },
      { label: "Container", value: "Docker + Kubernetes on Azure AKS" },
    ],
  },
  {
    id: 6,
    slug: "al-bayan-businessmen",
    title: "Al Bayan Businessmen",
    category: "Business Network",
    subcategory: "Professional Network",
    description:
      "A premium business networking and management platform connecting professionals. Features member profiles, a smart business directory, event management, and powerful collaboration tools.",
    longDescription:
      "Al Bayan transforms professional networking through a digital-first approach. Members can showcase their expertise, discover business opportunities, and build lasting relationships through the platform's intelligent matching system.",
    tech: ["NestJS", "Angular", "MongoDB", "WebRTC"],
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=85",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#8b5cf6",
    accentColor: "#7c3aed",
    year: "2024",
    domain: "https://albayan.example.com",
    awards: ["Community Platform of the Year"],
    stats: [
      { value: 200, suffix: "+", label: "Active Members" },
      { value: 50, suffix: "+", label: "Events Hosted" },
      { value: 30, suffix: "+", label: "Business Matches" },
      { value: 1000, suffix: "+", label: "Connections Made" },
    ],
    features: [
      { title: "Member Profile Builder", desc: "Rich profiles with portfolio, achievements, and expertise" },
      { title: "Smart Business Directory", desc: "AI-powered matching between business needs and expertise" },
      { title: "Event Scheduling & RSVP", desc: "Calendar integration with automated reminders" },
      { title: "Private Messaging System", desc: "End-to-end encrypted messaging with read receipts" },
      { title: "Lead Generation Tools", desc: "Qualified lead discovery with scoring" },
      { title: "Referral Tracking Engine", desc: "Commission tracking for referred business" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with signal-based state" },
      { label: "Backend", value: "NestJS with GraphQL subscriptions" },
      { label: "Database", value: "MongoDB with text search indexes" },
      { label: "Real-Time", value: "WebRTC for video meetings" },
      { label: "Search", value: "Elasticsearch for intelligent matching" },
    ],
  },
  {
    id: 7,
    slug: "learning-management",
    title: "Learning Management",
    category: "EdTech",
    subcategory: "E-Learning Platform",
    description:
      "An end-to-end e-learning platform with course creation, student enrollment, progress tracking, assessments, and role-based access for admins, instructors, and students.",
    longDescription:
      "The platform delivers an immersive learning experience through video lessons, interactive quizzes, live sessions, and peer collaboration. Progress tracking and gamification keep learners motivated throughout their journey.",
    tech: ["ASP.NET Core", "Angular", "SQL Server", "JWT", "WebRTC"],
    img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#ec4899",
    accentColor: "#db2777",
    year: "2024",
    domain: "https://lms.example.com",
    awards: ["EdTech Platform of the Year 2024"],
    stats: [
      { value: 1000, suffix: "+", label: "Students Enrolled" },
      { value: 50, suffix: "+", label: "Courses Live" },
      { value: 92, suffix: "%", label: "Completion Rate" },
      { value: 4.8, suffix: "/5", label: "Average Rating" },
    ],
    features: [
      { title: "Multi-Format Content", desc: "Video, SCORM, PDF, live sessions in one platform" },
      { title: "Live Video Sessions", desc: "WebRTC-powered live classes with recording" },
      { title: "Automated Assessments", desc: "Adaptive quizzes with instant feedback" },
      { title: "Certificate Generation", desc: "Auto-generated certificates on completion" },
      { title: "Progress Dashboards", desc: "Real-time learning analytics for students and admins" },
      { title: "Gamification System", desc: "Badges, streaks, and leaderboards for engagement" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with SCORM player integration" },
      { label: "Backend", value: "ASP.NET Core 8 with Clean Architecture" },
      { label: "Database", value: "SQL Server with full-text search" },
      { label: "Video", value: "AWS IVS for live streaming" },
      { label: "Auth", value: "JWT with role-based claims" },
    ],
  },
  {
    id: 8,
    slug: "mark-media-platform",
    title: "Mark Media Platform",
    category: "Digital Media",
    subcategory: "Content Management",
    description:
      "A sophisticated digital media management platform enabling content creation, publishing workflows, and media asset management with enterprise-grade performance and beautiful editorial interfaces.",
    longDescription:
      "Mark Media Platform serves hundreds of content creators managing petabytes of digital assets. The platform combines powerful backend infrastructure with an editorial-grade UI that makes content management feel intuitive and fast.",
    tech: ["React", "ASP.NET Core", "SQL Server", "AWS S3"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#f59e0b",
    accentColor: "#d97706",
    year: "2024",
    domain: "https://markmedia.example.com",
    awards: ["Best Digital Media Platform"],
    stats: [
      { value: 10, suffix: "TB+", label: "Media Processed" },
      { value: 500, suffix: "+", label: "Content Creators" },
      { value: 99, suffix: "%", label: "Asset Availability" },
      { value: 3, suffix: "x", label: "Faster Publishing" },
    ],
    features: [
      { title: "Drag-and-Drop Upload", desc: "Bulk media upload with automatic categorization" },
      { title: "Automated Transcoding", desc: "Multi-format output for every platform" },
      { title: "Version Control", desc: "Complete asset history with restore capability" },
      { title: "Team Collaboration", desc: "Shared workspaces with granular permissions" },
      { title: "Custom Metadata Tagging", desc: "AI-assisted tagging with manual override" },
      { title: "CDN Delivery", desc: "Global delivery through CloudFront CDN" },
    ],
    techDetails: [
      { label: "Frontend", value: "React 18 with real-time collaboration" },
      { label: "Backend", value: "ASP.NET Core 8 with background workers" },
      { label: "Database", value: "SQL Server with blob storage" },
      { label: "Storage", value: "AWS S3 with intelligent lifecycle" },
      { label: "Transcoding", value: "AWS MediaConvert" },
    ],
  },
  {
    id: 9,
    slug: "cartx-ecommerce",
    title: "CartX E-Commerce",
    category: "E-Commerce",
    subcategory: "Scalable Storefront",
    description:
      "A high-performance e-commerce application with a blazing-fast shopping experience, advanced cart management, and checkout optimized for maximum conversion across all devices.",
    longDescription:
      "CartX was built with performance as the primary constraint. Every millisecond of load time was analyzed and optimized. The result is an e-commerce experience that feels instant and delightful.",
    tech: ["ASP.NET Core", "Angular", "SQL Server", "Redis"],
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=85",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#14b8a6",
    accentColor: "#0d9488",
    year: "2023",
    domain: "https://cartx.example.com",
    awards: ["Best Performance E-Commerce"],
    stats: [
      { value: 50, suffix: "ms", label: "Page Load Time" },
      { value: 99, suffix: "%", label: "Checkout Success" },
      { value: 10, suffix: "K+", label: "Products Listed" },
      { value: 3, suffix: "x", label: "SEO Traffic Growth" },
    ],
    features: [
      { title: "Lazy-Loaded Catalog", desc: "Infinite scroll with instant filtering" },
      { title: "Cart Persistence", desc: "Sessions saved across devices and browsers" },
      { title: "Inventory Alerts", desc: "Low-stock notifications with auto-reorder" },
      { title: "Multi-Vendor Support", desc: "Marketplace-ready with seller dashboards" },
      { title: "Abandoned Cart Recovery", desc: "Automated email sequences for cart abandonment" },
      { title: "Optimized Search", desc: "Sub-100ms search with typo tolerance" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with SSR" },
      { label: "Backend", value: "ASP.NET Core 8 with response caching" },
      { label: "Database", value: "SQL Server with query optimization" },
      { label: "Cache", value: "Redis for session and page caching" },
      { label: "CDN", value: "Azure CDN for global delivery" },
    ],
  },
  {
    id: 10,
    slug: "jetfuel-corporate",
    title: "JetFuel Corporate",
    category: "Corporate Web",
    subcategory: "Enterprise Website",
    description:
      "A high-performance corporate web application delivering a stunning, responsive experience with dynamic content management, optimized page load, and seamless backend integration.",
    longDescription:
      "JetFuel Corporate sets a new standard for enterprise websites. The project achieved a perfect 100 Lighthouse score through meticulous optimization — from critical CSS extraction to preload hints and resource prioritization.",
    tech: ["ASP.NET Core", "Angular", "SQL Server", "SSR"],
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=85",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#10b981",
    accentColor: "#059669",
    year: "2024",
    domain: "https://jetfuel.example.com",
    awards: ["Perfect Lighthouse Score Award", "Awwwards SOTD"],
    stats: [
      { value: 100, suffix: "%", label: "Lighthouse Score" },
      { value: 0, suffix: "ms", label: "TTFB (Time to First Byte)" },
      { value: 5, suffix: "ms", label: "LCP Score" },
      { value: 100, suffix: "+", label: "Pages Optimized" },
    ],
    features: [
      { title: "Dynamic CMS Integration", desc: "Headless CMS with visual page builder" },
      { title: "SSR-Optimized Pages", desc: "Server-side rendering with hydration optimization" },
      { title: "SEO Meta Automation", desc: "Auto-generated meta tags and structured data" },
      { title: "Internationalization", desc: "5 languages with automatic locale detection" },
      { title: "Analytics Dashboard", desc: "Real-time visitor analytics with heatmaps" },
      { title: "Document Management", desc: "Secure document library with version control" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular Universal for SSR" },
      { label: "Backend", value: "ASP.NET Core 8 minimal APIs" },
      { label: "CMS", value: "Headless CMS with webhook triggers" },
      { label: "Hosting", value: "Azure Static Web Apps + Functions" },
      { label: "Monitoring", value: "Application Insights + Lighthouse CI" },
    ],
  },
  {
    id: 11,
    slug: "job-portal-system",
    title: "Job Portal System",
    category: "Job Platform",
    subcategory: "Talent Marketplace",
    description:
      "A full-stack job portal with distinct modules for Admins, Employers, and Job Seekers. Features include role-based access, smart job matching, resume parsing, and secure JWT authentication.",
    longDescription:
      "Job Portal System streamlines the entire hiring lifecycle from job posting to onboarding. The smart matching algorithm considers skills, experience, location, and preferences to surface the most relevant opportunities.",
    tech: ["ASP.NET Core", "Angular", "Web API", "SQL Server", "JWT"],
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=85",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=85",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#8b5cf6",
    accentColor: "#7c3aed",
    year: "2024",
    domain: "https://jobportal.example.com",
    awards: ["Best Recruitment Platform"],
    stats: [
      { value: 5000, suffix: "+", label: "Jobs Posted" },
      { value: 20, suffix: "K+", label: "Registered Candidates" },
      { value: 80, suffix: "%", label: "Hire Rate" },
      { value: 100, suffix: "+", label: "Companies Hiring" },
    ],
    features: [
      { title: "Smart Job Matching", desc: "AI-powered matching based on skills and preferences" },
      { title: "Resume Parser & Scoring", desc: "Automated resume analysis with skill extraction" },
      { title: "Employer Dashboard", desc: "Talent pipeline with candidate scoring" },
      { title: "Candidate Tracking", desc: "Kanban-style applicant tracking system" },
      { title: "Automated Job Alerts", desc: "Push notifications for matching opportunities" },
      { title: "Interview Scheduling", desc: "Calendar integration for seamless booking" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with lazy-loaded modules" },
      { label: "Backend", value: "ASP.NET Core Web API" },
      { label: "Database", value: "SQL Server with full-text search" },
      { label: "Auth", value: "JWT with role-based claims" },
      { label: "Search", value: "Elasticsearch for job search" },
    ],
  },
  {
    id: 12,
    slug: "cyanstore-ecommerce",
    title: "CYANSTORE E-Commerce",
    category: "E-Commerce",
    subcategory: "End-to-End Platform",
    description:
      "A complete e-commerce ecosystem supporting multi-category product listings, powerful shopping carts, and secure payments. Delivers a seamless, responsive experience on every device.",
    longDescription:
      "CYANSTORE combines the best practices in e-commerce UX with a robust backend capable of handling peak traffic. The checkout flow was optimized through extensive A/B testing, resulting in a 23% reduction in cart abandonment.",
    tech: ["ASP.NET Core", "Angular", "SQL Server", "JWT", "Stripe"],
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=85",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#06b6d4",
    accentColor: "#0891b2",
    year: "2023",
    domain: "https://cyanstore.example.com",
    awards: ["Conversion Optimization Award"],
    stats: [
      { value: 30, suffix: "K+", label: "SKUs Managed" },
      { value: 99, suffix: "%", label: "Payment Success Rate" },
      { value: 4, suffix: "x", label: "Average ROI" },
      { value: 60, suffix: "%", label: "Mobile Traffic Share" },
    ],
    features: [
      { title: "Advanced Product Variants", desc: "Complex variant matrix with stock tracking" },
      { title: "Tiered Pricing Engine", desc: "Volume discounts and tier-based pricing" },
      { title: "Multi-Payment Gateway", desc: "Stripe, PayPal, and local payment methods" },
      { title: "Customer Loyalty Program", desc: "Points system with tiered rewards" },
      { title: "Order Fulfillment Tracking", desc: "End-to-end order lifecycle visibility" },
      { title: "Affiliate Management", desc: "Referral tracking with commission payouts" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with state management" },
      { label: "Backend", value: "ASP.NET Core 8 with CQRS" },
      { label: "Database", value: "SQL Server with partitioned tables" },
      { label: "Payments", value: "Stripe Connect for marketplace" },
      { label: "Search", value: "Algolia for product search" },
    ],
  },
  {
    id: 13,
    slug: "library-management-system",
    title: "Library Management System",
    category: "Library",
    subcategory: "Digital Library",
    description:
      "A complete digital library solution managing book inventories, user memberships, and borrowing activities with secure authentication and real-time availability updates.",
    longDescription:
      "The Library Management System brings traditional library operations into the digital age. Members can search the catalog, reserve books, and manage their borrowing history through a beautifully designed interface.",
    tech: ["ASP.NET Core", "Angular", "SQL Server", "JWT"],
    img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=85",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1600&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=85",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    color: "#a855f7",
    accentColor: "#9333ea",
    year: "2023",
    domain: "https://library.example.com",
    awards: ["Best Educational Platform"],
    stats: [
      { value: 15, suffix: "K+", label: "Books Cataloged" },
      { value: 5, suffix: "K+", label: "Active Members" },
      { value: 99, suffix: "%", label: "Book Availability" },
      { value: 0.5, suffix: "M+", label: "Annual Loans" },
    ],
    features: [
      { title: "Barcode/ISBN Scanning", desc: "Instant book lookup via barcode scanner" },
      { title: "Automated Due Reminders", desc: "Email and SMS notifications for due dates" },
      { title: "Fine Calculation Engine", desc: "Automated overdue fines with configurable rules" },
      { title: "Reservation System", desc: "Book reservations with pickup notifications" },
      { title: "Digital Catalog Search", desc: "Full-text search with filters and facets" },
      { title: "Membership Management", desc: "Digital cards with QR codes for check-in" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 18 with barcode scanner SDK" },
      { label: "Backend", value: "ASP.NET Core 8 Web API" },
      { label: "Database", value: "SQL Server with barcode indexes" },
      { label: "Auth", value: "JWT with membership tier claims" },
      { label: "Notifications", value: "SendGrid for email, Twilio for SMS" },
    ],
  },
];

// Icons
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const CheckCircle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Award = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const PlayCircle = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
  </svg>
);

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [readMore, setReadMore] = useState(false);

  const project = projectsData.find((p) => p.slug === slug) || projectsData[0];
  const relatedProjects = projectsData.filter((p) => p.id !== project.id).slice(0, 3);

  // Back navigation
  const handleBack = useCallback(() => {
    navigate("/#work", { replace: false });
    window.scrollTo(0, 0);
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) setIsLightboxOpen(false);
        else if (isVideoPlaying) setIsVideoPlaying(false);
      }
      if (e.key === "ArrowRight" && !isVideoPlaying) {
        setActiveGalleryIdx((i) => (i + 1) % project.gallery.length);
      }
      if (e.key === "ArrowLeft" && !isVideoPlaying) {
        setActiveGalleryIdx((i) => (i - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, isVideoPlaying, project.gallery.length]);

  // Scroll animations
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".pd-hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
      gsap.fromTo(".pd-hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(".pd-hero-meta", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.35 });
      gsap.fromTo(".pd-hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.5 });

      // Stats
      gsap.fromTo(".pd-stat-item", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-stats-section", start: "top 80%" },
      });

      // Section headers
      gsap.utils.toArray(".pd-section-header").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Gallery items
      gsap.fromTo(".pd-gallery-item", { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-gallery-grid", start: "top 80%" },
      });

      // Feature cards
      gsap.fromTo(".pd-feature-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-features-grid", start: "top 80%" },
      });

      // Tech cards
      gsap.fromTo(".pd-tech-detail-item", { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-tech-details", start: "top 80%" },
      });

      // Awards
      gsap.fromTo(".pd-award-item", { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".pd-awards", start: "top 85%" },
      });

      // Related cards
      gsap.fromTo(".pd-related-card", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: ".pd-related", start: "top 80%" },
      });

      // Parallax on hero background
      gsap.to(heroBgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Tab content
      gsap.fromTo(".pd-tab-content", { opacity: 0, y: 15 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".pd-tabs-section", start: "top 80%" },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [slug]);

  // Count-up animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numEls = entry.target.querySelectorAll(".pd-stat-value[data-value]");
          numEls.forEach((el) => {
            const target = parseFloat(el.dataset.value);
            const isDecimal = target % 1 !== 0;
            gsap.fromTo(
              { val: 0 },
              { val: target, duration: 1.5, ease: "power2.out" },
              {
                val: target,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: function () {
                  el.textContent = isDecimal
                    ? this.targets()[0].val.toFixed(1)
                    : Math.round(this.targets()[0].val);
                },
              }
            );
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector(".pd-stats-section");
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, [slug]);

  const goToGallery = (idx) => {
    setActiveGalleryIdx(idx);
    const modal = document.querySelector(".pd-lightbox");
    if (modal) {
      gsap.fromTo(".pd-lightbox-img", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
    }
  };

  return (
    <div ref={pageRef} className="pd-page">
      {/* ── HERO ── */}
      <section ref={heroRef} className="pd-hero">
        <div ref={heroBgRef} className="pd-hero-bg">
          <img
            src={project.gallery[0]}
            alt={project.title}
            className="pd-hero-bg-img"
            onError={(e) => { e.currentTarget.style.opacity = "0.15"; }}
          />
          <div className="pd-hero-bg-overlay" style={{ background: `linear-gradient(135deg, ${project.color}22 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.95) 100%)` }} />
        </div>

        {/* Ambient glow */}
        <div className="pd-hero-glow" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.color}30 0%, transparent 70%)` }} />

        <div className="pd-hero-content">
          {/* Back button */}
          <button className="pd-back-btn pd-hero-eyebrow" onClick={handleBack}>
            <ArrowLeft />
            <span>Back to Work</span>
          </button>

          {/* Eyebrow */}
          <div className="pd-hero-eyebrow">
            <span className="pd-hero-category-badge" style={{ background: `${project.color}25`, border: `1px solid ${project.color}50`, color: "#fff" }}>
              {project.category}
            </span>
            <span className="pd-hero-year" style={{ color: `${project.color}` }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1 className="pd-hero-title">{project.title}</h1>

          {/* Meta */}
          <div className="pd-hero-meta">
            <span className="pd-hero-subcategory">{project.subcategory}</span>
            <span className="pd-hero-dot" />
            <span className="pd-hero-tech">{project.tech.slice(0, 3).join(" · ")}</span>
          </div>

          {/* CTAs */}
          <div className="pd-hero-cta">
            <a href={project.domain} target="_blank" rel="noopener noreferrer" className="pd-btn-primary" style={{ background: project.color }}>
              <span>Visit Project</span>
              <ExternalLink />
            </a>
            <button className="pd-btn-ghost" onClick={() => {
              document.querySelector(".pd-gallery-section")?.scrollIntoView({ behavior: "smooth" });
            }}>
              <span>View Gallery</span>
              <ChevronDown />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pd-scroll-indicator">
          <div className="pd-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="pd-stats-section">
        <div className="section-container">
          <div className="pd-stats-grid">
            {project.stats.map((stat, i) => (
              <div key={i} className="pd-stat-item">
                <span className="pd-stat-value" data-value={stat.value} style={{ color: project.color }}>
                  0{stat.suffix}
                </span>
                <span className="pd-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pd-overview-section">
        <div className="section-container">
          <div className="pd-overview-grid">
            <div className="pd-overview-content">
              <div className="pd-section-header">
                <div className="pd-section-label">
                  <GlobeIcon />
                  <span>Project Overview</span>
                </div>
              </div>
              <h2 className="pd-section-title">About This Project</h2>
              <p className="pd-overview-desc">{project.description}</p>

              {readMore && (
                <p className="pd-overview-desc pd-overview-long">{project.longDescription}</p>
              )}

              <button className="pd-read-more-btn" onClick={() => setReadMore(!readMore)}>
                <span>{readMore ? "Show Less" : "Read Full Story"}</span>
                <span className={`pd-read-more-arrow ${readMore ? "is-up" : ""}`}>
                  <ChevronDown />
                </span>
              </button>
            </div>

            {/* Quick info panel */}
            <div className="pd-info-panel">
              <div className="pd-info-card">
                <div className="pd-info-header">
                  <CodeIcon />
                  <span>Tech Stack</span>
                </div>
                <div className="pd-tech-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="pd-tech-tag" style={{ borderColor: `${project.color}40`, color: project.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pd-info-card">
                <div className="pd-info-header">
                  <GlobeIcon />
                  <span>Project Link</span>
                </div>
                <a href={project.domain} target="_blank" rel="noopener noreferrer" className="pd-domain-link" style={{ color: project.color }}>
                  <span>{project.domain.replace("https://", "")}</span>
                  <ExternalLink />
                </a>
              </div>

              <div className="pd-info-card">
                <div className="pd-info-header">
                  <Award />
                  <span>Awards & Recognition</span>
                </div>
                <div className="pd-award-tags">
                  {project.awards.map((a) => (
                    <span key={a} className="pd-award-tag">
                      <Award />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE GALLERY ── */}
      <section className="pd-gallery-section pd-section">
        <div className="section-container">
          <div className="pd-section-header pd-section-header">
            <div className="pd-section-label">
              <GridIcon />
              <span>Project Gallery</span>
            </div>
            <h2 className="pd-section-title">Screenshots & Visuals</h2>
          </div>

          {/* Main image */}
          <div className="pd-gallery-main" onClick={() => setIsLightboxOpen(true)}>
            <img
              src={project.gallery[activeGalleryIdx]}
              alt={`${project.title} screenshot ${activeGalleryIdx + 1}`}
              className="pd-gallery-main-img"
              onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${slug}${activeGalleryIdx}/1600/900`; }}
            />
            <div className="pd-gallery-main-overlay">
              <div className="pd-gallery-zoom-hint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Click to expand</span>
              </div>
            </div>
            <div className="pd-gallery-counter">
              <span>{String(activeGalleryIdx + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(project.gallery.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="pd-gallery-grid">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                className={`pd-gallery-item ${i === activeGalleryIdx ? "is-active" : ""}`}
                onClick={() => goToGallery(i)}
                style={i === activeGalleryIdx ? { borderColor: project.color, boxShadow: `0 0 0 3px ${project.color}30` } : {}}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${slug}${i}/400/300`; }}
                />
                <div className="pd-gallery-item-overlay" />
              </button>
            ))}
          </div>

          {/* Gallery navigation */}
          <div className="pd-gallery-nav">
            <button
              className="pd-gallery-nav-btn"
              onClick={() => goToGallery((activeGalleryIdx - 1 + project.gallery.length) % project.gallery.length)}
            >
              <ArrowLeft />
            </button>
            <div className="pd-gallery-dots">
              {project.gallery.map((_, i) => (
                <button
                  key={i}
                  className={`pd-gallery-dot ${i === activeGalleryIdx ? "is-active" : ""}`}
                  onClick={() => goToGallery(i)}
                  style={i === activeGalleryIdx ? { background: project.color, width: "24px" } : {}}
                />
              ))}
            </div>
            <button
              className="pd-gallery-nav-btn"
              onClick={() => goToGallery((activeGalleryIdx + 1) % project.gallery.length)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="pd-video-section pd-section">
        <div className="section-container">
          <div className="pd-section-header pd-section-header">
            <div className="pd-section-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
              <span>Project Demo</span>
            </div>
            <h2 className="pd-section-title">See It In Action</h2>
          </div>

          <div className="pd-video-wrapper">
            {!isVideoPlaying ? (
              <div className="pd-video-poster" onClick={() => setIsVideoPlaying(true)}>
                <img
                  src={project.gallery[1] || project.gallery[0]}
                  alt={`${project.title} video preview`}
                  className="pd-video-poster-img"
                  onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${slug}video/1200/675`; }}
                />
                <div className="pd-video-poster-overlay" style={{ background: `linear-gradient(135deg, ${project.color}20 0%, rgba(0,0,0,0.6) 100%)` }} />
                <button className="pd-video-play-btn" style={{ borderColor: `${project.color}60`, boxShadow: `0 0 60px ${project.color}40` }}>
                  <PlayCircle />
                </button>
                <div className="pd-video-label">
                  <span>Watch Demo</span>
                </div>
              </div>
            ) : (
              <iframe
                src={`${project.video}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.title} demo video`}
                className="pd-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* ── TABS: Features / Tech Details ── */}
      <section className="pd-tabs-section pd-section">
        <div className="section-container">
          <div className="pd-tabs">
            <button
              className={`pd-tab ${activeTab === "overview" ? "is-active" : ""}`}
              onClick={() => setActiveTab("overview")}
              style={activeTab === "overview" ? { color: project.color, borderColor: project.color } : {}}
            >
              Key Features
            </button>
            <button
              className={`pd-tab ${activeTab === "tech" ? "is-active" : ""}`}
              onClick={() => setActiveTab("tech")}
              style={activeTab === "tech" ? { color: project.color, borderColor: project.color } : {}}
            >
              Technical Details
            </button>
          </div>

          <div className="pd-tab-content" key={activeTab}>
            {activeTab === "overview" && (
              <div className="pd-features-grid">
                {project.features.map((feature, i) => (
                  <div key={i} className="pd-feature-card" style={{ borderColor: `${project.color}20` }}>
                    <div className="pd-feature-icon" style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                      <CheckCircle />
                    </div>
                    <div className="pd-feature-content">
                      <h4 className="pd-feature-title">{feature.title}</h4>
                      <p className="pd-feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "tech" && (
              <div className="pd-tech-details">
                {project.techDetails.map((detail, i) => (
                  <div key={i} className="pd-tech-detail-item">
                    <span className="pd-tech-detail-label" style={{ color: project.color }}>{detail.label}</span>
                    <span className="pd-tech-detail-sep" />
                    <span className="pd-tech-detail-value">{detail.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      {project.awards && project.awards.length > 0 && (
        <section className="pd-awards-section pd-section">
          <div className="section-container">
            <div className="pd-awards pd-section-header">
              <div className="pd-section-label">
                <Award />
                <span>Recognition</span>
              </div>
              <h2 className="pd-section-title">Awards & Honors</h2>
            </div>
            <div className="pd-awards-grid">
              {project.awards.map((award, i) => (
                <div key={i} className="pd-award-item" style={{ borderColor: `${project.color}30`, background: `${project.color}08` }}>
                  <div className="pd-award-icon" style={{ color: project.color, background: `${project.color}15` }}>
                    <Award />
                  </div>
                  <span className="pd-award-name">{award}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED PROJECTS ── */}
      <section className="pd-related pd-section">
        <div className="section-container">
          <div className="pd-section-header">
            <div className="pd-section-label">
              <GridIcon />
              <span>Explore More</span>
            </div>
            <h2 className="pd-section-title">Related Projects</h2>
          </div>
          <div className="pd-related-grid">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.id}
                to={`/project/${rp.slug}`}
                className="pd-related-card"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="pd-related-img-wrap">
                  <img
                    src={rp.img}
                    alt={rp.title}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${rp.slug}/800/500`; }}
                  />
                  <div className="pd-related-overlay" style={{ background: `linear-gradient(135deg, ${rp.color}30 0%, rgba(0,0,0,0.7) 100%)` }} />
                </div>
                <div className="pd-related-info">
                  <span className="pd-related-category" style={{ color: rp.color }}>{rp.category}</span>
                  <h3 className="pd-related-title">{rp.title}</h3>
                  <div className="pd-related-arrow">
                    <ArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pd-cta-section">
        <div className="pd-cta-glow" style={{ background: `radial-gradient(ellipse 50% 60% at 50% 50%, ${project.color}20 0%, transparent 70%)` }} />
        <div className="section-container">
          <h2 className="pd-cta-title">Like What You See?</h2>
          <p className="pd-cta-desc">Let's build something extraordinary together. I'm always open to new projects and opportunities.</p>
          <div className="pd-cta-buttons">
            <a href="mailto:zainulzain043@gmail.com" className="pd-btn-primary pd-cta-btn-primary" style={{ background: project.color }}>
              <span>Start a Conversation</span>
              <ArrowRight />
            </a>
            <button className="pd-btn-ghost pd-cta-btn-ghost" onClick={handleBack}>
              <ArrowLeft />
              <span>Back to All Work</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {isLightboxOpen && (
        <div className="pd-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <button className="pd-lightbox-close" onClick={() => setIsLightboxOpen(false)}>
            <CloseIcon />
          </button>
          <button
            className="pd-lightbox-nav pd-lightbox-prev"
            onClick={(e) => { e.stopPropagation(); goToGallery((activeGalleryIdx - 1 + project.gallery.length) % project.gallery.length); }}
          >
            <ArrowLeft />
          </button>
          <img
            src={project.gallery[activeGalleryIdx]}
            alt={`${project.title} screenshot ${activeGalleryIdx + 1}`}
            className="pd-lightbox-img"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${slug}${activeGalleryIdx}/1920/1080`; }}
          />
          <button
            className="pd-lightbox-nav pd-lightbox-next"
            onClick={(e) => { e.stopPropagation(); goToGallery((activeGalleryIdx + 1) % project.gallery.length); }}
          >
            <ArrowRight />
          </button>
          <div className="pd-lightbox-counter">
            {String(activeGalleryIdx + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}
          </div>
          <div className="pd-lightbox-thumbnails">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                className={`pd-lightbox-thumb ${i === activeGalleryIdx ? "is-active" : ""}`}
                onClick={(e) => { e.stopPropagation(); goToGallery(i); }}
                style={i === activeGalleryIdx ? { borderColor: project.color, boxShadow: `0 0 0 2px ${project.color}` } : {}}
              >
                <img src={img} alt={`Thumb ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { projectsData };
