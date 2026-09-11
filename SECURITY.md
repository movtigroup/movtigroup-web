# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| latest `main` | ✅ |
| older tags | ❌ (upgrade to the latest release) |

## Reporting a Vulnerability

Please **do not open a public issue** for security problems.

Report privately via [GitHub Security Advisories](https://github.com/movtigroup/movtigroup-web/security/advisories/new) or email **info@movtigroup.me**. Include:

- A description of the issue and its impact
- Steps to reproduce or a proof of concept
- Affected pages/endpoints

We aim to respond within **72 hours** and will keep you informed throughout the fix and release process.

## Security Notes for Deployment

- The app has no external runtime dependencies on third-party CDNs (fonts are self-hosted) — deploy it on isolated networks safely.
- Markdown content is repository-owned and rendered through `@nuxt/content` v3, which sanitizes rendered HTML.
- The `/api/health` endpoint returns only a status and timestamp — no sensitive data.
- For production, terminate TLS at your proxy (nginx, Vercel, or Dokploy) and keep `NUXT_PUBLIC_SITE_URL` pointed at the public HTTPS domain so canonical/OG URLs are correct.
