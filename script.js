document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Dropdown toggle for mobile
  const dropdownBtns = document.querySelectorAll(".dropbtn");

  dropdownBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.parentElement;
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          if (dropdown !== parent) {
            dropdown.classList.remove("active");
          }
        });
        parent.classList.toggle("active");
      }
    });
  });

  // Search functionality
  const searchIcon = document.querySelector(".search-icon");
  const searchInput = document.querySelector(".search-input");
  const searchClose = document.querySelector(".search-close");
  const navContainer = document.querySelector(".nav-menu");

  if (searchIcon && searchInput && searchClose) {
    searchIcon.addEventListener("click", function () {
      searchInput.classList.add("active");
      navContainer.style.display = "none";
      searchInput.querySelector("input").focus();
    });

    searchClose.addEventListener("click", function () {
      searchInput.classList.remove("active");
      navContainer.style.display = "";
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-container")) {
        searchInput.classList.remove("active");
        navContainer.style.display = "";
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".nav-menu") &&
      !e.target.closest(".mobile-menu-toggle")
    ) {
      navMenu.classList.remove("active");
    }

    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navMenu.classList.remove("active");
    }
  });

  // Back-to-top button
  const backToTop = document.createElement("div");
  backToTop.id = "back-to-top";
  backToTop.innerHTML = "↑";
  document.body.appendChild(backToTop);

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Scroll handling
  const handleScroll = () => {
    // Back-to-top button visibility
    const scrollTop = window.scrollY;
    if (scrollTop > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Header scroll effect
    const header = document.querySelector("header");
    if (scrollTop > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Parallax effect for hero image
    const heroImg = document.querySelector(".hero img");
    if (heroImg) {
      const scrollPosition = window.scrollY;
      heroImg.style.transform = `translateY(${
        scrollPosition * 0.25
      }px) scale(1.05)`;
    }
  };

  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animations
  const elementsToObserve = document.querySelectorAll(
    ".news-item, .collaborator, .gallery-item img, .faculty-member, .student-member, .former-member, .address-info p, .collaborator-info p, .faculty-info p, .former-member-info li, .positions-content p, .research-areas li, .member-list li, .social-icons a, .social-icon-link, h2, .member-category h3, .hero-text h2, .hero-text p"
  );
  elementsToObserve.forEach((el) => observer.observe(el));

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Trigger on page load
});
