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
    // Ambil nama file dari URL (misal: "katalog.html" atau "index.html")
    let currentPage = window.location.pathname.split("/").pop();
    
    // Jika path kosong (hanya "/"), asumsikan itu adalah index.html
    if (currentPage === "") currentPage = "index.html";

    // Cari semua elemen <a> di dalam navbar kamu
    const navLinks = document.querySelectorAll(".menu a");

    navLinks.forEach(link => {
        // Ambil atribut href dari masing-masing link
        const linkHref = link.getAttribute("href");

        // Jika cocok, tambahkan class active
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