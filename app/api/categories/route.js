import { NextResponse } from "next/server";
import { categoriesData } from "@/data/products";

let dynamicCategories = [...categoriesData];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      categories: dynamicCategories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      );
    }

    const newCategory = {
      id: body.id || body.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: body.name,
      count: body.count || 0,
      description: body.description || "",
      subcategories: body.subcategories || [],
      createdAt: new Date().toISOString(),
    };

    dynamicCategories.push(newCategory);

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
