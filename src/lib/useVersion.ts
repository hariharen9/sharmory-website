import { useState, useEffect } from "react";

let globalVersion = "v1.0.0";
const listeners = new Set<(v: string) => void>();

function setGlobalVersion(newV: string) {
  globalVersion = newV.startsWith("v") ? newV : `v${newV}`;
  listeners.forEach((l) => l(globalVersion));
}

let fetchStarted = false;

function initVersionFetch() {
  if (fetchStarted) return;
  fetchStarted = true;

  fetch("https://api.github.com/repos/hariharen9/sharmory/releases/latest")
    .then((res) => {
      if (res.ok) return res.json();
      return fetch("https://api.github.com/repos/hariharen9/sharmory/tags").then((r) =>
        r.ok ? r.json() : null
      );
    })
    .then((data) => {
      if (data && typeof data === "object") {
        if ("tag_name" in data && typeof data.tag_name === "string" && data.tag_name) {
          setGlobalVersion(data.tag_name);
        } else if (Array.isArray(data) && data.length > 0 && data[0]?.name) {
          setGlobalVersion(data[0].name as string);
        }
      }
    })
    .catch(() => {
      // Fallback silently to initial default v1.0.0
    });
}

/**
 * Shared reactive hook for the live Sharmory release version across all components.
 */
export function useSharmoryVersion() {
  const [version, setVersion] = useState(globalVersion);

  useEffect(() => {
    initVersionFetch();
    listeners.add(setVersion);
    return () => {
      listeners.delete(setVersion);
    };
  }, []);

  // Short version representation, e.g. "v1.0"
  const shortVersion = version.replace(/^v?(\d+\.\d+).*/, "v$1");

  return {
    version,
    shortVersion,
    rawVersion: version.replace(/^v/, ""),
  };
}
