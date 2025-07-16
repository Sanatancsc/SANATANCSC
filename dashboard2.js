// 🔐 Authentication Check
(function () {
  const isLoggedIn = sessionStorage.getItem('authToken');
  if (!isLoggedIn) {
    window.location.href = '/index.html'; // Redirect if not logged in
  }
})();

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
    const url = 'https://fasal.haryana.gov.in/home/login';
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

document.getElementById('FamilyUpdations').addEventListener('click', function () {
    const url = 'https://ppp-office.haryana.gov.in/FamilyUpdations/FamilyUpdations';
    window.open(url, '_blank');
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