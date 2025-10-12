// Import Firebase modules (modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmooWLJOs9AQrireAmEaYxj1AcXsymLwc",
  authDomain: "sanatancsc-8a640.firebaseapp.com",
  projectId: "sanatancsc-8a640",
  storageBucket: "sanatancsc-8a640.firebasestorage.app",
  messagingSenderId: "170893542539",
  appId: "1:170893542539:web:41490983d99c54d060008e",
  measurementId: "G-1V7J18KQ4P"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Hardcoded username/password
const validUsername = "Sanatancsc";
const validPassword = "qwertyuiop";

let confirmationResult;

// Login form
document.getElementById("loginForm").addEventListener("submit", (e) => {
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
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible'
  });

  const phoneNumber = '+918607422781'; // Your fixed number

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent!");
      document.getElementById("otpSection").style.display = "block";
    })
    .catch((error) => {
      alert("OTP Error: " + error.message);
      console.error(error);
    });
}

// Verify OTP
document.getElementById("verifyOtp").addEventListener("click", () => {
  const otp = document.getElementById("otpInput").value.trim();
  confirmationResult.confirm(otp)
    .then(() => {
      sessionStorage.setItem("authToken", "secure_token_here");
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("loginTime", Date.now());
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Invalid OTP: " + error.message);
      console.error(error);
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










