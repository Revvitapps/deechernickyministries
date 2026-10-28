"use client";
import { useEffect, useSyncExternalStore } from "react";

function subscribe(listener: () => void) {
  window.addEventListener("online", listener);
  window.addEventListener("offline", listener);
  return () => {
    window.removeEventListener("online", listener);
    window.removeEventListener("offline", listener);
  };
}

/**
 * Registers the service worker (production builds only; a cached dev server
 * is confusing) and shows a banner while the browser is offline.
 */
export function Pwa() {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
  }, []);

  if (online) return null;
  return (
    <p className="offline-banner" role="status">
      You’re offline. Today’s confession and pages you’ve visited still work. Requests you send will be kept on this phone.
    </p>
  );
}
