const today = new Date("2026-07-09T00:00:00");
const storageKey = "barangay-data-management-v1";

const seedData = {
  residents: [
    {
      id: 1,
      firstName: "Maria",
      lastName: "Santos",
      birthdate: "1954-03-14",
      civilStatus: "Widowed",
      address: "12 Sampaguita Street",
      purok: "Purok 1",
      contact: "0917 555 0182",
      email: "maria.santos@example.com",
      householdHead: "Maria Santos",
      voter: true,
      pwd: false,
      senior: true
    },
    {
      id: 2,
      firstName: "Jose",
      lastName: "Reyes",
      birthdate: "1987-08-22",
      civilStatus: "Married",
      address: "28 Mabini Avenue",
      purok: "Purok 2",
      contact: "0928 441 7720",
      email: "jose.reyes@example.com",
      householdHead: "Jose Reyes",
      voter: true,
      pwd: false,
      senior: false
    },
    {
      id: 3,
      firstName: "Ana",
      lastName: "Dela Cruz",
      birthdate: "2009-11-07",
      civilStatus: "Single",
      address: "8 Rizal Extension",
      purok: "Purok 3",
      contact: "",
      email: "",
      householdHead: "Lorna Dela Cruz",
      voter: false,
      pwd: false,
      senior: false
    },
    {
      id: 4,
      firstName: "Ramon",
      lastName: "Garcia",
      birthdate: "1975-01-29",
      civilStatus: "Married",
      address: "44 Bonifacio Road",
      purok: "Purok 1",
      contact: "0999 218 6311",
      email: "ramon.garcia@example.com",
      householdHead: "Ramon Garcia",
      voter: true,
      pwd: true,
      senior: false
    },
    {
      id: 5,
      firstName: "Elena",
      lastName: "Lim",
      birthdate: "1998-05-18",
      civilStatus: "Single",
      address: "3 Narra Lane",
      purok: "Purok 4",
      contact: "0916 902 3371",
      email: "elena.lim@example.com",
      householdHead: "Edwin Lim",
      voter: true,
      pwd: false,
      senior: false
    },
    {
      id: 6,
      firstName: "Ben",
      lastName: "Mendoza",
      birthdate: "2017-12-02",
      civilStatus: "Single",
      address: "71 Ilang-Ilang Street",
      purok: "Purok 2",
      contact: "",
      email: "",
      householdHead: "Karen Mendoza",
      voter: false,
      pwd: false,
      senior: false
    }
  ],
  households: [],
  cases: [
    {
      id: 1,
      number: "BLOT-2026-001",
      complainant: "Jose Reyes",
      respondent: "Ramon Garcia",
      date: "2026-07-01",
      status: "Mediation",
      details: "Boundary dispute submitted for barangay mediation."
    },
    {
      id: 2,
      number: "BLOT-2026-002",
      complainant: "Elena Lim",
      respondent: "Unknown",
      date: "2026-07-05",
      status: "Open",
      details: "Report of damaged street light near Narra Lane."
    }
  ],
  broadcasts: [
    {
      id: 1,
      type: "Barangay Announcement Blast",
      title: "Barangay assembly reminder",
      message: "All residents are invited to attend the barangay assembly at the covered court.",
      date: "2026-07-12",
      time: "08:00",
      audience: "All residents",
      status: "Scheduled"
    },
    {
      id: 2,
      type: "Weather Alert",
      title: "Heavy rain advisory",
      message: "Please secure belongings, monitor drainage areas, and avoid flooded roads.",
      date: "2026-07-09",
      time: "17:30",
      audience: "All puroks",
      status: "Ready"
    }
  ],
  portalRegistrations: [],
  portalRequests: [],
  auditLogs: [],
  activity: [
    "Maria Santos requested Certificate of Indigency.",
    "Purok 2 household count updated.",
    "BLOT-2026-002 added to blotter log."
  ]
};

let data = normalizeData(loadData());

function normalizeData(source) {
  source.residents ||= [];
  source.households ||= [];
  source.cases ||= [];
  source.broadcasts ||= [];
  source.portalRegistrations ||= [];
  source.portalRequests ||= [];
  source.auditLogs ||= [];
  source.activity ||= [];
  return source;
}

const certificateTemplates = {
  "Brgy. Clearance.docx": { label: "Barangay Clearance", numberLabel: "Barangay Clearance No:" },
  "Brgy. Residency.docx": { label: "Certificate of Residency", numberLabel: "Barangay Certification No:" },
  "INDIGENCY SAMPLE.docx": { label: "Barangay Indigency" },
  "LOW INCOME SAMPLE.docx": { label: "Certificate of Low Income" },
  "GOOD MORAL SAMPLE.docx": { label: "Barangay Good Moral" },
  "GOOD MORAL SAMPLE (1).docx": { label: "Barangay Good Moral" },
  "RSBSA CERTIFCATION SAMPLE.docx": { label: "Certification" },
  "FJS SAMPLE.docx": { label: "Barangay Certification", numberLabel: "Barangay Certificate Number:" },
  "Cert. Oneness.docx": { label: "Certificate of Oneness" },
  "Bussiness Closure.docx": { label: "Barangay Certification" }
};

const views = [...document.querySelectorAll(".view")];
const navItems = [...document.querySelectorAll(".nav-item")];
const pageTitle = document.querySelector("#pageTitle");
const primaryAction = document.querySelector("#primaryAction");
const residentDialog = document.querySelector("#residentDialog");
const residentForm = document.querySelector("#residentForm");
const residentDialogTitle = document.querySelector("#residentDialogTitle");
const householdDialog = document.querySelector("#householdDialog");
const householdForm = document.querySelector("#householdForm");
const householdDialogTitle = document.querySelector("#householdDialogTitle");
const caseDialog = document.querySelector("#caseDialog");
const caseForm = document.querySelector("#caseForm");
const caseDialogTitle = document.querySelector("#caseDialogTitle");
const broadcastForm = document.querySelector("#broadcastForm");
const broadcastType = document.querySelector("#broadcastType");
const citizenRegistrationForm = document.querySelector("#citizenRegistrationForm");
const portalMessage = document.querySelector("#portalMessage");
const portalBirthdate = document.querySelector("#portalBirthdate");
const portalAge = document.querySelector("#portalAge");
const citizenRequestForm = document.querySelector("#citizenRequestForm");
const loginDialog = document.querySelector("#loginDialog");
const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#loginBtn");
const loginMessage = document.querySelector("#loginMessage");
const loginScreen = document.querySelector("#loginScreen");
const entryLoginForm = document.querySelector("#entryLoginForm");
const entryLoginMessage = document.querySelector("#entryLoginMessage");
let loggedInUser = "";

function completeLogin(username) {
  loggedInUser = username;
  document.body.classList.remove("locked");
  loginScreen.hidden = true;
  loginBtn.textContent = `Logged in: ${username}`;
  addAuditLog("Admin signed in", username, "Management System", "Dashboard access granted");
  saveData();
}

function validateLogin(username, password, messageElement) {
  if (username === "admin" && password === "passw") {
    completeLogin(username);
    return true;
  }
  messageElement.textContent = "Invalid username or password.";
  return false;
}

function loadData() {
  const saved = localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : structuredClone(seedData);
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function addAuditLog(action, actor = loggedInUser || "admin", source = "Management System", details = "") {
  data.auditLogs.unshift({
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    source,
    actor,
    action,
    details
  });
  data.auditLogs = data.auditLogs.slice(0, 300);
}

function syncDataFromStorage() {
  data = normalizeData(loadData());
  renderAll();
}

function ageFromBirthdate(birthdate) {
  const date = new Date(`${birthdate}T00:00:00`);
  let age = today.getFullYear() - date.getFullYear();
  const monthDelta = today.getMonth() - date.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < date.getDate())) age -= 1;
  return age;
}

function fullName(resident) {
  return `${resident.firstName} ${resident.lastName}`;
}

function setView(id) {
  views.forEach((view) => view.classList.toggle("active", view.id === id));
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === id));
  pageTitle.textContent = document.querySelector(`[data-view="${id}"] span`).textContent;
  if (id === "blotter") primaryAction.textContent = "Add case";
  else if (id === "broadcast") primaryAction.textContent = "Schedule announcement";
  else if (id === "portal") primaryAction.textContent = "Review registrations";
  else if (id === "portalRequests") primaryAction.textContent = "Review requests";
  else if (id === "auditLogs") primaryAction.textContent = "Review logs";
  else if (id === "households") primaryAction.textContent = "Add household";
  else primaryAction.textContent = "Add resident";
}

