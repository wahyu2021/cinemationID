document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get("id"));
    const movie = moviesData.find((m) => m.id === movieId);
    const movieInfoContainer = document.getElementById(
        "movie-booking-info-container"
    );
    const bookingContainer = document.querySelector(".booking-container");
    const pageHeader = document.querySelector(".page-header h1");

    if (!movie || !movieInfoContainer) {
        pageHeader.textContent = "Film Tidak Ditemukan";
        if (bookingContainer)
            bookingContainer.innerHTML =
                '<p style="text-align:center;">Maaf, film yang Anda cari tidak tersedia. Silakan kembali ke <a href="movies.html">halaman film</a>.</p>';
        return;
    }

    const movieInfoHTML = `
        <img src="${movie.poster}" alt="Poster ${movie.title}" />
        <div>
            <h2>${movie.title}</h2>
            <p>Genre: ${movie.genre} | Durasi: ${movie.duration}</p>
        </div>
    `;
    movieInfoContainer.innerHTML = movieInfoHTML;

    const cinemaSelect = document.getElementById("cinema");
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const adultTicketsInput = document.getElementById("adult-tickets");
    const summaryMovie = document.getElementById("summary-movie");
    const summarySchedule = document.getElementById("summary-schedule");
    const summaryCinema = document.getElementById("summary-cinema");
    const summaryTickets = document.getElementById("summary-tickets");
    const summarySeats = document.getElementById("summary-seats");
    const summaryTotal = document.getElementById("summary-total");

    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
    dateInput.min = today;

    function updateSummary() {
        const cinemaName =
            cinemaSelect.options[cinemaSelect.selectedIndex].text;
        const ticketCount = parseInt(adultTicketsInput.value);
        const TICKET_PRICE = 50000;

        summaryMovie.textContent = movie.title;
        summarySchedule.textContent = `${dateInput.value}, ${timeSelect.value}`;
        summaryCinema.textContent = cinemaName;
        summaryTickets.textContent = `${ticketCount} Dewasa`;
        summarySeats.textContent =
            selectedSeats.length > 0 ? selectedSeats.join(", ") : "-";
        summaryTotal.textContent = `Rp ${(
            ticketCount * TICKET_PRICE
        ).toLocaleString("id-ID")}`;
    }

    cinemaSelect.addEventListener("change", updateSummary);
    dateInput.addEventListener("change", updateSummary);
    timeSelect.addEventListener("change", updateSummary);

    const seatMap = document.querySelector(".seat-map");
    let selectedSeats = [];

    const ROWS = 5;
    const SEATS_PER_ROW = 8;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < SEATS_PER_ROW; j++) {
            const seat = document.createElement("div");
            seat.classList.add("seat", "available");
            if (Math.random() > 0.8) {
                seat.classList.remove("available");
                seat.classList.add("occupied");
            }
            seat.dataset.seatId = `${String.fromCharCode(65 + i)}${j + 1}`;
            seatMap.appendChild(seat);
        }
    }

    seatMap.addEventListener("click", (e) => {
        if (
            e.target.classList.contains("seat") &&
            e.target.classList.contains("available")
        ) {
            const seatId = e.target.dataset.seatId;
            const ticketCount = parseInt(adultTicketsInput.value);

            if (selectedSeats.includes(seatId)) {
                selectedSeats = selectedSeats.filter((s) => s !== seatId);
                e.target.classList.remove("selected");
            } else {
                if (selectedSeats.length < ticketCount) {
                    selectedSeats.push(seatId);
                    e.target.classList.add("selected");
                } else {
                    alert(`Anda hanya dapat memilih ${ticketCount} kursi.`);
                }
            }
            updateSummary();
        }
    });

    document.querySelector(".booking-form").addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-counter")) {
            let currentValue = parseInt(adultTicketsInput.value);
            if (e.target.dataset.action === "plus") {
                currentValue++;
            } else if (
                e.target.dataset.action === "minus" &&
                currentValue > 1
            ) {
                currentValue--;
            }
            adultTicketsInput.value = currentValue;
            if (selectedSeats.length > currentValue) {
                const seatsToDeselect = selectedSeats.slice(currentValue);
                seatsToDeselect.forEach((seatId) => {
                    document
                        .querySelector(`[data-seat-id="${seatId}"]`)
                        .classList.remove("selected");
                });
                selectedSeats = selectedSeats.slice(0, currentValue);
            }
            updateSummary();
        }
    });

    updateSummary();

    const payButton = document.getElementById("btn-pay");

    payButton.addEventListener("click", () => {
        if (selectedSeats.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Anda harus memilih kursi terlebih dahulu!",
                confirmButtonColor: "#E50914",
            });
            return;
        }

        const totalBayar = summaryTotal.textContent;
        Swal.fire({
            title: "Konfirmasi Pesanan",
            html: `Anda akan memesan <b>${selectedSeats.length} tiket</b> untuk film <b>${movie.title}</b>.<br>Total pembayaran: <b>${totalBayar}</b><br><br>Lanjutkan ke pembayaran?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#E50914",
            cancelButtonColor: "#666",
            confirmButtonText: "Ya, Lanjutkan!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Memproses Pembayaran...",
                    text: "Mohon tunggu sebentar.",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                });
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Pembayaran Berhasil!",
                        text: "Terima kasih! Tiket Anda telah dikonfirmasi.",
                        showConfirmButton: false,
                        timer: 2500,
                    }).then(() => {
                        window.location.href = "movies.html";
                    });
                }, 2500);
            }
        });
    });
});
