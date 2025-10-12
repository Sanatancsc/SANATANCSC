// Initialize Firebase
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();

// Hardcoded username/password
const validUsername = "ppp";
const validPassword = "qwertyuiop";
var confirmationResult;

// Login form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === validUsername && password === validPassword) {
    document.getElementById("loginForm").style.display = "none";
    sendOtp();
  } else {
    document.getElementById("error-message").style.display = "block";
  }
});

// Send OTP to fixed number
function sendOtp() {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible'
  });
  var phoneNumber = '+918607422781'; // Your fixed number
  firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
    .then(function (result) {
      confirmationResult = result;
      alert("OTP sent!");
      document.getElementById("otpSection").style.display = "block";
    }).catch(function (error) {
      alert(error.message);
    });
}

// Verify OTP
document.getElementById("verifyOtp").addEventListener("click", function () {
  var otp = document.getElementById("otpInput").value.trim();
  confirmationResult.confirm(otp).then(function (result) {
    sessionStorage.setItem("authToken", "secure_token_here");
    sessionStorage.setItem("loggedIn", true);
    sessionStorage.setItem("loginTime", Date.now());
    window.location.href = "dashboard.html";
  }).catch(function (error) {
    alert("Invalid OTP: " + error.message);
  });
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









