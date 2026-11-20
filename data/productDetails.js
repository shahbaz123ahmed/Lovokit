import { productsData } from "./products.js";

export function getProductById(id) {
  if (!id) return null;
  const cleanId = String(id).toLowerCase().trim();

  // 1. Direct or fuzzy lookup
  const product = productsData.find((p) => {
    const pId = p.id.toLowerCase();
    const pModel = p.model.toLowerCase();
    return (
      pId === cleanId ||
      pModel === cleanId ||
      pId.endsWith(cleanId) ||
      cleanId.endsWith(pId) ||
      cleanId.replace(/[^a-z0-9]/g, "") === pId.replace(/[^a-z0-9]/g, "")
    );
  });

  if (!product) return null;

  // Normalized category key
  const catKey = product.category.toLowerCase().replace(/s$/, "");

  // Multi-angle visual images generator
  const galleryImages = [
    product.image,
    "/images/featured/oscilloscope-visual.png",
    "/images/categories/oscilloscope-transparent.png",
    "/images/featured/owon-exact-transparent.png",
  ];

  // Enriched default technical specification sheets categorized by instrument type
  const detailedSpecs = {
    oscilloscope: {
      vertical: [
        { parameter: "Analog Bandwidth", value: product.specs.find(s => s.label.includes("Bandwidth"))?.value || "200 MHz (-3dB)" },
        { parameter: "Input Channels", value: product.specs.find(s => s.label.includes("Channels"))?.value || "2 Analog Channels" },
        { parameter: "Vertical Hardware Resolution", value: product.specs.find(s => s.label.includes("Resolution") || s.label.includes("ADC"))?.value || "8-bit / 14-bit High-Res ADC" },
        { parameter: "Input Sensitivity Range", value: "1 mV/div - 10 V/div (at 1 MΩ BNC input)" },
        { parameter: "DC Vertical Gain Accuracy", value: "±3% (typical) / ±1.5% calibrated" },
        { parameter: "Maximum Input Voltage", value: "300V RMS CAT II, 400V PK-PK (DC + AC peak)" },
        { parameter: "Channel-to-Channel Isolation", value: "> 40 dB from DC to rated bandwidth" },
      ],
      horizontal: [
        { parameter: "Real-Time Sample Rate", value: product.specs.find(s => s.label.includes("Sample"))?.value || "1 GSa/s (Single Channel), 500 MSa/s (Dual)" },
        { parameter: "Waveform Capture Rate", value: "75,000 wfm/s (up to 500,000 wfm/s in Segmented Mode)" },
        { parameter: "Maximum Record Length", value: product.specs.find(s => s.label.includes("Memory") || s.label.includes("Record"))?.value || "40 Mpts Deep Memory" },
        { parameter: "Time Base Range", value: "2 ns/div to 1000 s/div in 1-2-5 steps" },
        { parameter: "Time Base Accuracy & Drift", value: "≤ ±25 ppm (±1 ppm per year aging)" },
      ],
      trigger: [
        { parameter: "Trigger Modes", value: "Auto, Normal, Single Sequence" },
        { parameter: "Hardware Trigger Types", value: "Edge, Video (NTSC/PAL/SECAM), Pulse Width, Slope, Runt, Windows, Timeout, Logic" },
        { parameter: "Serial Bus Protocol Trigger & Decode", value: "I2C, SPI, RS232/UART, CAN, LIN (Standard Integrated)" },
        { parameter: "Trigger Coupling", value: "DC, AC, HF Reject, LF Reject, Noise Reject" },
      ],
      general: [
        { parameter: "Main Display Screen", value: "8.0-inch Color TFT Multi-Touch LCD (800 x 600 pixels, 65,536 colors)" },
        { parameter: "Standard I/O Interfaces", value: "USB Host 2.0, USB Device, RJ45 LAN (LXI Compliant), Pass/Fail Out, Trig Out, VGA" },
        { parameter: "Command & Control Protocol", value: "Standard SCPI (Standard Commands for Programmable Instruments)" },
        { parameter: "AC Operating Power", value: "100 - 240V AC RMS, 50/60 Hz, CAT II, <50W Power Consumption" },
        { parameter: "Dimensions & Chassis Weight", value: "340 mm x 177 mm x 90 mm • Approx. 2.6 kg (5.7 lbs)" },
        { parameter: "Calibration & Standards", value: "ISO/IEC 17025 Traceable Factory Calibration Included" },
      ],
    },
    "power-supply": {
      vertical: [
        { parameter: "Rated Output Voltage", value: product.specs.find(s => s.label.includes("Voltage"))?.value || "0 - 32V Variable" },
        { parameter: "Rated Output Current", value: product.specs.find(s => s.label.includes("Current"))?.value || "0 - 5A Continuous" },
        { parameter: "Total Rated Power", value: product.specs.find(s => s.label.includes("Power"))?.value || "220 Watts Maximum" },
        { parameter: "Ripple & Low Noise Floor", value: "< 350 μVrms / 2 mVpp (20 Hz - 20 MHz)" },
      ],
      horizontal: [
        { parameter: "Line Regulation Stability", value: "CV: ≤ 0.01% + 2mV, CC: ≤ 0.01% + 1mA" },
        { parameter: "Load Regulation Stability", value: "CV: ≤ 0.01% + 2mV, CC: ≤ 0.01% + 1mA" },
        { parameter: "Programming & Readback Resolution", value: "1 mV / 1 mA (High Precision 4-digit Display)" },
        { parameter: "Transient Response Time", value: "< 50 μs (50% to 100% load step change)" },
      ],
      trigger: [
        { parameter: "Protection Systems", value: "Over-Voltage (OVP), Over-Current (OCP), Over-Temperature (OTP), Reverse Polarity" },
        { parameter: "Channel Tracking Modes", value: "Independent, Series Tracking (Up to 64V), Parallel Tracking (Up to 10A)" },
        { parameter: "Timing Output Waveforms", value: "Up to 5 groups of timing programming configurations" },
      ],
      general: [
        { parameter: "Display System", value: "4.3-inch Color TFT Display with Real-Time Current Waveform Plotting" },
        { parameter: "Remote Communication", value: "USB Device, LAN, RS232 with SCPI and Modbus Protocols" },
        { parameter: "Cooling Architecture", value: "Intelligent Temperature-Controlled Silent Fan" },
        { parameter: "Operating Supply", value: "220V - 240V AC ±10%, 50/60 Hz" },
      ],
    },
    waveform: {
      vertical: [
        { parameter: "Maximum Output Frequency", value: product.specs.find(s => s.label.includes("Frequency") || s.label.includes("Bandwidth"))?.value || "60 MHz Sine Wave" },
        { parameter: "Output Channels", value: product.specs.find(s => s.label.includes("Channels"))?.value || "2 Synchronized Channels" },
        { parameter: "DDS Real-Time Sample Rate", value: product.specs.find(s => s.label.includes("Sample"))?.value || "200 MSa/s - 500 MSa/s" },
        { parameter: "Vertical DAC Resolution", value: "14-bit True Hardware DAC" },
      ],
      horizontal: [
        { parameter: "Standard Built-in Waveforms", value: "Sine, Square, Ramp/Triangle, Pulse, Gaussian Noise, DC, 24+ Arb Shapes" },
        { parameter: "Arbitrary Waveform Length", value: "Up to 1.2 Mpts per channel memory" },
        { parameter: "Harmonic Distortion (THD)", value: "< -55 dBc (DC - 20 kHz, 1 Vpp)" },
        { parameter: "Square Wave Rise/Fall Time", value: "< 12 ns (10% to 90% amplitude)" },
      ],
      trigger: [
        { parameter: "Modulation Modes", value: "AM, FM, PM, ASK, FSK, PSK, PWM, Sum" },
        { parameter: "Sweep Modes", value: "Linear & Logarithmic Frequency Sweep (0.1 ms - 500 s)" },
        { parameter: "Burst & Trigger Source", value: "Internal, External BNC In, Manual Single Pulse" },
      ],
      general: [
        { parameter: "Frequency Counter", value: "Integrated 200 MHz 6-digit Precision Frequency Meter" },
        { parameter: "Output Impedance", value: "50 Ω (Typical) or High Impedance selectable" },
        { parameter: "Display Interface", value: "4.3-inch High-Contrast Color LCD Screen" },
        { parameter: "Connectivity", value: "USB Host & Device with PC Arbitrary Waveform Software" },
      ],
    },
    multimeter: {
      vertical: [
        { parameter: "Measurement Display Counts", value: product.specs.find(s => s.label.includes("Counts") || s.label.includes("Digits"))?.value || "22,000 to 480,000 Counts" },
        { parameter: "DC Voltage Accuracy", value: "0.015% Basic DCV Precision Engine" },
        { parameter: "DC Voltage Range", value: "200 mV, 2V, 20V, 200V, 1000V" },
        { parameter: "True RMS AC Voltage", value: "200 mV to 750V (40 Hz to 100 kHz Frequency Response)" },
      ],
      horizontal: [
        { parameter: "DC/AC Current Range", value: "200 μA, 2 mA, 20 mA, 200 mA, 2A, 10A (Up to 20A peak for 30s)" },
        { parameter: "Resistance Measurement", value: "200 Ω to 100 MΩ (2-Wire and 4-Wire Kelvin Methods)" },
        { parameter: "Capacitance Range", value: "2 nF, 20 nF, 200 nF, 2 μF, 20 μF, 200 μF, 10 mF - 220 mF" },
        { parameter: "Frequency & Period", value: "10 Hz to 20 MHz (0.01 Hz resolution)" },
      ],
      trigger: [
        { parameter: "Advanced Lab Mathematical Functions", value: "Max, Min, Average, P-P, dB, dBm, Standard Deviation, Trend Plot" },
        { parameter: "Continuity & Diode Testing", value: "Audible beeper threshold adjustable (1 Ω - 1000 Ω), 3V open circuit test" },
        { parameter: "Temperature Probing", value: "Type K/J/T/E/N/R/S/B Thermocouples & PT100 RTD support" },
      ],
      general: [
        { parameter: "Electrical Safety Rating", value: "CAT III 1000V / CAT IV 600V Over-Voltage Safety Standard" },
        { parameter: "Data Logging Memory", value: "Internal offline logging + Continuous PC real-time data streaming" },
        { parameter: "Interface Ports", value: "USB Optical Isolation Cable, RS-232, SCPI command support" },
        { parameter: "Dual Display Mode", value: "Simultaneous Display (e.g. AC Voltage + Frequency)" },
      ],
    },
    "ac-power": {
      vertical: [
        { parameter: "Total Rated Apparent Power", value: product.specs.find(s => s.label.includes("Power"))?.value || "300 VA - 500 VA" },
        { parameter: "Output Voltage Range", value: "Low: 0 - 150V RMS, High: 0 - 300V RMS Continuously Variable" },
        { parameter: "Output Frequency Range", value: "45.0 Hz to 500.0 Hz (Covers 50Hz, 60Hz, 400Hz Aviation)" },
        { parameter: "Maximum Output Current", value: "4.2A RMS @ 120V / 2.1A RMS @ 240V" },
      ],
      horizontal: [
        { parameter: "Total Harmonic Distortion (THD)", value: "< 0.5% (Pure Sine Wave under linear resistive load)" },
        { parameter: "Voltage Stability & Regulation", value: "< 0.1% for ±10% line fluctuation" },
        { parameter: "Frequency Resolution & Accuracy", value: "0.1 Hz / ±0.01% Quartz Crystal Stability" },
        { parameter: "Inrush Current Capability", value: "Up to 3x Rated Current for capacitive startup surges" },
      ],
      trigger: [
        { parameter: "Surge & Sag Simulation", value: "Programmable voltage sag, surge, and dropout testing" },
        { parameter: "Protection Systems", value: "Over-Current (OCP), Over-Voltage (OVP), Over-Power (OPP), OTP" },
      ],
      general: [
        { parameter: "Display Parameters", value: "Simultaneous display of Voltage, Current, Frequency, Active Power, Power Factor (PF)" },
        { parameter: "Interface & Communication", value: "USB, RS-232, SCPI remote control for automated QA racks" },
        { parameter: "Operating Environment", value: "0°C to 40°C, <80% RH Non-condensing" },
      ],
    },
    "lcr-meter": {
      vertical: [
        { parameter: "Test Signal Frequency", value: product.specs.find(s => s.label.includes("Frequency"))?.value || "10 Hz - 100 kHz (Continuous Multi-Step)" },
        { parameter: "Basic Measurement Accuracy", value: product.specs.find(s => s.label.includes("Accuracy"))?.value || "0.05% High Precision Core" },
        { parameter: "Test Signal Amplitude", value: "10 mV to 2.0 Vrms adjustable in 10 mV steps" },
        { parameter: "Source Output Impedance", value: "30 Ω, 50 Ω, 100 Ω selectable" },
      ],
      horizontal: [
        { parameter: "Parameters Measured", value: "L, C, R, Z, Y, D, Q, θ, ESR, Conductance (G), Susceptance (B)" },
        { parameter: "Inductance Measurement Range", value: "0.001 μH to 9999.9 H" },
        { parameter: "Capacitance Measurement Range", value: "0.001 pF to 9999.9 mF" },
        { parameter: "Resistance & ESR Range", value: "0.0001 Ω to 99.999 MΩ" },
      ],
      trigger: [
        { parameter: "Sorting & Comparator", value: "10-Bin Sorting (BIN1 - BIN9, OUT, AUX) with audio beeper" },
        { parameter: "DC Bias Voltage", value: "Internal 0V to 2.0V DC Bias for electrolytic capacitor testing" },
      ],
      general: [
        { parameter: "Display Monitor", value: "7.0-inch TFT Color Display with Dual Parameter Readout" },
        { parameter: "Test Fixture Connection", value: "Gold-Plated 4-Terminal Kelvin Test Clips & SMD Component Tweezer" },
        { parameter: "Automation Interface", value: "Handler Interface, USB Device, RS-232, GPIB (Optional)" },
      ],
    },
    "spectrum-analyzer": {
      vertical: [
        { parameter: "Frequency Range", value: product.specs.find(s => s.label.includes("Frequency"))?.value || "9 kHz - 1.5 GHz / 2.1 GHz" },
        { parameter: "Displayed Average Noise Level (DANL)", value: product.specs.find(s => s.label.includes("DANL"))?.value || "-161 dBm/Hz (Preamp ON)" },
        { parameter: "Resolution Bandwidth (RBW)", value: "1 Hz to 1 MHz in 1-3-10 sequence" },
        { parameter: "Video Bandwidth (VBW)", value: "1 Hz to 3 MHz" },
      ],
      horizontal: [
        { parameter: "SSB Phase Noise", value: "<-98 dBc/Hz @ 10 kHz offset (1 GHz center freq)" },
        { parameter: "Tracking Generator", value: product.specs.find(s => s.label.includes("Tracking"))?.value || "Built-in 100 kHz - 1.5 GHz Generator" },
        { parameter: "Level Measurement Uncertainty", value: "< 0.7 dB overall level uncertainty" },
        { parameter: "Reference Level Range", value: "-100 dBm to +30 dBm" },
      ],
      trigger: [
        { parameter: "Trigger Sources", value: "Free Run, Video, External Trigger BNC" },
        { parameter: "Demodulation Capabilities", value: "AM / FM Audio Demodulation with built-in earphone output" },
      ],
      general: [
        { parameter: "Display", value: "10.1-inch High-Definition Widescreen TFT Display (1024 x 600 pixels)" },
        { parameter: "RF Connector", value: "Standard N-Type Female (50 Ω impedance)" },
        { parameter: "Standard Interfaces", value: "USB Host, USB Device, LAN (LXI Compliant), HDMI / VGA Out" },
      ],
    },
    "trainer-kit": {
      vertical: [
        { parameter: "System Architecture", value: "Modular Open-Frame Training Console with Industrial Heavy-Duty ABS Enclosure" },
        { parameter: "Built-in Regulated Power Supply", value: "+5V/2A, -5V/1A, +12V/1A, -12V/1A, 0-30V Continuously Variable DC" },
        { parameter: "Embedded Function Generator", value: "0.1 Hz to 1 MHz Sine, Triangle, Square Waveforms with amplitude control" },
        { parameter: "Breadboard Matrix", value: "High-durability solderless patch bays with 2,420 nickel-silver tie points" },
      ],
      horizontal: [
        { parameter: "Input/Output Facilities", value: "16x Debounced Logic Level Switches, 16x LED Status Monitors, 2x Pulser Switches" },
        { parameter: "Digital Displays", value: "Dual 7-Segment LED Displays & 16x2 Character Backlit Alphanumeric LCD" },
        { parameter: "Interconnect Sockets", value: "2mm gold-plated brass sockets with heavy-duty molded patch cords" },
      ],
      trigger: [
        { parameter: "Curriculum Experiments", value: "Includes 25+ step-by-step verified laboratory practical experiments" },
        { parameter: "Interfacing Modules", value: "8255 PPI, Stepper Motor Driver, 8-bit ADC/DAC, Matrix Keypad, Relay Output" },
      ],
      general: [
        { parameter: "Enclosure Casing", value: "Lovokit Signature Industrial Yellow Powder-Coated Metal & ABS Casing" },
        { parameter: "Operating Supply", value: "220V - 240V AC, 50 Hz with Ground Protection & Mains Fuse" },
        { parameter: "Documentation & Manual", value: "Comprehensive Instructor Lab Manual & Student Workbook (Hardcover + PDF)" },
      ],
    },
    "data-acquisition": {
      vertical: [
        { parameter: "Mainframe Chassis", value: "19-inch 3U Rackmount & Benchtop Modular Chassis" },
        { parameter: "Module Bays", value: "8 Hot-Swappable Slide-in Industrial Card Slots" },
        { parameter: "Maximum Input Range", value: "±10V, ±60V, 4-20mA Current Loops, Thermocouples (J/K/T/E), RTD, Strain" },
        { parameter: "ADC Sampling Engine", value: "24-bit Delta-Sigma Simultaneous Sampling Architecture" },
      ],
      horizontal: [
        { parameter: "Aggregate Sampling Rate", value: "Up to 2 MSa/s across synchronized multi-channels" },
        { parameter: "Triggering Options", value: "Digital I/O Trigger, Analog Threshold, Master Clock Synchronization" },
        { parameter: "On-Board Storage", value: "Internal 32GB High-Endurance NVMe Flash Data Logging" },
      ],
      trigger: [
        { parameter: "Digital I/O Channels", value: "16 Isolated Digital Inputs & 16 High-Current Relay Outputs" },
        { parameter: "Alarm Processing", value: "User-definable Hi/Lo threshold alarms with hardware dry-contact closure" },
      ],
      general: [
        { parameter: "Communication Interfaces", value: "Dual Gigabit Ethernet, USB 3.0, RS-485 Modbus RTU" },
        { parameter: "Software Drivers", value: "LabVIEW Drivers, MATLAB Toolbox, Python SDK, RESTful JSON Web API" },
        { parameter: "Operating Temperature", value: "-10°C to +55°C Industrial Operating Range" },
      ],
    },
  };

  const activeSpecs =
    detailedSpecs[catKey] ||
    (product.category.includes("oscilloscope")
      ? detailedSpecs.oscilloscope
      : product.category.includes("power")
      ? detailedSpecs["power-supply"]
      : product.category.includes("wave")
      ? detailedSpecs.waveform
      : product.category.includes("multi")
      ? detailedSpecs.multimeter
      : product.category.includes("ac")
      ? detailedSpecs["ac-power"]
      : product.category.includes("lcr")
      ? detailedSpecs["lcr-meter"]
      : product.category.includes("spectrum")
      ? detailedSpecs["spectrum-analyzer"]
      : product.category.includes("trainer")
      ? detailedSpecs["trainer-kit"]
      : detailedSpecs.oscilloscope);

  return {
    ...product,
    galleryImages,
    inTheBox: [
      `1x ${product.brand} ${product.model} Mainframe Unit`,
      catKey === "oscilloscope"
        ? "2x 100MHz/300MHz High-Bandwidth Passive Probes (10:1/1:1 switchable with ground springs)"
        : catKey === "multimeter"
        ? "1x Pair Gold-Plated Silicone Test Leads with Shrouded Banana Plugs (CAT III 1000V)"
        : catKey === "power-supply" || catKey === "ac-power"
        ? "1x Set High-Current Heavy-Duty Alligator Terminal Cables"
        : catKey === "lcr-meter"
        ? "1x 4-Terminal Kelvin Test Clips & 1x SMD Tweezers Fixture"
        : "1x Laboratory Probing Cable Set with BNC to Alligator Clips",
      "1x Indian Standard IS 1293 Grounded AC Power Cord (2.0 meters)",
      "1x High-Speed Shielded USB PC Interface Cable (Type-A to Type-B)",
      "1x NABL-Traceable Calibration & Quality Inspection Certificate with Serial Number",
      "1x Illustrated Quick Start Guide, Pinout Diagram & Safety Instructions Manual",
    ],
    downloads: [
      { name: `${product.brand} ${product.model} Official Technical Datasheet`, size: "2.8 MB", type: "PDF" },
      { name: `${product.model} User Operation & Calibration Manual`, size: "6.4 MB", type: "PDF" },
      { name: "SCPI Remote Automation & Protocol Programming Guide", size: "3.2 MB", type: "PDF" },
      { name: "Lovokit PC Control Software Suite & Windows USB Drivers", size: "52 MB", type: "ZIP" },
      { name: "LabVIEW Instrument Driver & Python PyVISA Library Examples", size: "14 MB", type: "ZIP" },
    ],
    faqs: [
      {
        q: "Is this instrument available on the Government e-Marketplace (GeM)?",
        a: "Yes. Lovokit is an authorized OEM and registered vendor on the GeM portal. Government institutions, IITs, NITs, and defense labs can procure directly or generate custom GeM tenders.",
      },
      {
        q: "Does this unit come with an official calibration certificate?",
        a: "Yes. Every instrument shipped is factory-tested and dispatched with a serialized Calibration & Test Report traceable to NABL / ISO/IEC 17025 standards.",
      },
      {
        q: "What is the warranty coverage and after-sales service policy?",
        a: "This instrument includes a 3-Year Standard Manufacturer Warranty covering parts and labor. Our centralized calibration and service facility in India provides rapid turnaround times.",
      },
      {
        q: "Can we purchase against an institutional Purchase Order (PO)?",
        a: "Yes. We offer 30-day payment credit terms against authorized Purchase Orders (PO) for accredited universities, engineering colleges, and government research establishments.",
      },
      {
        q: "Is GST Input Tax Credit (ITC) available on this purchase?",
        a: "Yes. All sales are accompanied by a GST-compliant tax invoice showing the 18% GST breakdown and your institution's GSTIN number for full input credit claim.",
      },
    ],
    detailedSpecs: activeSpecs,
  };
}
