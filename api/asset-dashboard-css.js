import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Auth check
  const cookieHeader = req.headers.cookie || "";
  const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  if (!token) {
    res.writeHead(302, { Location: "/index.html" });
    return res.end();
  }

  // Read private CSS
  const filePath = path.join(process.cwd(), "private", "dashboard.css");
  try {
    const css = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");  // prevent storing
    res.end(css);
  } catch (err) {
    res.writeHead(404);
    res.end("CSS Not found");
  }
}