function residentTags(resident) {
  const age = ageFromBirthdate(resident.birthdate);
  const tags = [];
  if (resident.voter) tags.push(["Voter", "blue"]);
  if (resident.senior || age >= 60) tags.push(["Senior", "gold"]);
  if (resident.pwd) tags.push(["PWD", "red"]);
  if (age < 18) tags.push(["Minor", ""]);
  return tags;
}

function renderDashboard() {
  const residents = data.residents;
  document.querySelector("#totalResidents").textContent = residents.length;
  document.querySelector("#totalHouseholds").textContent = groupHouseholds().length;
  document.querySelector("#totalSeniors").textContent = residents.filter((resident) => resident.senior || ageFromBirthdate(resident.birthdate) >= 60).length;
  document.querySelector("#openCases").textContent = data.cases.filter((item) => item.status !== "Resolved").length;

  const counts = residents.reduce((map, resident) => {
    map[resident.purok] = (map[resident.purok] || 0) + 1;
    return map;
  }, {});
  const max = Math.max(...Object.values(counts), 1);
  document.querySelector("#purokBars").innerHTML = Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([purok, count]) => `
      <div class="bar-row">
        <strong>${purok}</strong>
        <div class="bar-track"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
        <span>${count}</span>
      </div>
    `)
    .join("");

  document.querySelector("#activityList").innerHTML = data.activity
    .map((item) => `<div class="activity-item"><strong>${item}</strong><div class="meta">Updated this month</div></div>`)
    .join("");
}

