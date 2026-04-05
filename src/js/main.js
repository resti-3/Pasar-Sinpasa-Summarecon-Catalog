// NAVBAR SEARCH
const searchToggle = document.getElementById("searchToggle");
const navSearch = document.querySelector(".nav-search");
const navInput = document.getElementById("navSearchInput");
const logo = document.getElementById("logo");

if (searchToggle) {
  searchToggle.addEventListener("click", () => {
    navSearch.classList.toggle("active");
    logo.classList.toggle("hidden");
    navInput.focus();
  });
}

if (navInput) {
  navInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const keyword = navInput.value.trim();

      if (keyword !== "") {
        window.location.href = `katalog.html?search=${encodeURIComponent(keyword)}`;
      }
    }
  });
}

// KATALOG
document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card-katalog");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let activeFilter = "all";

  // FILTER
  function applyFilter() {
    if (!searchInput) return;

    const keyword = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const category = card.dataset.category;
      const text = card.innerText.toLowerCase();

      const matchSearch = text.includes(keyword);
      const matchFilter = activeFilter === "all" || category === activeFilter;

      card.style.display = (matchSearch && matchFilter) ? "block" : "none";
    });
  }

  // SEARCH INPUT
  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  // FILTER BUTTON
  filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      activeFilter = this.dataset.filter;
      applyFilter();
    });
  });

  // URL PARAM
  const urlParams = new URLSearchParams(window.location.search);

  const searchFromURL = urlParams.get("search");
  const categoryFromURL = urlParams.get("category");

  // SET SEARCH
  if (searchFromURL && searchInput) {
    searchInput.value = searchFromURL.toLowerCase();
  }

  // SET KATEGORI
  if (categoryFromURL) {
    activeFilter = categoryFromURL;

    filterButtons.forEach(btn => {
      if (btn.dataset.filter === categoryFromURL) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
  applyFilter();

});

if (window.innerWidth > 1024) {

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let isClicking = false;

  // CLICK NAVBAR
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      isClicking = true;

      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      // kasih delay biar scroll selesai dulu
      setTimeout(() => {
        isClicking = false;
      }, 500);
    });
  });


  // SCROLL
  window.addEventListener("scroll", () => {
    let current = "";

    if (window.scrollY < 100) {
      current = "beranda";
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.dataset.section === current) {
        link.classList.add("active");
      }
    });
  });
}

window.addEventListener("resize", () => {
  location.reload();
});

  // DEFAULT
  window.addEventListener("DOMContentLoaded", () => {
    const firstLink = document.querySelector('nav a[data-section="beranda"]');
    if (firstLink) firstLink.classList.add("active");
  });

// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});