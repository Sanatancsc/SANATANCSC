export default function handler(req, res) {
  // Get cookies
  const cookieHeader = req.headers.cookie || "";
  const token = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("authToken="));

  const isValid = token && token.split("=")[1] === "secure_token_here";

  if (!isValid) {
    // Not logged in → redirect to login page
    res.writeHead(302, {
      "Location": "/index.html",
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
    });
    res.end(`
      <html><head><title>Redirecting...</title></head>
      <body><h2>Redirecting to <a href="/index.html">login</a></h2></body></html>
    `);
    return;
  }

  // Logged in → redirect to real dashboard
  res.writeHead(302, { "Location": "/dashboard.html" });
  res.end();
}