function renderResidents() {
  const query = document.querySelector("#residentSearch").value.trim().toLowerCase();
  const filter = document.querySelector("#residentFilter").value;
  const rows = data.residents.filter((resident) => {
    const age = ageFromBirthdate(resident.birthdate);
    const searchable = `${fullName(resident)} ${resident.address} ${resident.purok} ${resident.civilStatus}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesFilter =
      filter === "all" ||
      (filter === "voter" && resident.voter) ||
      (filter === "senior" && (resident.senior || age >= 60)) ||
      (filter === "pwd" && resident.pwd) ||
      (filter === "minor" && age < 18);
    return matchesQuery && matchesFilter;
  });

  document.querySelector("#residentRows").innerHTML = rows.map((resident) => {
    const age = ageFromBirthdate(resident.birthdate);
    const tags = residentTags(resident).map(([label, color]) => `<span class="tag ${color}">${label}</span>`).join("");
    return `
      <tr>
        <td><strong>${fullName(resident)}</strong><div class="meta">${resident.contact || "No contact recorded"}</div></td>
        <td>${age}</td>
        <td>${resident.address}</td>
        <td>${resident.purok}</td>
        <td>${resident.civilStatus}</td>
        <td><div class="tags">${tags || "<span class='tag'>Resident</span>"}</div></td>
        <td>
          <div class="row-actions">
            <button class="small-button" data-action="edit-resident" data-id="${resident.id}" type="button">Edit</button>
            <button class="small-button danger" data-action="delete-resident" data-id="${resident.id}" type="button">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function groupHouseholds() {
  const grouped = new Map();
  data.households.forEach((household) => {
    grouped.set(`standalone:${household.id}`, {
      key: `standalone:${household.id}`,
      id: household.id,
      head: household.householdHead,
      address: household.address,
      purok: household.purok,
      members: []
    });
  });
  data.residents.forEach((resident) => {
    const key = `${resident.householdHead || fullName(resident)}|${resident.address}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        key,
        head: resident.householdHead || fullName(resident),
        address: resident.address,
        purok: resident.purok,
        members: []
      });
    }
    grouped.get(key).members.push(resident);
  });
  return [...grouped.values()];
}

function renderHouseholds() {
  const query = document.querySelector("#householdSearch").value.trim().toLowerCase();
  const households = groupHouseholds().filter((household) => `${household.head} ${household.address} ${household.purok}`.toLowerCase().includes(query));
  document.querySelector("#householdGrid").innerHTML = households.map((household) => `
    <article class="household-card">
      <h3>${household.head}</h3>
      <div class="meta">${household.address} · ${household.purok}</div>
      <p><strong>${household.members.length}</strong> member${household.members.length === 1 ? "" : "s"}</p>
      <div class="tags">${household.members.length ? household.members.map((resident) => `<span class="tag">${fullName(resident)}</span>`).join("") : "<span class='tag'>No members encoded</span>"}</div>
      <div class="row-actions">
        <button class="small-button" data-action="edit-household" data-key="${escapeHtml(household.key)}" type="button">Edit</button>
        <button class="small-button danger" data-action="delete-household" data-key="${escapeHtml(household.key)}" type="button">Delete</button>
      </div>
    </article>
  `).join("");
}

function renderCertificateOptions(filter = "") {
  const select = document.querySelector("#certificateResident");
  const currentResident = select.value;
  const query = filter.trim().toLowerCase();
  const residents = data.residents.filter((resident) => !query || fullName(resident).toLowerCase().includes(query));
  select.innerHTML = residents.map((resident) => `<option value="${resident.id}">${fullName(resident)}</option>`).join("");
  if (currentResident) select.value = currentResident;
  if (!residents.length) {
    document.querySelector("#certificatePreview").classList.remove("word-page");
    document.querySelector("#certificatePreview").innerHTML = `
      <div class="cert-logo-row">
        <img class="cert-logo" src="assets/municipal-logo.jpeg" alt="Municipal logo" />
        <img class="cert-logo" src="assets/barangay-logo.png" alt="Barangay logo" />
      </div>
      <p>Republic of the Philippines</p>
      <h2>Barangay Jurisdiccion</h2>
      <h3>Certificate Preview</h3>
      <p>${data.residents.length ? "No resident matched the search." : "Add a resident to prepare a certificate."}</p>
    `;
    return;
  }
  renderCertificate();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function residentMergeFields(resident) {
  const age = ageFromBirthdate(resident.birthdate);
  const zoneMatch = resident.purok.match(/\d+/);
  const zone = zoneMatch ? zoneMatch[0] : resident.purok;
  return {
    name: fullName(resident).toUpperCase(),
    displayName: fullName(resident),
    age,
    address: resident.address,
    birthdate: resident.birthdate,
    civilStatus: resident.civilStatus.toUpperCase(),
    civilStatusText: resident.civilStatus,
    zone,
    purok: resident.purok,
    pronoun: "he/she",
    possessive: "his/her"
  };
}

function commonHeaderHtml(officeName = "Office of the Punong Barangay") {
  return `
    <div class="cert-header">
      <div class="cert-masthead">
        <img class="cert-logo" src="assets/municipal-logo.jpeg" alt="Municipal logo" />
        <div class="cert-heading-text">
          <p>Republic of the Philippines</p>
          <p>Province of Cagayan</p>
          <p>Municipality of Amulung</p>
          <h2>Barangay Jurisdiccion</h2>
        </div>
        <img class="cert-logo" src="assets/barangay-logo.png" alt="Barangay logo" />
      </div>
      <h3 class="office-line">${escapeHtml(officeName)}</h3>
    </div>
  `;
}

function fjsHeaderHtml() {
  return `
    <div class="fjs-revision">Revised as of 16 June 2021</div>
    <div class="fjs-header">
      <div class="fjs-logo-row">
        <img class="fjs-logo" src="assets/municipal-logo.jpeg" alt="Municipal logo" />
        <img class="fjs-bagong-logo" src="assets/BAGONG-PILIPINAS.png" alt="Bagong Pilipinas logo" />
        <img class="fjs-logo" src="assets/barangay-logo.png" alt="Barangay logo" />
      </div>
      <p>Republic of the Philippines</p>
      <p>Province of Cagayan</p>
      <p>Municipality of Amulung</p>
      <h2>Barangay Jurisdiccion</h2>
      <h3>Office of the Punong Barangay</h3>
      <div class="fjs-equals">==============================================================</div>
    </div>
  `;
}

function paragraph(text, className = "") {
  return `<p class="${className}">${escapeHtml(text)}</p>`;
}

function certificateLineClass(selectedFile, line, index) {
  if (selectedFile === "RSBSA CERTIFCATION SAMPLE.docx" && line.includes("HON. ROMEO")) return "rsbsa-agri-name";
  if (selectedFile === "RSBSA CERTIFCATION SAMPLE.docx" && index > 0 && line.includes("Brgy. Kagawad")) return "rsbsa-agri-title";
  if (selectedFile === "INDIGENCY SAMPLE.docx" && line.includes("________________")) return "indigency-sign-line";
  if (selectedFile === "INDIGENCY SAMPLE.docx" && line.includes("Signature over Printed Name")) return "indigency-sign-label";
  return index > 0 && !line.includes(":") ? "indent" : "";
}

function templateLines(fileName, fields, purpose) {
  const purposeText = purpose || "Legal Purposes";
  const issued = "Given this ____ day of _____________________, 2026 at Barangay Jurisdiccion, Amulung, Cagayan.";
  const residentLine = `${fields.name}, ${fields.age} Years Old, Filipino, ${fields.civilStatus}, and a bona fide resident of Zone ${fields.zone}, Barangay Jurisdiccion, Amulung, Cagayan.`;

  const templates = {
    "Brgy. Clearance.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that the person whose name, picture and signature/thumb mark appears below is a resident of this barangay.`,
      `NAME: ${fields.name}`,
      `ADDRESS: ZONE ${fields.zone}, JURISDICCION, AMULUNG, CAGAYAN, 3505`,
      `DATE OF BIRTH: ${fields.birthdate}`,
      `AGE: ${fields.age}`,
      `CIVIL STATUS: ${fields.civilStatus}`,
      "Left Thumb     Right Thumb     Applicant's Signature/Thumb mark",
      "Further certify that this person is of good moral character and has no unquestionable reputation within the community.",
      `This certification is being issued upon the request of the above-named person as a requirement for ${purposeText}.`,
      "Issued this ____ day of ___________, 2026 at Jurisdiccion, Amulung, Cagayan."
    ],
    "Brgy. Residency.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, ${fields.age} Years Old, Filipino, MALE/FEMALE, ${fields.civilStatus}, born and raised on ${fields.birthdate}, is a bona fide resident of Zone ${fields.zone} barangay Jurisdiccion, Amulung, Cagayan and ${fields.pronoun} is a PERMANENT RESIDENT of this barangay.`,
      `Further Certify that Based on records of this office, ${fields.pronoun} had been staying in this barangay since _____________ up to PRESENT.`,
      `This certification is being issued upon the request of the above-named person for as a requirements for ${purposeText}.`,
      issued
    ],
    "Bussiness Closure.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, ${fields.age} Years Old, Filipino, Male/Female, ${fields.civilStatus}, and bonafide resident of Zone ${fields.zone} barangay Jurisdiccion, Amulung, Cagayan.`,
      "This is to further certify that she owned a ___________________________ (Establishment) located at Zone ___, of this barangay and this store was already CLOSE since November 2023 up to present.",
      `This certification is being issued upon the request of the above-named person for those whose name and signature appeared below as a requirements for ${purposeText}.`,
      "Given this _________ day of _______________, 202__ at Barangay Jurisdiccion, Amulung, Cagayan."
    ],
    "Cert. Oneness.docx": [
      "TO WHOM IT MY CONCERN:",
      `This is to certify that ${fields.name}, a legal age, ${fields.civilStatus}, and bonafide resident of Zone ${fields.zone} of this Barangay Jurisdiccion, Amulung, Cagayan.`,
      `This is to further certify that ${fields.name} and ______________________________________ is same person.`,
      `This certification is being issued upon the request of the above-named person for those whose name and signature appeared below as a requirements for ${purposeText}.`,
      issued
    ],
    "FJS SAMPLE.docx": [
      "(First Time Jobseekers Assistance Act - RA 11261)",
      `This is to CERTIFY that, ${fields.name}, a resident of Purok/Zone ${fields.zone}, Barangay Jurisdiccion, Amulung, Cagayan, for ____ years and _____ months, is a qualified availee of RA 11261 or the First Time Jobseekers Assistance Act of 2019.`,
      `I FURTHER CERTIFY that, the holder/bearer was informed of ${fields.possessive} rights, including the duties and responsibilities accorded by RA 11261 through the Oath of Understanding ${fields.pronoun} has signed and executed in the presence of Barangay Official/s.`,
      "SIGNED this _____________ day of _________________, 2026, in the Barangay Jurisdiccion, Amulung, Cagayan.",
      "This CERTIFICATION is valid only until _____________________, 2027, one (1) year from the issuance.",
      "Witnessed by: _________________________ Sangguniang Barangay Member"
    ],
    "GOOD MORAL SAMPLE.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, ${fields.age} Years Old, Male/Female, Filipino, ${fields.civilStatus}, and resident of Zone ${fields.zone} barangay Jurisdiccion, Amulung, Cagayan, personally known to me as a low-abiding citizen of this barangay.`,
      `${fields.pronoun.charAt(0).toUpperCase() + fields.pronoun.slice(1)} has not been involved in any derogatory record or immoral activites within the community, and as recognized as a person of good moral character.`,
      `This certification is being issued upon the request of the interested party for ${purposeText}.`,
      "issued this _____ day of _________________, 2026 at Barangay Jurisdiccion, Amulung, Cagayan."
    ],
    "GOOD MORAL SAMPLE (1).docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, ${fields.age} Years Old, Male/Female, Filipino, ${fields.civilStatus}, and resident of Zone ${fields.zone} barangay Jurisdiccion, Amulung, Cagayan, personally known to me as a low-abiding citizen of this barangay.`,
      `${fields.pronoun.charAt(0).toUpperCase() + fields.pronoun.slice(1)} has not been involved in any derogatory record or immoral activites within the community, and as recognized as a person of good moral character.`,
      `This certification is being issued upon the request of the interested party for ${purposeText}.`,
      "issued this _____ day of _________________, 2026 at Barangay Jurisdiccion, Amulung, Cagayan."
    ],
    "INDIGENCY SAMPLE.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, ${fields.age} Years Old, Filipino, and a bona fide resident of Zone ${fields.zone}, Barangay Jurisdiccion, Amulung, Cagayan.`,
      `This is to further certify that ${fields.pronoun} is considered as one of the indigent family residing in this barangay.`,
      `This certification is being issued upon the request of the above-named person for those whose name and signature appeared below as a requirements for ${purposeText}.`,
      issued,
      "____________________________",
      "Signature over Printed Name"
    ],
    "LOW INCOME SAMPLE.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, ${fields.age} Years Old, Filipino, and a bona fide resident of Zone ${fields.zone}, Barangay Jurisdiccion, Amulung, Cagayan.`,
      "This is to further certify that the above-named person belong to labor/daily paid sector whose income fall below the minimum wage.",
      `This certification is being issued upon the request of the above-named person as a requirements for seeking any available assistance from the government or ${purposeText}.`,
      issued,
      "___________________________",
      "Signature Over Printed Name"
    ],
    "RSBSA CERTIFCATION SAMPLE.docx": [
      "TO WHOM IT MAY CONCERN:",
      `This is to certify that ${fields.name}, of legal age, Filipino, Male/Female and a bona fide resident of Barangay Jurisdiccion, Amulung, Cagayan and hereto described as follows:`,
      "RSBSA NO: ___________________________________",
      "LOT #     Verified Area     Ownership (RO/T/L)     Land Owner     Farm Location     Commodity",
      "Lot 1                                      JURISDICCION AMULUNG CAGAYAN",
      "Lot 2",
      "Lot 3",
      "Lot 4",
      `This certification is issued for the request of above mentioned named for Registry System for Basic Sector in Agriculture (RSBSA) of the Department of Agriculture ${purposeText}.`,
      issued,
      "HON. ROMEO C. ARESTA",
      "Brgy. Kagawad/ Comm. On Agriculture"
    ]
  };

  return templates[fileName] || templates["Brgy. Clearance.docx"];
}

function renderBarangayClearance(fields, template) {
  return `
    ${commonHeaderHtml()}
    <p class="cert-number">${escapeHtml(template.numberLabel)}<br />2026-</p>
    <h3 class="cert-title clearance-title">Barangay Clearance</h3>
    <div class="clearance-body">
      <p class="concern"><strong>TO WHOM IT MAY CONCERN:</strong></p>
      <p class="clearance-intro">This is to certify that the person whose name, picture and signature/thumb mark appears below is a resident of this barangay.</p>
      <div class="clearance-info">
        <div class="clearance-fields">
          <p><strong>NAME:</strong> <span>${escapeHtml(fields.name)}</span></p>
          <p><strong>ADDRESS:</strong> <span>ZONE ${escapeHtml(fields.zone)}, JURISDICCION, AMULUNG, CAGAYAN, 3505</span></p>
          <p><strong>DATE OF BIRTH:</strong> <span>${escapeHtml(fields.birthdate)}</span></p>
          <p><strong>AGE:</strong> <span>${escapeHtml(fields.age)}</span></p>
          <p><strong>CIVIL STATUS:</strong> <span>${escapeHtml(fields.civilStatus)}</span></p>
        </div>
        <div class="picture-box">1X1<br />PICTURE</div>
      </div>
      <div class="thumb-row">
        <div><span class="thumb-box"></span><small>Left Thumb</small></div>
        <div><span class="thumb-box"></span><small>Right Thumb</small></div>
        <div class="signature-box"><span></span><small>Applicant's Signature/Thumb mark</small></div>
      </div>
      <p class="clearance-paragraph">Further certify that this person is a good moral character and no unquestionable reputation within the community.</p>
      <p class="clearance-paragraph">This certification is being issued upon the request of the above-named person for those whose name and signature appeared as a requirements for LEGAL purposes it may serve him/her best.</p>
      <p class="clearance-paragraph">Issued this ____ day of ___________, 2026 at Jurisdiccion, Amulung, Cagayan.</p>
    </div>
    <div class="cert-signature">
      <strong>MA. LOUELLA C. RICARDO</strong>
      <span>Punong Barangay</span>
    </div>
  `;
}

