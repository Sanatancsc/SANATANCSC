export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { username, password } = req.body;

  // ✅ Securely stored credentials (never exposed in frontend)
  const validUsername = "Sanatancsc";
  const validPassword = "qwertyuiop";

  // ✅ Subscription expiry (set your date/time here)
  const expiryDate = new Date("2025-10-23T7:01:00Z"); // example expiry UTC
  const now = new Date();

  if (now > expiryDate) {
    return res.status(403).json({ success: false, message: "Subscription expired" });
  }

  // ✅ Validate login
  if (username === validUsername && password === validPassword) {
    const token = Math.random().toString(36).substring(2, 12);
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
}
