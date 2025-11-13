export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const token = cookieHeader
    ?.split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("authToken="));

  const isValid = token && token.split("=")[1] === "secure_token_here";

  if (!isValid) {
    // ❌ Not logged in → redirect to login
    res.writeHead(302, {
      Location: "/login/index.html",
      "Cache-Control": "no-store"
    });
    res.end();
    return;
  }

  // ✅ Logged in → allow access
  res.writeHead(302, {
    Location: "/dashboard/index.html",
    "Cache-Control": "no-store"
  });
  res.end();
}