function renderFjsCertificate(fields, template) {
  return `
    ${fjsHeaderHtml()}
    <p class="fjs-number">${escapeHtml(template.numberLabel)}<br />2026-</p>
    <h3 class="fjs-title">Barangay Certification</h3>
    <p class="fjs-subtitle">(First Time Jobseekers Assistance Act - RA 11261)</p>
    <div class="fjs-body">
      <p>This is to <strong>CERTIFY</strong> that, <span class="fjs-line">${escapeHtml(fields.name)}</span>, a resident of <strong>Purok/Zone</strong> <span class="fjs-short">${escapeHtml(fields.zone)}</span>, Barangay <strong>Jurisdiccion, Amulung, Cagayan</strong>, for <span class="fjs-short">____</span> years and <span class="fjs-short">____</span> months, is a qualified availee of RA 11261 or the First Time Jobseekers Assistance Act of 2019.</p>
      <p><strong>I FURTHER CERTIFY</strong> that, the holder/bearer was informed of his/her rights, including the duties and responsibilities accorded by RA 11261 through the Oath of Understanding he/she has signed and executed in the presence of Barangay Officials.</p>
      <p><strong>SIGNED</strong> this <span class="fjs-short">____</span> day of <span class="fjs-line">_________________</span>, <strong>2026</strong>, in the Barangay Jurisdiccion, Amulung, Cagayan.</p>
      <p>This <strong>CERTIFICATION</strong> is valid only until <span class="fjs-line">_________________</span>, <strong>2027</strong>, one (1) year from the issuance.</p>
    </div>
    <div class="fjs-signature">
      <strong>MA. LOUELLA C. RICARDO</strong>
      <span>Punong Barangay</span>
    </div>
    <div class="fjs-witness">
      <p>Witnessed by:</p>
      <span></span>
      <small>Sangguniang Barangay Member</small>
    </div>
  `;
}

function renderCertificate(event) {
  if (event) event.preventDefault();
  const resident = data.residents.find((item) => item.id === Number(document.querySelector("#certificateResident").value));
  if (!resident) return;
  const selectedFile = document.querySelector("#certificateType").value;
  const template = certificateTemplates[selectedFile];
  const type = template?.label || selectedFile.replace(".docx", "");
  const purpose = document.querySelector("#certificatePurpose").value;
  const fields = residentMergeFields(resident);
  const lines = templateLines(selectedFile, fields, purpose);
  document.querySelector("#certificatePreview").classList.add("word-page");
  document.querySelector("#certificatePreview").classList.toggle("clearance-page", selectedFile === "Brgy. Clearance.docx");
  document.querySelector("#certificatePreview").classList.toggle("fjs-page", selectedFile === "FJS SAMPLE.docx");
  if (selectedFile === "Brgy. Clearance.docx") {
    document.querySelector("#certificatePreview").innerHTML = renderBarangayClearance(fields, template);
    if (event?.type === "submit") {
      data.activity.unshift(`${fullName(resident)} generated ${type}.`);
      addAuditLog("Certificate generated", loggedInUser || "admin", "Management System", `${fullName(resident)} · ${type}`);
      data.activity = data.activity.slice(0, 5);
      saveData();
      renderDashboard();
    }
    return;
  }
  if (selectedFile === "FJS SAMPLE.docx") {
    document.querySelector("#certificatePreview").innerHTML = renderFjsCertificate(fields, template);
    if (event?.type === "submit") {
      data.activity.unshift(`${fullName(resident)} generated ${type}.`);
      addAuditLog("Certificate generated", loggedInUser || "admin", "Management System", `${fullName(resident)} · ${type}`);
      data.activity = data.activity.slice(0, 5);
      saveData();
      renderDashboard();
    }
    return;
  }
  document.querySelector("#certificatePreview").innerHTML = `
    ${commonHeaderHtml(selectedFile === "Bussiness Closure.docx" ? "Office of the Barangay Punong Barangay" : "Office of the Punong Barangay")}
    ${template?.numberLabel ? `<p class="cert-number">${escapeHtml(template.numberLabel)}<br />2026-</p>` : ""}
    <h3 class="cert-title">${escapeHtml(type)}</h3>
    <div class="cert-lines">
      ${lines.map((line, index) => paragraph(line, certificateLineClass(selectedFile, line, index))).join("")}
    </div>
    <div class="cert-signature">
      <strong>MA. LOUELLA C. RICARDO</strong>
      <span>Punong Barangay</span>
    </div>
    ${selectedFile === "Bussiness Closure.docx" || selectedFile === "RSBSA CERTIFCATION SAMPLE.docx" ? `
      <div class="cert-footer">
        <span>Paid Under:</span>
        <span>O.R. Number: _______________</span>
        <span>CTC Number: _______________</span>
        <span>Issued on: _______________</span>
        <span>Issued at: Jurisdiccion, Amulung, Cagayan</span>
      </div>
    ` : ""}
  `;
  if (event?.type === "submit") {
    data.activity.unshift(`${fullName(resident)} generated ${type}.`);
    addAuditLog("Certificate generated", loggedInUser || "admin", "Management System", `${fullName(resident)} · ${type}`);
    data.activity = data.activity.slice(0, 5);
    saveData();
    renderDashboard();
  }
}

function renderCases() {
  const query = document.querySelector("#caseSearch").value.trim().toLowerCase();
  const cases = data.cases.filter((item) => `${item.number} ${item.complainant} ${item.respondent} ${item.status}`.toLowerCase().includes(query));
  document.querySelector("#caseList").innerHTML = cases.map((item) => `
    <article class="case-card">
      <header>
        <div>
          <h3>${item.number}</h3>
          <div class="meta">${item.date}</div>
        </div>
        <span class="tag ${item.status === "Open" ? "red" : item.status === "Resolved" ? "blue" : "gold"}">${item.status}</span>
      </header>
      <p><strong>Complainant:</strong> ${item.complainant}</p>
      <p><strong>Respondent:</strong> ${item.respondent}</p>
      <p>${item.details}</p>
      <div class="row-actions">
        <button class="small-button" data-action="edit-case" data-id="${item.id}" type="button">Edit</button>
        <button class="small-button danger" data-action="delete-case" data-id="${item.id}" type="button">Delete</button>
      </div>
    </article>
  `).join("");
}

function alertTone(type) {
  if (type === "Weather Alert") return "blue";
  if (type === "Earthquake Alert" || type === "Emergency Notification") return "red";
  return "gold";
}

function formatSchedule(item) {
  const date = item.date || "Unscheduled";
  const time = item.time || "";
  return `${date}${time ? ` at ${time}` : ""}`;
}

function normalizePhone(value) {
  return String(value || "").replace(/[^\d+]/g, "");
}

function residentsForAudience(audience) {
  return data.residents.filter((resident) => {
    const age = ageFromBirthdate(resident.birthdate);
    if (audience === "All residents" || audience === "All puroks") return true;
    if (audience === "Senior citizens") return resident.senior || age >= 60;
    if (audience === "PWD residents") return resident.pwd;
    return resident.purok === audience;
  });
}

function broadcastRecipients(item) {
  const residents = residentsForAudience(item.audience);
  const phoneResidents = residents
    .map((resident) => ({
      name: fullName(resident),
      phone: normalizePhone(resident.contact)
    }))
    .filter((resident) => resident.phone);
  return {
    email: residents.map((resident) => resident.email).filter(Boolean),
    phone: phoneResidents.map((resident) => resident.phone),
    phoneResidents
  };
}

