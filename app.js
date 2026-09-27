/**
 * PORTFOLIO JAVASCRIPT - NGUYỄN PHÚC MINH
 * Interactivity: Theme switcher, Mobile menu, Projects filter & search, Modals, Contact form validation
 */

// --- 1. Project Data Store (User GitHub Repositories) ---
const portfolioProjects = [
  {
    id: "mvp-fashion",
    title: "Multi-Vendor Fashion E-commerce Platform (MVP Fashion)",
    repoName: "KhanhHoa286/SE2034-SWP391-G6",
    category: "java",
    badge: "SWP391 • Full-Stack Java",
    timeline: "Jun 2026 – Jul 2026",
    icon: "fa-solid fa-shirt",
    description: "Architected and developed a full-stack Seller Management Portal and Delivery module handling seller onboarding, shop configuration, and end-to-end order fulfillment workflow.",
    highlights: [
      "Implemented MVC architecture using Java Servlet, JSP, JSTL, and Bootstrap 5 with responsive UI.",
      "Designed Role-Based Access Control (RBAC) across 4 distinct user roles (Admin, Seller, Delivery Staff, Customer).",
      "Integrated Cloudinary API for cloud media storage with fallback mechanisms.",
      "Configured Jakarta Mail for OTP email verification and jBCrypt for password hashing.",
      "Designed relational database schemas and optimized data access layer using DAO pattern and JDBC with Microsoft SQL Server.",
      "Collaborated in an Agile/Scrum team using Git and GitHub for version control and code reviews."
    ],
    tech: ["Java 21", "Jakarta Servlet", "JSP", "JSTL", "MS SQL Server", "JDBC", "Bootstrap 5", "Cloudinary API", "Maven", "Git"],
    github: "https://github.com/KhanhHoa286/SE2034-SWP391-G6",
    demo: "#"
  },
  {
    id: "prj302-gr10",
    title: "Java Web Application (PRJ302 Group 10)",
    repoName: "nguyenphucminh286-collab/PRJ302-GR10",
    category: "java",
    badge: "PRJ302 • Java Web MVC",
    timeline: "2025",
    icon: "fa-solid fa-server",
    description: "Comprehensive Java Web application built with Java Servlet, JSP, JDBC, and MS SQL Server following the Model-View-Controller (MVC) architectural pattern.",
    highlights: [
      "Structured robust 3-tier MVC architecture utilizing Jakarta/Java Servlets and JSP.",
      "Designed Microsoft SQL Server database schemas, stored procedures, and optimized JDBC queries using DAO pattern.",
      "Implemented session-based user authentication, role authorization filters, and secure password handling.",
      "Built dynamic frontend views using JSTL, custom EL tags, and responsive CSS.",
      "Collaborated in group development using Git version control and code branching on GitHub."
    ],
    tech: ["Java", "Jakarta Servlet", "JSP", "JSTL", "MS SQL Server", "JDBC", "DAO Pattern", "Git"],
    github: "https://github.com/nguyenphucminh286-collab/PRJ302-GR10",
    demo: "#"
  },
  {
    id: "bakery-zone",
    title: "BakeryZone – E-Commerce Bakery Website (FER_Project)",
    repoName: "nguyenphucminh286-collab/FER_Project",
    category: "react",
    badge: "FER201m • React Frontend",
    timeline: "2026 – Present",
    icon: "fa-solid fa-cake-candles",
    description: "Full-featured e-commerce bakery platform with Customer and Admin role-based interfaces, category filtering, search, cart management, and delivery time-slot booking.",
    highlights: [
      "Built dynamic, responsive Single Page Application (SPA) with React.js and React Router.",
      "Managed application global state (cart, authentication, user preferences) using Context API.",
      "Developed an Admin dashboard for full product CRUD operations and real-time customer order status tracking.",
      "Integrated Cloudinary API via custom Node.js backend for secure product image uploads and transformations.",
      "Implemented delivery time-slot booking system and streamlined multi-step checkout workflow."
    ],
    tech: ["React.js", "React Router", "Context API", "Node.js", "REST API", "Cloudinary", "CSS3 / Flexbox", "Git"],
    github: "https://github.com/nguyenphucminh286-collab/FER_Project",
    demo: "#"
  }
];

// --- 2. Initialize App on DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initProjectsPage();
  initContactForm();
  initModals();
});

// --- 3. Theme Toggle (Dark / Light Mode) ---
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const storedTheme = localStorage.getItem("portfolio-theme") || "dark";
  
  document.documentElement.setAttribute("data-theme", storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon");
  if (!themeIcon) return;
  
  if (theme === "light") {
    themeIcon.className = "fa-solid fa-moon";
    themeIcon.setAttribute("title", "Switch to Dark Mode");
  } else {
    themeIcon.className = "fa-solid fa-sun";
    themeIcon.setAttribute("title", "Switch to Light Mode");
  }
}

