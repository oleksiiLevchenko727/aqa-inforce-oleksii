import { APIRequestContext } from "@playwright/test";
export async function getAuthToken(request: APIRequestContext) {

  const response = await request.post('/api/auth/login', {
    data: {
      username: process.env.ADMIN_USERNAME!,
      password: process.env.ADMIN_PASSWORD!,
    },
  });

   if (!response.ok()) {
    const text = await response.text();
    throw new Error(`Auth failed: ${response.status()} - ${text}`);
  }

  const body = await response.json();
  return body.token;
}