function broadcastMessage(item) {
  return `[${item.type}] ${item.title}\n\n${item.message}\n\nSchedule: ${formatSchedule(item)}\nAudience: ${item.audience}\n- Barangay Jurisdiccion`;
}

function deliveryLinks(item) {
  const recipients = broadcastRecipients(item);
  const subject = encodeURIComponent(`${item.type}: ${item.title}`);
  const body = encodeURIComponent(broadcastMessage(item));
  const emailHref = recipients.email.length ? `mailto:?bcc=${encodeURIComponent(recipients.email.join(","))}&subject=${subject}&body=${body}` : "";
  const smsBody = encodeURIComponent(broadcastMessage(item));
  const smsReceivers = recipients.phone.map((phone) => encodeURIComponent(phone));
  const groupSmsHref = smsReceivers.length ? `sms:${smsReceivers.join(";")}?&body=${smsBody}` : "";
  const alternateGroupSmsHref = smsReceivers.length ? `sms:${smsReceivers.join(",")}?&body=${smsBody}` : "";
  return { ...recipients, emailHref, smsBody, groupSmsHref, alternateGroupSmsHref };
}

function renderBroadcasts() {
  const list = document.querySelector("#broadcastList");
  document.querySelector("#scheduledCount").textContent = `${data.broadcasts.length} scheduled`;
  list.innerHTML = data.broadcasts.length ? data.broadcasts
    .slice()
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .map((item) => {
      const links = deliveryLinks(item);
      return `
      <article class="broadcast-card" data-id="${item.id}">
        <header>
          <div>
            <span class="tag ${alertTone(item.type)}">${escapeHtml(item.type)}</span>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
          <span class="broadcast-time">${escapeHtml(formatSchedule(item))}</span>
        </header>
        <p>${escapeHtml(item.message)}</p>
        <div class="broadcast-meta">
          <span>${escapeHtml(item.audience)}</span>
          <span>${escapeHtml(item.status || "Scheduled")}</span>
        </div>
        <div class="delivery-summary">
          <span>${links.email.length} email recipient${links.email.length === 1 ? "" : "s"}</span>
          <span>${links.phone.length} phone recipient${links.phone.length === 1 ? "" : "s"}</span>
        </div>
        <div class="row-actions">
          <a class="small-button link-action ${links.emailHref ? "" : "disabled"}" href="${links.emailHref || "#"}" data-action="send-email">Send email</a>
          <a class="small-button link-action ${links.groupSmsHref ? "" : "disabled"}" href="${links.groupSmsHref || "#"}" data-action="send-all-sms">Send SMS to all</a>
          <a class="small-button link-action ${links.alternateGroupSmsHref ? "" : "disabled"}" href="${links.alternateGroupSmsHref || "#"}" data-action="send-all-sms-alt">Try alternate SMS</a>
          <button class="small-button ${links.phone.length ? "" : "disabled"}" data-action="copy-all-sms" data-id="${item.id}" type="button">Copy all numbers</button>
          <button class="small-button danger" data-action="delete-broadcast" data-id="${item.id}" type="button">Delete</button>
        </div>
        <div class="receiver-list">
          <strong>SMS receivers from resident records</strong>
          <span class="receiver-note">All listed numbers are automatically selected for Send SMS to all.</span>
          ${links.phoneResidents.length ? links.phoneResidents.map((resident) => `
            <a class="receiver-chip" href="sms:${encodeURIComponent(resident.phone)}?&body=${links.smsBody}">
              <span>${escapeHtml(resident.name)}</span>
              <small>${escapeHtml(resident.phone)}</small>
            </a>
          `).join("") : "<span class='meta'>No saved phone numbers for this audience.</span>"}
        </div>
      </article>
    `;
    }).join("") : `
      <div class="empty-state">
        <strong>No scheduled announcements</strong>
        <span>Create a barangay broadcast alert to add it to the queue.</span>
      </div>
    `;
}

function registrationFullName(registration) {
  return `${registration.firstName} ${registration.middleName ? `${registration.middleName} ` : ""}${registration.lastName}`.trim();
}

function filePreviewHtml(file) {
  if (!file?.dataUrl) return "<span class='meta'>No file uploaded</span>";
  if (file.type?.startsWith("image/")) {
    return `<a class="upload-preview" href="${file.dataUrl}" target="_blank" rel="noreferrer"><img src="${file.dataUrl}" alt="${escapeHtml(file.name)}" /><span>${escapeHtml(file.name)}</span></a>`;
  }
  return `<a class="small-button link-action" href="${file.dataUrl}" target="_blank" rel="noreferrer">View ${escapeHtml(file.name)}</a>`;
}

function renderPortalRegistrations() {
  const queue = document.querySelector("#portalAdminQueue");
  const pending = data.portalRegistrations.filter((item) => item.status === "Pending Verification").length;
  const total = data.portalRegistrations.length;
  document.querySelector("#pendingRegistrationCount").textContent = `${pending} pending · ${total} total`;
  queue.innerHTML = data.portalRegistrations.length ? data.portalRegistrations
    .slice()
    .sort((a, b) => {
      if (a.status === "Pending Verification" && b.status !== "Pending Verification") return -1;
      if (a.status !== "Pending Verification" && b.status === "Pending Verification") return 1;
      return b.submittedAt.localeCompare(a.submittedAt);
    })
    .map((item) => `
      <article class="portal-card ${item.status === "Approved" ? "approved" : item.status === "Rejected" ? "rejected" : ""}">
        <header>
          <div>
            <span class="tag ${item.status === "Approved" ? "blue" : item.status === "Rejected" ? "red" : "gold"}">${escapeHtml(item.status)}</span>
            <h3>${escapeHtml(registrationFullName(item))}</h3>
            <div class="meta">Submitted ${escapeHtml(item.submittedAt)} · ${escapeHtml(item.email)} · ${escapeHtml(item.contact)}</div>
          </div>
        </header>
        <p class="status-help">${item.status === "Approved" ? "This citizen can now sign in to the Citizen Portal." : item.status === "Rejected" ? "This application was rejected. Click Approve and Activate if you want to allow this citizen to sign in." : item.status === "Additional Information Requested" ? "Waiting for more information. You can still approve this account when ready." : "This account is waiting for barangay verification."}</p>
        <details>
          <summary>View submitted information</summary>
          <div class="portal-detail-grid">
            <div><strong>Personal</strong><span>${escapeHtml(item.sex)}, ${escapeHtml(item.civilStatus)}, ${escapeHtml(item.age)} years old</span></div>
            <div><strong>Address</strong><span>${escapeHtml(item.address)}</span></div>
            <div><strong>Occupation</strong><span>${escapeHtml(item.occupation)}</span></div>
            <div><strong>Nationality</strong><span>${escapeHtml(item.nationality)}</span></div>
            <div><strong>Voter status</strong><span>${escapeHtml(item.voterStatus)}${item.voterId ? ` · ${escapeHtml(item.voterId)}` : ""}</span></div>
            <div><strong>Household</strong><span>${escapeHtml(item.householdHead)} · ${escapeHtml(item.relationshipToHead)} · ${escapeHtml(item.familyMembers)} member(s)</span></div>
            <div><strong>Special categories</strong><span>${item.categories.length ? item.categories.map(escapeHtml).join(", ") : "None"}</span></div>
            <div><strong>Emergency contact</strong><span>${escapeHtml(item.emergencyContact)} · ${escapeHtml(item.emergencyRelationship)} · ${escapeHtml(item.emergencyNumber)}</span></div>
          </div>
          <div class="upload-grid">
            <div><strong>Valid ID</strong>${filePreviewHtml(item.validId)}</div>
            <div><strong>Selfie with ID</strong>${filePreviewHtml(item.selfieId)}</div>
          </div>
          ${item.note ? `<p class="admin-note"><strong>Admin note:</strong> ${escapeHtml(item.note)}</p>` : ""}
        </details>
        <div class="row-actions">
          <button class="small-button approve-action" data-action="approve-registration" data-id="${item.id}" type="button">${item.status === "Approved" ? "Approved" : "Approve and Activate"}</button>
          <button class="small-button" data-action="request-registration-info" data-id="${item.id}" type="button">Request additional information</button>
          <button class="small-button danger" data-action="reject-registration" data-id="${item.id}" type="button">Reject</button>
        </div>
      </article>
    `).join("") : `
      <div class="empty-state">
        <strong>No citizen registrations yet</strong>
        <span>New portal applications will appear here for barangay verification.</span>
      </div>
    `;
}

