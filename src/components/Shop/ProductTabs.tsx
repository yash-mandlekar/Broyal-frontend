// components/Shop/ProductTabs.tsx
"use client";

import React, { useState } from "react";

interface Tab {
  id: string;
  title: string;
}

interface ProductTabsProps {
  description: string;
  additionalInfo?: {
    [key: string]: string;
  };
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  description,
  additionalInfo,
}) => {
  const [activeTab, setActiveTab] = useState("tabOne");

  const tabs: Tab[] = [
    {
      id: "tabOne",
      title: "Description",
    },
    {
      id: "tabTwo",
      title: "Additional Information",
    },
  ];

  // Helper function to strip HTML tags
  const stripHtmlTags = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Helper function to render HTML safely (for description)
  const renderDescriptionHTML = (html: string) => {
    return (
      <div
        className="prose prose-sm max-w-none text-dark"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <section className="overflow-hidden bg-gray-2 py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`font-medium lg:text-lg ease-out duration-200 hover:text-blue relative before:h-0.5 before:bg-blue before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
                activeTab === item.id
                  ? "text-blue before:w-full"
                  : "text-dark before:w-0"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-12.5">
          {/* Description Tab */}
          {activeTab === "tabOne" && (
            <div className="flex flex-col sm:flex-row gap-7.5 xl:gap-12.5">
              <div className="max-w-[670px] w-full">
                <h2 className="font-medium text-2xl text-dark mb-7">
                  Product Description:
                </h2>

                <div className="text-dark leading-relaxed">
                  {description && description.length > 0 ? (
                    renderDescriptionHTML(description)
                  ) : (
                    <p className="text-gray-4">
                      No description available for this product.
                    </p>
                  )}
                </div>
              </div>

              {/* Care & Maintenance Placeholder */}
              {/* <div className="max-w-[447px] w-full">
                <h2 className="font-medium text-2xl text-dark mb-7">
                  Care & Maintenance:
                </h2>

                <div className="text-dark leading-relaxed">
                  <p className="mb-6">
                    To ensure your product lasts longer, follow these care
                    guidelines:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Store in a cool, dry place</li>
                    <li>Avoid direct sunlight exposure</li>
                    <li>Clean with a soft, damp cloth</li>
                    <li>Handle with care to prevent damage</li>
                    <li>Follow manufacturer&apos;s instructions</li>
                  </ul>
                </div>
              </div> */}
            </div>
          )}

          {/* Additional Information Tab */}
          {activeTab === "tabTwo" && (
            <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
              {additionalInfo && Object.keys(additionalInfo).length > 0 ? (
                <div className="space-y-0">
                  {Object.entries(additionalInfo).map(([key, value], index) => (
                    <div
                      key={key}
                      className={`rounded-md flex py-4 px-4 sm:px-5 ${
                        index % 2 === 0 ? "bg-gray-1" : ""
                      }`}
                    >
                      <div className="max-w-[450px] min-w-[140px] w-full">
                        <p className="text-sm sm:text-base text-dark font-medium capitalize">
                          {key.replace(/_/g, " ")}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="text-sm sm:text-base text-dark">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-4">
                    No additional information available for this product.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;