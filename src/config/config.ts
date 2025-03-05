import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  EXPO_PUBLIC_API_URL: str(),
});
