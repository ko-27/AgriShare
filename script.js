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
       8. PASSWORD STRENGTH METER
       ========================================================================= */
    const passwordInputEl = document.getElementById('reg-password');
    const meterFillEl = document.getElementById('meter-fill');

    if (passwordInputEl && meterFillEl) {
        passwordInputEl.addEventListener('input', () => {
            const val = passwordInputEl.value;
            let score = 0;
            if (val.length >= 8) score += 25;
            if (/[A-Z]/.test(val)) score += 25;
            if (/[0-9]/.test(val)) score += 25;
            if (/[^A-Za-z0-9]/.test(val)) score += 25;

            meterFillEl.style.width = score + '%';

            if (score <= 25) {
                meterFillEl.style.backgroundColor = 'var(--alert-red)';
            } else if (score <= 50) {
                meterFillEl.style.backgroundColor = 'var(--alert-orange)';
            } else if (score <= 75) {
                meterFillEl.style.backgroundColor = 'var(--sky-blue)';
            } else {
                meterFillEl.style.backgroundColor = 'var(--primary-green)';
            }
        });
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
       12. USER ROLES & AUTHENTICATION (Farmer vs Administrator)
       ========================================================================= */
    const loginModal = document.getElementById('login-modal');
    const openLoginBtn = document.getElementById('open-login-btn');
    const closeLoginBtn = document.getElementById('close-login-modal');
    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    const sidebarRoleToggleBtn = document.getElementById('sidebar-role-toggle-btn');
    const sidebarRoleText = document.getElementById('sidebar-role-text');
    const modalLoginForm = document.getElementById('modal-login-form');
    const modalAlert = document.getElementById('modal-alert');
    const tabFarmerBtn = document.getElementById('tab-farmer-btn');
    const tabAdminBtn = document.getElementById('tab-admin-btn');
    const farmerFields = document.getElementById('farmer-fields');
    const adminFields = document.getElementById('admin-fields');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    const topbarUserAvatar = document.getElementById('topbar-user-avatar');
    const currentUserName = document.getElementById('current-user-name');
    const currentUserRoleBadge = document.getElementById('current-user-role-badge');
    const adminSidebarNavItem = document.getElementById('admin-sidebar-nav-item');
    const adminRestrictedView = document.getElementById('admin-restricted-view');
    const adminStorageView = document.getElementById('admin-storage-view');
    const reportsSection = document.getElementById('reports');
    const switchToAdminFromCard = document.getElementById('switch-to-admin-from-card');

    let currentRole = localStorage.getItem('agrishare_user_role') || 'farmer';
    let modalActiveTab = 'farmer';

    function setRole(newRole) {
        currentRole = newRole;
        localStorage.setItem('agrishare_user_role', currentRole);
        applyRoleUI();
    }

    function applyRoleUI() {
        const isAdmin = currentRole === 'admin';

        // Update Topbar
        if (currentUserName) {
            currentUserName.textContent = isAdmin ? 'AgriShare Administrator' : 'Ramesh Kumar';
        }
        if (currentUserRoleBadge) {
            currentUserRoleBadge.innerHTML = isAdmin 
                ? '<i class="fa-solid fa-shield-halved"></i> Administrator' 
                : '<i class="fa-solid fa-seedling"></i> Farmer Account';
            currentUserRoleBadge.className = 'user-role-tag' + (isAdmin ? ' admin-tag' : '');
        }
        if (topbarUserAvatar) {
            topbarUserAvatar.innerHTML = isAdmin 
                ? '<i class="fa-solid fa-user-shield"></i>' 
                : '<i class="fa-solid fa-wheat-awn"></i>';
        }

        // Update Sidebar
        if (sidebarRoleText) {
            sidebarRoleText.textContent = isAdmin ? 'Switch to Farmer Mode' : 'Switch to Admin Mode';
        }
        if (adminSidebarNavItem) {
            adminSidebarNavItem.style.display = isAdmin ? 'block' : 'none';
        }

        // Update Reports Section Visibility (Only visible for Admins!)
        if (reportsSection) {
            reportsSection.style.display = isAdmin ? 'block' : 'none';
        }

        // Update Storage View (Storage only visible for Admins!)
        if (adminRestrictedView && adminStorageView) {
            if (isAdmin) {
                adminRestrictedView.style.display = 'none';
                adminStorageView.style.display = 'block';
                renderWebStorageTables();
            } else {
                adminRestrictedView.style.display = 'flex';
                adminStorageView.style.display = 'none';
            }
        }
    }

    // Role tabs in modal
    if (tabFarmerBtn && tabAdminBtn) {
        tabFarmerBtn.addEventListener('click', () => {
            modalActiveTab = 'farmer';
            tabFarmerBtn.classList.add('active');
            tabAdminBtn.classList.remove('active');
            if (farmerFields) farmerFields.style.display = 'block';
            if (adminFields) adminFields.style.display = 'none';
            if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login as Farmer';
        });

        tabAdminBtn.addEventListener('click', () => {
            modalActiveTab = 'admin';
            tabAdminBtn.classList.add('active');
            tabFarmerBtn.classList.remove('active');
            if (farmerFields) farmerFields.style.display = 'none';
            if (adminFields) adminFields.style.display = 'block';
            if (modalSubmitBtn) modalSubmitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login as Administrator';
        });
    }

    // Quick Switch to Admin from restricted storage card
    if (switchToAdminFromCard) {
        switchToAdminFromCard.addEventListener('click', () => {
            setRole('admin');
            alert('Switched to Administrator Workspace. You now have full access to Web Storage tables and reports.');
        });
    }

    // Toggle Role from Sidebar
    if (sidebarRoleToggleBtn) {
        sidebarRoleToggleBtn.addEventListener('click', () => {
            const nextRole = currentRole === 'farmer' ? 'admin' : 'farmer';
            setRole(nextRole);
            alert(`Switched mode to: ${nextRole.toUpperCase()}`);
        });
    }

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
            const confirmed = confirm('Are you sure you want to sign out?');
            if (confirmed) {
                setRole('farmer');
                openLoginModal();
            }
        });
    }

    if (modalLoginForm) {
        modalLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            setRole(modalActiveTab);
            if (modalAlert) {
                modalAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Authenticated successfully as ${modalActiveTab === 'admin' ? 'Administrator' : 'Farmer'}!`;
                modalAlert.style.display = 'block';
                modalAlert.style.backgroundColor = 'rgba(46, 125, 50, 0.15)';
                modalAlert.style.color = 'var(--primary-green)';
            }
            setTimeout(() => {
                closeLoginModal();
                if (modalAlert) modalAlert.style.display = 'none';
            }, 1000);
        });
    }

    // Apply role UI on initial page load
    applyRoleUI();

    // Equipment "Book Machinery" Quick Action Trigger from Services & Catalog
    document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const machineName = btn.getAttribute('data-machine') || 'Machinery';
            const registerSection = document.getElementById('register');
            if (registerSection) {
                registerSection.scrollIntoView({ behavior: 'smooth' });
                // Add to dropped equipment automatically
                addMachineToDropZone(machineName, 'fa-tractor', 'Included in Booking');
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


        /* =========================================================================
       13. INTEGRATED HTML5 DRAG AND DROP WITH PICTURES & HOURLY RATES
       ========================================================================= */
    const draggableItems = document.querySelectorAll('.machinery-drag-item');
    const dropTargetBox = document.getElementById('drop-target-box');
    const dropPlaceholder = document.getElementById('drop-placeholder');
    const droppedItemsList = document.getElementById('dropped-items-list');
    const dropStatusMsg = document.getElementById('drop-status-msg');
    const clearDropBtn = document.getElementById('clear-drop-btn');
    const selectedMachineryInput = document.getElementById('selected-machinery-input');
    const selectedMachineryPrice = document.getElementById('selected-machinery-price');
    const equipNameField = document.getElementById('equipment-name-field');
    const equipPriceField = document.getElementById('equipment-price-field');
    const errMachinery = document.getElementById('err-machinery');

    let draggedItemData = null;

    draggableItems.forEach(item => {
        // Dragstart Event
        item.addEventListener('dragstart', (e) => {
            draggedItemData = {
                id: item.id,
                name: item.getAttribute('data-machinery') || 'Machinery Unit',
                category: item.getAttribute('data-category') || 'Farm Equipment',
                price: item.getAttribute('data-price') || '350',
                rate: item.getAttribute('data-rate') || '₹350 / hour',
                img: item.getAttribute('data-img') || ''
            };
            e.dataTransfer.setData('text/plain', JSON.stringify(draggedItemData));
            e.dataTransfer.effectAllowed = 'copy';
            item.classList.add('dragging');
        });

        // Dragend Event
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });

        // Click fallback (mobile & quick selection)
        item.addEventListener('click', () => {
            const data = {
                id: item.id,
                name: item.getAttribute('data-machinery') || 'Machinery Unit',
                category: item.getAttribute('data-category') || 'Farm Equipment',
                price: item.getAttribute('data-price') || '350',
                rate: item.getAttribute('data-rate') || '₹350 / hour',
                img: item.getAttribute('data-img') || ''
            };
            addMachineToDropZone(data);
        });
    });

    function addMachineToDropZone(data) {
        if (!droppedItemsList || !data || !data.name) return;

        // Clear existing slot for clean 1-machine focus (or replace)
        droppedItemsList.innerHTML = '';

        if (dropPlaceholder) dropPlaceholder.style.display = 'none';
        if (clearDropBtn) clearDropBtn.style.display = 'inline-flex';

        const itemPill = document.createElement('div');
        itemPill.className = 'booked-machine-pill';
        itemPill.setAttribute('data-dropped-name', data.name);
        itemPill.innerHTML = `
            <div class="dropped-photo-card">
                ${data.img ? `<img src="${data.img}" alt="${data.name}" class="dropped-photo-preview">` : '<i class="fa-solid fa-tractor"></i>'}
                <div class="machine-info">
                    <strong>${data.name}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-muted); margin: 2px 0;">${data.category}</div>
                    <span class="price-hour-badge"><i class="fa-solid fa-tag"></i> ${data.rate}</span>
                </div>
            </div>
            <button type="button" class="remove-machine-btn" title="Remove picture & reset">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

        itemPill.querySelector('.remove-machine-btn').addEventListener('click', () => {
            itemPill.remove();
            if (dropPlaceholder) dropPlaceholder.style.display = 'flex';
            if (clearDropBtn) clearDropBtn.style.display = 'none';
            if (equipNameField) equipNameField.value = '';
            if (equipPriceField) equipPriceField.value = '';
            if (selectedMachineryInput) selectedMachineryInput.value = '';
            if (selectedMachineryPrice) selectedMachineryPrice.value = '';
            syncSelectedMachinery();
        });

        droppedItemsList.appendChild(itemPill);

        // Auto-fill form input fields
        if (equipNameField) equipNameField.value = data.name;
        if (equipPriceField) equipPriceField.value = data.price;
        if (selectedMachineryInput) selectedMachineryInput.value = `${data.name} (${data.rate})`;
        if (selectedMachineryPrice) selectedMachineryPrice.value = data.price;

        if (dropStatusMsg) {
            dropStatusMsg.textContent = `✔ Equipment picture assigned: ${data.name} at ${data.rate}`;
            dropStatusMsg.style.color = 'var(--primary-green)';
            dropStatusMsg.style.display = 'block';
            setTimeout(() => { dropStatusMsg.style.display = 'none'; }, 3000);
        }

        if (errMachinery) errMachinery.style.display = 'none';
        syncSelectedMachinery();
    }

    if (dropTargetBox) {
        // Dragover Event
        dropTargetBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
            dropTargetBox.classList.add('drag-over');
        });

        // Dragleave Event
        dropTargetBox.addEventListener('dragleave', () => {
            dropTargetBox.classList.remove('drag-over');
        });

        // Drop Event
        dropTargetBox.addEventListener('drop', (e) => {
            e.preventDefault();
            dropTargetBox.classList.remove('drag-over');

            let itemData = draggedItemData;
            try {
                const textData = e.dataTransfer.getData('text/plain');
                if (textData) itemData = JSON.parse(textData);
            } catch (err) {
                // fallback
            }

            if (!itemData || !itemData.name) return;
            addMachineToDropZone(itemData);
        });
    }

    if (clearDropBtn) {
        clearDropBtn.addEventListener('click', () => {
            if (droppedItemsList) droppedItemsList.innerHTML = '';
            if (dropPlaceholder) dropPlaceholder.style.display = 'flex';
            if (clearDropBtn) clearDropBtn.style.display = 'none';
            if (equipNameField) equipNameField.value = '';
            if (equipPriceField) equipPriceField.value = '';
            if (selectedMachineryInput) selectedMachineryInput.value = '';
            if (selectedMachineryPrice) selectedMachineryPrice.value = '';
            syncSelectedMachinery();
        });
    }

    function syncSelectedMachinery() {
        const item = droppedItemsList ? droppedItemsList.querySelector('.booked-machine-pill') : null;
        const currentSession = getSessionStorageUser();
        currentSession.machinery = item ? item.getAttribute('data-dropped-name') : 'None Selected';
        sessionStorage.setItem('agrishare_current_user', JSON.stringify(currentSession));
    }


    /* =========================================================================
       14. HTML5 WEB STORAGE IMPLEMENTATION (Referencing FS_exp4 Sample Output)
       ========================================================================= */
    const retrieveStorageBtn = document.getElementById('retrieve-storage-btn');
    const clearStorageBtn = document.getElementById('clear-storage-btn');
    const localTbody = document.getElementById('local-storage-tbody');
    const sessionTbody = document.getElementById('session-storage-tbody');
    const localCountBadge = document.getElementById('local-count-badge');
    const sessionCountBadge = document.getElementById('session-count-badge');

    // Default Seed Data for Local Storage (Matching FS_exp4 Structure)
    const defaultLocalUsers = [
        {
            name: "Ramesh Kumar",
            email: "ramesh.farmer@gmail.com",
            phone: "9842109876",
            gender: "Male",
            age: 38,
            dob: "2026-07-15",
            time: "07:00",
            machinery: "Mahindra 575 DI Tractor (₹350/hr)",
            address: "Main Road, Gobichettipalayam, Erode"
        },
        {
            name: "Muthusamy V.",
            email: "muthu.farm@gmail.com",
            phone: "9786543210",
            gender: "Male",
            age: 44,
            dob: "2026-07-18",
            time: "08:30",
            machinery: "John Deere W70 Harvester (₹1,200/hr)",
            address: "Karamadai, Coimbatore"
        },
        {
            name: "Selvi R.",
            email: "selvi.organic@gmail.com",
            phone: "9443210987",
            gender: "Female",
            age: 32,
            dob: "2026-07-20",
            time: "06:30",
            machinery: "Kirloskar 10HP Pump (₹150/hr)",
            address: "Anthiyur, Bhavani Taluk"
        }
    ];

    function getLocalStorageUsers() {
        const stored = localStorage.getItem('agrishare_registered_users');
        if (!stored) {
            localStorage.setItem('agrishare_registered_users', JSON.stringify(defaultLocalUsers));
            return defaultLocalUsers;
        }
        try {
            return JSON.parse(stored) || [];
        } catch (e) {
            return [];
        }
    }

    function getSessionStorageUser() {
        const stored = sessionStorage.getItem('agrishare_current_user');
        if (!stored) {
            const defaultSession = {
                name: "Ramesh Kumar",
                email: "ramesh.farmer@gmail.com",
                phone: "9842109876",
                gender: "Male",
                machinery: "Mahindra 575 DI Tractor (₹350/hr)"
            };
            sessionStorage.setItem('agrishare_current_user', JSON.stringify(defaultSession));
            return defaultSession;
        }
        try {
            return JSON.parse(stored) || { name: "Guest", email: "-", phone: "-", gender: "-", machinery: "None" };
        } catch (e) {
            return { name: "Guest", email: "-", phone: "-", gender: "-", machinery: "None" };
        }
    }

    function renderWebStorageTables() {
        // Render Local Storage Table (FS_exp4 columns)
        if (localTbody) {
            const users = getLocalStorageUsers();
            if (localCountBadge) localCountBadge.textContent = `${users.length} Records`;

            if (users.length === 0) {
                localTbody.innerHTML = `
                    <tr class="empty-storage-row">
                        <td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">No user records currently stored in localStorage.</td>
                    </tr>
                `;
            } else {
                localTbody.innerHTML = users.map(user => `
                    <tr>
                        <td><strong>${escapeHtml(user.name)}</strong></td>
                        <td>${escapeHtml(user.email)}</td>
                        <td>${escapeHtml(user.phone)}</td>
                        <td><span class="badge ${user.gender === 'Female' ? 'badge-primary' : 'badge-info'}">${escapeHtml(user.gender)}</span></td>
                        <td>${user.age || '-'}</td>
                        <td>${escapeHtml(user.dob || '-')}</td>
                        <td>${escapeHtml(user.time || '-')}</td>
                        <td><span class="badge badge-success"><i class="fa-solid fa-tractor"></i> ${escapeHtml(user.machinery || '-')}</span></td>
                        <td><small>${escapeHtml(user.address || '-')}</small></td>
                    </tr>
                `).join('');
            }
        }

        // Render Session Storage Table (FS_exp4 columns)
        if (sessionTbody) {
            const currentSession = getSessionStorageUser();
            const hasSession = currentSession && currentSession.name && currentSession.name !== '-';
            if (sessionCountBadge) sessionCountBadge.textContent = hasSession ? "1 Active Session" : "0 Active Session";

            if (!hasSession) {
                sessionTbody.innerHTML = `
                    <tr class="empty-storage-row">
                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">No active temporary session stored in sessionStorage.</td>
                    </tr>
                `;
            } else {
                sessionTbody.innerHTML = `
                    <tr>
                        <td><strong>${escapeHtml(currentSession.name)}</strong></td>
                        <td>${escapeHtml(currentSession.email)}</td>
                        <td>${escapeHtml(currentSession.phone)}</td>
                        <td><span class="badge badge-primary">${escapeHtml(currentSession.gender || 'Male')}</span></td>
                        <td><span class="badge badge-success"><i class="fa-solid fa-check"></i> ${escapeHtml(currentSession.machinery || 'None')}</span></td>
                    </tr>
                `;
            }
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // Retrieve Data Button Event
    if (retrieveStorageBtn) {
        retrieveStorageBtn.addEventListener('click', () => {
            renderWebStorageTables();
            alert('Web Storage data retrieved and refreshed successfully!');
        });
    }

    // Clear Data Button Event (Matches sample output in PDF: Alert "All data cleared successfully.")
    if (clearStorageBtn) {
        clearStorageBtn.addEventListener('click', () => {
            localStorage.removeItem('agrishare_registered_users');
            sessionStorage.removeItem('agrishare_current_user');
            
            if (localTbody) {
                localTbody.innerHTML = `
                    <tr class="empty-storage-row">
                        <td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">All localStorage user records cleared.</td>
                    </tr>
                `;
            }
            if (sessionTbody) {
                sessionTbody.innerHTML = `
                    <tr class="empty-storage-row">
                        <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">All sessionStorage data cleared.</td>
                    </tr>
                `;
            }
            if (localCountBadge) localCountBadge.textContent = '0 Records';
            if (sessionCountBadge) sessionCountBadge.textContent = '0 Active Session';

            alert('All data cleared successfully.');
        });
    }


    /* =========================================================================
       15. FORM VALIDATION & BOOKING SUBMISSION LOGIC
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
    const formAlertBox = document.getElementById('form-alert-box');

    function setFieldError(fieldId, errId, msg) {
        const field = document.getElementById(fieldId);
        const err = document.getElementById(errId);
        if (field) {
            field.closest('.form-group')?.classList.add('has-error');
        }
        if (err) {
            err.textContent = msg;
            err.style.display = 'block';
        }
    }

    function clearFieldError(fieldId, errId) {
        const field = document.getElementById(fieldId);
        const err = document.getElementById(errId);
        if (field) {
            field.closest('.form-group')?.classList.remove('has-error');
        }
        if (err) {
            err.textContent = '';
            err.style.display = 'none';
        }
    }

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 1. Name
            const nameVal = nameInput ? nameInput.value.trim() : '';
            if (!nameVal || nameVal.length < 3) {
                setFieldError('reg-name', 'err-name', 'Please enter your full name (at least 3 characters).');
                isValid = false;
            } else {
                clearFieldError('reg-name', 'err-name');
            }

            // 2. Email
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailVal || !emailRegex.test(emailVal)) {
                setFieldError('reg-email', 'err-email', 'Please provide a valid email address.');
                isValid = false;
            } else {
                clearFieldError('reg-email', 'err-email');
            }

            // 3. Phone
            const phoneVal = phoneInput ? phoneInput.value.trim() : '';
            const phoneRegex = /^[6-9][0-9]{9}$/;
            if (!phoneVal || !phoneRegex.test(phoneVal)) {
                setFieldError('reg-phone', 'err-phone', 'Enter a valid 10-digit Indian mobile number starting with 6-9.');
                isValid = false;
            } else {
                clearFieldError('reg-phone', 'err-phone');
            }

            // 4. Equipment Name & Price
            const equipNameVal = equipNameField ? equipNameField.value.trim() : '';
            const equipPriceVal = equipPriceField ? equipPriceField.value.trim() : '';
            if (!equipNameVal) {
                setFieldError('equipment-name-field', 'err-equip-name', 'Please drag an equipment picture or type the equipment model.');
                isValid = false;
            } else {
                clearFieldError('equipment-name-field', 'err-equip-name');
            }

            if (!equipPriceVal || parseInt(equipPriceVal, 10) < 50) {
                setFieldError('equipment-price-field', 'err-price', 'Please specify a valid hourly rental rate (min ₹50/hr).');
                isValid = false;
            } else {
                clearFieldError('equipment-price-field', 'err-price');
            }

            // 5. Password
            const passVal = passwordInput ? passwordInput.value : '';
            if (!passVal || passVal.length < 8) {
                setFieldError('reg-password', 'err-password', 'Password must be at least 8 characters long.');
                isValid = false;
            } else {
                clearFieldError('reg-password', 'err-password');
            }

            // 6. Gender
            const genderChecked = document.querySelector('input[name="gender"]:checked');
            if (!genderChecked) {
                const errGender = document.getElementById('err-gender');
                if (errGender) errGender.textContent = 'Please select your gender.';
                isValid = false;
            } else {
                const errGender = document.getElementById('err-gender');
                if (errGender) errGender.textContent = '';
            }

            // 7. Age
            const ageVal = ageInput ? parseInt(ageInput.value, 10) : 0;
            if (!ageVal || isNaN(ageVal) || ageVal < 18 || ageVal > 100) {
                setFieldError('reg-age', 'err-age', 'Please enter a valid age between 18 and 100.');
                isValid = false;
            } else {
                clearFieldError('reg-age', 'err-age');
            }

            // 8. Date
            const dobVal = dobInput ? dobInput.value : '';
            if (!dobVal) {
                setFieldError('reg-dob', 'err-dob', 'Please select an available rental date.');
                isValid = false;
            } else {
                clearFieldError('reg-dob', 'err-dob');
            }

            // 9. Time
            const timeVal = timeInput ? timeInput.value : '';
            if (!timeVal) {
                setFieldError('reg-time', 'err-time', 'Please select an operating shift time.');
                isValid = false;
            } else {
                clearFieldError('reg-time', 'err-time');
            }

            // 10. Address
            const addressVal = addressInput ? addressInput.value.trim() : '';
            if (!addressVal || addressVal.length < 8) {
                setFieldError('reg-address', 'err-address', 'Please provide farm location / station (minimum 8 characters).');
                isValid = false;
            } else {
                clearFieldError('reg-address', 'err-address');
            }

            if (isValid) {
                const bookingId = '#AGRI-' + Math.floor(1000 + Math.random() * 9000);
                const genderVal = genderChecked ? genderChecked.value : 'Male';
                const machinerySummary = `${equipNameVal} (₹${equipPriceVal}/hr)`;

                // Save to localStorage
                const newUser = {
                    name: nameVal,
                    email: emailVal,
                    phone: phoneVal,
                    gender: genderVal,
                    age: ageVal,
                    dob: dobVal,
                    time: timeVal,
                    machinery: machinerySummary,
                    address: addressVal
                };
                const currentLocal = getLocalStorageUsers();
                currentLocal.unshift(newUser);
                localStorage.setItem('agrishare_registered_users', JSON.stringify(currentLocal));

                // Save to sessionStorage
                sessionStorage.setItem('agrishare_current_user', JSON.stringify({
                    name: nameVal,
                    email: emailVal,
                    phone: phoneVal,
                    gender: genderVal,
                    machinery: machinerySummary
                }));

                // Show confirmation
                if (formAlertBox) {
                    formAlertBox.innerHTML = `
                        <i class="fa-solid fa-circle-check"></i> 
                        <strong>Rental Listing Submitted Successfully!</strong><br>
                        Listing Reference: <strong>${bookingId}</strong> for <strong>${nameVal}</strong>.<br>
                        Registered Equipment: <strong>${machinerySummary}</strong>. Available: <strong>${dobVal} at ${timeVal}</strong>.<br>
                        Your machinery has been added to AgriShare inventory and saved to client-side Web Storage.
                    `;
                    formAlertBox.className = 'form-submission-alert success';
                    formAlertBox.style.display = 'block';
                    formAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // Reset drop target
                if (droppedItemsList) droppedItemsList.innerHTML = '';
                if (dropPlaceholder) dropPlaceholder.style.display = 'flex';
                if (clearDropBtn) clearDropBtn.style.display = 'none';

                // Refresh Web Storage tables
                renderWebStorageTables();
            } else {
                if (formAlertBox) {
                    formAlertBox.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation"></i> 
                        <strong>Validation Error:</strong> Please fill in all required fields and specify equipment details.
                    `;
                    formAlertBox.className = 'form-submission-alert error';
                    formAlertBox.style.display = 'block';
                    formAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }


    /* =========================================================================
       16. HELP CENTER INTERACTIVE ACCORDION
       ========================================================================= */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(other => other.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Default seed initialization
    renderWebStorageTables();

});
