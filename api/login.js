export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  // Hardcoded credentials (same as frontend validation)
  const validUsername = "Sanatancsc";
  const validPassword = "qwertyuiop";

  // Validate
  if (username === validUsername && password === validPassword) {
    // ✅ Token Creation
    const token = "secure_token_here";

    // ✅ Server-side validation
    res.setHeader("Set-Cookie", `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`);

    // ✅ Send JSON to frontend
    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