// --- 4. Mobile Menu Navigation Toggle ---
function initMobileMenu() {
  const menuBtn = document.getElementById("menuToggleBtn");
  const navMenu = document.getElementById("navMenu");

  if (!menuBtn || !navMenu) return;

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    menuBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// --- 5. Projects Page: Rendering, Filtering & Search ---
function initProjectsPage() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return; // Not on projects page

  let currentCategory = "all";
  let currentSearchQuery = "";

  function renderProjects() {
    const filtered = portfolioProjects.filter((project) => {
      const matchesCategory = currentCategory === "all" || project.category === currentCategory;
      const query = currentSearchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some(t => t.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      projectsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-dim);"></i>
          <h3>No projects found</h3>
          <p>Try adjusting your search query or filter category.</p>
        </div>
      `;
      return;
    }

    projectsGrid.innerHTML = filtered.map((p) => `
      <article class="project-card" data-id="${p.id}">
        <div class="project-thumbnail">
          <i class="${p.icon} project-icon-placeholder"></i>
          <span class="project-badge-overlay badge badge-primary">${p.badge}</span>
          <span class="project-timeline">${p.timeline}</span>
        </div>
        <div class="project-body">
          ${p.repoName ? `
          <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.4rem; color: var(--accent); font-size: 0.8rem; font-family: var(--font-mono);">
            <i class="fa-brands fa-github"></i>
            <span>${p.repoName}</span>
          </div>` : ''}
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">
            ${p.tech.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
            ${p.tech.length > 4 ? `<span class="tech-tag">+${p.tech.length - 4} more</span>` : ''}
          </div>
          <div class="project-footer">
            <button class="btn btn-secondary btn-sm view-details-btn" onclick="openProjectModal('${p.id}')">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
            <div class="project-links">
              ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="icon-btn" title="View Source on GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
              <button class="icon-btn" onclick="openProjectModal('${p.id}')" title="Detailed Overview"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
            </div>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Initial Render
  renderProjects();

  // Category Filter Buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderProjects();
    });
  });

  // Real-time Search Input
  const searchInput = document.getElementById("projectSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim();
      renderProjects();
    });
  }
}

// --- 6. Project Modal Logic ---
function initModals() {
  const backdrop = document.getElementById("projectModalBackdrop");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (!backdrop) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeProjectModal();
    }
  });
}

window.openProjectModal = function(projectId) {
  const project = portfolioProjects.find(p => p.id === projectId);
  if (!project) return;

  const backdrop = document.getElementById("projectModalBackdrop");
  const titleEl = document.getElementById("modalProjectTitle");
  const badgeEl = document.getElementById("modalProjectBadge");
  const descEl = document.getElementById("modalProjectDesc");
  const highlightsEl = document.getElementById("modalProjectHighlights");
  const techEl = document.getElementById("modalProjectTech");
  const githubLinkEl = document.getElementById("modalGithubLink");

  if (!backdrop) return;

  if (titleEl) titleEl.textContent = project.title;
  if (badgeEl) {
    badgeEl.textContent = `${project.badge} • ${project.timeline}`;
  }
  if (descEl) descEl.textContent = project.description;
  
  if (highlightsEl) {
    highlightsEl.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join("");
  }

  if (techEl) {
    techEl.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join(" ");
  }

  if (githubLinkEl) {
    if (project.github) {
      githubLinkEl.href = project.github;
      githubLinkEl.innerHTML = `<i class="fa-brands fa-github"></i> View Repository (${project.repoName || 'GitHub'})`;
      githubLinkEl.style.display = "inline-flex";
    } else {
      githubLinkEl.style.display = "none";
    }
  }

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeProjectModal = function() {
  const backdrop = document.getElementById("projectModalBackdrop");
  if (backdrop) {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// --- 7. Contact Form Validation & Toast Notification ---
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById("senderName");
    const emailInput = document.getElementById("senderEmail");
    const subjectInput = document.getElementById("senderSubject");
    const messageInput = document.getElementById("senderMessage");

    // Validation rules
    if (!nameInput.value.trim()) {
      showError(nameInput, "Please enter your name.");
      isValid = false;
    } else {
      clearError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput);
    }

    if (!subjectInput.value.trim()) {
      showError(subjectInput, "Please enter a subject.");
      isValid = false;
    } else {
      clearError(subjectInput);
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError(messageInput, "Please write a message (at least 10 characters).");
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast("Thank you! Your message has been sent successfully.");
      }, 1000);
    }
  });

  function showError(inputEl, message) {
    const parent = inputEl.closest(".form-group");
    if (parent) {
      parent.classList.add("has-error");
      const errEl = parent.querySelector(".form-error-msg");
      if (errEl) errEl.textContent = message;
    }
  }

  function clearError(inputEl) {
    const parent = inputEl.closest(".form-group");
    if (parent) {
      parent.classList.remove("has-error");
    }
  }

  // Clear errors on typing
  contactForm.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("input", () => clearError(input));
  });
}

function showToast(message) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check" style="color: var(--success); font-size: 1.25rem;"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
