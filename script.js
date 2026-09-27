/**
 * AgriShare – Farmer Equipment Sharing & Rental Portal
 * Assignment – 2: Interactive Dashboard Webpage
 * Course: 23IT721 – Full Stack Development Laboratory
 * Developer: Kohila M (Reg: 2303717620522027)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. LIVE DATE & TIME DISPLAY (Requirement 9)
       ========================================================================= */
    const clockElement = document.getElementById('live-clock');

    function updateLiveClock() {
        if (!clockElement) return;
        const now = new Date();
        const dateOptions = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('en-US', dateOptions);

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        clockElement.textContent = `${dateString} • ${hours}:${minutes}:${seconds} ${ampm}`;
    }

    updateLiveClock();
    setInterval(updateLiveClock, 1000);


    /* =========================================================================
       2. LIGHT & DARK MODE THEME SWITCHER (Requirement 10)
       ========================================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Retrieve saved theme preference from localStorage
    const savedTheme = localStorage.getItem('agrishare-theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-mode');
            if (isDark) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                localStorage.setItem('agrishare-theme', 'light');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                localStorage.setItem('agrishare-theme', 'dark');
            }
        });
    }


    /* =========================================================================
       3. NOTIFICATION DRAWER PANEL (Requirement 11)
       ========================================================================= */
    const notifBell = document.getElementById('notification-bell');
    const notifPanel = document.getElementById('notification-panel');
    const closeNotifBtn = document.getElementById('close-notifications');
    const overlay = document.getElementById('overlay');
    const markAllReadBtn = document.getElementById('mark-all-read');
    const notifCountBadge = document.getElementById('notif-count');

    function toggleNotificationPanel(show) {
        if (!notifPanel || !overlay) return;
        const isOpen = notifPanel.classList.contains('active');
        const state = typeof show === 'boolean' ? show : !isOpen;

        if (state) {
            notifPanel.classList.add('active');
            overlay.classList.add('active');
        } else {
            notifPanel.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    if (notifBell) notifBell.addEventListener('click', () => toggleNotificationPanel(true));
    if (closeNotifBtn) closeNotifBtn.addEventListener('click', () => toggleNotificationPanel(false));
    if (overlay) overlay.addEventListener('click', () => {
        toggleNotificationPanel(false);
        closeLoginModal();
    });

    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            document.querySelectorAll('.notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            if (notifCountBadge) notifCountBadge.textContent = '0';
            const badgeDot = document.querySelector('.badge-dot');
            if (badgeDot) badgeDot.style.display = 'none';
            markAllReadBtn.textContent = 'All Caught Up!';
            markAllReadBtn.disabled = true;
        });
    }


    /* =========================================================================
       4. TYPING ANIMATION EFFECT FOR TAGLINE (Requirement 14)
       ========================================================================= */
    const taglineElement = document.getElementById('typing-tagline');
    const taglinePhrase = "Empowering Farmers Through Shared Resources";
    let charIndex = 0;
    let isDeleting = false;

    function handleTypingEffect() {
        if (!taglineElement) return;

        if (!isDeleting && charIndex <= taglinePhrase.length) {
            taglineElement.textContent = taglinePhrase.substring(0, charIndex);
            charIndex++;
            setTimeout(handleTypingEffect, 65);
        } else if (isDeleting && charIndex >= 0) {
            taglineElement.textContent = taglinePhrase.substring(0, charIndex);
            charIndex--;
            setTimeout(handleTypingEffect, 35);
        } else if (!isDeleting && charIndex > taglinePhrase.length) {
            isDeleting = true;
            setTimeout(handleTypingEffect, 2800); // Pause before deleting
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            setTimeout(handleTypingEffect, 600); // Pause before retyping
        }
    }

    handleTypingEffect();


    /* =========================================================================
       5. DYNAMIC STATISTICS COUNTER ANIMATION (Requirement 4 & 5)
       ========================================================================= */
    const statCounters = document.querySelectorAll('.stat-counter');
    let hasAnimatedStats = false;

    function animateCounters() {
        statCounters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || 0;
            const duration = 1800; // 1.8 seconds animation
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic formula
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOutProgress * target);

                counter.textContent = currentVal.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    // Trigger on scroll via IntersectionObserver
    const statsSection = document.getElementById('dashboard');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedStats) {
                    animateCounters();
                    hasAnimatedStats = true;
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    }

    const refreshStatsBtn = document.getElementById('refresh-stats-btn');
    if (refreshStatsBtn) {
        refreshStatsBtn.addEventListener('click', () => {
            animateCounters();
            refreshStatsBtn.innerHTML = '<i class="fa-solid fa-check"></i> Refreshed';
            setTimeout(() => {
                refreshStatsBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Refresh Counters';
            }, 1500);
        });
    }


    /* =========================================================================
       6. EQUIPMENT CAROUSEL / BANNER SLIDER (Requirement 8)
       ========================================================================= */
    const sliderTrack = document.getElementById('slider-track');
    const prevSlideBtn = document.getElementById('slider-prev-btn');
    const nextSlideBtn = document.getElementById('slider-next-btn');
    const dotsContainer = document.getElementById('slider-dots-container');
    const machineryCards = document.querySelectorAll('.machinery-card');

    let currentSlideIndex = 0;
    let autoSlideInterval = null;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;
    }

    function getTotalSlideSteps() {
        const visibleCards = getVisibleCardsCount();
        return Math.max(machineryCards.length - visibleCards + 1, 1);
    }

    function createSliderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalSteps = getTotalSlideSteps();

        for (let i = 0; i < totalSteps; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === currentSlideIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlideIndex = i;
                updateSliderPosition();
                resetAutoSlideTimer();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSliderPosition() {
        if (!sliderTrack || machineryCards.length === 0) return;
        const totalSteps = getTotalSlideSteps();
        if (currentSlideIndex >= totalSteps) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = totalSteps - 1;

        const firstCard = machineryCards[0];
        const cardStyle = window.getComputedStyle(firstCard);
        const cardWidth = firstCard.offsetWidth;
        const gap = 24; // 1.5rem gap

        const offset = currentSlideIndex * (cardWidth + gap);
        sliderTrack.style.transform = `translateX(-${offset}px)`;

        // Update dot states
        document.querySelectorAll('.slider-dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlideIndex);
        });
    }

    function nextSlide() {
        currentSlideIndex++;
        updateSliderPosition();
    }

    function prevSlide() {
        currentSlideIndex--;
        updateSliderPosition();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4500);
    }

    function resetAutoSlideTimer() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlideTimer();
        });
    }

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlideTimer();
        });
    }

    // Pause on hover
    if (sliderTrack) {
        sliderTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderTrack.addEventListener('mouseleave', startAutoSlide);
    }

    createSliderDots();
    startAutoSlide();

    window.addEventListener('resize', () => {
        createSliderDots();
        updateSliderPosition();
    });


    /* =========================================================================
       7. LIVE EQUIPMENT SEARCH & FILTER PANEL (Enterprise Polish)
       ========================================================================= */
    const searchKeywordInput = document.getElementById('search-keyword');
    const searchCategorySelect = document.getElementById('search-category');
    const searchLocationSelect = document.getElementById('search-location');
    const searchForm = document.getElementById('machinery-search-form');
    const resetSearchBtn = document.getElementById('reset-search-btn');
    const searchStatusBar = document.getElementById('search-status-bar');

    function filterMachineryCatalog() {
        const keyword = (searchKeywordInput ? searchKeywordInput.value : '').toLowerCase().trim();
        const selectedCategory = (searchCategorySelect ? searchCategorySelect.value : 'all').toLowerCase();
        const selectedLocation = (searchLocationSelect ? searchLocationSelect.value : 'all').toLowerCase();

        let visibleCount = 0;

        machineryCards.forEach(card => {
            const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
            const cardLocation = (card.getAttribute('data-location') || '').toLowerCase();
            const cardText = card.textContent.toLowerCase();

            const matchesKeyword = !keyword || cardText.includes(keyword);
            const matchesCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
            const matchesLocation = selectedLocation === 'all' || cardLocation === selectedLocation;

            if (matchesKeyword && matchesCategory && matchesLocation) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Reset slider position to 0
        currentSlideIndex = 0;
        updateSliderPosition();

        if (searchStatusBar) {
            if (visibleCount === machineryCards.length) {
                searchStatusBar.innerHTML = `Showing all <strong>${visibleCount}</strong> featured machinery listings.`;
            } else if (visibleCount > 0) {
                searchStatusBar.innerHTML = `Filtered: Found <strong>${visibleCount}</strong> matching machinery units for your search parameters.`;
                searchStatusBar.style.color = 'var(--primary-green)';
            } else {
                searchStatusBar.innerHTML = `No machinery found matching your criteria. Try adjusting the category or district filters.`;
                searchStatusBar.style.color = 'var(--alert-red)';
            }
        }
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            filterMachineryCatalog();
        });
    }

    if (searchKeywordInput) searchKeywordInput.addEventListener('input', filterMachineryCatalog);
    if (searchCategorySelect) searchCategorySelect.addEventListener('change', filterMachineryCatalog);
    if (searchLocationSelect) searchLocationSelect.addEventListener('change', filterMachineryCatalog);

    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            if (searchKeywordInput) searchKeywordInput.value = '';
            if (searchCategorySelect) searchCategorySelect.value = 'all';
            if (searchLocationSelect) searchLocationSelect.value = 'all';
            filterMachineryCatalog();
        });
    }


    /* =========================================================================
       8. ADVANCED HTML5 FORM VALIDATION (Requirements 5-17)
       ========================================================================= */
    const regForm = document.getElementById('registration-form');
    const nameInput = document.getElementById('reg-name');
    const emailInput = document.getElementById('reg-email');
    const phoneInput = document.getElementById('reg-phone');
    const passwordInput = document.getElementById('reg-password');
    const ageInput = document.getElementById('reg-age');
    const dobInput = document.getElementById('reg-dob');
    const timeInput = document.getElementById('reg-time');
    const addressInput = document.getElementById('reg-address');
    const cancelBtn = document.getElementById('cancel-btn');
    const meterFill = document.getElementById('meter-fill');
    const formAlertBox = document.getElementById('form-alert-box');

    // Password Strength Meter
    if (passwordInput && meterFill) {
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            let score = 0;

            if (val.length >= 8) score += 25;
            if (/[A-Z]/.test(val)) score += 25;
            if (/[0-9]/.test(val)) score += 25;
            if (/[^A-Za-z0-9]/.test(val)) score += 25;

            meterFill.style.width = score + '%';

            if (score <= 25) {
                meterFill.style.backgroundColor = 'var(--alert-red)';
            } else if (score <= 50) {
                meterFill.style.backgroundColor = 'var(--alert-orange)';
            } else if (score <= 75) {
                meterFill.style.backgroundColor = 'var(--sky-blue)';
            } else {
                meterFill.style.backgroundColor = 'var(--primary-green)';
            }
        });
    }

    function setFieldError(fieldId, errorId, message) {
        const field = document.getElementById(fieldId);
        const errSpan = document.getElementById(errorId);
        if (field) field.closest('.form-group')?.classList.add('has-error');
        if (errSpan) errSpan.textContent = message;
    }

    function clearFieldError(fieldId, errorId) {
        const field = document.getElementById(fieldId);
        const errSpan = document.getElementById(errorId);
        if (field) field.closest('.form-group')?.classList.remove('has-error');
        if (errSpan) errSpan.textContent = '';
    }

    function clearAllFormErrors() {
        const errorIds = ['err-name', 'err-email', 'err-phone', 'err-password', 'err-gender', 'err-age', 'err-dob', 'err-time', 'err-skills', 'err-address'];
        const fieldIds = ['reg-name', 'reg-email', 'reg-phone', 'reg-password', 'reg-age', 'reg-dob', 'reg-time', 'reg-address'];

        errorIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });

        fieldIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.closest('.form-group')?.classList.remove('has-error');
        });

        if (formAlertBox) {
            formAlertBox.className = 'form-submission-alert';
            formAlertBox.style.display = 'none';
        }
    }

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearAllFormErrors();

            let isValid = true;

            // 1. Name Validation (Requirement 6)
            const nameVal = nameInput ? nameInput.value.trim() : '';
            if (!nameVal || nameVal.length < 3) {
                setFieldError('reg-name', 'err-name', 'Please enter your full name (minimum 3 characters).');
                isValid = false;
            } else {
                clearFieldError('reg-name', 'err-name');
            }

            // 2. Email Validation (Requirement 7)
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                setFieldError('reg-email', 'err-email', 'Please enter a valid email address (e.g., name@domain.com).');
                isValid = false;
            } else {
                clearFieldError('reg-email', 'err-email');
            }

            // 3. Phone Validation with Pattern (Requirement 8)
            const phoneVal = phoneInput ? phoneInput.value.trim() : '';
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneVal || !phoneRegex.test(phoneVal)) {
                setFieldError('reg-phone', 'err-phone', 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
                isValid = false;
            } else {
                clearFieldError('reg-phone', 'err-phone');
            }

            // 4. Password Validation
            const passVal = passwordInput ? passwordInput.value : '';
            if (!passVal || passVal.length < 8) {
                setFieldError('reg-password', 'err-password', 'Password must be at least 8 characters long.');
                isValid = false;
            } else if (!/[A-Z]/.test(passVal) || !/[0-9]/.test(passVal)) {
                setFieldError('reg-password', 'err-password', 'Password must contain at least 1 uppercase letter and 1 numeric digit.');
                isValid = false;
            } else {
                clearFieldError('reg-password', 'err-password');
            }

            // 5. Gender Radio Buttons (Requirement 15)
            const genderChecked = document.querySelector('input[name="gender"]:checked');
            if (!genderChecked) {
                const errGender = document.getElementById('err-gender');
                if (errGender) errGender.textContent = 'Please select your gender.';
                isValid = false;
            } else {
                const errGender = document.getElementById('err-gender');
                if (errGender) errGender.textContent = '';
            }

            // 6. Age Validation (Requirement 11 - Number min/max)
            const ageVal = ageInput ? parseInt(ageInput.value, 10) : 0;
            if (!ageVal || isNaN(ageVal) || ageVal < 18 || ageVal > 100) {
                setFieldError('reg-age', 'err-age', 'Please enter a valid age between 18 and 100.');
                isValid = false;
            } else {
                clearFieldError('reg-age', 'err-age');
            }

            // 7. Date of Birth (Requirement 9)
            const dobVal = dobInput ? dobInput.value : '';
            if (!dobVal) {
                setFieldError('reg-dob', 'err-dob', 'Please select your date of birth.');
                isValid = false;
            } else {
                clearFieldError('reg-dob', 'err-dob');
            }

            // 8. Preferred Time (Requirement 10)
            const timeVal = timeInput ? timeInput.value : '';
            if (!timeVal) {
                setFieldError('reg-time', 'err-time', 'Please select a preferred appointment or equipment pickup time.');
                isValid = false;
            } else {
                clearFieldError('reg-time', 'err-time');
            }

            // 9. Skills / Interests Checkboxes (Requirement 16)
            const checkedSkills = document.querySelectorAll('input[name="skills"]:checked');
            const errSkills = document.getElementById('err-skills');
            if (checkedSkills.length === 0) {
                if (errSkills) errSkills.textContent = 'Please select at least one agricultural machinery skill or interest.';
                isValid = false;
            } else {
                if (errSkills) errSkills.textContent = '';
            }

            // 10. Address Validation (Requirement 14)
            const addressVal = addressInput ? addressInput.value.trim() : '';
            if (!addressVal || addressVal.length < 10) {
                setFieldError('reg-address', 'err-address', 'Please provide a complete farm address (minimum 10 characters).');
                isValid = false;
            } else {
                clearFieldError('reg-address', 'err-address');
            }

            // Final Response Feedback
            if (isValid) {
                const selectedSkillsList = Array.from(checkedSkills).map(cb => cb.value).join(', ');
                if (formAlertBox) {
                    formAlertBox.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i> 
                        <strong>Registration Completed Successfully!</strong><br>
                        Welcome to AgriShare, <strong>${nameVal}</strong> (Age: ${ageVal}). Preferred Slot: <strong>${timeVal}</strong>.<br>
                        Registered Interests: <em>${selectedSkillsList}</em>.<br>
                        Your farmer credentials have been validated according to HTML5 standards.
                    `;
                    formAlertBox.className = 'form-submission-alert success';
                    formAlertBox.style.display = 'block';
                }

                regForm.reset();
                if (meterFill) meterFill.style.width = '0%';

                // Smooth scroll to alert
                formAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                if (formAlertBox) {
                    formAlertBox.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation"></i> 
                        <strong>Validation Error:</strong> Please fill in all required HTML5 fields correctly.
                    `;
                    formAlertBox.className = 'form-submission-alert error';
                    formAlertBox.style.display = 'block';
                }
            }
        });

        // 17. Form Controls: Reset Button
        regForm.addEventListener('reset', () => {
            clearAllFormErrors();
            if (meterFill) meterFill.style.width = '0%';
        });

        // 17. Form Controls: Cancel Button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                const confirmCancel = confirm('Are you sure you want to cancel the registration process? All entered fields will be cleared.');
                if (confirmCancel) {
                    regForm.reset();
                    clearAllFormErrors();
                    if (meterFill) meterFill.style.width = '0%';
                    if (formAlertBox) {
                        formAlertBox.innerHTML = '<i class="fa-solid fa-circle-info"></i> Registration form input has been cancelled.';
                        formAlertBox.className = 'form-submission-alert error';
                        formAlertBox.style.display = 'block';
                        setTimeout(() => { formAlertBox.style.display = 'none'; }, 3000);
                    }
                }
            });
        }
    }


    /* =========================================================================
       9. FLOATING SCROLL TO TOP BUTTON (Requirement 16)
       ========================================================================= */
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (!scrollToTopBtn) return;
        if (window.scrollY > 350) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* =========================================================================
       10. ACTIVE NAVIGATION MENU HIGHLIGHTING & SMOOTH SCROLL (Requirement 2)
       ========================================================================= */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    function highlightActiveMenuOnScroll() {
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveMenuOnScroll);


    /* =========================================================================
       11. SIDEBAR COLLAPSE & MOBILE TOGGLE
       ========================================================================= */
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');

    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('mobile-open');
                if (overlay) {
                    overlay.classList.toggle('active', sidebar.classList.contains('mobile-open'));
                }
            } else {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    // Close mobile sidebar on nav click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove('mobile-open');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });


    /* =========================================================================
       12. LOGIN & AUTH MODAL LOGIC
       ========================================================================= */
    const loginModal = document.getElementById('login-modal');
    const openLoginBtn = document.getElementById('open-login-btn');
    const closeLoginBtn = document.getElementById('close-login-modal');
    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    const modalLoginForm = document.getElementById('modal-login-form');
    const modalAlert = document.getElementById('modal-alert');

    function openLoginModal() {
        if (loginModal) loginModal.classList.add('active');
    }

    function closeLoginModal() {
        if (loginModal) loginModal.classList.remove('active');
    }

    if (openLoginBtn) openLoginBtn.addEventListener('click', openLoginModal);
    if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);
    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to log out of AgriShare?');
            if (confirmed) {
                openLoginModal();
            }
        });
    }

    if (modalLoginForm) {
        modalLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (modalAlert) {
                modalAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Authenticated successfully as Kohila M!';
                modalAlert.style.display = 'block';
                modalAlert.style.backgroundColor = 'rgba(46, 125, 50, 0.15)';
                modalAlert.style.color = 'var(--primary-green)';
            }
            setTimeout(() => {
                closeLoginModal();
                if (modalAlert) modalAlert.style.display = 'none';
            }, 1200);
        });
    }

    // Equipment "Rent Machinery" Quick Action Trigger
    document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const machineName = btn.getAttribute('data-machine') || 'Machinery';
            const registerSection = document.getElementById('register');
            if (registerSection) {
                registerSection.scrollIntoView({ behavior: 'smooth' });
                const addressBox = document.getElementById('reg-address');
                if (addressBox) {
                    addressBox.placeholder = `Booking Request for: ${machineName}. Please enter your delivery address...`;
                    addressBox.focus();
                }
            }
        });
    });

    // Quick Inquiry Form Handler
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting AgriShare! Regional Support Coordinator will reach out to you within 2 hours.');
            inquiryForm.reset();
        });
    }

});
