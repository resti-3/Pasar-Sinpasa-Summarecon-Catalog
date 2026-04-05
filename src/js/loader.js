// Fungsi untuk memuat komponen
function loadComponent(elementId, filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error("Gagal memuat file: " + filePath);
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error("Error:", error));
}

// Fungsi untuk menandai menu yang sedang aktif
function setActiveMenu() {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "index.html" || currentPage === "") return;

    const navLinks = document.querySelectorAll(".menu a");
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href").split("/").pop();
        if (linkHref === currentPage) {
            link.classList.add("active");
        }
    });
}

// Jalankan saat struktur HTML utama sudah dimuat
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Muat header
    loadComponent("placeholder-header", "components/header.html")
        .then(() => { 
            setActiveMenu();
            
            // Panggil interaksi header
            if (typeof headerInteraction === "function"){
                headerInteraction();
            }
            // Panggil scrollspy SETELAH header muncul
            if (typeof initScrollSpy === "function"){
                initScrollSpy();
            }
        });

    // 3. Muat footer
    loadComponent("placeholder-footer", "components/footer.html");
});