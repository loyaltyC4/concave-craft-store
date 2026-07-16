"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("welcome-toast=2")) {
      toast("🛹 Welcome to Fingerboard Lab", {
        id: "welcome-toast",
        duration: Infinity,
        onDismiss: () => {
          document.cookie = "welcome-toast=2; max-age=31536000; path=/";
        },
        description: (
          <>
            Precision fingerboard trucks, hand-pressed decks, concave molds, and
            hand-built ramps — dialed for real skating. Free sticker sheet in
            every box.
          </>
        ),
      });
    }
  }, []);

  return null;
}
