// Guides
// Variabel gunakan lowercase
// Fungsi camelCase
// CONSTANTA gunakan UPPERCASE

const searchToggle = document.getElementById("searchToggle");
const navSearch = document.querySelector(".nav-search");
const navInput = document.getElementById("navSearchInput");

// toggle open/close search button di navbar
searchToggle.addEventListener("click", () => {
  navSearch.classList.toggle("active");
  navInput.focus();
});

navInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const keyword = navInput.value.trim();

    if (keyword !== "") {
      window.location.href = `katalog.html?search=${encodeURIComponent(keyword)}`;
    }
  }
});

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card-katalog");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "all";

// SEARCH
if (searchInput) {
  searchInput.addEventListener("input", function () {
    applyFilter();
  });
}

// FILTER
filterButtons.forEach(btn => {
  btn.addEventListener("click", function () {
    filterButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    activeFilter = this.dataset.filter;
    applyFilter();
  });
});

// GABUNGAN FILTER DAN SEARCH
function applyFilter() {
  const keyword = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const category = card.dataset.category;
    const text = card.innerText.toLowerCase();

    const matchSearch = text.includes(keyword);
    const matchFilter = activeFilter === "all" || category === activeFilter;

    if (matchSearch && matchFilter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// NGAMBIL PILIHAN CARDS KATALOG
const urlParams = new URLSearchParams(window.location.search);
const categoryFromURL = urlParams.get("category");

// AKTIFIN FILTER DARI PILIHAN
if (categoryFromURL) {
  activeFilter = categoryFromURL;

  filterButtons.forEach(btn => {
    if (btn.dataset.filter === categoryFromURL) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  applyFilter();
}

// NGAMBIL DARI SEARCH
const searchFromURL = urlParams.get("search");

if (searchFromURL) {
  searchInput.value = searchFromURL.toLowerCase();
  applyFilter();
}