// Hardcoded username and password
const validUsername = "Sanatancsc";
const validPassword = "qwertyuiop";

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the username and password input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if the entered username and password match the valid credentials
    if (username === validUsername && password === validPassword) {
        // ✅ Store authentication token
        sessionStorage.setItem('authToken', 'secure_token_here');

        // ✅ Store login time and status in session storage
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("loginTime", Date.now());

        // ✅ Redirect to the dashboard after successful login
        window.location.href = "dashboard.html";
    } else {
        // Show error message if credentials are incorrect
        document.getElementById("error-message").style.display = "block";
    }
});

(function () {
    let devtoolsOpened = false;
    let checkInterval;

    function checkDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpened) {
                devtoolsOpened = true;
                clearInterval(checkInterval);

                // Show error message instead of redirect
                document.body.innerHTML = `
                    <div style="background:#2980b9;color:white;text-align:center;padding:50px;font-family:Arial;">
                        <h1>⚠️ Developer Tools Detected</h1>
                        <p>For security reasons, this application cannot be accessed while developer tools are open.</p>
                        <p>Please close DevTools and refresh the page.</p>
                        <a href="index.html" style="color:yellow;text-decoration:none;font-weight:bold;">🔙 Go Back Home</a>
                    </div>
                `;
            }
        } else {
            devtoolsOpened = false;
        }
    }

    // Run check every 500ms
    checkInterval = setInterval(checkDevTools, 500);

    // Disable right-click
    window.addEventListener("contextmenu", e => e.preventDefault());

    // Disable common DevTools shortcuts
    window.addEventListener("keydown", e => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
            (e.ctrlKey && e.key.toLowerCase() === "u")
        ) {
            e.preventDefault();
        }
    });
})();
