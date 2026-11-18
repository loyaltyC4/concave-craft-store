"use client";

import { useEffect } from "react";
import { setWelcomeCookie } from "lib/welcome";

/** Links in our emails carry ?welcome=1 so the 10% follows the shopper. */
export function WelcomeCookie() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("welcome") === "1") {
      setWelcomeCookie();
    }
  }, []);
  return null;
}
