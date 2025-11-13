export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || "";
  const token = cookieHeader
    ?.split(";")
    ?.map(c => c.trim())
    ?.find(c => c.startsWith("authToken="));

  const isValid = token && token.split("=")[1] === "secure_token_here";

  res.status(200).json({ authenticated: !!isValid });
}
