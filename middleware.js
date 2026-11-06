import { next, rewrite } from '@vercel/functions';

export const config = { matcher: ['/api/auth/login', '/api/auth/register'] };

const names = ['x-real-ip', 'x-forwarded-for', 'x-vercel-forwarded-for', 'x-visitor-address'];
const mask = (value) => value === null ? 'absent' : value.split(',').map((token) => {
  const trimmed = token.trim();
  return /^\d+\.\d+\.\d+\.\d+$/.test(trimmed) ? trimmed.replace(/\.\d+$/, '.x') : 'not-ipv4';
}).join(', ');

const decodedPath = (request) => {
  const { pathname } = new URL(request.url);
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
};

export default function middleware(request) {
  if (request.method === 'GET') {
    return Response.json(Object.fromEntries(names.map((name) => [name, mask(request.headers.get(name))])));
  }
  const headers = new Headers(request.headers);
  headers.set('x-origin-secret', 'diagnostic-marker-not-a-secret'); // the probe prints invalid if it arrives, absent if not
  if (request.method === 'POST' && decodedPath(request) === '/api/auth/register') {
    return rewrite(new URL('https://ffxiv-market-tracker-production.up.railway.app/api/auth/register'), { request: { headers } });
  }
  return next({ request: { headers } });
}
