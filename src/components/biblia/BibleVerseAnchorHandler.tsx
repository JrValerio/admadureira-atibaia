"use client";

import { useEffect } from "react";

function clearCurrentTarget() {
  document
    .querySelectorAll<HTMLElement>("[data-verse-target='true']")
    .forEach((target) => {
      delete target.dataset.verseTarget;
    });
}

function getVerseRangeFromHash(hash: string) {
  const match = hash.match(/^#v(\d+)(?:-(\d+))?$/);

  if (!match) {
    return null;
  }

  const verseStart = Number(match[1]);
  const verseEnd = match[2] ? Number(match[2]) : verseStart;

  if (!Number.isFinite(verseStart) || !Number.isFinite(verseEnd)) {
    return null;
  }

  return {
    verseStart,
    verseEnd: verseEnd >= verseStart ? verseEnd : verseStart,
  };
}

function scrollToCurrentVerse() {
  const verseRange = getVerseRangeFromHash(window.location.hash);

  if (!verseRange) {
    clearCurrentTarget();
    return;
  }

  const targets: HTMLElement[] = [];

  for (
    let verse = verseRange.verseStart;
    verse <= verseRange.verseEnd;
    verse += 1
  ) {
    const target = document.getElementById(`v${verse}`);

    if (target) {
      targets.push(target);
    }
  }

  if (targets.length === 0) {
    clearCurrentTarget();
    return;
  }

  window.requestAnimationFrame(() => {
    clearCurrentTarget();
    targets.forEach((target) => {
      target.dataset.verseTarget = "true";
    });
    targets[0].scrollIntoView({
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
