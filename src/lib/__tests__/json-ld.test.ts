import { describe, expect, it } from "vitest";
import { jsonLd } from "../json-ld";

describe("jsonLd", () => {
  it("escapes < so a closing script tag cannot break out", () => {
    const out = jsonLd({ name: "Culto </script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out)).toEqual({ name: "Culto </script><script>alert(1)</script>" });
  });

  it("keeps plain data identical to JSON.stringify", () => {
    const data = { "@type": "Church", name: "AD Madureira Atibaia" };
    expect(jsonLd(data)).toBe(JSON.stringify(data));
  });
});