function approvedCitizenByEmail(email) {
  const normalized = email.trim().toLowerCase();
  return data.portalRegistrations.find((item) => item.status === "Approved" && item.email.toLowerCase() === normalized)
    || data.residents.find((resident) => resident.email?.toLowerCase() === normalized);
}

function renderPortalRequests() {
  const list = document.querySelector("#portalRequestList");
  const count = data.portalRequests.length;
  document.querySelector("#portalRequestCount").textContent = `${count} request${count === 1 ? "" : "s"}`;
  list.innerHTML = data.portalRequests.length ? data.portalRequests
    .slice()
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .map((item) => `
      <article class="portal-card">
        <span class="tag ${item.status === "Ready for release" ? "blue" : "gold"}">${escapeHtml(item.status)}</span>
        <h3>${escapeHtml(item.documentType)}</h3>
        <div class="meta">${escapeHtml(item.name)} · ${escapeHtml(item.email)} · ${escapeHtml(item.submittedAt)} · ${escapeHtml(item.paymentMethod || "Cash on Pickup")} · ${escapeHtml(item.feeLabel || "Amount not set")}</div>
        <p>${escapeHtml(item.purpose)}</p>
        <div class="row-actions">
          <button class="small-button" data-action="mark-request-processing" data-id="${item.id}" type="button">Mark processing</button>
          <button class="small-button approve-action" data-action="mark-request-ready" data-id="${item.id}" type="button">Approve / Ready for Pickup</button>
        </div>
      </article>
    `).join("") : `
      <div class="empty-state">
        <strong>No document requests yet</strong>
        <span>Approved citizens can submit and track requests here.</span>
      </div>
    `;
}

