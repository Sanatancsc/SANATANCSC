import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken")?.value;

  // 🔐 अगर user dashboard खोल रहा है और login नहीं है
  if (pathname.startsWith("/dashboard") && token !== "secure_token_here") {
    const loginUrl = new URL("/index.html", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ otherwise allow
  return NextResponse.next();
}
