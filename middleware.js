import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken")?.value;

  // 🔐 
  if (pathname.startsWith("/dashboard") && token !== "secure_token_here") {
    const loginUrl = new URL("/login/index.html", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ 
  return NextResponse.next();
}
