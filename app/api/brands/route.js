import { NextResponse } from "next/server";
import { brandsData } from "@/data/products";

let dynamicBrands = [...brandsData];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      brands: dynamicBrands,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch brands" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Brand name is required" },
        { status: 400 }
      );
    }

    const brandName = body.name.toUpperCase().trim();
    if (!dynamicBrands.includes(brandName)) {
      dynamicBrands.push(brandName);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Brand created successfully",
        brand: brandName,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create brand" },
      { status: 500 }
    );
  }
}
