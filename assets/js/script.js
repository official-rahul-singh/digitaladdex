document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------- Header Section -------------------------- */

  // Header Sticky
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  });

  // Mobile search form toggle
  const searchIcon = document.querySelector(".mob-search-btn");
  const searchForm = document.querySelector(".menu-search-form");
  const svgSearchOpen = `<svg width="16px" height="16px" viewBox="0 0 0.48 0.48" xmlns="http://www.w3.org/2000/svg"><path d="M0.434 0.406 0.36 0.332A0.18 0.18 0 1 0 0.332 0.36l0.074 0.074a0.02 0.02 0 0 0 0.028 0 0.02 0.02 0 0 0 0 -0.028M0.22 0.36a0.14 0.14 0 1 1 0.14 -0.14 0.14 0.14 0 0 1 -0.14 0.14" /></svg>`;
  const svgSearchClose = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
  let isSearchOpen = true;

  if (searchIcon) {
    searchIcon.addEventListener("click", function () {
      searchIcon.innerHTML = isSearchOpen ? svgSearchClose : svgSearchOpen;
      searchForm.classList.toggle("search-bar-show");
      isSearchOpen = !isSearchOpen;
    });
  }

  // Mobile menu toggle
  const toggleMenuBtn = document.querySelector(".menu-toggle-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const headerUl = document.querySelector("header .dl-menu ul");

  function toggleMobileMenu() {
    const backDrop = document.querySelector(".back-drop");
    const isMenuOpen = headerUl.classList.toggle("show-ul");
    cancelBtn.style.display = isMenuOpen ? "block" : "none";

    if (isMenuOpen) {
      createBackdrop();
      disableScroll();
    } else {
      removeBackdrop();
      enableScroll();
    }
  }

  function createBackdrop() {
    const backDrop = document.createElement("div");
    header.appendChild(backDrop);
    backDrop.classList.add("back-drop");
    backDrop.addEventListener("click", toggleMobileMenu);
  }

  function removeBackdrop() {
    const backDrop = document.querySelector(".back-drop");
    if (backDrop) backDrop.remove();
  }

  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.overflow = "auto";
  }

  toggleMenuBtn?.addEventListener("click", toggleMobileMenu);
  cancelBtn?.addEventListener("click", toggleMobileMenu);

  // Mobile dropdown navigation
  const navDropdowns = document.querySelectorAll(".dropdown");
  navDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      this.classList.toggle("showMenu");
    });

    const subDropdowns = dropdown.querySelectorAll(".dropdown ul");
    subDropdowns.forEach((subDropdown) => {
      subDropdown.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    navDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("showMenu");
      }
    });
  });

  /* -------------------------- Counter Section -------------------------- */

  function counter(id, start, end, duration) {
    let obj = document.getElementById(id);
    if (!obj) return; // Ensure the element exists
    let current = start;
    let range = end - start;
    let increment = end > start ? 1 : -1;
    let step = Math.abs(Math.floor(duration / range));
    let timer = setInterval(function () {
      current += increment;
      obj.textContent = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  // Initialize counters
  counter("counter1", 0, 12, 1000); // From 0 to 4 in 1 second
  counter("counter2", 0, 200, 2000); // From 0 to 200 in 2 seconds
  counter("counter3", 0, 500, 2500); // From 0 to 500 in 2.5 seconds
  counter("counter4", 0, 10, 1000); // From 0 to 10 in 1 second

  /* -------------------------- Accordion Section -------------------------- */

  const detailsElements = document.querySelectorAll("details");
  const summaryElements = document.querySelectorAll("summary");

  summaryElements.forEach((summary, index) => {
    summary.addEventListener("click", () => {
      detailsElements.forEach((details, i) => {
        if (i !== index) details.open = false;
      });
    });
  });

  /* -------------------------- Scroll To Top Button -------------------------- */

  const scrollTopBtn = document.getElementById("scroll_to_top");

  window.onscroll = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollTopBtn.classList.add("active");
    }
  };

  scrollTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  /* -------------------------- Table of Content -------------------------- */

  const tocHeader = document.querySelector(".toc-header");
  const tocToggleBtn = document.querySelector(".toc-toggle-btn");
  const tocBody = document.querySelector(".dl-toc-wrap .toc-body");
  const tocDropdowns = document.querySelectorAll(".toc-body ul ul");

  function toggleTableOfContent() {
    tocBody.classList.toggle("hidden");
    tocToggleBtn.innerHTML = tocBody.classList.contains("hidden")
      ? plus
      : minus;
  }

  if (tocHeader) {
    const plus =
      '<svg width="11" height="11" fill="#000"><path d="M10.68 6.2H6.8v4.12H4.79V6.2H.93V4.37h3.86V.27H6.8v4.1h3.88z"/></svg>';
    const minus = '<rect width="11" height="2" rx="1" fill="#000"/>';

    tocHeader.addEventListener("click", toggleTableOfContent);

    tocDropdowns.forEach((dropdown) => {
      const parentLi = dropdown.parentElement;
      parentLi.classList.add("drop-down");
      parentLi.addEventListener("click", function () {
        this.classList.toggle("showtocdrop");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth <= 768) tocBody.classList.add("hidden");
    });
  }

  // Smooth scroll to section
  const tocLinks = document.querySelectorAll(".toc-body ul li a");
  tocLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const offset = targetElement.offsetTop - 100;
      window.scrollTo({ top: offset > 0 ? offset : 0, behavior: "smooth" });
    });
  });

  // Highlight active section in TOC
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(
          `.toc-body ul li a[href="#${entry.target.id}"]`
        );
        if (entry.isIntersecting) {
          link?.parentElement.classList.add("active");
        } else {
          link?.parentElement.classList.remove("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("h2, h3, h4, h5, h6").forEach((section) => {
    observer.observe(section);
  });

  /* -------------------------- Testimonial Slider -------------------------- */

  // Initialize Swiper
 new Swiper(".testimonial-slider", {
    slidesPerView: 5,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dragable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });

 new Swiper(".why-choose-slider", {
    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dragable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });
});
