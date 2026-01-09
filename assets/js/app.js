// Navbar functionality
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("nav");
  const navbarToggle = document.getElementById("navbarToggle");
  const navbarWrapper = document.querySelector(".navbar-wrapper");
  const searchToggle = document.getElementById("searchToggle");
  const searchBox = document.querySelector(".search-box");
  const searchInput = document.getElementById("searchInput");
  const navbarLinks = document.querySelectorAll(".navbar-menu a");

  // Toggle mobile menu
  if (navbarToggle) {
    navbarToggle.addEventListener("click", function () {
      navbarToggle.classList.toggle("active");
      navbarWrapper.classList.toggle("active");
      document.body.style.overflow = navbarWrapper.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Toggle search box
  if (searchToggle && searchBox) {
    searchToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      searchBox.classList.toggle("active");
      if (searchBox.classList.contains("active")) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });

    // Close search box when clicking outside
    document.addEventListener("click", function (e) {
      if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
        searchBox.classList.remove("active");
      }
    });

    // Close search box on Escape key
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchBox.classList.remove("active");
      }
    });
  }

  // Close mobile menu when clicking on a link
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        navbarToggle.classList.remove("active");
        navbarWrapper.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      navbarToggle.classList.remove("active");
      navbarWrapper.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });
});
