/* global process */
import { ipAddress, next } from '@vercel/functions';

export const config = { matcher: ['/api/auth/login', '/api/auth/register'] };

// Railway overwrites X-Real-IP and X-Forwarded-For, so only a header of our own can carry the
// visitor past it. Deleted first so nothing a client sent under these names can survive.
export default function middleware(request) {
  const headers = new Headers(request.headers);
  headers.delete('x-visitor-address');
  headers.delete('x-origin-secret');
  const visitor = ipAddress(request);
  const secret = process.env.ORIGIN_SECRET;
  if (visitor && secret) {
    headers.set('x-visitor-address', visitor);
    headers.set('x-origin-secret', secret);
  }
  // request.headers only. A top-level `headers` key here would go to the client.
  return next({ request: { headers } });
}
