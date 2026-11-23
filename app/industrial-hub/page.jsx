"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Factory,
  Cpu,
  GraduationCap,
  Car,
  Radio,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  Settings,
  Wrench,
  FileText,
  Sparkles,
  TrendingUp,
  Clock,
  Building2,
  Phone,
  Mail,
  Download,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Check,
  ExternalLink,
  Award,
  BarChart3,
  Flame,
  Truck,
  Headphones,
  Package,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// =============================================================================
// HERO CAROUSEL SLIDES (HOME PAGE STYLE, INDUSTRIAL THEME)
// =============================================================================
export const industrialHeroData = {
  badge: "LOVOKIT INDUSTRIAL HUB",
  icon: Factory,
  headingLine1: "Lovokit Industrial Solutions.",
  headingLine2: "Knowledge Base.",
  description:
    "High-precision diagnostic benches, automated QC test fixtures, and syllabus-aligned university laboratories with NABL calibration and 24h Pune depot dispatch.",
  btnText: "Get in Touch",
  trustBadges: [
    { icon: ShieldCheck, label: "NABL 17025 Calibrated" },
    { icon: Truck, label: "24h Pune Dispatch" },
    { icon: Wrench, label: "On-Site Commissioning" },
  ],
  image: "/images/industrial-hero.webp",
  alt: "LOVOKIT Industrial Hub - Integrated Industrial Test, Measurement & Automation.",
};

export const industrialSlides = [industrialHeroData];

