"use client";
import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { useParams } from "next/navigation";

const ShopDetailsPage = () => {
  const { id } = useParams();

  return (
    <main>
      <ShopDetails id={id} />
    </main>
  );
};

export default ShopDetailsPage;
