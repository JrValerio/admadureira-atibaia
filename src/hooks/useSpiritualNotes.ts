"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "spiritual-notes";

type NotesMap = Record<string, string>;

function readStorage(): NotesMap {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);

    if (typeof parsed !== "object" || parsed === null) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] =>
          typeof entry[0] === "string" && typeof entry[1] === "string"
      )
    );
  } catch {
    return {};
  }
}

function writeStorage(notes: NotesMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function useSpiritualNotes(noteKey: string) {
  const [note, setNote] = useState(() => readStorage()[noteKey] ?? "");

  const saveNote = useCallback(() => {
    const notes = readStorage();
    const trimmedNote = note.trim();

    if (trimmedNote) {
      notes[noteKey] = note;
    } else {
      delete notes[noteKey];
    }

    writeStorage(notes);
  }, [note, noteKey]);

  const clearNote = useCallback(() => {
    const notes = readStorage();
    delete notes[noteKey];
    writeStorage(notes);
    setNote("");
  }, [noteKey]);

  return {
    note,
    setNote,
    saveNote,
    clearNote,
    hasSavedNote: note.trim().length > 0,
  };
}
