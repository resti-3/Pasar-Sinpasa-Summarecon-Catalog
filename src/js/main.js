// BUNGKUS KE DALAM FUNGSI 1
function headerInteraction(){
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
  
  // DEFAULT ACTIVE 
  const firstLink = document.querySelector('nav a[data-section="beranda"]');
  const currentPage = window.location.pathname.split("/").pop();
  if (firstLink && (currentPage === "index.html" || currentPage === "")) {
    firstLink.classList.add("active");
  }
  
  // HAMBURGER
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".menu");
  
  if (hamburger) {
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });  
  }
}

// KATALOG (Aman)
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card-katalog");
  const filterButtons = document.querySelectorAll(".filter-btn");
  let activeFilter = "all";

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

  if (searchInput) {
    searchInput.addEventListener("input", applyFilter);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      filterButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      activeFilter = this.dataset.filter;
      applyFilter();
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const searchFromURL = urlParams.get("search");
  const categoryFromURL = urlParams.get("category");

  if (searchFromURL && searchInput) {
    searchInput.value = searchFromURL.toLowerCase();
  }

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

// BUNGKUS SCROLLSPY KE DALAM FUNGSI 2
function initScrollSpy() {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "index.html" || currentPage === "") {
    if (window.innerWidth > 1024) { 
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("nav a");
        let isClicking = false;

        navLinks.forEach(link => {
          link.addEventListener("click", function () {
            isClicking = true;
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
            setTimeout(() => { isClicking = false; }, 500);
          });
        });
        
        window.addEventListener("scroll", () => {
          if (isClicking) return; // Cegah lompat saat menu diklik
          
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
  }
}

// Denah Interaktif
document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.getElementById('desktop-tooltip');
    const infoCard = document.getElementById('mobile-info-card');
    const infoImage = document.getElementById('info-image');
    const infoBadge = document.getElementById('info-badge');
    const infoId = document.getElementById('info-id');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const btnClose = document.getElementById('info-close');
    
    // Container Data
    let dataTenants = [];
    let dataCategories = [];

    // Pull Data dari File JSON
    fetch('../../database/db_sinpasa.json')
        .then(response => response.json())
        .then(data => {
            dataTenants = data.tenant;
            dataCategories = data.categories;
        })
        .catch(error => console.error("Gagal memuat db_sinpasa.json:", error));

    const lapakElements = document.querySelectorAll('.lapak-sayur-buah-dan-jajanan, .lapak-olahan-dan-jajanan, .lapak-non-halal, .lapak-basah, .lapak-kuliner, .kios-besar, .kios-kecil, .kios-fnb, .atm, .mushola, .area-pengelola, .toilet');

    function formatText(text) {
        if (!text) return "Tanpa Nama";
        return text.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    lapakElements.forEach(lapak => {
        // [Logika Hover Desktop kamu tetap sama di sini...]
        lapak.addEventListener('mouseenter', () => { /*...*/ });
        lapak.addEventListener('mousemove', (e) => { /*...*/ });
        lapak.addEventListener('mouseleave', () => { /*...*/ });

        // 3. KLIK LAPAK -> MUNCULKAN INFO CARD
        lapak.addEventListener('click', (e) => {
            tooltip.style.opacity = '0'; 

            const lapakId = lapak.id; // Contoh: "L055"
            const classLapak = lapak.classList[0];

            // Cari data di JSON
            const tenant = dataTenants.find(t => t.tenant_id === lapakId);
            
            // Variabel Default jika data belum ada di JSON
            let namaToko = formatText(lapak.id);
            let deskripsiToko = "Belum ada informasi detail untuk lapak ini.";
            let namaKategori = formatText(classLapak);
            let idKategori = classLapak;

            // Timpa dengan data JSON jika ditemukan
            if (tenant) {
                namaToko = tenant.name;
                deskripsiToko = tenant.details;
                idKategori = tenant.category_id;
                
                // Cocokkan category_id untuk mendapat category_name yang rapi
                const kategoriObj = dataCategories.find(c => c.category_id === tenant.category_id);
                if (kategoriObj) {
                    namaKategori = kategoriObj.category_name;
                }
            }

            // 4. Suntik Data ke DOM
            infoId.textContent = lapakId;
            infoTitle.textContent = namaToko;
            infoDesc.textContent = deskripsiToko;
            infoBadge.textContent = namaKategori.toUpperCase();
            
            // 5. Sesuaikan Gambar (need to add other category)
            if(idKategori.includes('sayur')) {
                infoImage.src = '../../img/sayuran.png';
            } else if(idKategori.includes('basah')) {
                infoImage.src = '../../img/daging.png'; 
            } else if(idKategori.includes('olahan')) {
                infoImage.src = '../../img/jajanan.png';
            } else if(idKategori.includes('non-halal')) {
                infoImage.src = '../../img/nonhalal.png';
            } else if(idKategori.includes('fnb') || idKategori.includes('kuliner')) {
                infoImage.src = '../../img/kuliner.png';
            } else {
                infoImage.src = '../../img/yana+mulyana-1393199944.jpg';
            }
            
            infoCard.classList.add('show');
        });
    });

    // Menutup Info Card
    btnClose.addEventListener('click', () => {
        infoCard.classList.remove('show');
    });
    
    // 5. FILTER KATEGORI
    const filterButtons = document.querySelectorAll('.legend-item'); // <-- Ganti baris ini
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetFilter = btn.getAttribute('data-filter');

        // Seleksi semua lapak
        lapakElements.forEach(lapak => {
          if (targetFilter === 'all') {
            lapak.classList.remove('lapak-dimmed');
          } else {
            if (lapak.classList.contains(targetFilter)) {
                lapak.classList.remove('lapak-dimmed');
            } else {
                lapak.classList.add('lapak-dimmed');
            }
          }
        });
      });
    });

    // 6. ZOOM
    const svgMap = document.querySelector('.denah-container svg');
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomReset = document.getElementById('btn-zoom-reset');

    // Nilai awal zoom (1 = 100%)
    let currentScale = 1;
    const scaleStep = 0.3; 
    const maxScale = 3;    
    const minScale = 0.5;  
    
    function applyZoom() {
        svgMap.style.transform = `scale(${currentScale})`;
    }

    // Tombol Perbesar
    btnZoomIn.addEventListener('click', () => {
        if (currentScale < maxScale) {
            currentScale += scaleStep;
            applyZoom();
        }
    });

    // Tombol Perkecil
    btnZoomOut.addEventListener('click', () => {
        if (currentScale > minScale) {
            currentScale -= scaleStep;
            applyZoom();
        }
    });

    // Tombol Reset
    btnZoomReset.addEventListener('click', () => {
        currentScale = 1;
        applyZoom();
        
        const container = document.querySelector('.denah-container');
        if(container) {
            container.scrollTop = 0;
            container.scrollLeft = 0;
        }
    });
});