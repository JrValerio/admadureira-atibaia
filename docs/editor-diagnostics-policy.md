# Editor Diagnostics Policy

This project separates editor diagnostics into three buckets:

- Real issues: accessibility and semantic problems such as `axe/aria`, plus anything that fails ESLint, TypeScript, or build validation.
- Relevant warnings: UI conflicts or repeated patterns that are cheap to normalize when they improve clarity without changing behavior.
- Tolerated editor noise: compatibility warnings for APIs outside the current browser support target and generic `no-inline-styles` warnings for dynamic React styles.

Current workspace rules:

- Keep `axe/aria` visible as an error.
- Treat `compat-api/css`, `compat-api/html`, and `no-inline-styles` as non-blocking editor noise.
- Ignore `suggestCanonicalClasses` in the editor after repeated low-value suggestions start to dominate the Problems panel.

Operational rule:

- Do not hide real product issues behind workspace settings.
- If a warning becomes user-visible, performance-relevant, or accessibility-relevant, promote it back into code work instead of config silence.
