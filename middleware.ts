import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const cookeis = getSessionCookie(req);
  const { nextUrl } = req;
  if (!cookeis) return NextResponse.redirect(new URL("/auth/login", req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