// =============================================================================
// INDUSTRIAL SECTORS DATA
// =============================================================================
export const industrialSectors = [
  {
    id: "automotive-ev",
    name: "Automotive & EV",
    tagline: "High-Voltage Powertrain, BMS & Inverter Diagnostic Systems",
    icon: Car,
    image: "/images/solutions/industrial-testing.jpg",
    badge: "HIGH-GROWTH SECTOR",
    overview:
      "Modern electric vehicles and hybrid powertrains demand rigorous validation across battery management systems (BMS), motor traction drives, and onboard charging electronics.",
    solutions: [
      "High-voltage differential probing up to 1500V DC/AC pk-pk",
      "CAN / LIN / FlexRay automotive bus protocol decoding & jitter analysis",
      "Dynamic regenerative motor drive and inverter efficiency profiling",
      "Cell-level impedance and thermal rise testing for battery packs",
    ],
    recommendedInstruments: [
      {
        model: "OWON XDS3302",
        type: "300 MHz 14-bit Oscilloscope",
        role: "Inverter Switching Waveforms",
      },
      {
        model: "SIGLENT SPD3303X-E",
        type: "Triple Programmable DC Supply",
        role: "ECU / Sensor Rail Powering",
      },
      {
        model: "UNI-T UT216C",
        type: "600A True RMS Clamp Meter",
        role: "Inrush & Traction Current",
      },
    ],
    caseStudy:
      "Equipped Pune-based EV Powertrain OEM with 8 custom validation stations, cutting fault isolation times by 42%.",
  },
  {
    id: "electronics-mfg",
    name: "Electronics Manufacturing",
    tagline: "High-Throughput SMT Production, Automated Test & QC Racks",
    icon: Cpu,
    image: "/images/solutions/custom-solutions.jpg",
    badge: "PRECISION QC",
    overview:
      "For surface-mount assembly (SMT) plants and electronic contract manufacturers (EMS), production speed and zero-defect quality control determine factory margins.",
    solutions: [
      "Multi-channel automated functional test (FCT) and in-circuit test (ICT) rigs",
      "High-speed SPI / I2C / UART digital signal integrity verification",
      "Automated SCPI scripting over USB/LAN for cycle-time minimization",
      "Power rail ripple, transient response, and noise spectral profiling",
    ],
    recommendedInstruments: [
      {
        model: "RIGOL DHO804",
        type: "True 12-bit 4-Ch Scope",
        role: "Multi-Rail Ripple Diagnostics",
      },
      {
        model: "UNI-T UTG962E",
        type: "60 MHz Arbitrary Generator",
        role: "Clock & Sensor Emulation",
      },
      {
        model: "OWON XDS3204AE",
        type: "200 MHz Touchscreen Scope",
        role: "Functional Bench QC",
      },
    ],
    caseStudy:
      "Installed 14 automated testing jigs at Noida EMS facility, achieving 99.8% first-pass factory yield.",
  },
  {
    id: "academic-research",
    name: "Academic & R&D Labs",
    tagline: "Integrated University Engineering Benches & Faculty Workstations",
    icon: GraduationCap,
    image: "/images/solutions/academic-labs.jpg",
    badge: "INSTITUTIONAL STANDARD",
    overview:
      "Equipping educational institutions and central research facilities with robust, student-proof instruments designed for continuous pedagogical operation.",
    solutions: [
      "Standardized 10/20/30-station laboratory bundles with central faculty station",
      "Comprehensive syllabus-aligned experiment guides & connection kits",
      "Overload and reverse polarity protected hardware for undergraduate safety",
      "PC remote screen broadcasting for smart classroom and remote lab sessions",
    ],
    recommendedInstruments: [
      {
        model: "OWON XDS3104E",
        type: "100 MHz 4-Ch Touch Scope",
        role: "Classroom Bench Experiments",
      },
      {
        model: "UNI-T UT89X",
        type: "True RMS Industrial DMM",
        role: "Component & Circuit Probing",
      },
      {
        model: "LOVOKIT Lab Rack",
        type: "Integrated Power & DAQ Bench",
        role: "Universal Student Station",
      },
    ],
    caseStudy:
      "Supplied complete electrical engineering laboratory setup for 120 students across 3 campus technical institutes.",
  },
  {
    id: "telecom-rf",
    name: "Telecom & 5G RF",
    tagline: "RF Signal Synthesis, Spectrum Analysis & High-Speed Data Links",
    icon: Radio,
    image: "/images/1slide.png",
    badge: "RF & WIRELESS",
    overview:
      "From sub-6GHz base station modules to IoT wireless sensor nodes, high-frequency signal fidelity and modulation cleanliness are mission critical.",
    solutions: [
      "Spectrum monitoring and spurious emissions tracking up to GHz bands",
      "Phase noise, adjacent channel leakage, and harmonic distortion verification",
      "Antenna matching, VSWR, and return loss vector measurements",
      "Clock jitter and eye-diagram validation on high-speed serial interconnects",
    ],
    recommendedInstruments: [
      {
        model: "RIGOL Spectrum Series",
        type: "Real-Time Spectrum Analyzer",
        role: "RF Harmonic & EMI Scouting",
      },
      {
        model: "OWON XDS3302",
        type: "300 MHz High-Res Scope",
        role: "High-Frequency Carrier Probing",
      },
      {
        model: "UNI-T UTG962E",
        type: "Dual-Ch Arbitrary Generator",
        role: "Modulated Baseband Injection",
      },
    ],
    caseStudy:
      "Supported Bangalore RF hardware startup with integrated spectrum analysis and RF signal source benches.",
  },
  {
    id: "renewable-power",
    name: "Renewable Energy & Power",
    tagline: "Solar Inverters, Grid Simulation & Energy Storage Profiling",
    icon: Zap,
    image: "/images/2slide.png",
    badge: "CLEAN ENERGY",
    overview:
      "Solar string inverters, wind power converters, and high-capacity battery energy storage systems (BESS) require high-power precision instrumentation.",
    solutions: [
      "Total Harmonic Distortion (THD) analysis on grid-tied inverter outputs",
      "DC programmable load profiling for PV maximum power point tracking (MPPT)",
      "Transient surge, lightning strike simulation, and ground continuity testing",
      "Long-term temperature coefficient and efficiency data acquisition",
    ],
    recommendedInstruments: [
      {
        model: "OWON High-Power Load",
        type: "Programmable DC Load",
        role: "Dynamic MPPT Curve Emulation",
      },
      {
        model: "SIGLENT SPD3303X-E",
        type: "Precision Linear Power",
        role: "Gate Driver & Logic Supply",
      },
      {
        model: "OWON XDS3202E",
        type: "200 MHz 14-bit Scope",
        role: "High-Resolution Power Waveforms",
      },
    ],
    caseStudy:
      "Commissioned Gujarat solar inverter manufacturing plant with 6 automated MPPT and grid-compliance testing racks.",
  },
  {
    id: "aerospace-defense",
    name: "Aerospace & Industrial Auto",
    tagline: "Ruggedized Testing, Environmental Stress Screening & Avionics",
    icon: Factory,
    image: "/images/3slide.png",
    badge: "MISSION CRITICAL",
    overview:
      "When equipment failure is not an option, aerospace and defense contractors rely on ultra-stable, calibrated instruments built for hostile test environments.",
    solutions: [
      "Environmental stress screening (thermal cycling and vibration test rigs)",
      "MIL-STD avionics serial bus (ARINC-429, MIL-STD-1553) signal testing",
      "Micro-ohm bond resistance and ground bonding verification",
      "Isolated high-speed recording for explosive, ballistic, and actuator events",
    ],
    recommendedInstruments: [
      {
        model: "OWON XDS3204AE",
        type: "4-Channel Scope + Arb Gen",
        role: "Avionics Bus Decoding",
      },
      {
        model: "UNI-T UT89X",
        type: "Heavy-Duty True RMS DMM",
        role: "Field Grounding & Insulation",
      },
      {
        model: "SIGLENT High-End DAQ",
        type: "Multi-Channel Scanner",
        role: "Thermal Stress Logging",
      },
    ],
    caseStudy:
      "Supplied calibrated diagnostic instruments for aerospace actuator testing facility in Hyderabad.",
  },
];

