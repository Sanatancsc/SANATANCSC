// Hardcoded username and password
const validUsername = "Vikash";
const validPassword = "Vikash";

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
        window.location.href = "dashboard";
    } else {
        // Show error message if credentials are incorrect
        document.getElementById("error-message").style.display = "block";
    }
});

// Detect floating DevTools (via console.log timing trick)
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function () {
      blockPage();
    }
  });
  console.log(element);

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



