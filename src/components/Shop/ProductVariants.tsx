// components/Shop/ProductVariants.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface Variant {
  _id: string;
  attributes: Array<{
    key: string;
    value: string;
  }>;
  price: number;
  discountPrice?: number;
  stock: number;
  image?: string;
}

interface ProductVariantsProps {
  variants: Variant[];
  onVariantSelect: (variant: Variant) => void;
  selectedVariant?: Variant | null;
}

const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  onVariantSelect,
  selectedVariant,
}) => {
  // Get current selection for each attribute
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});
  // If no variants, return null
  if (!variants || variants.length === 0) {
    return null;
  }

  // Group variants by attribute key
  const groupedAttributes: { [key: string]: Set<string> } = {};

  variants.forEach((variant) => {
    variant.attributes.forEach((attr) => {
      if (!groupedAttributes[attr.key]) {
        groupedAttributes[attr.key] = new Set();
      }
      groupedAttributes[attr.key].add(attr.value);
    });
  });

  const attributeKeys = Object.keys(groupedAttributes);

  // Find matching variant based on selected attributes
  const findMatchingVariant = (attrs: {
    [key: string]: string;
  }): Variant | null => {
    return (
      variants.find((variant) =>
        variant.attributes.every((attr) => attrs[attr.key] === attr.value)
      ) || null
    );
  };

  const handleAttributeSelect = (key: string, value: string) => {
    const newAttrs = { ...selectedAttributes, [key]: value };
    setSelectedAttributes(newAttrs);

    const matchingVariant = findMatchingVariant(newAttrs);
    if (matchingVariant) {
      onVariantSelect(matchingVariant);
    }
  };

  return (
    <div className="border-t border-gray-3 pt-6 mb-6">
      <h3 className="font-semibold text-lg text-dark mb-4">Options:</h3>

      {/* Attribute Selection */}
      <div className="space-y-6">
        {attributeKeys.map((attrKey) => (
          <div key={attrKey} className="flex flex-col gap-3">
            <label className="font-medium text-dark capitalize">
              {attrKey}:
            </label>

            <div className="flex flex-wrap gap-3">
              {Array.from(groupedAttributes[attrKey]).map((value) => {
                // Find variant with this attribute combination
                const variantsWithThisValue = variants.filter((v) =>
                  v.attributes.some(
                    (attr) =>
                      attr.key === attrKey &&
                      attr.value === value &&
                      Object.entries(selectedAttributes).every(
                        ([key, val]) =>
                          key === attrKey ||
                          v.attributes.some(
                            (a) => a.key === key && a.value === val
                          )
                      )
                  )
                );

                const isAvailable =
                  variantsWithThisValue.length > 0 &&
                  variantsWithThisValue.some((v) => v.stock > 0);

                const isSelected = selectedAttributes[attrKey] === value;

                return (
                  <button
                    key={`${attrKey}-${value}`}
                    onClick={() => handleAttributeSelect(attrKey, value)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 rounded-md border-2 font-medium text-sm ease-out duration-200 capitalize ${
                      isSelected
                        ? "border-blue bg-blue text-white"
                        : isAvailable
                        ? "border-gray-3 text-dark hover:border-blue"
                        : "border-gray-2 text-gray-4 cursor-not-allowed opacity-50"
                    }`}
                    title={!isAvailable ? "Not available in stock" : `${value}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Variant Details Display */}
      {selectedVariant && (
        <div className="mt-6 p-4 bg-gray-1 rounded-lg border border-gray-2">
          <h4 className="font-medium text-dark mb-3">Selected Variant:</h4>

          <div className="grid grid-cols-2 gap-4">
            {/* Variant Image */}
            {selectedVariant.image && (
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs text-gray-4 mb-2">Image:</p>
                <div className="w-24 h-24 rounded-md bg-white border border-gray-2 flex items-center justify-center overflow-hidden">
                  <Image
                    src={selectedVariant.image}
                    alt="Variant"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Variant Price */}
            <div className="col-span-1">
              <p className="text-xs text-gray-4 mb-2">Price:</p>
              <p className="font-semibold text-dark">
                ₹{selectedVariant.price.toLocaleString()}
              </p>
              {selectedVariant.discountPrice && (
                <p className="text-xs text-gray-4 line-through">
                  ₹{selectedVariant.discountPrice.toLocaleString()}
                </p>
              )}
            </div>

            {/* Variant Stock */}
            <div className="col-span-1">
              <p className="text-xs text-gray-4 mb-2">Stock:</p>
              <p
                className={`font-semibold ${
                  selectedVariant.stock > 0 ? "text-green" : "text-red"
                }`}
              >
                {selectedVariant.stock > 0 ? "In Stock" : "Out of Stock"}{" "}
                {selectedVariant.stock > 0 && `(${selectedVariant.stock})`}
              </p>
            </div>

            {/* Variant Attributes */}
            <div className="col-span-2">
              <p className="text-xs text-gray-4 mb-2">Specifications:</p>
              <div className="flex flex-wrap gap-2">
                {selectedVariant.attributes.map((attr, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-white border border-gray-2 rounded text-xs text-dark"
                  >
                    <span className="font-medium capitalize">{attr.key}:</span>{" "}
                    {attr.value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
