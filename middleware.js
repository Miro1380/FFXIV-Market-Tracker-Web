import { next } from '@vercel/functions';

export const config = { matcher: ['/api/auth/login', '/api/auth/register'] };

const names = ['x-real-ip', 'x-forwarded-for', 'x-vercel-forwarded-for', 'x-visitor-address'];
const mask = (value) => value === null ? 'absent' : value.split(',').map((token) => {
  const trimmed = token.trim();
  return /^\d+\.\d+\.\d+\.\d+$/.test(trimmed) ? trimmed.replace(/\.\d+$/, '.x') : 'not-ipv4';
}).join(', ');

export default function middleware(request) {
  if (request.method === 'GET') {
    return Response.json(Object.fromEntries(names.map((name) => [name, mask(request.headers.get(name))])));
  }
  const headers = new Headers(request.headers);
  headers.set('x-vercel-forwarded-for', '233.252.0.77'); // non-secret marker the merged probe already prints
  return next({ request: { headers } });
}
