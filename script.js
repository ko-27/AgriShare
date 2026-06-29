/** 
 * AgriShare Dashboard Interactions and Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Live Clock & Date --- */
    function updateClock() {
        const clockElement = document.getElementById('live-clock');
        const now = new Date();
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        clockElement.textContent = `${dateString} | ${timeString}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* --- 2. Theme Switcher (Dark/Light Mode) --- */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('agrishare-theme');
    if (savedTheme === 'dark') {
        body.classList.replace('light-mode', 'dark-mode');
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                localStorage.setItem('agrishare-theme', 'dark');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                localStorage.setItem('agrishare-theme', 'light');
            }
        });
    }

    /* --- 3. Sidebar Toggle (Mobile & Desktop Collapse) --- */
    const sidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');

    if(sidebarBtn) {
        sidebarBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('active-mobile');
            } else {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    // Close mobile sidebar if clicked outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !sidebarBtn.contains(e.target)) {
            sidebar.classList.remove('active-mobile');
        }
    });

    /* --- 4. Notification Panel --- */
    const notifBell = document.getElementById('notification-bell');
    const notifPanel = document.getElementById('notification-panel');
    const closeNotif = document.getElementById('close-notifications');
    const overlay = document.getElementById('overlay');

    function toggleNotifications() {
        notifPanel.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    if(notifBell) notifBell.addEventListener('click', toggleNotifications);
    if(closeNotif) closeNotif.addEventListener('click', toggleNotifications);
    if(overlay) overlay.addEventListener('click', toggleNotifications);

    /* --- 4b. Profile Dropdown Toggle --- */
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileDropdown = document.querySelector('.user-profile.dropdown');
    
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    /* --- 5. Animated Counters --- */
    const counters = document.querySelectorAll('.stat-number');
    let counted = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Intersection Observer for Animations (Fade in, Slide up, Counters)
    const observeElements = document.querySelectorAll('.fade-in, .slide-up, .dashboard-stats');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counters if dashboard stats section comes into view
                if (entry.target.classList.contains('dashboard-stats') && !counted) {
                    runCounters();
                    counted = true;
                }
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => observer.observe(el));

    /* --- 6. Equipment Image Slider --- */
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.equipment-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if(sliderWrapper && slides.length > 0) {
        let currentIndex = 0;
        let cardsVisible = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = slides.length - cardsVisible;

        // Create dots dynamically
        for(let i=0; i<=maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if(i===0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            // Gap is 20px. 
            const cardWidth = slides[0].offsetWidth + 20; 
            sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            dots.forEach(d => d.classList.remove('active'));
            if(dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex;
            }
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        });

        // Handle Resize for slider layout
        window.addEventListener('resize', () => {
            const newCardsVisible = window.innerWidth <= 768 ? 1 : 3;
            if(newCardsVisible !== cardsVisible) {
                cardsVisible = newCardsVisible;
                currentIndex = 0; // reset
                // Re-create dots logic needed here for a full production app, skipped for prototype simplicity
                updateSlider();
            }
        });
    }

    /* --- 7. Form Validation (Registration) --- */
    const regForm = document.getElementById('registration-form');
    const msgBox = document.getElementById('form-message');
    const pwInput = document.getElementById('reg-password');
    const pwHint = document.getElementById('password-strength');

    // Password strength minimal check
    if(pwInput) {
        pwInput.addEventListener('input', () => {
            const val = pwInput.value;
            if(val.length === 0) {
                pwHint.textContent = '';
            } else if (val.length < 8) {
                pwHint.textContent = 'Too short. (Min 8)';
                pwHint.style.color = 'var(--danger)';
            } else if (!val.match(/[A-Z]/) || !val.match(/[0-9]/)) {
                pwHint.textContent = 'Include uppercase & number.';
                pwHint.style.color = 'var(--warning)';
            } else {
                pwHint.textContent = 'Strong Password';
                pwHint.style.color = 'var(--success)';
            }
        });
    }

    if(regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            msgBox.className = 'form-message';
            
            // Basic manual validation beyond HTML5 (Optional, showing custom JS check)
            const phone = document.getElementById('reg-phone').value;
            if (!/^[0-9]{10}$/.test(phone)) {
                msgBox.textContent = "Please enter a valid 10-digit phone number.";
                msgBox.classList.add('error');
                return;
            }

            // Simulate successful form submission
            msgBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Registration Successful! Welcome to AgriShare.';
            msgBox.classList.add('success');
            regForm.reset();
            pwHint.textContent = '';
            
            setTimeout(() => {
                msgBox.className = 'form-message'; // hide
            }, 4000);
        });
    }

    /* --- 8. Scroll-to-Top Button & Sticky Nav Links --- */
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    
    window.addEventListener('scroll', () => {
        // Show/hide scroll to top
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
        // Removed single-page scroll active link logic since it's now multi-page
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
