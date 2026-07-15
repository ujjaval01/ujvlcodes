document.addEventListener('DOMContentLoaded', () => {
    
    // ── 1. DYNAMIC AMBIENT BACKGROUND INJECTION ──
    if (!document.querySelector('.ambient-bg-container')) {
        const bgContainer = document.createElement('div');
        bgContainer.className = 'ambient-bg-container';
        bgContainer.innerHTML = `
            <div class="ambient-blob ambient-blob-1"></div>
            <div class="ambient-blob ambient-blob-2"></div>
            <div class="ambient-blob ambient-blob-3"></div>
        `;
        document.body.prepend(bgContainer);
    }
    
    if (!document.querySelector('.noise-overlay')) {
        const noise = document.createElement('div');
        noise.className = 'noise-overlay';
        document.body.prepend(noise);
    }

    if (!document.querySelector('.grid-overlay')) {
        const grid = document.createElement('div');
        grid.className = 'grid-overlay';
        document.body.prepend(grid);
    }

    // ── 2. MOBILE MENU LOGIC ──
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navCenter = document.querySelector('.nav-center');
    if (mobileMenuBtn && navCenter) {
        mobileMenuBtn.addEventListener('click', () => {
            navCenter.classList.toggle('active');
        });
    }

    // ── 3. UNIFIED THEME TOGGLE LOGIC ──
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("theme");

    const updateThemeUI = (isDark) => {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = isDark 
                ? '<i class="fas fa-sun"></i> Light' 
                : '<i class="fas fa-moon"></i> Theme';
        }
    };

    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-mode");
        updateThemeUI(true);
    } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark-mode");
        updateThemeUI(false);
    } else {
        // Fallback to system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add("dark-mode");
            updateThemeUI(true);
        } else {
            updateThemeUI(false);
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.documentElement.classList.toggle("dark-mode");
            const isDark = document.documentElement.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateThemeUI(isDark);
        });
    }

    // ── 4. NAVBAR SCROLL EFFECT ──
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.background = document.documentElement.classList.contains("dark-mode")
                    ? 'rgba(10, 10, 12, 0.75)'
                    : 'rgba(255, 255, 255, 0.75)';
                navbar.style.boxShadow = '0 12px 40px -10px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.background = document.documentElement.classList.contains("dark-mode")
                    ? 'rgba(10, 10, 12, 0.4)'
                    : 'rgba(255, 255, 255, 0.4)';
                navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // ── 5. COOKIE CONSENT LOGIC (CENTRALIZED) ──
    const cookieAccepted = localStorage.getItem("cookieAccepted") || localStorage.getItem("cookie_consent");

    if (!cookieAccepted && !document.getElementById("cookieConsent")) {
        const popup = document.createElement("div");
        popup.id = "cookieConsent";
        popup.className = "cookie-consent";
        popup.innerHTML = `
            <div class="cookie-content">
                <p>🍪 We use cookies to elevate your browsing experience and analyze site traffic.</p>
            </div>
            <div class="cookie-consent-btns">
                <button id="acceptCookie" class="cookie-consent-btn btn-accept-cookie">Accept</button>
                <button id="declineCookie" class="cookie-consent-btn btn-decline-cookie">Decline</button>
            </div>
        `;
        document.body.appendChild(popup);

        const acceptBtn = document.getElementById("acceptCookie");
        const declineBtn = document.getElementById("declineCookie");

        setTimeout(() => {
            popup.classList.add("show");
        }, 1500);

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

    // ── 6. CURSOR SMOOTHING & MOUSE TRACKING ──
    let cursorDot = document.querySelector('.cursor-dot') || document.getElementById('cursorDot');
    let cursorRing = document.querySelector('.cursor-ring') || document.getElementById('cursorRing');
    
    if (!cursorDot && window.innerWidth > 768) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
    }
    if (!cursorRing && window.innerWidth > 768) {
        cursorRing = document.createElement('div');
        cursorRing.className = 'cursor-ring';
        document.body.appendChild(cursorRing);
    }
    
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorDot) {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }
    });

    // Smooth lerp (linear interpolation) for cursor ring
    const renderCursor = () => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        if (cursorRing) {
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
        }
        requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Hover scales on links, buttons, and custom triggers
    const hoverables = document.querySelectorAll('a, button, .clickable, .premium-card, .tilt-3d');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorRing) cursorRing.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorRing) cursorRing.classList.remove('hovering');
        });
    });

    // ── 7. PREMIUM CARD GLARE & REFLECTION EFFECT ──
    const cards = document.querySelectorAll('.premium-card, .skill-card, .project-card, .timeline-card');
    cards.forEach(card => {
        // Ensure glare element exists
        if (!card.querySelector('.card-glare')) {
            const glare = document.createElement('div');
            glare.className = 'card-glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ── 8. MAGNETIC HOVER EFFECT ──
    const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-premium');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            // Calculate absolute offsets relative to center
            const relX = e.clientX - rect.left - (rect.width / 2);
            const relY = e.clientY - rect.top - (rect.height / 2);
            
            // Move container by a fraction (e.g. max 10px translate)
            btn.style.transform = `translate3d(${relX * 0.2}px, ${relY * 0.25}px, 0) scale(1.02)`;
            
            const btnIcon = btn.querySelector('i');
            if (btnIcon) {
                btnIcon.style.transform = `translateX(${relX * 0.1}px) translateY(${relY * 0.1}px)`;
            }
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0, 0, 0) scale(1)';
            const btnIcon = btn.querySelector('i');
            if (btnIcon) {
                btnIcon.style.transform = 'translate3d(0, 0, 0)';
            }
        });
    });

    // ── 9. TILT EFFECT ──
    const tiltElements = document.querySelectorAll('.tilt-3d');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 8; // Max 8 degrees rotation
            const rotateY = ((x - centerX) / centerX) * 8;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            
            const popOuts = el.querySelectorAll('.pop-out-3d');
            popOuts.forEach(pop => {
                pop.style.transform = 'translateZ(25px)';
            });
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            const popOuts = el.querySelectorAll('.pop-out-3d');
            popOuts.forEach(pop => {
                pop.style.transform = 'translateZ(0px)';
            });
        });
    });

    // ── 10. CURTAIN PAGE TRANSITIONS ──
    let trans = document.querySelector('.page-transition');
    if (!trans) {
        trans = document.createElement('div');
        trans.className = 'page-transition';
        document.body.appendChild(trans);
    }
    setTimeout(() => {
        trans.style.transform = 'translateY(-100%)';
    }, 100);
});
