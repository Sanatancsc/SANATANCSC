export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  // 🔐 Hardcoded valid credentials
  const validUsername = "Sanatancsc";
  const validPassword = "qwertyuiop";

  // ✅ Validation
  if (username === validUsername && password === validPassword) {
    const token = "secure_token_here";

    // ✅ Set secure cookie
    res.setHeader(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`
    );

    return res.status(200).json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
