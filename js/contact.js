const services = {

  frontend: {
    title: "FRONT-END",
    subtitle: "Modern interfaces, animations and pixel-perfect UX.",
    description: "I build fast, responsive and animated interfaces using React, Vue and modern frontend architecture.",
    tags: ["React", "Vue", "TypeScript", "UI/UX", "Animations"],
    banner: "https://drakefistfire.github.io/web/images/frontend-form.jpg",
    video: "../images/frontend.mp4",
    fields: `
      <div class="contact-section">
        <div class="pd-section-tag">04 — FRONTEND CONFIGURATION</div>
        <div class="form-group">
          <label>Project Type</label>
          <div class="choice-grid">
            <label><input type="checkbox"> Landing Page</label>
            <label><input type="checkbox"> Corporate Website</label>
            <label><input type="checkbox"> Dashboard</label>
            <label><input type="checkbox"> SaaS Platform</label>
            <label><input type="checkbox"> Ecommerce</label>
          </div>
        </div>
        <div class="form-group">
          <label>Framework Preference</label>
          <select>
            <option>React</option>
            <option>Vue</option>
            <option>Angular</option>
            <option>No preference</option>
            <option>I still don't know</option>
          </select>
        </div>
        <div class="form-group">
          <label>UI/UX Design Needed?</label>
          <select>
            <option>Yes</option>
            <option>No</option>
            <option>Already designed (Figma)</option>
          </select>
        </div>
      </div>
    `
  },

  backend: {
    title: "BACK-END",
    subtitle: "Scalable APIs and system architecture.",
    description: "Robust backend systems, authentication, APIs and database design ready for production.",
    tags: ["Laravel", "Node.js", "Express", "MySQL", "MongoDB"],
    banner: "../images/backend-form.jpg",
    fields: `
      <div class="contact-section">
        <div class="pd-section-tag">04 — BACKEND CONFIGURATION</div>
        <div class="form-group">
          <label>API Type</label>
          <div class="choice-grid">
            <label><input type="checkbox"> REST API</label>
            <label><input type="checkbox"> GraphQL</label>
            <label><input type="checkbox"> WebSockets</label>
            <label><input type="checkbox"> I still don't know</label>
          </div>
        </div>
        <div class="form-group">
          <label>Database</label>
          <div class="choice-grid">
            <label><input type="checkbox"> MySQL</label>
            <label><input type="checkbox"> PostgreSQL</label>
            <label><input type="checkbox"> MongoDB</label>
            <label><input type="checkbox"> Firebase</label>
            <label><input type="checkbox"> I still don't know</label>
          </div>
        </div>
        <div class="form-group">
          <label>Authentication</label>
          <select>
            <option>JWT</option>
            <option>OAuth</option>
            <option>Social Login</option>
          </select>
        </div>
      </div>
    `
  },

  mobile: {
    title: "MOBILE",
    subtitle: "Cross-platform apps with Flutter.",
    description: "Native-like mobile apps for Android and iOS with scalable architecture.",
    tags: ["Flutter", "Dart", "Android", "iOS"],
    banner: "../images/mobile-form.jpg",
    fields: `
      <div class="contact-section">
        <div class="pd-section-tag">04 — MOBILE CONFIGURATION</div>
        <div class="form-group">
          <label>Platforms</label>
          <div class="choice-grid">
            <label><input type="checkbox"> Android</label>
            <label><input type="checkbox"> iOS</label>
          </div>
        </div>
        <div class="form-group">
          <label>Features</label>
          <div class="choice-grid">
            <label><input type="checkbox"> Push Notifications</label>
            <label><input type="checkbox"> GPS</label>
            <label><input type="checkbox"> Payments</label>
            <label><input type="checkbox"> Chat</label>
            <label><input type="checkbox"> Gamification</label>
            <label><input type="checkbox"> I still don't know</label>
          </div>
        </div>
      </div>
    `
  },

  devops: {
    title: "DEVOPS",
    subtitle: "Infrastructure and deployment systems.",
    description: "CI/CD, Docker, cloud infrastructure and scalable deployments.",
    tags: ["Docker", "CI/CD", "AWS", "Monitoring"],
    banner: "../images/devops-form.jpg",
    fields: `
      <div class="contact-section">
        <div class="pd-section-tag">04 — DEVOPS CONFIGURATION</div>
        <div class="form-group">
          <label>Infrastructure</label>
          <div class="choice-grid">
            <label><input type="checkbox"> Docker</label>
            <label><input type="checkbox"> Kubernetes</label>
            <label><input type="checkbox"> CI/CD</label>
            <label><input type="checkbox"> Monitoring</label>
            <label><input type="checkbox"> I still don't know</label>
          </div>
        </div>
        <div class="form-group">
          <label>Cloud Provider</label>
          <select>
            <option>AWS</option>
            <option>Google Cloud</option>
            <option>Azure</option>
            <option>DigitalOcean</option>
            <option>I still don't know</option>
          </select>
        </div>
      </div>
    `
  },

  ai: {
    title: "AI",
    subtitle: "Smart automation & AI integrations.",
    description: "AI-powered systems: chatbots, automation and intelligent workflows.",
    tags: ["OpenAI", "Python", "LangChain"],
    banner: "../images/ia-form.jpg",
    fields: `
      <div class="contact-section">
        <div class="pd-section-tag">04 — AI CONFIGURATION</div>
        <div class="form-group">
          <label>AI Use Case</label>
          <select>
            <option>Chatbot</option>
            <option>Automation</option>
            <option>Content Generation</option>
            <option>Data Analysis</option>
            <option>I still don't know</option>
          </select>
        </div>
        <div class="form-group">
          <label>Model Provider</label>
          <div class="choice-grid">
            <label><input type="checkbox"> OpenAI</label>
            <label><input type="checkbox"> Claude</label>
            <label><input type="checkbox"> Local LLM</label>
            <label><input type="checkbox"> I still don't know</label>
          </div>
        </div>
      </div>
    `
  },

  fullproduct: {
    title: "FULL PRODUCT",
    subtitle: "End-to-end product development.",
    description: "From idea to launch: design, frontend, backend, DevOps and scaling.",
    tags: ["Architecture", "Design", "Full Stack", "Deployment"],
    banner: "../images/fullstack-form.jpg",
    fields: `
      <div class="contact-section">
        <div class="pd-section-tag">04 — PRODUCT CONFIGURATOR</div>
        <div class="form-group">
          <label>Project Stage</label>
          <select>
            <option>Idea</option>
            <option>MVP</option>
            <option>Existing Product</option>
            <option>Scaling</option>
            <option>I still don't know</option>
          </select>
        </div>
        <div class="form-group">
          <label>Needs</label>
          <div class="choice-grid">
            <label><input type="checkbox"> Design</label>
            <label><input type="checkbox"> Frontend</label>
            <label><input type="checkbox"> Backend</label>
            <label><input type="checkbox"> Mobile</label>
            <label><input type="checkbox"> AI</label>
            <label><input type="checkbox"> DevOps</label>
            <label><input type="checkbox"> I still don't know</label>
          </div>
        </div>
      </div>
    `
  }

};