// =============================================================================
// INDUSTRIAL KNOWLEDGE & LATEST INSIGHTS (EDIT IMAGES IN /public/images/blog/)
// =============================================================================
export const industrialArticles = {
  featured: {
    category: "Power Tools & Technology",
    categoryColor: "bg-red-600",
    title: "The Future of Lithium-Ion Technology in Heavy-Duty Power Tools",
    date: "Aug 10",
    readTime: "12 min read",
    image: "/images/lithium.png",
  },
  latest: [
    {
      id: 1,
      title: "Understanding OSHA Fall Protection & Industrial PPE Standards",
      date: "Aug 10",
      readTime: "18 min read",
      image: "/images/blog/osha-ppe-standards.jpg",
    },
    {
      id: 2,
      title: "5 Tips to Organize Your Tool Workshop for Maximum Throughput",
      date: "Aug 10",
      readTime: "9 min read",
      image: "/images/blog/workshop-organization.jpg",
    },
    {
      id: 3,
      title: "Advanced Welding Techniques for Structural Integrity",
      date: "Aug 10",
      readTime: "14 min read",
      image: "/images/blog/advanced-welding.jpg",
    },
    {
      id: 4,
      title: "Calibrating Instruments for Aerospace Manufacturing",
      date: "Aug 10",
      readTime: "16 min read",
      image: "/images/blog/calibrating-instruments.jpg",
    },
  ],
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function IndustrialHubPage() {
  const [activeSectorId, setActiveSectorId] = useState("automotive-ev");
  const [rfpModalOpen, setRfpModalOpen] = useState(false);
  const [selectedPackageForQuote, setSelectedPackageForQuote] = useState(null);
  const [rfpSubmitted, setRfpSubmitted] = useState(false);

  // Sector Tabs: Moveable / Drag-to-Scroll & Navigation State
  const tabsContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDraggingTabs, setIsDraggingTabs] = useState(false);
  const [tabsStartX, setTabsStartX] = useState(0);
  const [tabsScrollLeftStart, setTabsScrollLeftStart] = useState(0);
  const [hasDraggedTabs, setHasDraggedTabs] = useState(false);

  const updateTabsScrollState = () => {
    if (!tabsContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  };

  useEffect(() => {
    updateTabsScrollState();
    window.addEventListener("resize", updateTabsScrollState);
    return () => window.removeEventListener("resize", updateTabsScrollState);
  }, []);

  const handleScrollTabs = (direction) => {
    if (!tabsContainerRef.current) return;
    const scrollOffset = direction === "left" ? -280 : 280;
    tabsContainerRef.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
    setTimeout(updateTabsScrollState, 350);
  };

  const handleTabsMouseDown = (e) => {
    if (!tabsContainerRef.current) return;
    setIsDraggingTabs(true);
    setHasDraggedTabs(false);
    setTabsStartX(e.pageX - tabsContainerRef.current.offsetLeft);
    setTabsScrollLeftStart(tabsContainerRef.current.scrollLeft);
  };

  const handleTabsMouseMove = (e) => {
    if (!isDraggingTabs || !tabsContainerRef.current) return;
    e.preventDefault();
    const currentX = e.pageX - tabsContainerRef.current.offsetLeft;
    const distance = (currentX - tabsStartX) * 1.5;
    if (Math.abs(distance) > 5) {
      setHasDraggedTabs(true);
    }
    tabsContainerRef.current.scrollLeft = tabsScrollLeftStart - distance;
    updateTabsScrollState();
  };

  const handleTabsMouseUpOrLeave = () => {
    setIsDraggingTabs(false);
  };

  const handleSectorTabSelect = (sectorId, e) => {
    if (hasDraggedTabs) return;
    setActiveSectorId(sectorId);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setTimeout(updateTabsScrollState, 350);
    }
  };

  // Wholesale Digest Newsletter State
  const [digestEmail, setDigestEmail] = useState("");
  const [digestSubscribed, setDigestSubscribed] = useState(false);

  const handleDigestSubmit = (e) => {
    e.preventDefault();
    if (digestEmail.trim()) {
      setDigestSubscribed(true);
      setTimeout(() => {
        setDigestEmail("");
      }, 3000);
    }
  };

  // Form State
  const [rfpForm, setRfpForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    sector: "Automotive & EV",
    budgetRange: "₹2 Lakh - ₹5 Lakh",
    quantity: "1-3 Units",
    notes: "",
  });

  const activeSector =
    industrialSectors.find((s) => s.id === activeSectorId) || industrialSectors[0];

  const handleOpenRfp = (pkg = null) => {
    setSelectedPackageForQuote(pkg);
    setRfpSubmitted(false);
    if (pkg) {
      setRfpForm((prev) => ({
        ...prev,
        notes: `Inquiring about package: ${pkg.title} (${pkg.priceRange})`,
      }));
    }
    setRfpModalOpen(true);
  };

  const handleSubmitRfp = (e) => {
    e.preventDefault();
    setRfpSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#FFC400] selection:text-black">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* ===================================================================== */}
      {/* 2. INDUSTRIAL HERO SECTION (COMPACT SLEEK HEIGHT)                     */}
      {/* ===================================================================== */}
      <section className="relative w-full overflow-hidden bg-white group border-b border-slate-100 sm:flex sm:items-center sm:min-h-[440px] lg:min-h-[470px]">
        {/* 1. Desktop Full-Width Studio Background Banner (Hidden on Mobile) */}
        <div className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src="/images/industrial.png"
            alt="LOVOKIT Industrial Hub - Integrated Industrial Test, Measurement & Automation."
            fill
            priority={true}
            loading="eager"
            unoptimized
            sizes="100vw"
            className="object-cover object-right select-none"
          />
        </div>

        {/* 2. Main Content Container (Text, Heading, Button & Trust Badges) */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-16 pt-4 pb-2 sm:py-8 lg:py-10 relative z-10 select-text">
          <div className="max-w-md sm:max-w-xl lg:max-w-2xl flex flex-col justify-center items-start text-left space-y-2.5 sm:space-y-3 lg:space-y-3.5 select-text">
            {/* Top Yellow Pill Badge - Flush Left */}
            <div className="flex items-center animate-hero-badge">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#FFC400] text-black text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-xs">
                <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black/15 flex items-center justify-center shrink-0">
                  <Factory className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3] text-black" />
                </span>
                <span>LOVOKIT INDUSTRIAL HUB</span>
              </div>
            </div>

            {/* Heading in EXACTLY 2 Lines - Flush Left */}
            <h1 className="text-2xl sm:text-3xl md:text-[2.1rem] lg:text-[2.4rem] xl:text-[2.65rem] font-black tracking-tight text-slate-950 leading-[1.14] text-left">
              <span className="block sm:whitespace-nowrap animate-hero-heading-1">
                Lovokit Industrial Solutions.
              </span>
              <span className="block sm:whitespace-nowrap mt-1 sm:mt-2 text-[#FFB800] drop-shadow-xs animate-hero-heading-2">
                Knowledge Base.
              </span>
            </h1>

            {/* Description - Flush Left */}
            <p className="text-xs sm:text-sm lg:text-[14px] text-slate-700 sm:text-slate-600 font-medium leading-relaxed max-w-sm sm:max-w-lg text-left animate-hero-desc">
              High-precision diagnostic benches, automated QC test fixtures, and syllabus-aligned university laboratories with NABL calibration and 24h Pune depot dispatch.
            </p>

            {/* Single Button: Get in Touch (Redirects to /contact page) */}
            <div className="flex items-center justify-start pt-1 sm:pt-1.5 animate-hero-actions">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-extrabold text-xs sm:text-sm tracking-wide px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 text-center shrink-0 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </Link>
            </div>

            {/* Trust Highlights Strip below button - Flush Left */}
            <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1.5 sm:gap-5 pt-1 sm:pt-2 text-[11px] sm:text-xs font-bold text-slate-800 animate-hero-trust">
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] shrink-0" />
                <span>NABL 17025 Calibrated</span>
              </div>
              <div className="h-3.5 w-[1px] bg-slate-300/80 hidden sm:block" />
              <div className="flex items-center gap-1.5 shrink-0">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] shrink-0" />
                <span>24h Pune Dispatch</span>
              </div>
              <div className="h-3.5 w-[1px] bg-slate-300/80 hidden sm:block" />
              <div className="flex items-center gap-1.5 shrink-0">
                <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFB800] shrink-0" />
                <span>On-Site Commissioning</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Mobile Rounded Image Card Display (Below text, matching Home Page) */}
        <div className="sm:hidden px-4 pt-2 pb-5 w-full relative z-10">
          <div className="relative w-full h-[190px] xs:h-[220px] rounded-[20px] overflow-hidden bg-white border border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
            <Image
              src="/images/m2.png"
              alt="LOVOKIT Industrial Hub - Integrated Industrial Test, Measurement & Automation."
              fill
              priority={true}
              loading="eager"
              unoptimized
              sizes="100vw"
              className="object-cover object-center select-none"
            />
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE INDUSTRY SECTORS SHOWCASE                              */}
      {/* ===================================================================== */}
      <section id="sectors" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-3">
              <Cpu className="w-3.5 h-3.5 text-slate-900" />
              <span>SPECIALIZED SECTORS WE EMPOWER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              ENGINEERED FOR INDIA’S LEADING{" "}
              <span className="text-[#FFB800]">INDUSTRIAL WORKFLOWS.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every production floor and research laboratory faces distinct testing
              protocols. Select your sector below to inspect custom instrument racks,
              recommended configurations, and real enterprise case studies.
            </p>
          </div>

          {/* Moveable Sector Navigation Tabs (Drag-to-Scroll + Left/Right Arrow Navigation) */}
          <div className="relative mb-8 pb-3 border-b border-slate-200 group/tabs">
            {/* Left Scroll Navigation Arrow Button */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => handleScrollTabs("left")}
                aria-label="Move tabs left"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-[#FFC400] text-slate-800 hover:text-black border border-slate-200/90 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}

            {/* Left Gradient Edge Fade */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-3 w-14 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent pointer-events-none z-10" />
            )}

            {/* Moveable & Draggable Horizontal Tabs Bar */}
            <div
              ref={tabsContainerRef}
              onMouseDown={handleTabsMouseDown}
              onMouseMove={handleTabsMouseMove}
              onMouseUp={handleTabsMouseUpOrLeave}
              onMouseLeave={handleTabsMouseUpOrLeave}
              onScroll={updateTabsScrollState}
              className={`flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 select-none ${isDraggingTabs ? "cursor-grabbing" : "cursor-grab"
                }`}
            >
              {industrialSectors.map((sector) => {
                const Icon = sector.icon;
                const isActive = activeSectorId === sector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={(e) => handleSectorTabSelect(sector.id, e)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/20 scale-[1.02]"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                      }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-[#FFC400]" : "text-slate-500"
                        }`}
                    />
                    <span>{sector.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Gradient Edge Fade */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-3 w-14 bg-gradient-to-l from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent pointer-events-none z-10" />
            )}

            {/* Right Scroll Navigation Arrow Button */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => handleScrollTabs("right")}
                aria-label="Move tabs right"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-[#FFC400] text-slate-800 hover:text-black border border-slate-200/90 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            )}
          </div>

          {/* Active Sector Detailed Blueprint Showcase */}
          <div className="rounded-[32px] bg-gradient-to-br from-slate-900 to-[#0B0F17] text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC400]/[0.05] rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Sector Narrative & Solutions (7 Cols) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[10.5px] font-black tracking-wider uppercase mb-4">
                  <span>{activeSector.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                  {activeSector.tagline}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeSector.overview}
                </p>

                {/* Solutions Checklist */}
                <div className="mt-6 space-y-2.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Engineered Capabilities:
                  </div>
                  {activeSector.solutions.map((sol, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>

                {/* Case Study Callout Box */}
                <div className="mt-8 p-4.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-[#FFC400]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Real-World Installation:</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed font-medium">
                    {activeSector.caseStudy}
                  </p>
                </div>
              </div>

              {/* Right Column: Recommended Instrument Stack (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Recommended Bench Stack:</span>
                  <span className="text-[#FFC400]">Tested & Calibrated</span>
                </div>

                {activeSector.recommendedInstruments.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-black text-white">{item.model}</div>
                      <div className="text-xs text-slate-300">{item.type}</div>
                      <div className="text-[10.5px] font-bold text-amber-400 mt-1">
                        Application: {item.role}
                      </div>
                    </div>
                    <Link
                      href="/products"
                      className="p-2 rounded-xl bg-white/10 hover:bg-[#FFC400] hover:text-black text-white transition-colors shrink-0"
                      title="Inspect Model"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={() =>
                    handleOpenRfp({
                      title: `${activeSector.name} Custom Bench`,
                      priceRange: "Custom RFP Quote",
                    })
                  }
                  className="w-full mt-2 py-3.5 rounded-2xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  <FileText className="w-4 h-4 stroke-[2.5]" />
                  <span>Configure {activeSector.name} Station</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. INDUSTRY INSIGHTS & ENGINEERING ARTICLES (PREMIUM EDITORIAL)      */}
      {/* ===================================================================== */}
      <section className="py-14 sm:py-20 bg-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* Left Featured Card (Big Hero Magazine Feature) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <div className="relative w-full h-[380px] sm:h-[450px] lg:h-full min-h-[380px] lg:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-end p-6 sm:p-8 lg:p-10 cursor-pointer">
                {/* Background Image */}
                <Image
                  src={industrialArticles.featured.image}
                  alt={industrialArticles.featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  unoptimized
                />

                {/* Dark Vignette & Gradient Overlay for Maximum Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-3 sm:space-y-4">
                  {/* Category Pill with Dot */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-md">
                    <span className={`w-2 h-2 rounded-full ${industrialArticles.featured.categoryColor || "bg-red-600"}`} />
                    <span>{industrialArticles.featured.category}</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-black text-white leading-tight tracking-tight drop-shadow-sm group-hover:text-[#FFC400] transition-colors">
                    {industrialArticles.featured.title}
                  </h3>

                  {/* Meta: Date and Read Time */}
                  <div className="text-xs sm:text-sm text-slate-300 font-semibold flex items-center gap-2">
                    <span>{industrialArticles.featured.date}</span>
                    <span className="text-slate-500">•</span>
                    <span>{industrialArticles.featured.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Latest Posts */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
              <div>
                {/* Section Header */}
                <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>LATEST POSTS</span>
                  <span className="w-8 h-1 bg-[#FFC400] rounded-full"></span>
                </h3>

                {/* List of 4 Posts */}
                <div className="space-y-5 sm:space-y-6">
                  {industrialArticles.latest.map((post) => (
                    <div
                      key={post.id}
                      className="group flex items-center gap-4 sm:gap-5 cursor-pointer"
                    >
                      {/* Left Thumbnail */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 shadow-xs">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="120px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>

                      {/* Right Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#FFB800] transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="mt-1.5 text-[11px] sm:text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                          <span>{post.date}</span>
                          <span className="text-slate-400">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. LOVOKIT INDUSTRIAL CAPABILITIES & GUARANTEES                       */}
      {/* ===================================================================== */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-black tracking-wider uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
              <span>THE LOVOKIT ENTERPRISE STANDARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              WHY PROCURE THROUGH{" "}
              <span className="text-[#FFB800]">LOVOKIT INDUSTRIAL HUB.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We eliminate procurement friction, vendor delays, and calibration
              compliance hurdles for testing labs and manufacturing plants across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#FFC400] flex items-center justify-center mb-4 shadow-sm text-black">
                <Award className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                NABL Calibration
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ISO/IEC 17025 compliant calibration certificates traceable to
                national standards, ensuring seamless audit readiness.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 shadow-sm text-[#FFC400]">
                <Clock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                24h Pune Dispatch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-volume warehouse depot in Pune stocked with Tier-1 scopes,
                generators, and DMMs ready for express shipping.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#FFC400] flex items-center justify-center mb-4 shadow-sm text-black">
                <Wrench className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                On-Site Commissioning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated field application engineers deploy, rack-mount, and
                train your operators on equipment in person.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 hover:border-[#FFC400] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center mb-4 shadow-sm text-[#FFC400]">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-black text-slate-950 mb-1">
                OEM Warranty & AMC
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official manufacturer warranty backed by annual maintenance
                contracts and rapid turnaround standby replacement units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. INDUSTRIAL RFP / QUOTATION MODAL                                  */}
      {/* ===================================================================== */}
      {rfpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#0B0D13] text-white p-6 pb-5 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FFC400] block mb-1">
                  LOVOKIT ENTERPRISE PROCUREMENT
                </span>
                <h3 className="text-xl font-black">
                  Request Official Industrial Quotation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRfpModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              {rfpSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-950">
                    RFP Successfully Registered!
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
                    Reference ID:{" "}
                    <span className="font-mono font-bold text-slate-900">
                      RFP-2026-IND-9481
                    </span>
                    . Our Senior Industrial Procurement Engineer will connect with
                    your team within 4 business hours with an official GST quotation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setRfpModalOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-slate-950 text-white text-xs font-black uppercase tracking-wider hover:bg-[#FFC400] hover:text-black transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRfp} className="space-y-4">
                  {selectedPackageForQuote && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-bold flex items-center justify-between">
                      <span>Selected: {selectedPackageForQuote.title}</span>
                      <span className="font-mono text-black">
                        {selectedPackageForQuote.priceRange}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Company / Institution Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rfpForm.companyName}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, companyName: e.target.value })
                        }
                        placeholder="e.g. Tata Motors / IIT Labs"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Procurement Officer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rfpForm.contactPerson}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, contactPerson: e.target.value })
                        }
                        placeholder="Full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={rfpForm.email}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, email: e.target.value })
                        }
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={rfpForm.phone}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, phone: e.target.value })
                        }
                        placeholder="+91 98000 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Industry Sector
                      </label>
                      <select
                        value={rfpForm.sector}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, sector: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#FFC400] bg-white"
                      >
                        <option value="Automotive & EV">Automotive & EV</option>
                        <option value="Electronics Manufacturing">Electronics Manufacturing</option>
                        <option value="Academic & Research">Academic & Research</option>
                        <option value="Telecom & 5G">Telecom & 5G</option>
                        <option value="Renewable Energy">Renewable Energy</option>
                        <option value="Aerospace & Defense">Aerospace & Defense</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                        Approx Budget Bracket
                      </label>
                      <select
                        value={rfpForm.budgetRange}
                        onChange={(e) =>
                          setRfpForm({ ...rfpForm, budgetRange: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#FFC400] bg-white"
                      >
                        <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                        <option value="₹1 Lakh - ₹3 Lakh">₹1 Lakh - ₹3 Lakh</option>
                        <option value="₹3 Lakh - ₹10 Lakh">₹3 Lakh - ₹10 Lakh</option>
                        <option value="₹10 Lakh - ₹25 Lakh">₹10 Lakh - ₹25 Lakh</option>
                        <option value="₹25 Lakh+ Institutional">₹25 Lakh+ Institutional</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 block mb-1">
                      Specific Requirements / Target Specs
                    </label>
                    <textarea
                      rows={3}
                      value={rfpForm.notes}
                      onChange={(e) =>
                        setRfpForm({ ...rfpForm, notes: e.target.value })
                      }
                      placeholder="Specify required bandwidth, channels, calibration needs, or tender deadlines..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer"
                  >
                    <FileText className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit RFP For Direct Pune Factory Quote</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6.5. SUBSCRIBE TO LOVOKIT WHOLESALE DIGEST (YELLOW & BLACK THEME)     */}
      {/* ===================================================================== */}
      <section className="bg-[#090B0F] text-white py-16 sm:py-20 border-t border-white/10 relative overflow-hidden">
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFC400]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Mail Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Mail className="w-5 h-5 text-[#FFC400]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            SUBSCRIBE TO LOVOKIT <span className="text-[#FFC400]">WHOLESALE DIGEST</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
            Receive priority updates on new tool arrivals, clearance events, and OSHA compliance documents.
          </p>

          {/* Form */}
          <form
            onSubmit={handleDigestSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
          >
            <div className="relative w-full sm:flex-1">
              <input
                type="email"
                required
                value={digestEmail}
                onChange={(e) => setDigestEmail(e.target.value)}
                placeholder="Enter corporate or business email..."
                className="w-full bg-[#12151D] border border-white/15 focus:border-[#FFC400] text-xs sm:text-sm text-white placeholder-gray-500 rounded-full px-5 py-3.5 focus:outline-none transition-colors shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFC400] hover:bg-[#e6b000] text-black font-black text-xs sm:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {digestSubscribed && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-in fade-in duration-200">
              <Check className="w-4 h-4" />
              <span>Thank you! You are now subscribed to the Lovokit Wholesale Digest.</span>
            </div>
          )}

          {/* Trust Footer Notes */}
          <div className="mt-6 text-[10px] sm:text-[11px] font-bold text-gray-500 tracking-widest uppercase">
            <span>NO SPAM</span>
            <span className="mx-2 text-gray-700">•</span>
            <span>UNSUBSCRIBE ANYTIME</span>
            <span className="mx-2 text-gray-700">•</span>
            <span>SECURE DATA STORAGE</span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. GLOBAL FOOTER                                                      */}
      {/* ===================================================================== */}
      <Footer />
    </div>
  );
}
