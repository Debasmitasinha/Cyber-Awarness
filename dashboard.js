// ===== DASHBOARD =====

window.onload = () => {
  checkSecurity();
};

// SECURITY STATUS
function checkSecurity() {
  let status = document.getElementById("securityStatus");

  let random = Math.random();

  if (random > 0.7) {
    status.innerText = "⚠️ Suspicious Activity Detected";
    status.style.color = "red";
  } else {
    status.innerText = "🔒 All Safe";
    status.style.color = "green";
  }
}

// TRANSACTION FLOW
function startTransaction() {
  let amt = document.getElementById("txnAmount").value;
  let to = document.getElementById("txnTo").value;

  if (!amt || amt <= 0) {
    alert("Enter valid amount");
    return;
  }

  if (!to) {
    alert("Enter recipient details");
    return;
  }

  alert(`Proceeding to send ₹${amt} to ${to}`);
}

// LOGOUT
function logout() {
  alert("Logged out successfully");
  window.location.href = "index.html";
}

function toggleMenu() {
  let menu = document.getElementById("dropdown");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}