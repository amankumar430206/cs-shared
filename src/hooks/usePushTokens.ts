import { useMutation } from "@tanstack/react-query";
import { apiPost, apiRequest } from "../api/client";
import { getAccessToken } from "../api/session";

// cs-api's POST/DELETE /notifications/push-tokens (Expo push tokens for cs-mobile).
export type PushPlatform = "ios" | "android";

export interface RegisterPushTokenInput {
  token: string;
  platform: PushPlatform;
  appVersion?: string;
}

export interface PushTokenRegistration {
  token: string;
  platform: PushPlatform;
  appVersion: string | null;
  lastSeenAt: string;
}

// Plain functions as well as hooks: the app registers on launch and must unregister during
// sign-out, before the session (and its access token) is cleared — outside any component.
export const registerPushToken = (input: RegisterPushTokenInput) =>
  apiPost<PushTokenRegistration>("/notifications/push-tokens", input, getAccessToken());

// The token rides in the body: Expo tokens contain brackets, awkward in a URL path.
export const unregisterPushToken = (token: string) =>
  apiRequest<{ removed: boolean }>("/notifications/push-tokens", { method: "DELETE", body: { token }, accessToken: getAccessToken() });

export function useRegisterPushTokenMutation() {
  return useMutation({ mutationFn: registerPushToken });
}

export function useUnregisterPushTokenMutation() {
  return useMutation({ mutationFn: unregisterPushToken });
}
