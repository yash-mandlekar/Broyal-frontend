// components/Shop/ShopDetails.tsx
"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Newsletter from "../Common/Newsletter";
import RecentlyViewdItems from "./RecentlyViewd";
import ProductGallery from "../Shop/ProductGallery";
import ProductInfo from "../Shop/ProductInfo";
import ProductVariants, { Variant } from "../Shop/ProductVariants";
import ProductTabs from "../Shop/ProductTabs";
import { Product } from "@/types/product";
import apiClient from "@/hooks/useAxios";

interface ApiResponse {
  success: boolean;
  data: Product;
  message?: string;
}

const ShopDetails = ({ id }: { id: string | string[] }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // apiClient
        const { data } = await apiClient.get(`/api/products/${id}`);
        console.log(data);

        if (data) {
          setProduct(data.product);
          // Set first variant as default if exists
          if (data.product.variants && data.product.variants.length > 0) {
            setSelectedVariant(data.product.variants[0]);
          }
        } else {
          setError(data.message || "Failed to load product");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle variant selection
  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue mx-auto mb-4"></div>
          <p className="text-gray-4">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Product not found"}</p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex font-medium text-white bg-blue py-2 px-6 rounded-md hover:bg-blue-dark"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb title={"Shop Details"} pages={["shop", product.title]} />

      {/* Main Product Section */}
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
            {/* Product Gallery */}
            <ProductGallery
              images={product.images}
              productTitle={product.title}
            />

            {/* Product Info and Variants */}
            <div className="max-w-[539px] w-full">
              {/* Product Info */}
              <ProductInfo
                title={product.title}
                price={product.price}
                discountPrice={product.discountPrice}
                stock={product.stock}
                brand={product.brand}
                category={product.category}
              />

              {/* Product Variants - Only show if variants exist */}
              {product.variants && product.variants.length > 0 && (
                <ProductVariants
                  variants={product.variants}
                  onVariantSelect={handleVariantSelect}
                  selectedVariant={selectedVariant}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs Section */}
      <ProductTabs
        description={product.description}
        additionalInfo={{
          brand: product.brand,
          category: product.category.name,
          stock: product.stock > 0 ? "In Stock" : "Out of Stock",
          ...(product.category && {
            category_description: product.category.description || "",
          }),
        }}
      />

      {/* Recently Viewed Items */}
      <RecentlyViewdItems />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default ShopDetails;