function renderReports() {
  const residents = data.residents;
  const householdCount = groupHouseholds().length;
  const voters = residents.filter((resident) => resident.voter).length;
  const minors = residents.filter((resident) => ageFromBirthdate(resident.birthdate) < 18).length;
  const pwd = residents.filter((resident) => resident.pwd).length;
  const seniors = residents.filter((resident) => resident.senior || ageFromBirthdate(resident.birthdate) >= 60).length;
  document.querySelector("#demographicReport").innerHTML = [
    ["Registered voters", voters],
    ["Minors", minors],
    ["Senior citizens", seniors],
    ["PWD residents", pwd],
    ["Average household size", householdCount ? (residents.length / householdCount).toFixed(1) : "0.0"]
  ].map(([label, value]) => `<div class="report-item"><span>${label}</span><strong>${value}</strong></div>`).join("");

  document.querySelector("#quickLists").innerHTML = [
    ["Certificate-ready residents", residents.filter((resident) => resident.contact).length],
    ["Open or mediation cases", data.cases.filter((item) => item.status !== "Resolved").length],
    ["Puroks represented", new Set(residents.map((resident) => resident.purok)).size],
    ["Latest resident added", residents.length ? fullName(residents[residents.length - 1]) : "None"]
  ].map(([label, value]) => `<div class="report-item"><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function renderAuditLogs() {
  const list = document.querySelector("#auditLogList");
  const count = data.auditLogs.length;
  document.querySelector("#auditLogCount").textContent = `${count} log${count === 1 ? "" : "s"}`;
  list.innerHTML = count ? data.auditLogs.map((log) => `
    <article class="audit-log-item">
      <header>
        <div>
          <strong>${escapeHtml(log.action)}</strong>
          <div class="meta">${escapeHtml(log.timestamp)} · ${escapeHtml(log.source)} · ${escapeHtml(log.actor)}</div>
        </div>
        <span class="tag ${log.source === "Citizen Portal" ? "blue" : "gold"}">${escapeHtml(log.source)}</span>
      </header>
      ${log.details ? `<p>${escapeHtml(log.details)}</p>` : ""}
    </article>
  `).join("") : `
    <div class="empty-state">
      <strong>No audit logs yet</strong>
      <span>Citizen and management transactions will appear here.</span>
    </div>
  `;
}

function renderAll() {
  renderDashboard();
  renderResidents();
  renderHouseholds();
  renderCertificateOptions();
  renderCases();
  renderBroadcasts();
  renderPortalRegistrations();
  renderPortalRequests();
  renderReports();
  renderAuditLogs();
}

function saveResidentRecord(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const existingId = Number(values.id);
  const resident = {
    id: existingId || Date.now(),
    firstName: values.firstName,
    lastName: values.lastName,
    birthdate: values.birthdate,
    civilStatus: values.civilStatus,
    address: values.address,
    purok: values.purok,
    contact: values.contact,
    email: values.email,
    householdHead: values.householdHead || `${values.firstName} ${values.lastName}`,
    voter: Boolean(values.voter),
    pwd: Boolean(values.pwd),
    senior: Boolean(values.senior)
  };
  const index = data.residents.findIndex((item) => item.id === existingId);
  if (index >= 0) {
    data.residents[index] = resident;
    data.activity.unshift(`${fullName(resident)} updated in resident registry.`);
    addAuditLog("Resident updated", loggedInUser || "admin", "Management System", fullName(resident));
  } else {
    data.residents.push(resident);
    data.activity.unshift(`${fullName(resident)} added to resident registry.`);
    addAuditLog("Resident added", loggedInUser || "admin", "Management System", fullName(resident));
  }
  data.activity = data.activity.slice(0, 5);
  saveData();
  form.reset();
  renderAll();
}

function openResidentDialog(resident = null) {
  residentForm.reset();
  residentDialogTitle.textContent = resident ? "Edit resident" : "Add resident";
  residentForm.elements.id.value = resident?.id || "";
  residentForm.elements.firstName.value = resident?.firstName || "";
  residentForm.elements.lastName.value = resident?.lastName || "";
  residentForm.elements.birthdate.value = resident?.birthdate || "";
  residentForm.elements.civilStatus.value = resident?.civilStatus || "Single";
  residentForm.elements.address.value = resident?.address || "";
  residentForm.elements.purok.value = resident?.purok || "";
  residentForm.elements.contact.value = resident?.contact || "";
  residentForm.elements.email.value = resident?.email || "";
  residentForm.elements.householdHead.value = resident?.householdHead || "";
  residentForm.elements.voter.checked = Boolean(resident?.voter);
  residentForm.elements.pwd.checked = Boolean(resident?.pwd);
  residentForm.elements.senior.checked = Boolean(resident?.senior);
  residentDialog.showModal();
}

function deleteResident(id) {
  const resident = data.residents.find((item) => item.id === id);
  if (!resident || !confirm(`Delete resident record for ${fullName(resident)}?`)) return;
  data.residents = data.residents.filter((item) => item.id !== id);
  data.activity.unshift(`${fullName(resident)} deleted from resident registry.`);
  addAuditLog("Resident deleted", loggedInUser || "admin", "Management System", fullName(resident));
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function openHouseholdDialog(key = "") {
  const household = key ? groupHouseholds().find((item) => item.key === key) : null;
  householdForm.reset();
  householdDialogTitle.textContent = household ? "Edit household" : "Add household";
  householdForm.elements.key.value = household?.key || "";
  householdForm.elements.householdHead.value = household?.head || "";
  householdForm.elements.address.value = household?.address || "";
  householdForm.elements.purok.value = household?.purok || "";
  householdDialog.showModal();
}

function saveHouseholdRecord(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  if (!values.key) {
    data.households.push({
      id: Date.now(),
      householdHead: values.householdHead,
      address: values.address,
      purok: values.purok
    });
    data.activity.unshift(`${values.householdHead} household added.`);
    addAuditLog("Household added", loggedInUser || "admin", "Management System", values.householdHead);
    data.activity = data.activity.slice(0, 5);
    saveData();
    renderAll();
    return;
  }
  if (values.key.startsWith("standalone:")) {
    const id = Number(values.key.replace("standalone:", ""));
    data.households = data.households.map((household) => household.id === id ? {
      ...household,
      householdHead: values.householdHead,
      address: values.address,
      purok: values.purok
    } : household);
    data.activity.unshift(`${values.householdHead} household updated.`);
    addAuditLog("Household updated", loggedInUser || "admin", "Management System", values.householdHead);
    data.activity = data.activity.slice(0, 5);
    saveData();
    renderAll();
    return;
  }
  data.residents = data.residents.map((resident) => {
    const key = `${resident.householdHead || fullName(resident)}|${resident.address}`;
    if (key !== values.key) return resident;
    return {
      ...resident,
      householdHead: values.householdHead,
      address: values.address,
      purok: values.purok
    };
  });
  data.activity.unshift(`${values.householdHead} household updated.`);
  addAuditLog("Household updated", loggedInUser || "admin", "Management System", values.householdHead);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function deleteHousehold(key) {
  const household = groupHouseholds().find((item) => item.key === key);
  if (!household || !confirm(`Delete ${household.head} household and all ${household.members.length} member record(s)?`)) return;
  if (key.startsWith("standalone:")) {
    const id = Number(key.replace("standalone:", ""));
    data.households = data.households.filter((item) => item.id !== id);
    data.activity.unshift(`${household.head} household deleted.`);
    addAuditLog("Household deleted", loggedInUser || "admin", "Management System", household.head);
    data.activity = data.activity.slice(0, 5);
    saveData();
    renderAll();
    return;
  }
  const memberIds = new Set(household.members.map((resident) => resident.id));
  data.residents = data.residents.filter((resident) => !memberIds.has(resident.id));
  data.activity.unshift(`${household.head} household deleted.`);
  addAuditLog("Household deleted with members", loggedInUser || "admin", "Management System", household.head);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function saveCaseRecord(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const existingId = Number(values.id);
  const next = data.cases.length + 1;
  const existingCase = data.cases.find((caseItem) => caseItem.id === existingId);
  const item = {
    id: existingId || Date.now(),
    number: existingCase?.number || `BLOT-2026-${String(next).padStart(3, "0")}`,
    complainant: values.complainant,
    respondent: values.respondent,
    date: values.date,
    status: values.status,
    details: values.details
  };
  const index = data.cases.findIndex((caseItem) => caseItem.id === existingId);
  if (index >= 0) {
    data.cases[index] = item;
    data.activity.unshift(`${item.number} updated in blotter log.`);
    addAuditLog("Blotter case updated", loggedInUser || "admin", "Management System", item.number);
  } else {
    data.cases.push(item);
    data.activity.unshift(`${item.number} added to blotter log.`);
    addAuditLog("Blotter case added", loggedInUser || "admin", "Management System", item.number);
  }
  data.activity = data.activity.slice(0, 5);
  saveData();
  form.reset();
  renderAll();
}

function openCaseDialog(item = null) {
  caseForm.reset();
  caseDialogTitle.textContent = item ? "Edit blotter case" : "Add blotter case";
  caseForm.elements.id.value = item?.id || "";
  caseForm.elements.complainant.value = item?.complainant || "";
  caseForm.elements.respondent.value = item?.respondent || "";
  caseForm.elements.date.value = item?.date || "";
  caseForm.elements.status.value = item?.status || "Open";
  caseForm.elements.details.value = item?.details || "";
  caseDialog.showModal();
}

function deleteCase(id) {
  const item = data.cases.find((caseItem) => caseItem.id === id);
  if (!item || !confirm(`Delete blotter case ${item.number}?`)) return;
  data.cases = data.cases.filter((caseItem) => caseItem.id !== id);
  data.activity.unshift(`${item.number} deleted from blotter log.`);
  addAuditLog("Blotter case deleted", loggedInUser || "admin", "Management System", item.number);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function saveBroadcastRecord(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const item = {
    id: Date.now(),
    type: values.type,
    title: values.title,
    message: values.message,
    date: values.date,
    time: values.time,
    audience: values.audience,
    status: "Scheduled"
  };
  data.broadcasts.push(item);
  data.activity.unshift(`${item.type}: ${item.title} scheduled.`);
  addAuditLog("Broadcast scheduled", loggedInUser || "admin", "Management System", `${item.type}: ${item.title}`);
  data.activity = data.activity.slice(0, 5);
  saveData();
  form.reset();
  broadcastType.value = item.type;
  renderAll();
}

function deleteBroadcast(id) {
  const item = data.broadcasts.find((broadcast) => broadcast.id === id);
  if (!item || !confirm(`Delete scheduled announcement "${item.title}"?`)) return;
  data.broadcasts = data.broadcasts.filter((broadcast) => broadcast.id !== id);
  data.activity.unshift(`${item.title} removed from broadcast queue.`);
  addAuditLog("Broadcast deleted", loggedInUser || "admin", "Management System", item.title);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function fileToRecord(file) {
  if (!file) return Promise.resolve(null);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, dataUrl: reader.result });
    reader.onerror = () => resolve({ name: file.name, type: file.type, dataUrl: "" });
    reader.readAsDataURL(file);
  });
}

async function savePortalRegistration(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  if (values.password !== values.confirmPassword) {
    portalMessage.textContent = "Password and confirm password do not match.";
    return;
  }
  const validId = await fileToRecord(form.elements.validId.files[0]);
  const selfieId = await fileToRecord(form.elements.selfieId.files[0]);
  const categories = [
    ["senior", "Senior Citizen"],
    ["pwd", "Person with Disability (PWD)"],
    ["soloParent", "Solo Parent"],
    ["farmer", "Farmer"],
    ["fisherfolk", "Fisherfolk"],
    ["student", "Student"]
  ].filter(([key]) => values[key]).map(([, label]) => label);
  const address = `${values.houseNo} ${values.street}, ${values.purok}, ${values.barangay}, ${values.municipality}, ${values.province}`;
  const registration = {
    id: Date.now(),
    status: "Pending Verification",
    submittedAt: new Date().toLocaleString(),
    firstName: values.firstName,
    middleName: values.middleName,
    lastName: values.lastName,
    email: values.email,
    contact: values.contact,
    birthdate: values.birthdate,
    age: ageFromBirthdate(values.birthdate),
    sex: values.sex,
    civilStatus: values.civilStatus,
    nationality: values.nationality,
    occupation: values.occupation,
    religion: values.religion,
    houseNo: values.houseNo,
    street: values.street,
    purok: values.purok,
    barangay: values.barangay,
    municipality: values.municipality,
    province: values.province,
    address,
    validId,
    selfieId,
    voterStatus: values.voterStatus,
    voterId: values.voterId,
    householdHead: values.householdHead,
    relationshipToHead: values.relationshipToHead,
    familyMembers: values.familyMembers,
    categories,
    emergencyContact: values.emergencyContact,
    emergencyRelationship: values.emergencyRelationship,
    emergencyNumber: values.emergencyNumber,
    note: ""
  };
  data.portalRegistrations.unshift(registration);
  data.activity.unshift(`New resident registration submitted by ${registrationFullName(registration)}.`);
  addAuditLog("Citizen registration submitted", registrationFullName(registration), "Management System", registration.email);
  data.activity = data.activity.slice(0, 5);
  saveData();
  form.reset();
  portalAge.value = "";
  portalMessage.textContent = "Registration submitted. Status: Pending Verification.";
  renderAll();
}

function approveRegistration(id) {
  const registration = data.portalRegistrations.find((item) => item.id === id);
  if (!registration) return;
  if (registration.status === "Approved") {
    alert(`${registrationFullName(registration)} is already approved and can sign in to the Citizen Portal.`);
    return;
  }
  if (!registration.password) {
    alert("This registration has no Citizen Portal password. Ask the resident to register again using citizen-portal.html.");
    return;
  }
  registration.status = "Approved";
  registration.note = "Account approved by barangay administrator.";
  const exists = data.residents.some((resident) => resident.email && resident.email === registration.email);
  if (!exists) {
    data.residents.push({
      id: Date.now(),
      firstName: registration.firstName,
      lastName: registration.lastName,
      birthdate: registration.birthdate,
      civilStatus: registration.civilStatus,
      address: registration.address,
      purok: registration.purok,
      contact: registration.contact,
      email: registration.email,
      householdHead: registration.householdHead,
      voter: registration.voterStatus === "Registered voter",
      pwd: registration.categories.includes("Person with Disability (PWD)"),
      senior: registration.categories.includes("Senior Citizen"),
      farmer: registration.categories.includes("Farmer")
    });
  }
  data.activity.unshift(`${registrationFullName(registration)} approved for Citizen Portal.`);
  addAuditLog("Citizen account approved", loggedInUser || "admin", "Management System", registrationFullName(registration));
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function rejectRegistration(id) {
  const registration = data.portalRegistrations.find((item) => item.id === id);
  if (!registration) return;
  const note = prompt("Reason for rejection:", registration.note || "");
  if (note === null) return;
  registration.status = "Rejected";
  registration.note = note || "Rejected by barangay administrator.";
  data.activity.unshift(`${registrationFullName(registration)} registration rejected.`);
  addAuditLog("Citizen account rejected", loggedInUser || "admin", "Management System", `${registrationFullName(registration)} · ${registration.note}`);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function requestRegistrationInfo(id) {
  const registration = data.portalRegistrations.find((item) => item.id === id);
  if (!registration) return;
  const note = prompt("What additional information is needed?", registration.note || "");
  if (note === null) return;
  registration.status = "Additional Information Requested";
  registration.note = note || "Please submit additional information.";
  data.activity.unshift(`Additional information requested from ${registrationFullName(registration)}.`);
  addAuditLog("Additional registration information requested", loggedInUser || "admin", "Management System", `${registrationFullName(registration)} · ${registration.note}`);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

function saveCitizenDocumentRequest(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const citizen = approvedCitizenByEmail(values.email);
  if (!citizen) {
    alert("This email is not approved yet. The account must be approved by the barangay before requesting documents.");
    return;
  }
  const request = {
    id: Date.now(),
    name: citizen.firstName ? fullName(citizen) : registrationFullName(citizen),
    email: values.email,
    documentType: values.documentType,
    purpose: values.purpose,
    status: "Submitted",
    submittedAt: new Date().toLocaleString()
  };
  data.portalRequests.unshift(request);
  data.activity.unshift(`${request.name} requested ${request.documentType} through Citizen Portal.`);
  addAuditLog("Document request created by admin", loggedInUser || "admin", "Management System", `${request.name} · ${request.documentType}`);
  data.activity = data.activity.slice(0, 5);
  saveData();
  form.reset();
  renderAll();
}

function updatePortalRequestStatus(id, status) {
  const request = data.portalRequests.find((item) => item.id === id);
  if (!request) return;
  request.status = status;
  data.activity.unshift(`${request.documentType} request for ${request.name} marked ${status}.`);
  addAuditLog("Document request status updated", loggedInUser || "admin", "Management System", `${request.name} · ${request.documentType} · ${status}`);
  data.activity = data.activity.slice(0, 5);
  saveData();
  renderAll();
}

async function copyAllSmsNumbers(id) {
  const item = data.broadcasts.find((broadcast) => broadcast.id === id);
  if (!item) return;
  const recipients = broadcastRecipients(item);
  if (!recipients.phone.length) {
    alert("No saved phone numbers found for this broadcast audience.");
    return;
  }
  const text = `${recipients.phone.join("; ")}\n\n${broadcastMessage(item)}`;
  try {
    await navigator.clipboard.writeText(text);
    alert("All receiver phone numbers and the broadcast message were copied.");
  } catch {
    prompt("Copy all receiver phone numbers and message:", text);
  }
}

function exportCsv() {
  const activeView = document.querySelector(".view.active").id;
  const source = activeView === "blotter" ? data.cases : activeView === "broadcast" ? data.broadcasts : data.residents;
  if (!source.length) return;
  const headers = Object.keys(source[0]);
  const csv = [
    headers.join(","),
    ...source.map((row) => headers.map((header) => JSON.stringify(row[header] ?? "")).join(","))
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${activeView}-export.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
primaryAction.addEventListener("click", () => {
  const activeView = document.querySelector(".view.active").id;
  if (activeView === "blotter") openCaseDialog();
  else if (activeView === "broadcast") broadcastForm.querySelector("input[name='title']").focus();
  else if (activeView === "portal") document.querySelector("#portalAdminQueue").scrollIntoView({ behavior: "smooth", block: "start" });
  else if (activeView === "portalRequests") document.querySelector("#portalRequestList").scrollIntoView({ behavior: "smooth", block: "start" });
  else if (activeView === "auditLogs") document.querySelector("#auditLogList").scrollIntoView({ behavior: "smooth", block: "start" });
  else if (activeView === "households") openHouseholdDialog();
  else openResidentDialog();
});
document.querySelector("#addCaseBtn").addEventListener("click", () => openCaseDialog());
document.querySelector("#addHouseholdBtn").addEventListener("click", () => openHouseholdDialog());
residentForm.addEventListener("submit", (event) => {
  if (event.submitter.value === "cancel") return;
  event.preventDefault();
  saveResidentRecord(residentForm);
  residentDialog.close();
});
householdForm.addEventListener("submit", (event) => {
  if (event.submitter.value === "cancel") return;
  event.preventDefault();
  saveHouseholdRecord(householdForm);
  householdDialog.close();
});
caseForm.addEventListener("submit", (event) => {
  if (event.submitter.value === "cancel") return;
  event.preventDefault();
  saveCaseRecord(caseForm);
  caseDialog.close();
});
broadcastForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveBroadcastRecord(broadcastForm);
});
citizenRegistrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  savePortalRegistration(citizenRegistrationForm);
});
citizenRequestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveCitizenDocumentRequest(citizenRequestForm);
});
portalBirthdate.addEventListener("input", () => {
  portalAge.value = portalBirthdate.value ? ageFromBirthdate(portalBirthdate.value) : "";
});
document.querySelector("#clearBroadcastForm").addEventListener("click", () => broadcastForm.reset());
document.querySelectorAll(".alert-type-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".alert-type-card").forEach((item) => item.classList.toggle("active", item === card));
    broadcastType.value = card.dataset.alertType;
    broadcastForm.querySelector("input[name='title']").focus();
  });
});
document.querySelector("#residentRows").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "edit-resident") openResidentDialog(data.residents.find((resident) => resident.id === id));
  if (button.dataset.action === "delete-resident") deleteResident(id);
});
document.querySelector("#householdGrid").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  if (button.dataset.action === "edit-household") openHouseholdDialog(button.dataset.key);
  if (button.dataset.action === "delete-household") deleteHousehold(button.dataset.key);
});
document.querySelector("#caseList").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "edit-case") openCaseDialog(data.cases.find((item) => item.id === id));
  if (button.dataset.action === "delete-case") deleteCase(id);
});
document.querySelector("#broadcastList").addEventListener("click", (event) => {
  const disabledLink = event.target.closest("a.disabled");
  if (disabledLink) {
    event.preventDefault();
    return;
  }
  const button = event.target.closest("button[data-action]");
  if (button?.classList.contains("disabled")) return;
  if (button?.dataset.action === "copy-all-sms") copyAllSmsNumbers(Number(button.dataset.id));
  if (button?.dataset.action === "delete-broadcast") deleteBroadcast(Number(button.dataset.id));
});
document.querySelector("#portalAdminQueue").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "approve-registration") approveRegistration(id);
  if (button.dataset.action === "reject-registration") rejectRegistration(id);
  if (button.dataset.action === "request-registration-info") requestRegistrationInfo(id);
});
document.querySelector("#portalRequestList").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === "mark-request-processing") updatePortalRequestStatus(id, "Processing");
  if (button.dataset.action === "mark-request-ready") updatePortalRequestStatus(id, "Ready for release");
});
document.querySelector("#certificateForm").addEventListener("submit", renderCertificate);
document.querySelector("#certificateType").addEventListener("change", renderCertificate);
document.querySelector("#certificateResident").addEventListener("change", renderCertificate);
document.querySelector("#certificatePurpose").addEventListener("input", renderCertificate);
document.querySelector("#certificateSearchBtn").addEventListener("click", () => renderCertificateOptions(document.querySelector("#certificateNameSearch").value));
document.querySelector("#certificateNameSearch").addEventListener("input", () => renderCertificateOptions(document.querySelector("#certificateNameSearch").value));
document.querySelector("#printCertificateBtn").addEventListener("click", () => window.print());
loginBtn.addEventListener("click", () => {
  loginMessage.textContent = "";
  loginForm.reset();
  loginDialog.showModal();
});
loginForm.addEventListener("submit", (event) => {
  if (event.submitter.value === "cancel") return;
  event.preventDefault();
  const values = Object.fromEntries(new FormData(loginForm).entries());
  if (validateLogin(values.username, values.password, loginMessage)) loginDialog.close();
});
entryLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(entryLoginForm).entries());
  validateLogin(values.username, values.password, entryLoginMessage);
});
document.querySelector("#residentSearch").addEventListener("input", renderResidents);
document.querySelector("#residentFilter").addEventListener("change", renderResidents);
document.querySelector("#householdSearch").addEventListener("input", renderHouseholds);
document.querySelector("#caseSearch").addEventListener("input", renderCases);
document.querySelector("#printBtn").addEventListener("click", () => window.print());
document.querySelector("#exportBtn").addEventListener("click", exportCsv);
document.querySelector("#refreshPortalQueue").addEventListener("click", syncDataFromStorage);
document.querySelector("#refreshPortalRequests").addEventListener("click", syncDataFromStorage);
document.querySelector("#refreshAuditLogs").addEventListener("click", syncDataFromStorage);
window.addEventListener("storage", (event) => {
  if (event.key === storageKey) syncDataFromStorage();
});
window.addEventListener("focus", syncDataFromStorage);

renderAll();
