import { getYouTubeDiagnosticsSnapshot } from "@/lib/youtube";

export async function GET() {
  return Response.json({
    status: "ok",
    ts: Date.now(),
    youtube: getYouTubeDiagnosticsSnapshot(),
  });
}
