"use client";

import { clearCartAction } from "components/cart/actions";
import { useEffect } from "react";

export default function ClearCartOnLoad() {
  useEffect(() => {
    clearCartAction().catch(() => {});
  }, []);
  return null;
}
