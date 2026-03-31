import { describe, expect, it } from "vitest";
import {
  buildYouTubeContentSlug,
  buildYouTubeSummary,
  buildYouTubeStory,
  getBrazilDateFromIso,
  getYouTubeVideoIdFromSlug,
  inferSpeakerFromTitle,
  inferTestimonyParticipants,
  normalizeYouTubeDescription,
  truncateText,
} from "../youtube-content";

describe("buildYouTubeContentSlug", () => {
  it("combines normalized title with videoId", () => {
    expect(buildYouTubeContentSlug("Minha Mensagem", "abc123XYZ78")).toBe(
      "minha-mensagem-abc123XYZ78"
    );
  });

  it("removes accents from title", () => {
    expect(buildYouTubeContentSlug("Não Se Precipite", "abc123XYZ78")).toBe(
      "nao-se-precipite-abc123XYZ78"
    );
  });

  it("converts & to e in title", () => {
    expect(buildYouTubeContentSlug("Fé & Esperança", "abc123XYZ78")).toBe(
      "fe-e-esperanca-abc123XYZ78"
    );
  });

  it("collapses multiple special chars to single dash", () => {
    expect(buildYouTubeContentSlug("Título: Parte 1/2", "abc123XYZ78")).toBe(
      "titulo-parte-1-2-abc123XYZ78"
    );
  });

  it("returns only videoId when title is empty", () => {
    expect(buildYouTubeContentSlug("", "abc123XYZ78")).toBe("abc123XYZ78");
  });

  it("trims leading and trailing dashes from title", () => {
    expect(buildYouTubeContentSlug("  -Título-  ", "abc123XYZ78")).toBe(
      "titulo-abc123XYZ78"
    );
  });
});

describe("getYouTubeVideoIdFromSlug", () => {
  it("extracts videoId from slug with title", () => {
    expect(
      getYouTubeVideoIdFromSlug("nao-se-precipite-gn1q7mfAtGw")
    ).toBe("gn1q7mfAtGw");
  });

  it("returns videoId when slug is just the id", () => {
    expect(getYouTubeVideoIdFromSlug("gn1q7mfAtGw")).toBe("gn1q7mfAtGw");
  });

  it("handles videoIds with underscores and hyphens", () => {
    expect(
      getYouTubeVideoIdFromSlug("titulo-do-video-nD8ww-uzRgg")
    ).toBe("nD8ww-uzRgg");
  });

  it("returns null for slug too short to contain a videoId", () => {
    expect(getYouTubeVideoIdFromSlug("curto")).toBeNull();
  });
});

