import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  // If cookie exists → allow (simple login)
  if (!token) {
    res.writeHead(302, { Location: "/login/index.html" });
    res.end();
    return;
  }

  // Serve private dashboard
  const filePath = path.join(process.cwd(), "private", "dashboard.html");
  const html = fs.readFileSync(filePath, "utf8");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}
