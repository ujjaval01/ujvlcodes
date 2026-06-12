document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    if (mobileMenuBtn && navCenter) {
        mobileMenuBtn.addEventListener('click', () => {
            navCenter.classList.toggle('active');
        });
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
            themeToggleBtn.classList.replace('btn-light', 'btn-dark');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark-mode");
            const isDark = document.documentElement.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");

            if (isDark) {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
                themeToggleBtn.classList.replace('btn-light', 'btn-dark');
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Theme';
                themeToggleBtn.classList.replace('btn-dark', 'btn-light');
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Cookie Consent Logic
    const cookiePopup = document.getElementById("cookieConsent");
    const acceptBtn = document.getElementById("acceptCookie");
    const declineBtn = document.getElementById("declineCookie");

    if (cookiePopup && acceptBtn && declineBtn) {
        const cookieAccepted = localStorage.getItem("cookieAccepted");

        if (!cookieAccepted) {
            setTimeout(() => {
                cookiePopup.classList.add("show");
            }, 2000); // 2 seconds delay
        }

        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("cookieAccepted", "true");
            cookiePopup.classList.remove("show");
        });

        declineBtn.addEventListener("click", () => {
            localStorage.setItem("cookieAccepted", "declined");
            cookiePopup.classList.remove("show");
        });
    }
});
