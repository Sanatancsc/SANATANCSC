// ---------- Firebase Setup ----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ✅ Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBmooWLJOs9AQrireAmEaYxj1AcXsymLwc",
  authDomain: "sanatancsc-8a640.firebaseapp.com",
  projectId: "sanatancsc-8a640",
  storageBucket: "sanatancsc-8a640.firebasestorage.app",
  messagingSenderId: "170893542539",
  appId: "1:170893542539:web:41490983d99c54d060008e",
  measurementId: "G-1V7J18KQ4P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let confirmationResult; // to store OTP verification object

// ---------- Hardcoded username/password ----------
const validUsername = "ppp";
const validPassword = "qwertyuiop";

// ---------- Login Form Event ----------
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === validUsername && password === validPassword) {
    sendOtpToAdmin();
  } else {
    document.getElementById("error-message").style.display = "block";
  }
});

// ---------- Send OTP to fixed number ----------
function sendOtpToAdmin() {
  // Initialize reCAPTCHA
  window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
    size: "invisible"
  }, auth);

  const phoneNumber = "+918607422781"; // ✅ Your fixed mobile number

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent to admin phone!");
      document.getElementById("otpSection").style.display = "block";
    })
    .catch((error) => {
      alert("Error sending OTP: " + error.message);
    });
}

// ---------- Verify OTP ----------
document.getElementById("verifyOtp").addEventListener("click", function () {
  const otp = document.getElementById("otpInput").value.trim();

  if (!confirmationResult) {
    alert("Please request OTP first!");
    return;
  }

  confirmationResult.confirm(otp)
    .then(() => {
      // ✅ OTP correct → redirect immediately
      sessionStorage.setItem("authToken", "secure_token_here");
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("loginTime", Date.now());
      alert("OTP verified! Redirecting...");
      window.location.href = "dashboard";
    })
    .catch((error) => {
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