const params     = new URLSearchParams(window.location.search);
const service    = params.get("service") || "frontend";
const data       = services[service];
const hero       = document.querySelector(".contact-hero");
const clientType = document.getElementById("clientType");
const companyField = document.getElementById("companyField");
const form       = document.getElementById("contactForm");

function updateCompanyField() {
  const value = clientType.value;
  const show = value === "company" || value === "freelancer" || value === "other";
  companyField.style.display = show ? "flex" : "none";
}

function detectBanner() {
  if (data.banner) {
    hero.style.backgroundImage = `url(${data.banner})`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  }
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);
  if (field) field.classList.add("input-error");
  if (error) error.textContent = message;
}

function clearAllErrors() {
  document.querySelectorAll(".field-error").forEach(el => { el.textContent = ""; });
  document.querySelectorAll(".input-error").forEach(el => { el.classList.remove("input-error"); });
}

function validateForm() {
  clearAllErrors();
  let valid = true;
  const name        = document.getElementById("name").value.trim();
  const email       = document.getElementById("email").value.trim();
  const country     = document.getElementById("country").value.trim();
  const description = document.getElementById("projectDescription").value.trim();
  const client      = document.getElementById("clientType").value;
  const company     = document.getElementById("company")?.value.trim();

  if (name.length < 2)   { showError("name", "Please enter your name."); valid = false; }
  if (!email)            { showError("email", "Email is required."); valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError("email", "Invalid email address."); valid = false; }
  if (!country)          { showError("country", "Country is required."); valid = false; }
  if (["company","freelancer","other"].includes(client) && !company) { showError("company", "Company name is required."); valid = false; }
  if (description.length < 30) { showError("projectDescription", "Please provide at least 30 characters."); valid = false; }

  return valid;
}

function collectServiceConfig() {
  const config = {};
  document.querySelectorAll("#dynamicFields .form-group").forEach(group => {
    const label = group.querySelector("label")?.textContent?.trim();
    if (!label) return;
    const select = group.querySelector("select");
    if (select) { config[label] = select.value; }
    const checked = [...group.querySelectorAll("input[type='checkbox']:checked")]
      .map(input => input.parentElement.textContent.trim());
    if (checked.length) { config[label] = checked; }
  });
  return config;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const button = form.querySelector(".contact-submit");
  button.classList.add("loading");
  button.innerHTML = "SENDING...";

  const payload = {
    service,
    client: {
      name:    document.getElementById("name").value.trim(),
      email:   document.getElementById("email").value.trim(),
      type:    document.getElementById("clientType").value,
      company: document.getElementById("company")?.value.trim() || null,
      country: document.getElementById("country").value.trim()
    },
    project: {
      deadline:      document.getElementById("deadline").value || null,
      description:   document.getElementById("projectDescription").value.trim(),
      configuration: collectServiceConfig()
    }
  };

  try {
    const response = await fetch(
      "https://backend-web-cw3n.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    const resData = await response.json();
    if (!response.ok) throw new Error(resData.message || "Request failed");
    button.innerHTML = "REQUEST SENT ✓";
    form.reset();
    updateCompanyField();
  } catch (error) {
    console.error(error);
    button.innerHTML = "ERROR - TRY AGAIN";
    setTimeout(() => {
      button.innerHTML = `SEND REQUEST <i class="fa-solid fa-arrow-right"></i>`;
    }, 2500);
  } finally {
    button.classList.remove("loading");
  }
});

// Init
document.getElementById("serviceTitle").textContent       = data.title;
document.getElementById("serviceSubtitle").textContent    = data.subtitle;
document.getElementById("serviceDescription").textContent = data.description;
document.getElementById("summaryService").textContent     = data.title;
document.getElementById("serviceTags").innerHTML =
  data.tags.map(t => `<div class="contact-tag">${t}</div>`).join("");
document.getElementById("dynamicFields").innerHTML = data.fields;

clientType.addEventListener("change", updateCompanyField);
updateCompanyField();
detectBanner();