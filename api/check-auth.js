export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const token = cookieHeader
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith("authToken="));

  const tokenValue = token ? token.split("=")[1] : null;

  // Check if token exists in memory
  const isValid =
    tokenValue &&
    globalThis.activeTokens &&
    globalThis.activeTokens.has(tokenValue);

  if (!isValid) {
    return res.status(200).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true });
}
