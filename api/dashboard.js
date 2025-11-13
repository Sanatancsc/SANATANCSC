import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const tokenMatch = cookieHeader.match(/authToken=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  if (token !== "secure_token_here") {
    res.writeHead(302, { Location: "/index.html" });
    res.end();
    return;
  }

  // Serve private dashboard
  const filePath = path.join(process.cwd(), "dashboard", "index.html");
  const html = fs.readFileSync(filePath, "utf8");

  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
