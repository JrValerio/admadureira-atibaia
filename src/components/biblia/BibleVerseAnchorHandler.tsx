"use client";

import { useEffect } from "react";

function clearCurrentTarget() {
  const currentTarget = document.querySelector<HTMLElement>(
    "[data-verse-target='true']"
  );

  if (currentTarget) {
    delete currentTarget.dataset.verseTarget;
  }
}

function scrollToCurrentVerse() {
  const hash = window.location.hash;

  if (!hash.startsWith("#v")) {
    clearCurrentTarget();
    return;
  }

  const target = document.getElementById(hash.slice(1));

  if (!target) {
    clearCurrentTarget();
    return;
  }

  window.requestAnimationFrame(() => {
    clearCurrentTarget();
    target.dataset.verseTarget = "true";
    target.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

export default function BibleVerseAnchorHandler() {
  useEffect(() => {
    scrollToCurrentVerse();

    const handleHashChange = () => {
      scrollToCurrentVerse();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
