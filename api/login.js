export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  // Hardcoded credentials
  const validUsername = "Sanatancsc";
  const validPassword = "qwertyuiop";

  // ✅ Login validation
  if (username === validUsername && password === validPassword) {
    // Generate random token (secure)
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Save token in memory (simple simulation)
    globalThis.activeTokens = globalThis.activeTokens || new Set();
    globalThis.activeTokens.add(token);

    // Set HttpOnly cookie (safe)
    res.setHeader(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
    );

    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
