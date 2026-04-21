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
    slug: "expense-tracker",
    title: "Expense Tracker",
    category: "FinTech",
    subcategory: "Full-Stack Financial Platform",
    description:
      "An enterprise-style full-stack financial management and analytics platform for managing expenses, income, user approvals, and business intelligence dashboards. Built for organizations that need to track money flow, monitor profitability, and make data-driven decisions through role-based access and powerful visualizations.",
    longDescription:
      "Many teams track finances in spreadsheets, leading to data inconsistency, poor visibility, and delayed decisions. This platform centralizes all financial records into a structured system with approval workflows, real-time analytics, and interactive dashboards covering everything from daily operational metrics to strategic insights like anomaly detection, budget vs actual tracking, and customer lifetime value analysis. The architecture follows clean separation between Angular 19 frontend, ASP.NET Core Web API, and SQL Server with Entity Framework Core — built for scalability from day one.",
    tech: ["Angular 19", "ASP.NET Core 8", "SQL Server", "Entity Framework Core", "Chart.js", "ApexCharts", "JWT", "Hangfire"],
    img: "/projects/expenseTracker/Screenshot 2026-04-20 205858.webp",
    gallery: [
      "/projects/expenseTracker/Screenshot 2026-04-20 205858.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 205909.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 205951.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210000.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210014.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210025.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210040.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210048.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210102.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210109.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210122.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210135.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210148.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210159.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210210.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210220.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210230.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210243.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210252.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210311.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210321.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210340.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210345.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210404.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210411.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210420.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210426.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210440.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210444.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210450.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210455.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210509.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210514.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210643.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210647.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210652.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210710.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210822.webp",
      "/projects/expenseTracker/Screenshot 2026-04-20 210925.webp",
    ],
    video: "/projects/expenseTracker/expensetracker_promovideo.webm",
    color: "#84cc16",
    accentColor: "#65a30d",
    year: "2025",
    domain: "https://expense-tracker.example.com",
    awards: ["FinTech Innovation Award 2025", "Enterprise Platform Excellence"],
    stats: [
      { value: 17, suffix: "+", label: "Analytics Dashboards" },
      { value: 4, suffix: "", label: "User Roles" },
      { value: 10, suffix: "+", label: "Core Modules" },
      { value: 100, suffix: "%", label: "Full-Stack Ownership" },
    ],
    features: [
      { title: "Authentication & User Approvals", desc: "JWT auth with email OTP verification, forgot/reset password, and multi-stage user approval workflow before full access" },
      { title: "Role-Based Access Control", desc: "Granular permissions for Admin, Accountant, Viewer, and User roles — each with distinct dashboards and action capabilities" },
      { title: "Expense & Income Management", desc: "Full CRUD operations with search, filter, pagination, outstanding balance tracking across paid/partial/unpaid states" },
      { title: "Master Data Modules", desc: "Dedicated management for countries, locations, categories, currencies, and taxes — all linked to financial entries" },
      { title: "Exportable Financial Reports", desc: "Generate and export detailed financial reports to Excel (XLSX) and CSV formats for audits and stakeholder communication" },
      { title: "Interactive Data Visualizations", desc: "Multiple chart types including bar, line, donut, radar, polar, and heatmap powered by Chart.js and ApexCharts" },
      { title: "Multi-Dashboard Analytics Suite", desc: "17+ purpose-built dashboards covering operational metrics, trends, category/country/location performance, CLV, growth, anomaly detection, budget vs actual, and payment status" },
      { title: "Background Job Processing", desc: "Hangfire-powered async workflows for email operations and long-running tasks with persistent scheduling" },
    ],
    techDetails: [
      { label: "Frontend", value: "Angular 19 with TypeScript, SCSS, Reactive Forms, and Angular Router" },
      { label: "UI Libraries", value: "Angular Material, ng-bootstrap, Font Awesome" },
      { label: "Charts", value: "Chart.js (ng2-charts) and ApexCharts for interactive visualizations" },
      { label: "Backend", value: "ASP.NET Core Web API (.NET 8) with C#" },
      { label: "Database", value: "SQL Server with Entity Framework Core" },
      { label: "Auth", value: "JWT-based authentication with role-aware authorization" },
      { label: "Background Jobs", value: "Hangfire for async email workflows and scheduled tasks" },
      { label: "Architecture", value: "Repository/service pattern with AutoMapper and dependency injection" },
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
    img: "/projects/caaderp/image1.webp",
    gallery: [
      "/projects/caaderp/image1.webp",
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
    img: "/projects/cyanstore/1.webp",
    gallery: [
      "/projects/cyanstore/1.webp",
      "/projects/cyanstore/2.webp",
      "/projects/cyanstore/3 (1).webp",
      "/projects/cyanstore/3 (2).webp",
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
    subcategory: "Angular 16 SPA + .NET Web API",
    description:
      "Full-featured Angular 16 job portal with a complete employer ecosystem — landing page, three-step authentication, Job Provider dashboard with 9 modules, applicant tracking, interview scheduling, and company administration. Built with reactive forms, lazy-loaded modules, Angular Material dialogs, Bootstrap 5, and AOS scroll animations.",
    longDescription:
      "This Angular 16 job portal is a comprehensive employer-facing platform that covers the entire hiring pipeline. The public landing page (/), styled with Bootstrap 5 and AOS scroll animations, introduces the platform with smooth transitions and a clear path to registration. The three-step authentication flow (/auth/signup, /auth/set-password, /auth/login) guides users from signup through email verification (via signUpId query param) to password setup — each step driven by reactive forms with FormBuilder, custom validators, and RxJS observables. The Job Provider dashboard at /JobProvider/* is the operational heart: it includes a live digital clock, a scheduled interview list on the Dashboard; a full Post Job form capturing title, summary, company, category, industry, and location; a List Jobs table with inline Material Dialog editing and Confirm Dialog deletion; Manage Jobs for ongoing oversight; List Applicants to review candidates per job; Schedule Interview with jobId, interviewee, date, status, and companyId fields; List Interviews for a consolidated view of all scheduled sessions; plus Communications and Notifications placeholders. The Company Management module (/Companys/*) handles Add Company (legalName, industry, summary, email, phone, address, website, location) and List Companies with a full table view. The sidebar navigation is expandable with Bootstrap Icons, and reusable components like the Confirm Dialog enforce consistent UX across delete operations. All HTTP communication is routed through typed service layers — AuthService, JobProviderService, and CompanyService — each connecting to the ASP.NET Core Web API at localhost:7281/ via HttpClient with RxJS observables.",
    tech: ["Angular 16.2", "TypeScript 5.1", "ASP.NET Core Web API", "Bootstrap 5", "Angular Material", "RxJS", "AOS (Animate On Scroll)", "HttpClient", "ReactiveFormsModule", "SQL Server", "JWT"],
    img: "/projects/jobportal/Screenshot 2026-04-21 003606.webp",
    gallery: [
      "/projects/jobportal/Screenshot 2026-04-21 003606.webp",
      "/projects/jobportal/Screenshot 2026-04-21 092919.webp",
      "/projects/jobportal/Screenshot 2026-04-21 092926.webp",
      "/projects/jobportal/Screenshot 2026-04-21 092949.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093009.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093019.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093028.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093035.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093045.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093109.webp",
      "/projects/jobportal/Screenshot 2026-04-21 093120.webp",
    ],
    video: "/projects/jobportal/job portal system.webm",
    color: "#8b5cf6",
    accentColor: "#7c3aed",
    year: "2025",
    domain: "https://jobportal.example.com",
    awards: ["Angular Architecture Excellence", "Enterprise UI Design Award"],
    stats: [
      { value: 9, suffix: "", label: "Dashboard Modules" },
      { value: 3, suffix: "", label: "Auth Screens" },
      { value: 3, suffix: "", label: "API Services" },
      { value: 3, suffix: "", label: "Management Areas" },
    ],
    features: [
      { title: "Landing Page with AOS Animations", desc: "Marketing-style hero with Bootstrap 5 styling and Animate On Scroll effects — smooth fade, slide, and zoom transitions across sections" },
      { title: "Three-Step Auth Flow", desc: "Reactive form signup (firstName, lastName, userName, phone, email) → email verification via signUpId query param → password set. Each step calls dedicated API endpoints with RxJS observables" },
      { title: "Job Provider Dashboard (9 Routes)", desc: "Live digital clock widget, scheduled interview list, post/list/edit/delete job lifecycle, applicant tracking per job, interview scheduling, communications and notifications placeholders" },
      { title: "Material Dialogs for Inline Editing", desc: "Angular Material dialogs power inline job editing — opens as a modal overlay, binds FormGroup controls, submits via JobProviderService without leaving the page" },
      { title: "Confirm Dialog for Destructive Actions", desc: "Reusable Angular Material dialog component triggered on delete operations — shows confirmation prompt with cancel/confirm buttons, closes after action" },
      { title: "Company Management Module", desc: "Add Company form with legalName, industry, summary, email, phone, address, website, location — backed by CompanyService with full CRUD via the Web API" },
      { title: "Reactive Forms with Custom Validators", desc: "FormBuilder-powered forms with built-in validators plus custom cross-field validators (password match, required dependencies) across all form screens" },
      { title: "Expandable Sidebar Navigation", desc: "Bootstrap Icons-driven sidebar with collapsible menu groups, active route highlighting, and smooth expand/collapse animations for every module group" },
    ],
    techDetails: [
      { label: "Framework", value: "Angular 16.2 with TypeScript 5.1 (Angular CLI 16.2.1)" },
      { label: "Routing", value: "Lazy-loaded feature modules with nested child routes" },
      { label: "Forms", value: "ReactiveFormsModule with FormBuilder, custom validators, cross-field validation" },
      { label: "UI Framework", value: "Bootstrap 5 (grid, navbar, cards) + Angular Material (dialogs, form fields, tabs)" },
      { label: "Animations", value: "AOS (Animate On Scroll) — fade, slide, zoom effects on landing page" },
      { label: "State", value: "RxJS observables in injectable services (providedIn: 'root' singleton pattern)" },
      { label: "HTTP", value: "HttpClient with typed responses across AuthService, JobProviderService, CompanyService" },
      { label: "Backend", value: "ASP.NET Core Web API at https://localhost:7281/" },
      { label: "Auth API", value: "JobProvider/Sign-Up, email verification, setPassword endpoints" },
      { label: "Job API", value: "GetJobLists, PostJob, updateJob, deleteJob, PostInterview, getInterviews, getApplicant" },
      { label: "Company API", value: "GetCompany, company creation and management endpoints" },
      { label: "Architecture", value: "Smart/dumb component pattern via shared module, typed model interfaces" },
    ],
  },
  {
    id: 12,
    slug: "cyanstore-ecommerce",
    title: "CYANSTORE E-Commerce",
    category: "Full-Stack E-Commerce",
    subcategory: "Angular 16 SPA + .NET Web API",
    description:
      "Full-stack Angular 16 + .NET e-commerce single-page application with a cinematic fashion brand aesthetic. Features lazy-loaded feature modules, phone/email OTP authentication, Swiper video galleries with hover-to-play, and GSAP cinematic animations.",
    longDescription:
      "CyanStore is a premium Angular 16 SPA paired with an ASP.NET Core Web API that delivers a cinematic fashion brand experience. The application uses lazy-loaded feature modules (LandingModule, AuthModule, CyanFasionModule, Cartx) for code-splitting performance. Authentication supports dual-mode OTP via SMS (phone) and email, with 6-digit auto-focus inputs and countdown timers. The Landing page features a rotating marquee banner, Bootstrap 5 hero carousel (video + image slides), shop-by-category sections with Mens/Womens tabs, a Swiper-based fashion video gallery with hover-to-play behavior, and a shoes section. The CyanFasion brand showcase page displays a full-screen autoplay video background with gradient overlay and editorial fashion imagery. GSAP and Lottie drive cinematic scroll animations and micro-interactions throughout, while ngx-toastr handles auth feedback notifications. The API backend at https://localhost:7281/ manages OTP flows, user registration, and lookup across both phone and email paths.",
    tech: ["Angular 16", "ASP.NET Core Web API", "Bootstrap 5", "GSAP", "Lottie", "Swiper.js 11", "ReactiveFormsModule", "RxJS", "HttpClient", "SQL Server", "JWT"],
    img: "/projects/cyanstore/1.webp",
    gallery: [
      "/projects/cyanstore/1.webp",
      "/projects/cyanstore/2.webp",
      "/projects/cyanstore/3 (1).webp",
      "/projects/cyanstore/3 (2).webp",
      "/projects/cyanstore/3 (3).webp",
      "/projects/cyanstore/3 (4).webp",
      "/projects/cyanstore/3 (5).webp",
      "/projects/cyanstore/3 (6).webp",
      "/projects/cyanstore/3 (7).webp",
      "/projects/cyanstore/3 (8).webp",
      "/projects/cyanstore/3 (9).webp",
      "/projects/cyanstore/3 (10).webp",
    ],
    video: "/projects/cyanstore/cyanstore.webm",
    color: "#06b6d4",
    accentColor: "#0891b2",
    year: "2024",
    domain: "https://cyanstore.example.com",
    awards: ["Cinematic UI Design Award", "Full-Stack Architecture Excellence"],
    stats: [
      { value: 3, suffix: "", label: "Lazy-Loaded Modules" },
      { value: 6, suffix: "+", label: "Feature Modules" },
      { value: 2, suffix: "", label: "OTP Auth Flows" },
      { value: 2, suffix: "", label: "Video Carousels" },
    ],
    features: [
      { title: "Lazy-Loaded Feature Modules", desc: "LandingModule, AuthModule, CyanFasionModule, and Cartx — each code-split and loaded on demand for optimal performance" },
      { title: "Dual-Mode OTP Authentication", desc: "Phone (SMS via /Customer/send-otp) and email (/Customer/send-Emailverification-code) flows with 6-digit auto-focus input and countdown timer" },
      { title: "Reactive Forms with Custom Validators", desc: "Typed form validation for registration (password min-length, policy checkbox required, DOB, shopping preference) using ReactiveFormsModule" },
      { title: "Swiper.js 11 Video Gallery", desc: "Horizontal scrolling fashion gallery with hover-to-play video behavior, loop navigation, and responsive breakpoints" },
      { title: "Bootstrap 5 Hero Carousel", desc: "Video + 4 image slides with crossfade transitions, shop-by-category Mens/Womens tab switcher, and accessories photo grid" },
      { title: "GSAP Cinematic Animations", desc: "Scroll-triggered cinematic animations, micro-interactions, and Lottie-driven transitions throughout the brand showcase page" },
      { title: "CyanFasion Brand Page", desc: "Full-screen autoplay video background, gradient overlay, large typography, and editorial fashion imagery presentation" },
      { title: ".NET Web API Integration", desc: "ASP.NET Core Web API at localhost:7281/ — endpoints for countries, OTP send/verify, registration, user lookup by email and phone" },
    ],
    techDetails: [
      { label: "Framework", value: "Angular 16 with standalone-ready module architecture" },
      { label: "Routing", value: "Lazy-loaded feature modules with code-splitting" },
      { label: "Forms", value: "ReactiveFormsModule with typed validators" },
      { label: "UI", value: "Angular Material + Bootstrap 5 (navbar, carousel, tabs, grid)" },
      { label: "Animations", value: "GSAP + Lottie for cinematic scroll and micro-interactions" },
      { label: "Sliders", value: "Swiper.js 11 with hover-to-play video gallery" },
      { label: "Notifications", value: "ngx-toastr for auth feedback pop-ups" },
      { label: "State", value: "RxJS observables in injectable services (providedIn: 'root')" },
      { label: "API Client", value: "HttpClient with clean service separation" },
      { label: "Backend", value: "ASP.NET Core Web API (.NET) at https://localhost:7281/" },
      { label: "Database", value: "SQL Server" },
      { label: "Auth", value: "JWT with OTP verification (phone + email dual-path)" },
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
            ) : project.video.includes("youtube.com") || project.video.includes("youtu.be") ? (
              <iframe
                src={`${project.video}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.title} demo video`}
                className="pd-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={project.video}
                className="pd-video-iframe"
                controls
                autoPlay
                title={`${project.title} demo video`}
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
