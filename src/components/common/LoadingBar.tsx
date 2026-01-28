"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "./LoadingBar.css";

export default function LoadingBar() {
  const pathname = usePathname();

  useEffect(() => {
    // Start loading animation
    const loadingBar = document.getElementById("loading-bar");
    if (loadingBar) {
      loadingBar.style.width = "0%";
      loadingBar.style.opacity = "1";

      // Simulate progress
      setTimeout(() => {
        if (loadingBar) loadingBar.style.width = "30%";
      }, 100);

      setTimeout(() => {
        if (loadingBar) loadingBar.style.width = "60%";
      }, 300);

      setTimeout(() => {
        if (loadingBar) loadingBar.style.width = "90%";
      }, 600);
    }
  }, [pathname]);

  useEffect(() => {
    // Complete loading animation when page is ready
    const loadingBar = document.getElementById("loading-bar");
    if (loadingBar) {
      loadingBar.style.width = "100%";
      setTimeout(() => {
        if (loadingBar) {
          loadingBar.style.opacity = "0";
        }
      }, 200);
    }
  }, [pathname]);

  return (
    <div id="loading-bar-container">
      <div id="loading-bar"></div>
    </div>
  );
}
