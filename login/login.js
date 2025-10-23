// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
            sessionStorage.setItem("authToken", data.token);
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("loginTime", Date.now());
            window.location.href = "dashboard";
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        alert("Server error. Please try again later.");
        console.error(error);
    }
});
