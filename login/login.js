// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        // 🔹 API Call
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // ✅ Store authentication token
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("loginTime", Date.now());

            // ✅ Redirect to dashboard
            window.location.href = "dashboard";
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        console.error("Login error:", error);
        document.getElementById("error-message").style.display = "block";
    }
});


(function () {
    let devtoolsOpened = false;
    let checkInterval;

    // 🚫 Mark site as blocked in sessionStorage
    function blockPermanently() {
        localStorage.setItem("blocked", "true");
        window.location.replace("devtoolsdetected"); // make sure this file exists
    }

    // ✅ On every page load, check if already blocked
    if (localStorage.getItem("blocked") === "true") {
        window.location.replace("devtoolsdetected");
    }

    function checkDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpened) {
                devtoolsOpened = true;
                clearInterval(checkInterval);

                // 🚫 Redirect & block for session
                blockPermanently();
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


