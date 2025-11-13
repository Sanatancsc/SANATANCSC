// Automatically convert Family ID and Username input to uppercase as user types or pastes
document.addEventListener('DOMContentLoaded', function () {
    const familyIdInput = document.getElementById('familyIdInput');
    const usernameInput = document.getElementById('usernameInput');

    if (familyIdInput) {
        familyIdInput.addEventListener('input', () => {
            familyIdInput.value = familyIdInput.value.toUpperCase();
        });
    }

    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            usernameInput.value = usernameInput.value.toUpperCase();
        });
    }
});

// Helper function to handle Family ID-based link opening
function openUrlWithFamilyId(urlTemplate, familyId) {
    if (familyId) {
        const formattedUrl = urlTemplate.replace('{familyId}', encodeURIComponent(familyId));
        window.open(formattedUrl, '_blank');
    } else {
        alert('Please enter a Family ID.');
    }
}

// Helper function to handle Username-based link opening
function openUrlWithUsername(urlTemplate, username) {
    if (username) {
        const formattedUrl = urlTemplate.replace('{username}', encodeURIComponent(username));
        window.open(formattedUrl, '_blank');
    } else {
        alert('Please enter a Username.');
    }
}

// Event listeners for sidebar options
document.getElementById('familyIdFinder').addEventListener('click', function () {
    const familyId = document.getElementById('familyIdInput').value;
    const url = 'https://ppp-office.haryana.gov.in/Family/PrintFamilyDetails?familyId={familyId}';
    openUrlWithFamilyId(url, familyId);
});

document.getElementById('aadharLink').addEventListener('click', function () {
    const url = 'https://ekshatipurti.haryana.gov.in';
    window.open(url, '_blank');
});

document.getElementById('correctionModule').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/CorrectionModule/SearchFamily';
    window.open(url, '_blank');
});

document.getElementById('split').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/SplitFamilyMembers';
    window.open(url, '_blank');
});

document.getElementById('merge').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/IntegrateFamilies';
    window.open(url, '_blank');
});

document.getElementById('TrackBPL').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/TrackStatus/TrackStatus';
    window.open(url, '_blank');
});

document.getElementById('FamilyUpdations').addEventListener('click', function () {
    const familyId = document.getElementById('familyIdInput').value;
    const url = 'https://ppp-office.haryana.gov.in/familyupdations/SearchFamily?familyId={familyId}';
    openUrlWithFamilyId(url, familyId);
});

document.getElementById('Father/Mother').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/Father_MotherNameCorrection/NameCorrection';
    window.open(url, '_blank');
});

document.getElementById('AddressUpdate').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/Address/AddressCorrection';
    window.open(url, '_blank');
});

document.getElementById('forgetpassword').addEventListener('click', function () {
    const username = document.getElementById('usernameInput').value;
    if (!username) {
        alert('Please enter a username.');
        return; // Stop further execution
    }
    const otpUrl = `https://hrylabour.gov.in/home/sendBocwOtp/${username}`;
    const resetUrl = `https://hrylabour.gov.in/home/resetBocwPassword/mobile/${username}`;
    openUrlWithUsername(otpUrl, username);
    setTimeout(() => {
        openUrlWithUsername(resetUrl, username);
    }, 3000);
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



