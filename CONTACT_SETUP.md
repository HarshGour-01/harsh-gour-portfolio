# Contact form setup

The portfolio intentionally does not claim that a message was sent unless a real endpoint confirms it. The form posts JSON with `name`, `email`, `subject`, and `message` to `/api/contact`. The included server returns `501` with a clear configuration response until a real delivery provider is connected.

For deployment, set `CONTACT_ENDPOINT` to a trusted server-side endpoint or replace the handler in `server.mjs` with a provider-backed implementation. The endpoint should accept `POST` JSON, validate the four fields, and return a `2xx` response only after delivery has been accepted. Keep provider credentials server-side; never place them in Vite client variables. The UI treats non-2xx responses as errors and never shows a false success state.

Set `VITE_PUBLIC_ORIGIN` to the final HTTPS site origin in production if canonical/Open Graph URLs are desired. The client adds canonical, `og:url`, `og:image` and Twitter image metadata from that explicit origin. Until then, the page deliberately omits guessed absolute canonical URLs.
