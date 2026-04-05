// Fungsi untuk memuat komponen
function loadComponent(elementId, filePath) {
    // Kita return fetch-nya agar bisa dilacak kapan selesainya
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
    
    // Jika di Beranda, biarkan ScrollSpy yang mengambil alih urusan class .active
    if (currentPage === "index.html" || currentPage === "") {
        return; // Hentikan fungsi loader di sini
    }

    // Jika di halaman lain (Katalog/Denah), beri penanda aktif
    const navLinks = document.querySelectorAll(".menu a");
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href").split("/").pop();
        if (linkHref === currentPage) {
            link.classList.add("active");
        }
    });
}

// Jalankan saat struktur HTML utama sudah dimuat oleh browser
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Muat header
    loadComponent("placeholder-header", "components/header.html")
        .then(() => {
            // 2. SETELAH header sukses dimuat, jalankan fungsi penanda menu
            setActiveMenu();
        });

    // 3. Muat footer secara bersamaan
    loadComponent("placeholder-footer", "components/footer.html");
});