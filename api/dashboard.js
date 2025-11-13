// /api/dashboard.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Parse cookie
  const cookieHeader = req.headers.cookie || "";
  const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  // Replace this check with your real validation (DB/JWT) if needed
  const isValid = token && globalThis.activeTokens && globalThis.activeTokens.has(token);

  if (!isValid) {
    // Not logged in → server-side redirect to login
    res.writeHead(302, { Location: "/index.html", "Cache-Control": "no-store" });
    res.end();
    return;
  }

  // Logged in → read and send dashboard HTML
  const filePath = path.join(process.cwd(), "dashboard", "index.html");
  try {
    const html = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Dashboard not found");
  }
}
