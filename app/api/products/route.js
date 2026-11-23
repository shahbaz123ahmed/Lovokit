import { NextResponse } from "next/server";
import { productsData } from "@/data/products";

// In-memory products store for development fallback
// (Backend developer replaces this with: await db.product.findMany() or Product.find())
let dynamicProducts = [...productsData];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    let filtered = [...dynamicProducts];

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.category?.toLowerCase() === category.toLowerCase() ||
          p.categoryName?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by brand
    if (brand && brand !== "All Brands" && brand !== "all") {
      filtered = filtered.filter(
        (p) => p.brand?.toLowerCase() === brand.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Filter by featured
    if (featured === "true") {
      filtered = filtered.filter((p) => p.featured === true);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      products: paginated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Required fields validation
    if (!body.title || !body.model || !body.brand || !body.price) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title, model, brand, price",
        },
        { status: 400 }
      );
    }

    // Generated slug / ID
    const newId =
      body.id ||
      body.model.toLowerCase().replace(/[^a-z0-9]/g, "-") +
        "-" +
        Date.now().toString(36);

    const newProduct = {
      id: newId,
      model: body.model.toUpperCase().trim(),
      brand: body.brand,
      category: body.category || "oscilloscopes",
      categoryName: body.categoryName || body.category || "Oscilloscopes",
      subcategory: body.subcategory || "",
      title: body.title,
      description: body.description || "",
      price: body.price.startsWith("₹") ? body.price : `₹${body.price}`,
      originalPrice: body.originalPrice
        ? body.originalPrice.startsWith("₹")
          ? body.originalPrice
          : `₹${body.originalPrice}`
        : null,
      rating: parseFloat(body.rating || "5.0"),
      reviews: parseInt(body.reviews || "0", 10),
      inStock: body.inStock !== false,
      stockQuantity: parseInt(body.stockQuantity || "10", 10),
      featured: Boolean(body.featured),
      badgeTitle: body.badgeTitle || "",
      badgeSubtitle: body.badgeSubtitle || "",
      badgeType: body.badgeType || "",
      image: body.image || "/images/categories/oscilloscope-transparent.png",
      gallery: body.gallery || [],
      specs: Array.isArray(body.specs) ? body.specs : [],
      detailedSpecs: body.detailedSpecs || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Prepend to list (in memory)
    dynamicProducts.unshift(newProduct);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
