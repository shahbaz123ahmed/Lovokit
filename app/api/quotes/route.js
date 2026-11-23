import { NextResponse } from "next/server";

// Sample in-memory quote store for development
let dynamicQuotes = [
  {
    id: "rfp-1001",
    fullName: "Vikram Mehta",
    email: "vikram@tataauto.com",
    phone: "+91 98450 12345",
    company: "Tata Motors EV Division",
    packageType: "Tier-1 Automotive & EV Diagnostic Station",
    requestedItems: [{ model: "OWON XDS3302", qty: 2 }, { model: "SIGLENT SPD3303X-E", qty: 2 }],
    budget: "₹5,00,000",
    notes: "Requires NABL calibration certificates for all units.",
    status: "IN_REVIEW",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "rfp-1002",
    fullName: "Dr. Ananya Ray",
    email: "ananya.ray@iitb.ac.in",
    phone: "+91 94220 56789",
    company: "IIT Bombay Microelectronics Lab",
    packageType: "Academic Benchmark Lab (10-Station Suite)",
    requestedItems: [{ model: "OWON XDS3104E", qty: 10 }],
    budget: "₹10,00,000",
    notes: "GST exemption certificate available for academic research.",
    status: "PENDING",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      total: dynamicQuotes.length,
      quotes: dynamicQuotes,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required contact details: fullName, email, phone" },
        { status: 400 }
      );
    }

    const newQuote = {
      id: `rfp-${Date.now().toString(36)}`,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      company: body.company || "Individual / Independent Lab",
      gstNumber: body.gstNumber || "",
      packageType: body.packageType || "Custom Laboratory RFQ",
      requestedItems: body.requestedItems || [],
      budget: body.budget || "",
      notes: body.notes || "",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    dynamicQuotes.unshift(newQuote);

    return NextResponse.json(
      {
        success: true,
        message: "Quotation request submitted successfully",
        quote: newQuote,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to submit quote" },
      { status: 500 }
    );
  }
}
