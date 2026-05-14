// ================= LANGUAGE SYSTEM =================
const translations = {
  en: {
    title: "Stay Safe Online",
    subtitle: "Learn. Detect. Report.",

    awareness: "Awareness",
    phishing: "Phishing Test",
    quiz: "Take Quiz",
    report: "Report Fraud"
  },

  as: {
    title: "অনলাইনত সুৰক্ষিত থাকক",
    subtitle: "শিকক। চিনাক্ত কৰক। অভিযোগ কৰক।",

    awareness: "সচেতনতা",
    phishing: "ফিশিং পৰীক্ষা",
    quiz: "কুইজ লওক",
    report: "প্ৰৱঞ্চনা অভিযোগ কৰক"
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  const t = translations[lang];

  // INDEX PAGE
  if (document.getElementById("title")) {
    document.getElementById("title").innerText = t.title;
    document.getElementById("subtitle").innerText = t.subtitle;

    if (document.getElementById("btn-awareness"))
      document.getElementById("btn-awareness").innerText = t.awareness;

    if (document.getElementById("btn-phishing"))
      document.getElementById("btn-phishing").innerText = t.phishing;

    if (document.getElementById("btn-quiz"))
      document.getElementById("btn-quiz").innerText = t.quiz;

    if (document.getElementById("btn-report"))
      document.getElementById("btn-report").innerText = t.report;
  }
}

// LOAD LANGUAGE + PHISHING
window.onload = () => {
  let lang = localStorage.getItem("lang") || "en";

  if (document.getElementById("lang")) {
    document.getElementById("lang").value = lang;

    document.getElementById("lang").addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  setLanguage(lang);

  // Load phishing only if exists
  loadScenario();
};

// ================= PHISHING SIMULATOR =================

let current = 0;

const scenarios = [
  {
    text: "Your bank account will be blocked. Click here to update details immediately.",
    type: "phishing",
    explanation: "This message creates urgency and fear. Banks never ask you to click such links."
  },
  {
    text: "You have won 10,000 rupees! Click here to claim your reward now.",
    type: "phishing",
    explanation: "Reward scams try to attract users with money. They are fake."
  },
  {
    text: "Dear user, your KYC is pending. Update now to avoid account suspension.",
    type: "phishing",
    explanation: "Scammers use fear tactics. Always use official apps."
  },
  {
    text: "Your parcel delivery failed. Track here: delivery-update-now.com",
    type: "phishing",
    explanation: "Fake delivery links are common scams."
  },
  {
    text: "Visit your bank branch for account verification.",
    type: "safe",
    explanation: "This is safe because it does not ask for sensitive info or links."
  }
];

function loadScenario() {
  let box = document.getElementById("scenario-box");
  let explanation = document.getElementById("explanation");
  let nextBtn = document.getElementById("nextBtn");

  if (!box) return;

  box.innerText = scenarios[current].text;
  explanation.innerHTML = "";
  nextBtn.style.display = "none";
}

function answer(userAnswer) {
  let explanation = document.getElementById("explanation");
  let nextBtn = document.getElementById("nextBtn");

  let correct = scenarios[current].type;

  if (userAnswer === correct) {
    explanation.innerHTML = `
      <div class="alert alert-success">
        Correct!<br><br>
        ${scenarios[current].explanation}
      </div>
    `;
  } else {
    explanation.innerHTML = `
      <div class="alert alert-danger">
        Incorrect.<br><br>
        ${scenarios[current].explanation}
      </div>
    `;
  }

  nextBtn.style.display = "inline-block";
}

function nextScenario() {
  current++;

  if (current >= scenarios.length) {
    document.getElementById("scenario-box").innerText = "You completed all simulations!";
    document.getElementById("explanation").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";

    document.querySelectorAll(".btn-success, .btn-danger").forEach(btn => {
      btn.style.display = "none";
    });

    return;
  }

  loadScenario();
}

// ================= QUIZ =================

let userAnswers = {};

function select(el, question, value) {
  let options = el.parentElement.querySelectorAll(".option");
  options.forEach(o => o.classList.remove("selected"));

  el.classList.add("selected");
  userAnswers[question] = value;
}

function submitQuiz() {
  let score = 0;

  const answers = {
    q1: { correct: "No", text: "OTP should never be shared." },
    q2: { correct: "No", text: "Unknown links are unsafe." },
    q3: { correct: "Yes", text: "Always verify URLs." },
    q4: { correct: "No", text: "Banks never ask passwords." },
    q5: { correct: "No", text: "Do not approve unknown requests." }
  };

  let resultHTML = "";

  Object.keys(answers).forEach((q, index) => {
    let user = userAnswers[q];
    let correct = answers[q].correct;

    if (user === correct) {
      score++;
      resultHTML += `
        <div class="alert alert-success p-2">
          Q${index + 1}: Correct<br>
          ${answers[q].text}
        </div>
      `;
    } else {
      resultHTML += `
        <div class="alert alert-danger p-2">
          Q${index + 1}: Wrong<br>
          Correct: ${correct}<br>
          ${answers[q].text}
        </div>
      `;
    }
  });

  document.getElementById("scoreText").innerText = `${score} / 5`;
  document.getElementById("resultDetails").innerHTML = resultHTML;
  document.getElementById("resultModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("resultModal").style.display = "none";
}

// ================= REPORT =================

function submitReport() {
  let type = document.getElementById("type");
  let desc = document.getElementById("desc");
  let amount = document.getElementById("amount");

  if (!type || !desc || !amount) return;

  let reports = JSON.parse(localStorage.getItem("reports")) || [];

  reports.push({
    type: type.value,
    desc: desc.value,
    amount: amount.value,
    date: new Date()
  });

  localStorage.setItem("reports", JSON.stringify(reports));

  alert("Report saved!");

  type.value = "";
  desc.value = "";
  amount.value = "";
}