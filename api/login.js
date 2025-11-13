export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, message: "Only POST method allowed" });
    }

    const { username, password } = req.body;

    // Hardcoded valid credentials (you can replace this with database lookup)
    const validUsername = "Sanatancsc";
    const validPassword = "qwertyuiop";

    if (username === validUsername && password === validPassword) {
        return res.status(200).json({
            success: true,
            token: "secure_token_here",
            message: "Login successful!"
        });
    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }
}
