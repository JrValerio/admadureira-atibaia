const baseUrl = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/+$/, "");

const checks = [
  {
    path: "/healthz",
    validate(body) {
      const payload = JSON.parse(body);
      return payload?.status === "ok";
    },
    message: "healthz deve responder com status ok",
  },
  {
    path: "/",
    validate(body) {
      return body.includes("<title>") && body.includes("Assembleia de Deus");
    },
    message: "home deve responder HTML institucional",
  },
  {
    path: "/sitemap.xml",
    validate(body) {
      return body.includes("<urlset") && body.includes("/espiritualidade/biblia");
    },
    message: "sitemap.xml deve conter o urlset esperado",
  },
  {
    path: "/robots.txt",
    validate(body) {
      return body.includes("Sitemap:") && body.includes("/sitemap.xml");
    },
    message: "robots.txt deve expor o sitemap",
  },
  {
    path: "/espiritualidade/biblia",
    validate(body) {
      return body.includes("Bíblia Online");
    },
    message: "Bíblia Online deve responder como página real",
  },
];

async function runCheck(check) {
  const url = `${baseUrl}${check.path}`;
  const response = await fetch(url, {
    headers: {
      "user-agent": "CodexSmoke/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`${check.path} retornou HTTP ${response.status}`);
  }

  const body = await response.text();

  if (!check.validate(body)) {
    throw new Error(`${check.path} falhou: ${check.message}`);
  }

  console.log(`[smoke] ok ${check.path}`);
}

async function main() {
  for (const check of checks) {
    await runCheck(check);
  }
}

main().catch((error) => {
  console.error("[smoke] failed", {
    baseUrl,
    message: error instanceof Error ? error.message : String(error),
  });
  process.exit(1);
});
