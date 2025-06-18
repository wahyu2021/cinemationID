/**
 * Fungsi untuk me-render (menampilkan) kartu film ke dalam elemen HTML tertentu.
 * @param {Array} movies - Array dari objek film yang akan ditampilkan.
 * @param {string} targetElementId - ID dari elemen div tempat kartu film akan dimasukkan.
 */

function renderMovieCards(movies, targetElementId) {
    const targetElement = document.getElementById(targetElementId);

    if (!targetElement) {
        console.error(`Elemen dengan ID '${targetElementId}' tidak ditemukan.`);
        return;
    }

    targetElement.innerHTML = '';
    
    if (movies.length === 0) {
        targetElement.innerHTML = '<p>Tidak ada film untuk ditampilkan.</p>';
        return;
    }

    movies.forEach(movie => {
        const linkHref = movie.status === 'now-playing' ? `booking.html?id=${movie.id}` : '#';

        const movieCardHTML = `
            <div class="movie-card">
                <a href="${linkHref}">
                    <img src="${movie.poster}" alt="Poster ${movie.title}">
                    <h3>${movie.title}</h3>
                </a>
            </div>
        `;
        targetElement.insertAdjacentHTML('beforeend', movieCardHTML);
    });
}

/**
 * Fungsi untuk me-render (menampilkan) kartu promo ke dalam elemen HTML tertentu.
 * @param {Array} promos - Array dari objek promo yang akan ditampilkan.
 * @param {string} targetElementId - ID dari elemen div tempat kartu promo akan dimasukkan.
 */
function renderPromoCards(promos, targetElementId) {
    const targetElement = document.getElementById(targetElementId);

    if (!targetElement) {
        console.error(`Elemen dengan ID '${targetElementId}' tidak ditemukan.`);
        return;
    }
    
    targetElement.innerHTML = '';

    promos.forEach(promo => {
        const promoCardHTML = `
            <div class="promo-card">
                <img src="${promo.image}" alt="Promo ${promo.title}">
                <div class="promo-content">
                    <h3>${promo.title}</h3>
                    <p>${promo.description}</p>
                    <a href="#" class="btn btn-secondary">Lihat Detail</a>
                </div>
            </div>
        `;
        targetElement.insertAdjacentHTML('beforeend', promoCardHTML);
    });
}