const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearEl = document.getElementById("year");

if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!expanded));
        siteNav.classList.toggle("open", !expanded);
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.setAttribute("aria-expanded", "false");
            siteNav.classList.remove("open");
        });
    });
}

revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${Math.min(index * 70, 350)}ms`);
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = Array.from(document.querySelectorAll("section[id]"));

function updateActiveNav() {
    const marker = window.scrollY + 120;
    let currentSectionId = "home";

    sections.forEach((section) => {
        if (marker >= section.offsetTop) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSectionId}`;
        link.classList.toggle("active", isActive);
    });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "Bạn").trim();

        formStatus.textContent = `Cảm ơn ${name}! Tôi đã nhận được tin nhắn và sẽ phản hồi sớm.`;
        contactForm.reset();
    });
}
