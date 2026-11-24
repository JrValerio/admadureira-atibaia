import { describe, expect, it } from "vitest";
import { redactApiKey } from "../youtube";

describe("redactApiKey", () => {
  it("removes the key from a Data API URL", () => {
    const url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=abc&key=AIzaSECRET123";
    expect(redactApiKey(url)).toBe(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=abc&key=REDACTED"
    );
  });

  it("removes the key when it is the first parameter", () => {
    expect(redactApiKey("https://x.test/v3/channels?key=AIzaSECRET&part=id")).toBe(
      "https://x.test/v3/channels?key=REDACTED&part=id"
    );
  });

  it("leaves URLs without a key untouched", () => {
    const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC123";
    expect(redactApiKey(url)).toBe(url);
  });
});