describe("getBrazilDateFromIso", () => {
  it("converts UTC ISO string to Brazil date (YYYY-MM-DD)", () => {
    // 2026-03-21T15:00:00Z is 12:00 in São Paulo (UTC-3)
    expect(getBrazilDateFromIso("2026-03-21T15:00:00.000Z")).toBe("2026-03-21");
  });

  it("handles day boundary correctly — midnight UTC is previous day in Brazil", () => {
    // 2026-03-21T02:00:00Z is 2026-03-20T23:00:00 in São Paulo (UTC-3)
    expect(getBrazilDateFromIso("2026-03-21T02:00:00.000Z")).toBe("2026-03-20");
  });

  it("returns null for null input", () => {
    expect(getBrazilDateFromIso(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(getBrazilDateFromIso(undefined)).toBeNull();
  });

  it("returns null for invalid date string", () => {
    expect(getBrazilDateFromIso("not-a-date")).toBeNull();
  });
});

describe("normalizeYouTubeDescription", () => {
  it("converts CRLF to LF", () => {
    expect(normalizeYouTubeDescription("linha1\r\nlinha2")).toBe(
      "linha1\nlinha2"
    );
  });

  it("converts bare CR to LF", () => {
    expect(normalizeYouTubeDescription("linha1\rlinha2")).toBe("linha1\nlinha2");
  });

  it("replaces non-breaking spaces with regular spaces", () => {
    expect(normalizeYouTubeDescription("texto\u00a0com\u00a0nbsp")).toBe(
      "texto com nbsp"
    );
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeYouTubeDescription("  texto  ")).toBe("texto");
  });

  it("returns empty string for undefined input", () => {
    expect(normalizeYouTubeDescription(undefined)).toBe("");
  });

  it("returns empty string for null input", () => {
    expect(normalizeYouTubeDescription(null)).toBe("");
  });
});

describe("truncateText", () => {
  it("returns text unchanged when shorter than maxLength", () => {
    expect(truncateText("texto curto", 50)).toBe("texto curto");
  });

  it("returns text unchanged when exactly maxLength", () => {
    const text = "a".repeat(20);
    expect(truncateText(text, 20)).toBe(text);
  });

  it("truncates at last word boundary with ellipsis", () => {
    const result = truncateText("palavra um dois tres quatro cinco", 20);
    expect(result).toBe("palavra um dois...");
    expect(result.length).toBeLessThanOrEqual(20 + 3); // accounts for "..."
  });

  it("truncates at maxLength when no space found", () => {
    const result = truncateText("umapalavrasemsepacadores", 10);
    expect(result).toBe("umapalavrasemsepacadores".slice(0, 10) + "...");
  });
});

describe("buildYouTubeSummary", () => {
  it("returns first paragraph of description", () => {
    const description = "Primeiro parágrafo.\n\nSegundo parágrafo.";
    expect(buildYouTubeSummary(description, "fallback")).toBe(
      "Primeiro parágrafo."
    );
  });

  it("truncates long first paragraph to 220 chars", () => {
    const longParagraph = "palavra ".repeat(40); // > 220 chars
    const result = buildYouTubeSummary(longParagraph, "fallback");
    expect(result.length).toBeLessThanOrEqual(223); // 220 + "..."
    expect(result.endsWith("...")).toBe(true);
  });

  it("returns fallback when description is empty", () => {
    expect(buildYouTubeSummary("", "fallback")).toBe("fallback");
  });

  it("returns fallback when description is undefined", () => {
    expect(buildYouTubeSummary(undefined, "fallback")).toBe("fallback");
  });
});

describe("buildYouTubeStory", () => {
  it("returns normalized description when present", () => {
    expect(buildYouTubeStory("descrição\r\ncompleta", "fallback")).toBe(
      "descrição\ncompleta"
    );
  });

  it("returns fallback when description is empty", () => {
    expect(buildYouTubeStory("", "fallback")).toBe("fallback");
  });

  it("returns fallback when description is undefined", () => {
    expect(buildYouTubeStory(undefined, "fallback")).toBe("fallback");
  });
});

describe("inferSpeakerFromTitle", () => {
  it("extracts Pr. speaker from piped title", () => {
    expect(inferSpeakerFromTitle("Não Se Precipite | Pr. Zacarias")).toBe(
      "Pr. Zacarias"
    );
  });

  it("extracts Pastor speaker from piped title", () => {
    expect(inferSpeakerFromTitle("Mensagem de Fé | Pastor João Silva")).toBe(
      "Pastor João Silva"
    );
  });

  it("extracts Missionária from piped title", () => {
    expect(inferSpeakerFromTitle("Culto Especial | Missionária Ana")).toBe(
      "Missionária Ana"
    );
  });

  it("returns undefined when no pipe separator", () => {
    expect(inferSpeakerFromTitle("Título sem pipe")).toBeUndefined();
  });

  it("returns undefined when pipe exists but no speaker pattern", () => {
    expect(
      inferSpeakerFromTitle("Culto | AD Madureira Atibaia")
    ).toBeUndefined();
  });

  it("returns last speaker segment when multiple pipes", () => {
    expect(
      inferSpeakerFromTitle("Subtítulo | Evento | Pr. Carlos")
    ).toBe("Pr. Carlos");
  });
});

describe("inferTestimonyParticipants", () => {
  it("removes Entrevista Especial prefix", () => {
    expect(
      inferTestimonyParticipants("Entrevista Especial – Pr. Zacarias & Pra. Anna")
    ).toBe("Pr. Zacarias & Pra. Anna");
  });

  it("removes Testemunho prefix", () => {
    expect(inferTestimonyParticipants("Testemunho – Maria da Silva")).toBe(
      "Maria da Silva"
    );
  });

  it("returns undefined for regular title without known prefix", () => {
    expect(inferTestimonyParticipants("Culto da Família")).toBeUndefined();
  });

  it("returns undefined when cleaned result exceeds 120 chars", () => {
    const longTitle =
      "Entrevista Especial – " + "a".repeat(121);
    expect(inferTestimonyParticipants(longTitle)).toBeUndefined();
  });
});
