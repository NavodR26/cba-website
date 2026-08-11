import { NextRequest, NextResponse } from 'next/server';

// CBA committee preview access — individual logins
// No session/cookie — credentials are required on every refresh or new tab
const VALID_USERS: Record<string, string> = {
  CBA_01: 'CBA_01',
  CBA_JK: 'CBA_01jk',
  CBA_LC: 'CBA_02LC',
  CBA_FW: 'CBA_03FW',
  CBA_EB: 'CBA_04EB',
  CBA_AS: 'CBA_05AS',
  CBA_CT: 'CBA_06CT',
  CBA_BC: 'CBA_07bc',
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (VALID_USERS[user] && VALID_USERS[user] === pwd) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="CBA Preview"',
    },
  });
}

// Apply to everything EXCEPT static assets and Next internals
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)).*)',
  ],
};


