"use client";
import { useEffect, useState } from "react";
import { Share, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "dcm:install-dismissed";
const VISITS_KEY = "dcm:visits";
const COUNTED_KEY = "dcm:visit-counted";
/** Fired after a prayer request, pledge or seat request: the moment the app has earned a place on the phone. */
export const KEY_ACTION_EVENT = "dcm:key-action";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosSafari() {
  const ua = navigator.userAgent;
  return /iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}

/**
 * "Add to home screen" banner. Native prompt on Chromium, Share steps on iOS
 * Safari. Shows from the second visit or right after a key action, never in
 * the installed app, and stays dismissed once closed.
 */
export function InstallPrompt() {
  const [mode, setMode] = useState<"hidden" | "native" | "ios">("hidden");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    let visits = 0;
    let dismissed = false;
    try {
      visits = Number(localStorage.getItem(VISITS_KEY) ?? 0);
      if (!sessionStorage.getItem(COUNTED_KEY)) {
        visits += 1;
        localStorage.setItem(VISITS_KEY, String(visits));
        sessionStorage.setItem(COUNTED_KEY, "1");
      }
      dismissed = localStorage.getItem(DISMISSED_KEY) === "1";
    } catch {
      return;
    }
    if (dismissed || isStandalone()) return;

    let event: BeforeInstallPromptEvent | null = null;
    let earned = visits >= 2;
    const show = () => {
      if (!earned) return;
      if (event) setMode("native");
      else if (isIosSafari()) setMode("ios");
    };
    const onPrompt = (e: Event) => {
      e.preventDefault();
      event = e as BeforeInstallPromptEvent;
      setDeferred(event);
      show();
    };
    const onKeyAction = () => {
      earned = true;
      window.setTimeout(show, 1200);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener(KEY_ACTION_EVENT, onKeyAction);
    const iosTimer = window.setTimeout(show, 1500);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener(KEY_ACTION_EVENT, onKeyAction);
      window.clearTimeout(iosTimer);
    };
  }, []);

  if (mode === "hidden") return null;

  const dismiss = () => {
    setMode("hidden");
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") setMode("hidden");
    else dismiss();
  };

  return (
    <div className="install-banner" role="dialog" aria-labelledby="install-title">
      <div>
        <p id="install-title">
          <strong>Keep the Word on your home screen</strong>
        </p>
        {mode === "ios" ? (
          <p className="small">
            Tap <Share size={14} aria-label="Share" style={{ verticalAlign: "-2px" }} /> Share, then “Add to Home Screen”.
          </p>
        ) : (
          <p className="small">Today’s confession, the radio show and prayer, one tap away. Works offline.</p>
        )}
      </div>
      {mode === "native" ? (
        <button type="button" className="btn btn-primary" onClick={install}>
          Install
        </button>
      ) : null}
      <button type="button" className="x" onClick={dismiss} aria-label="Not now">
        <X size={20} />
      </button>
    </div>
  );
}
