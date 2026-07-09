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

    document.addEventListener("click", function (e) {
      if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
        searchBox.classList.remove("active");
      }
    });

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchBox.classList.remove("active");
      }
    });
  }

  // Close mobile menu when clicking on a link
  navbarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 991) {
        navbarToggle.classList.remove("active");
        navbarWrapper.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
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
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          var offsetTop = target.offsetTop - 70;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }
    });
  });

  // Slideshow
  var slides = document.querySelectorAll("#slider .slide");
  var dots = document.querySelectorAll("#slider .dot");
  var prevBtn = document.querySelector("#slider .prev");
  var nextBtn = document.querySelector("#slider .next");
  var currentSlide = 0;
  var slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
  }

  if (slides.length > 0) {
    prevBtn.addEventListener("click", function () {
      goToSlide(currentSlide - 1);
      resetAutoPlay();
    });

    nextBtn.addEventListener("click", function () {
      goToSlide(currentSlide + 1);
      resetAutoPlay();
    });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goToSlide(parseInt(this.dataset.index));
        resetAutoPlay();
      });
    });

    startAutoPlay();
  }

  // Product filter
  var filterBtns = document.querySelectorAll(".filerable-btns button");
  var productCards = document.querySelectorAll("#products .cards .card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      var filter = btn.dataset.filter;

      productCards.forEach(function (card) {
        if (filter === "all" || card.dataset.category === filter) {
          card.classList.remove("hide");
          card.classList.add("show");
        } else {
          card.classList.remove("show");
          card.classList.add("hide");
        }
      });
    });
  });
});
