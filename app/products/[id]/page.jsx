import React from "react";
import { notFound } from "next/navigation";
import { productsData } from "@/data/products";
import { getProductById } from "@/data/productDetails";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }) {
  const product = getProductById(params.id);
  if (!product) {
    return {
      title: "Product Not Found | LOVOKIT",
    };
  }

  return {
    title: `${product.brand} ${product.model} - ${product.title} | LOVOKIT`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Related products: same category first, then complementary instruments
  const sameCategory = productsData.filter(
    (p) => p.id !== product.id && p.category === product.category
  );
  const otherCategory = productsData.filter(
    (p) => p.id !== product.id && p.category !== product.category
  );
  const relatedProducts = [...sameCategory, ...otherCategory].slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
