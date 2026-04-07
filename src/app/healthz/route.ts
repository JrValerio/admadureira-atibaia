import { getYouTubeDiagnosticsSnapshot } from "@/lib/youtube";

export async function GET() {
  return Response.json({
    status: "ok",
    ts: Date.now(),
    // Serverless functions do not share memory across instances.
    // Treat this snapshot as best-effort; structured logs remain the source of truth.
    youtube: getYouTubeDiagnosticsSnapshot(),
  });
}
