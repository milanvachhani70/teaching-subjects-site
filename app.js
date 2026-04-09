const subjects = Array.isArray(window.SUBJECTS) ? window.SUBJECTS : [];

const subjectGrid = document.getElementById("subjectGrid");
const subjectFrame = document.getElementById("subjectFrame");
const viewerTitle = document.getElementById("viewerTitle");
const viewerDescription = document.getElementById("viewerDescription");
const viewerPlaceholder = document.getElementById("viewerPlaceholder");
const openSubjectTab = document.getElementById("openSubjectTab");
const fullscreenViewer = document.getElementById("fullscreenViewer");
const openFirstSubject = document.getElementById("openFirstSubject");
const viewerShell = document.getElementById("viewerShell");

let activeSubjectId = null;

function renderSubjects() {
  if (!subjects.length) {
    subjectGrid.innerHTML = `
      <div class="subject-card">
        <h3>No subjects added yet</h3>
        <p>Add your first subject folder and a matching entry in <code>subjects/manifest.js</code>.</p>
      </div>
    `;
    openFirstSubject.disabled = true;
    return;
  }

  subjectGrid.innerHTML = subjects.map((subject) => `
    <article class="subject-card ${subject.id === activeSubjectId ? "is-active" : ""}" data-subject-id="${subject.id}">
      <div class="subject-topline">
        <span class="subject-badge">${subject.code || "Subject"}</span>
        <span class="subject-count">${subject.slideCount || "HTML"} slides</span>
      </div>
      <h3>${subject.title}</h3>
      <p>${subject.description}</p>
      <div class="subject-meta">
        <span class="meta-pill">${subject.category || "General"}</span>
        <span class="meta-pill">${subject.classes || "Flexible delivery"}</span>
        <span class="meta-pill">${subject.level || "Teaching resource"}</span>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-subject-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const subject = subjects.find((item) => item.id === card.dataset.subjectId);
      if (subject) {
        openSubject(subject);
      }
    });
  });
}

function setActiveCard() {
  document.querySelectorAll("[data-subject-id]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.subjectId === activeSubjectId);
  });
}

function updateQuery(subjectId) {
  const url = new URL(window.location.href);
  url.searchParams.set("subject", subjectId);
  window.history.replaceState({}, "", url.toString());
}

function openSubject(subject) {
  activeSubjectId = subject.id;
  subjectFrame.src = subject.entry;
  subjectFrame.classList.add("is-visible");
  viewerPlaceholder.classList.add("is-hidden");
  viewerTitle.textContent = subject.title;
  viewerDescription.textContent = subject.description;
  openSubjectTab.disabled = false;
  fullscreenViewer.disabled = false;
  openSubjectTab.onclick = () => window.open(subject.entry, "_blank", "noopener,noreferrer");
  setActiveCard();
  updateQuery(subject.id);
}

openSubjectTab.addEventListener("click", () => {});

fullscreenViewer.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await viewerShell.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

openFirstSubject.addEventListener("click", () => {
  if (subjects.length) {
    openSubject(subjects[0]);
  }
});

renderSubjects();

const params = new URLSearchParams(window.location.search);
const preselected = params.get("subject");
if (preselected) {
  const subject = subjects.find((item) => item.id === preselected);
  if (subject) {
    openSubject(subject);
  }
}
