# @castadi/shared

Platform-neutral CASTADI code for **cs-mobile** (React Native): cs-api types, zod form schemas,
design tokens, the envelope-aware API client, a session store, and react-query data hooks.

cs-web is **not** a consumer yet. Everything here was copied from cs-web and generalised; cs-web
remains the reference implementation until it is migrated.

## Entry points
| Import | Contents |
|---|---|
| `@castadi/shared` | `configureApiClient`, `api*` request helpers, `ApiClientError`, `session`, `useHasSession`, `createQueryClient`, tokens |
| `@castadi/shared/types` | cs-api DTO types + pure helpers |
| `@castadi/shared/schemas` | zod schemas mirroring cs-api Joi validators |
| `@castadi/shared/hooks` | `useQuery`/`useMutation` hooks per domain |
| `@castadi/shared/tokens` | brand colors, light/dark modes, numeric spacing/radii/type scales, `resolveTheme` |
| `@castadi/shared/i18n` | the English/Hindi UI catalogs (`messages.en`/`messages.hi`), `LOCALES`, `coerceLocale` |

## Platform setup
```ts
import { configureApiClient, session, createQueryClient } from "@castadi/shared";

configureApiClient({
  baseUrl: "https://api.example.com/api/v1",
  headers: { "X-Client-Platform": "ios", "X-App-Version": "1.0.0" },
  onError: (error) => showToast(error),
  onSessionExpired: () => router.replace("/login"),
});
await session.hydrate(secureTokenStorage); // TokenStorage adapter: load/save/clear
const queryClient = createQueryClient(toastAdapter);
```
Hooks read the token from `session`; they need a `QueryClientProvider` above them and nothing else.

## Sync rule with cs-web
When a cs-api contract changes in a domain covered here, update cs-web **and** this package in the
same pass. Source mapping:

| Here | cs-web source |
|---|---|
| `src/types/*.ts` | `src/lib/*.ts` |
| `src/schemas/*.ts` | `src/schemas/*.ts` |
| `src/hooks/use*.ts` | `src/hooks/use*.ts` |
| `src/api/client.ts` | `src/lib/apiClient.ts` |
| `src/api/queryClient.ts` | `src/lib/queryClient.ts` |
| `src/tokens/index.ts` | `src/design-system/{colors,tokens}.ts` |
| `src/i18n/{en,hi}.json` | `src/i18n/messages/{en,hi}.json` |
| `src/types/{checkout,delivery,money,screenListing,adChecks}.ts` | `src/lib/*.ts` (same names) |
| `src/types/orientation.ts` | the fit maths from `src/lib/orientation.ts` (parse/orient helpers live in `./screens`) |
| `src/hooks/marketplaceFilters.ts` | `src/components/marketplace/marketplaceFilters.ts` |
| `useApplyMediaMutation` in `src/hooks/useCreatives.ts` | `useApplyMediaMutation` in `src/hooks/useMedia.ts` |
| quotation/receipt document hooks (`useUploadCampaignDocumentMutation`, `useRemoveCampaignDocumentMutation`, `useUpdatePaymentsConfigMutation`) in `src/hooks/useCheckout.ts` | same-named hooks in `src/hooks/useCheckout.ts` |

### Known intentional differences
- `api/client.ts`: toasts, redirect-on-expiry and `fetch` are injected; no `apiDownload` (CSV/Excel export is web-only); adds `apiFetchRaw` and `buildQuery`.
- Session/tokens live in `api/session.ts` (`TokenStorage` adapter) instead of zustand + localStorage.
- Hooks: `useAuthStore` replaced by `getAccessToken()` / `useHasSession()` / `session`; `download*Report` helpers removed.
- `useNotifications`: REST only — the SSE stream and admin template hooks are web-only; adds `useInvalidateNotifications`, `useNotificationsInfiniteQuery` (infinite scroll) and optional `refetchInterval` on the unread count.
- `useAnalytics`: no downloads — `proofOfPlayExportPath` / `campaignReportPath` give the paths; each platform fetches and saves the file itself.
- `useKyc`: `useUploadDocumentMutation` accepts an `UploadFile` (a `Blob` or a React Native `{ uri, name, type }` reference) instead of only `File`.
- `useScreens`: `useUploadPhotoMutation` accepts an `UploadFile` too.
- `useCampaigns`: `useUploadCampaignBannerMutation` accepts an `UploadFile` too.
- `useSettings` (new): `useScreenPhotoRequirementsQuery`, copied from cs-web's `hooks/useTheme.ts` (the admin update mutation stays web-only).
- `types/devices.ts`: device-token player-simulator helpers (`deviceRequest`, activation register/status) removed.
- `types/geo.ts`: uses `apiFetchRaw` instead of reading `API_BASE_URL` + the web auth store.
- `types/auth.ts`: types only (token storage moved to `session`).
- `tokens`: numeric px scales instead of rem/CSS-variable strings; `logoUrl` defaults to `null`.
- Barrel aliases for duplicate names: `formatBookingDateRange`, `AdvertiserWallet*`/`PartnerWallet*`, `useAdvertiserWalletQuery`/`usePartnerWalletQuery`.

## Scripts
`yarn build` (tsup → `dist/`, ESM + d.ts) · `yarn typecheck` · `yarn test` (vitest)
