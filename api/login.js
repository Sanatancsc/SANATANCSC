export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  // Hardcoded credentials
  const validUsername = "Sanatancsc";
  const validPassword = "qwertyuiop";

  // Validate credentials
  if (username === validUsername && password === validPassword) {
    const token = "secure_token_here";

    // ✅ Set secure cookie
    res.setHeader(
      "Set-Cookie",
      `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
    );

    // ✅ Response to frontend
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
