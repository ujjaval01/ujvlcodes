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
    const cookieAccepted = localStorage.getItem("cookieAccepted") || localStorage.getItem("cookie_consent");

    if (!cookieAccepted && !document.getElementById("cookieConsent") && !document.querySelector(".cookie-consent")) {
        // Inject styles for the cookie popup dynamically (supports index.html and other pages)
        const styleId = "cookie-consent-styles";
        if (!document.getElementById(styleId)) {
            const styleEl = document.createElement("style");
            styleEl.id = styleId;
            styleEl.textContent = `
                .cookie-consent {
                    position: fixed;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%) translateY(150%);
                    max-width: 450px;
                    width: 90%;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 15px;
                    z-index: 9999;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    opacity: 0;
                    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    padding: 20px;
                    font-family: 'Poppins', sans-serif;
                }
                .dark-mode .cookie-consent {
                    background: rgba(20, 24, 33, 0.95);
                    border-color: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
                }
                .cookie-consent.show {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                .cookie-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    width: 100%;
                }
                .cookie-content p {
                    font-size: 14px;
                    color: #444;
                    margin-bottom: 16px;
                    line-height: 1.5;
                }
                .dark-mode .cookie-content p {
                    color: #ccc;
                }
                .cookie-consent-btns {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    width: 100%;
                }
                .cookie-consent-btn {
                    padding: 8px 24px;
                    border: none;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }
                .cookie-consent-btn.btn-accept-cookie {
                    background: linear-gradient(135deg, #7c3aed, #06b6d4);
                    color: #fff;
                    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.25);
                }
                .cookie-consent-btn.btn-accept-cookie:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
                }
                .cookie-consent-btn.btn-decline-cookie {
                    background: rgba(0, 0, 0, 0.05);
                    color: #555;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                .dark-mode .cookie-consent-btn.btn-decline-cookie {
                    background: rgba(255, 255, 255, 0.05);
                    color: #ccc;
                    border-color: rgba(255, 255, 255, 0.1);
                }
                .cookie-consent-btn.btn-decline-cookie:hover {
                    background: rgba(0, 0, 0, 0.1);
                }
                .dark-mode .cookie-consent-btn.btn-decline-cookie:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `;
            document.head.appendChild(styleEl);
        }

        // Dynamically create the cookie popup markup
        const popup = document.createElement("div");
        popup.id = "cookieConsent";
        popup.className = "cookie-consent";
        popup.innerHTML = `
            <div class="cookie-content">
                <p>🍪 We use cookies to improve your experience on our site. By continuing, you accept our cookie policy.</p>
                <div class="cookie-consent-btns">
                    <button id="acceptCookie" class="cookie-consent-btn btn-accept-cookie">Accept</button>
                    <button id="declineCookie" class="cookie-consent-btn btn-decline-cookie">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        const acceptBtn = document.getElementById("acceptCookie");
        const declineBtn = document.getElementById("declineCookie");

        // Slide up the popup after 2 seconds
        setTimeout(() => {
            popup.classList.add("show");
        }, 2000);

        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("cookieAccepted", "true");
            popup.classList.remove("show");
            setTimeout(() => popup.remove(), 600);
        });

        declineBtn.addEventListener("click", () => {
            localStorage.setItem("cookieAccepted", "declined");
            popup.classList.remove("show");
            setTimeout(() => popup.remove(), 600);
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
