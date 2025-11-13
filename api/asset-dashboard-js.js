import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Auth check
  const cookieHeader = req.headers.cookie || "";
  const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  if (!token) {
    res.writeHead(302, { Location: "/login/index.html" });
    return res.end();
  }

  // Read private JS
  const filePath = path.join(process.cwd(), "private", "dashboard.js");
  try {
    const js = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "application/javascript; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(js);
  } catch (err) {
    res.writeHead(404);
    res.end("JS Not found");
  }
}
