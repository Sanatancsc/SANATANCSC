import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Read auth cookie
  const cookieHeader = req.headers.cookie || "";
  const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  // Validate token
  const isValid =
    token &&
    globalThis.activeTokens &&
    globalThis.activeTokens.has(token);

  if (!isValid) {
    // Not logged in → redirect to login
    res.writeHead(302, { Location: "/index.html" });
    res.end();
    return;
  }

  // Serve PRIVATE dashboard file
  const filePath = path.join(process.cwd(), "private", "dashboard.html");
  const html = fs.readFileSync(filePath, "utf8");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}
