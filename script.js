let users = JSON.parse(localStorage.getItem("users")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

function goBack() {
  document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
  document.getElementById("login-section").classList.remove("hidden");
}

function login() {
  let role = document.getElementById("role").value;
  let userid = document.getElementById("userid").value;
  let password = document.getElementById("password").value;

  document.getElementById("login-section").classList.add("hidden");

  if (role === "student") document.getElementById("student-panel").classList.remove("hidden");
  if (role === "teacher") document.getElementById("teacher-panel").classList.remove("hidden");
  if (role === "admin") document.getElementById("admin-panel").classList.remove("hidden");
}

function addUser() {
  let role = document.getElementById("newRole").value;
  let name = document.getElementById("newName").value;
  let id = document.getElementById("newId").value;
  let className = document.getElementById("newClass").value;

  users.push({ role, name, id, className });
  localStorage.setItem("users", JSON.stringify(users));
  updateUserList();
}

function updateUserList() {
  let ul = document.getElementById("userList");
  ul.innerHTML = "";
  users.forEach((u, i) => {
    let li = document.createElement("li");
    li.textContent = `${u.role} - ${u.name} (${u.id}) - ${u.className}`;
    ul.appendChild(li);
  });
}

function generateQR() {
  let session = document.getElementById("sessionName").value;
  let qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, session);
}

function scanQR() {
  let studentId = document.getElementById("studentId").value;
  let studentName = document.getElementById("studentName").value;
  let session = prompt("Enter QR Code Session Name");

  if (session) {
    attendance.push({ studentId, studentName, session, time: new Date().toLocaleString() });
    localStorage.setItem("attendance", JSON.stringify(attendance));
    document.getElementById("studentStatus").textContent = "Attendance marked!";
    updateTeacherRecords();
  }
}

function updateTeacherRecords() {
  let ul = document.getElementById("teacherRecords");
  ul.innerHTML = "";
  attendance.forEach(a => {
    let li = document.createElement("li");
    li.textContent = `${a.studentName} (${a.studentId}) - ${a.session} @ ${a.time}`;
    ul.appendChild(li);
  });
}

function uploadPhoto() {
  alert("Photo uploaded (placeholder for face check).");
}

function exportCSV() {
  let csv = "StudentID,Name,Session,Time\n";
  attendance.forEach(a => {
    csv += `${a.studentId},${a.studentName},${a.session},${a.time}\n`;
  });
  let blob = new Blob([csv], { type: "text/csv" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "attendance.csv";
  link.click();
}

function clearData() {
  localStorage.clear();
  users = [];
  attendance = [];
  updateUserList();
  updateTeacherRecords();
}
