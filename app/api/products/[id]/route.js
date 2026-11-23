import { NextResponse } from "next/server";
import { productsData } from "@/data/products";
import { getProductById } from "@/data/productDetails";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = getProductById(id) || productsData.find((p) => p.id === id || p.model?.toLowerCase() === id.toLowerCase());

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // In a database, backend dev will run: await db.product.update({ where: { id }, data: body })
    return NextResponse.json({
      success: true,
      message: `Product ${id} updated successfully`,
      updatedFields: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // In a database, backend dev will run: await db.product.delete({ where: { id } })
    return NextResponse.json({
      success: true,
      message: `Product ${id} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
