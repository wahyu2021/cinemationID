document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const heroTitle = document.getElementById("hero-title");
    const backToTopBtn = document.getElementById("back-to-top-btn");

    if (navbar) {
        const scrollThreshold = 50;

        window.onscroll = function () {
            if (    
                document.body.scrollTop > scrollThreshold ||
                document.documentElement.scrollTop > scrollThreshold
            ) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

            if (heroTitle) {
                if (
                    document.body.scrollTop > scrollThreshold ||
                    document.documentElement.scrollTop > scrollThreshold
                ) {
                    heroTitle.classList.add("hide");
                } else {
                    heroTitle.classList.remove("hide");
                }
            }

            if (backToTopBtn) {
                if (
                    document.body.scrollTop > 300 ||
                    document.documentElement.scrollTop > 300
                ) {
                    backToTopBtn.classList.add("visible");
                } else {
                    backToTopBtn.classList.remove("visible");
                }
            }
        };
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
        if (link.pathname === window.location.pathname) {
            link.classList.add("active");
        }
    });
});
