document.addEventListener('DOMContentLoaded', () => {
    // ── MOBILE MENU LOGIC ──
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    if (mobileMenuBtn && navCenter) {
        mobileMenuBtn.addEventListener('click', () => {
            navCenter.classList.toggle('active');
        });
    }

    // ── UNIFIED THEME TOGGLE LOGIC ──
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("theme");

    // Initialize theme based on saved preference
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
            themeToggleBtn.classList.replace('btn-light', 'btn-dark');
        }
    } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark-mode");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Theme';
            themeToggleBtn.classList.replace('btn-dark', 'btn-light');
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

    // ── NAVBAR SCROLL EFFECT ──
    const navbar = document.querySelector('.custom-pill-nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = '#1a1a1a';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // ── COOKIE CONSENT LOGIC ──
    const cookiePopup = document.getElementById("cookieConsent");
    const acceptBtn = document.getElementById("acceptCookie");
    const declineBtn = document.getElementById("declineCookie");

    if (cookiePopup && acceptBtn && declineBtn) {
        const cookieAccepted = localStorage.getItem("cookieAccepted");

        if (!cookieAccepted) {
            setTimeout(() => {
                cookiePopup.classList.add("show");
            }, 2000);
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

    // ── CURSOR GLOW POSITIONING ──
    const glow = document.getElementById('cursorGlow');
    if (glow) {
        document.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    // ── 3D TILT EFFECT ──
    const tiltElements = document.querySelectorAll('.tilt-3d');
    tiltElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease, border-color 0.1s ease';
            const popOuts = el.querySelectorAll('.pop-out-3d');
            popOuts.forEach(pop => {
                pop.style.transition = 'transform 0.1s ease';
            });
        });

        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // cursor x inside card
            const y = e.clientY - rect.top;  // cursor y inside card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle based on cursor position (-10deg to 10deg range)
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            const popOuts = el.querySelectorAll('.pop-out-3d');
            popOuts.forEach(pop => {
                pop.style.transform = 'translateZ(30px)';
            });
        });

        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease';
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            
            const popOuts = el.querySelectorAll('.pop-out-3d');
            popOuts.forEach(pop => {
                pop.style.transition = 'transform 0.5s ease';
                pop.style.transform = 'translateZ(0px)';
            });
        });
    });
});
