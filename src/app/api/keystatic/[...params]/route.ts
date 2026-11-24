import { makeRouteHandler } from "@keystatic/next/route-handler";
import config, { isGitHubStorage } from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config });

function blockedInProductionWithoutGitHub() {
  return process.env.NODE_ENV === "production" && !isGitHubStorage;
}

export async function GET(request: Request) {
  if (blockedInProductionWithoutGitHub()) return new Response(null, { status: 404 });
  return handler.GET(request);
}

export async function POST(request: Request) {
  if (blockedInProductionWithoutGitHub()) return new Response(null, { status: 404 });
  return handler.POST(request);
}
