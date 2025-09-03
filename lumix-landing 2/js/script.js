// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initPlacementJourney();
    initGitHubSearch();
    initCommunityInteractions();
    initResponsiveFeatures();
    initAboutQuadrant();
    initAboutImageCursorEffect();
    initAboutScrollAnimation();
    initContinuousScrollingText();
    initDashboard();
    initHologramAnimations();
});

// GitHub Hero Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // GitHub Hero Video Animation
    const heroVideo = document.getElementById('hero-video');
    const demoCursor = document.getElementById('demo-cursor');
    const triggerZones = document.querySelectorAll('.trigger-zone');
    const demoInteractionArea = document.querySelector('.demo-interaction-area');
    
    // Video animation on scroll
    function handleVideoAnimation() {
        const heroSection = document.querySelector('.github-hero');
        if (!heroSection || !heroVideo) return;
        
        const rect = heroSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if section is in viewport
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        
        if (isInView) {
            // Calculate how much of the section is visible
            const visiblePercentage = Math.min(1, (windowHeight - rect.top) / windowHeight);
            
            // Ensure video plays when section is visible
            if (visiblePercentage > 0.5) {
                // Ensure video plays
                heroVideo.play().catch(e => console.log('Video play failed:', e));
            }
            
            // Parallax effect for video
            const translateY = rect.top * 0.2;
            heroVideo.style.transform = `translateY(${translateY}px) scale(1.05)`;
        }
    }
    
    // Cursor animation
    function animateCursor() {
        if (!demoCursor || !demoInteractionArea) return;
        
        const areaRect = demoInteractionArea.getBoundingClientRect();
        let isAnimating = false;
        
        // Auto cursor movement
        const cursorPositions = [
            { x: 20, y: 20 },
            { x: 70, y: 50 },
            { x: 40, y: 80 },
            { x: 80, y: 30 },
            { x: 30, y: 70 }
        ];
        
        let currentPosition = 0;
        
        function moveCursor() {
            if (isAnimating) return;
            
            const position = cursorPositions[currentPosition];
            const x = (position.x / 100) * areaRect.width;
            const y = (position.y / 100) * areaRect.height;
            
            demoCursor.style.left = x + 'px';
            demoCursor.style.top = y + 'px';
            
            currentPosition = (currentPosition + 1) % cursorPositions.length;
            
            setTimeout(moveCursor, 2000);
        }
        
        // Start cursor animation after 3 seconds
        setTimeout(moveCursor, 3000);
        
        // Trigger zone interactions
        triggerZones.forEach((zone, index) => {
            zone.addEventListener('mouseenter', function() {
                isAnimating = true;
                demoCursor.style.left = this.offsetLeft + 40 + 'px';
                demoCursor.style.top = this.offsetTop + 40 + 'px';
                
                // Add click effect
                demoCursor.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    demoCursor.style.transform = 'scale(1)';
                }, 200);
                
                // Trigger video scale effect
                if (heroVideo) {
                    heroVideo.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        heroVideo.style.transform = 'scale(1)';
                    }, 300);
                }
            });
            
            zone.addEventListener('mouseleave', function() {
                isAnimating = false;
            });
            
            zone.addEventListener('click', function() {
                // Enhanced video effect on click
                if (heroVideo) {
                    heroVideo.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        heroVideo.style.transform = 'scale(1)';
                    }, 400);
                }
            });
        });
    }
    
    // GitHub Features Navigation
    const featureNavItems = document.querySelectorAll('.feature-nav-item');
    const featureContents = document.querySelectorAll('.feature-content');
    
    function switchFeature(featureName) {
        // Remove active class from all nav items and contents
        featureNavItems.forEach(item => item.classList.remove('active'));
        featureContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected feature
        const activeNavItem = document.querySelector(`[data-feature="${featureName}"]`);
        const activeContent = document.querySelector(`[data-feature="${featureName}"]`);
        
        if (activeNavItem) activeNavItem.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }
    
    // Add click event listeners to nav items
    featureNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const featureName = this.getAttribute('data-feature');
            switchFeature(featureName);
        });
    });
    
    // Scroll-triggered animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.github-hero, .github-features');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize GitHub functionality
    function initGitHubSection() {
        console.log('Initializing GitHub section...');
        
        if (heroVideo) {
            console.log('Hero video element found:', heroVideo);
            console.log('Video src:', heroVideo.querySelector('source')?.src);
            
            // Preload video
            heroVideo.load();
            
            // Add video event listeners
            heroVideo.addEventListener('loadeddata', function() {
                console.log('GitHub hero video loaded successfully');
                // Try to play video when loaded
                heroVideo.play().catch(e => console.log('Initial video play failed:', e));
            });
            
            heroVideo.addEventListener('error', function(e) {
                console.log('GitHub hero video failed to load:', e);
            });
            
            // Set initial video state - fully visible
            heroVideo.style.opacity = '1';
            heroVideo.style.transform = 'scale(1)';
            
            // Try to play video immediately
            setTimeout(() => {
                heroVideo.play().catch(e => console.log('Delayed video play failed:', e));
            }, 1000);
        } else {
            console.log('Hero video element not found!');
        }
        
        // Start animations
        setTimeout(() => {
            animateCursor();
        }, 1000);
        
        // Add play button functionality
        const playBtn = document.getElementById('video-play-btn');
        if (playBtn && heroVideo) {
            playBtn.addEventListener('click', function() {
                heroVideo.play().then(() => {
                    console.log('Video playing successfully');
                    playBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Video';
                }).catch(e => {
                    console.log('Video play failed:', e);
                    playBtn.innerHTML = '<i class="fas fa-exclamation"></i> Error';
                });
            });
        }
        
        // GitHub Features Tab Functionality
        const featureTabs = document.querySelectorAll('.feature-tab');
        const featureDescriptions = document.querySelectorAll('.feature-description');
        
        featureTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const feature = this.getAttribute('data-feature');
                
                // Remove active class from all tabs and descriptions
                featureTabs.forEach(t => t.classList.remove('active'));
                featureDescriptions.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding description
                this.classList.add('active');
                const activeDescription = document.querySelector(`[data-feature="${feature}"]`);
                if (activeDescription) {
                    activeDescription.classList.add('active');
                }
            });
        });
        
        // Add scroll listeners
        window.addEventListener('scroll', handleVideoAnimation);
        window.addEventListener('scroll', handleScrollAnimations);
        
        // Initial call
        handleVideoAnimation();
        handleScrollAnimations();
        
        console.log('GitHub section initialized');
    }
    
    // Initialize if GitHub section exists
    if (document.querySelector('.github-hero')) {
        initGitHubSection();
        
        // Add manual trigger for testing (remove in production)
        setTimeout(() => {
            if (heroVideo) {
                console.log('Manual video trigger for testing');
                heroVideo.classList.add('active');
            }
        }, 3000);
    }
    
    // Smooth scroll for navigation links
    const githubNavLink = document.querySelector('a[href="#github"]');
    if (githubNavLink) {
        githubNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            const githubSection = document.getElementById('github-hero');
            if (githubSection) {
                githubSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for internal anchor links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(107, 70, 193, 0.3)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Hero Section Animations
function initHeroAnimations() {
    // Ensure title words are visible
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        // Add animated class after animation delay
        setTimeout(() => {
            word.classList.add('animated');
        }, (index + 1) * 200 + 1000); // 1 second base + 200ms per word
    });

    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-description, .hero-actions, .hero-stats');
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (index + 4) * 200); // Start after title words
        }
    });

    // Animate floating cards
    const floatingCards = document.querySelectorAll('.card');
    floatingCards.forEach((card, index) => {
        const randomDelay = Math.random() * 2000;
        const randomDuration = 4000 + Math.random() * 4000;
        
        setTimeout(() => {
            card.style.animation = `cardFloat ${randomDuration}ms ease-in-out infinite`;
        }, randomDelay);
        
        // Add mouse interaction
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Animate code terminal
    const codeTerminal = document.querySelector('.code-terminal');
    if (codeTerminal) {
        setTimeout(() => {
            codeTerminal.style.animation = 'terminalFloat 6s ease-in-out infinite';
        }, 2000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.card, .code-terminal');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for different elements
                if (entry.target.classList.contains('tool-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }
                
                if (entry.target.classList.contains('community-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.tool-card, .community-card, .drive-card, .section-title, .section-subtitle');
    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Drives Section Horizontal Scroll
function initDrivesScroll() {
    const drivesCards = document.getElementById('drives-cards');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    if (!drivesCards || !scrollLeftBtn || !scrollRightBtn) return;

    const cardWidth = 370; // Card width + gap
    let currentScroll = 0;
    let isScrolling = false;

    // Auto-scroll functionality
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (!isScrolling) {
                scrollRight();
            }
        }, 4000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function scrollLeft() {
        if (isScrolling) return;
        isScrolling = true;
        
        currentScroll = Math.max(0, currentScroll - cardWidth);
        drivesCards.style.transform = `translateX(-${currentScroll}px)`;
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    function scrollRight() {
        if (isScrolling) return;
        isScrolling = true;
        
        const maxScroll = (drivesCards.children.length - 3) * cardWidth;
        currentScroll = Math.min(maxScroll, currentScroll + cardWidth);
        
        // Reset to beginning if at end
        if (currentScroll >= maxScroll) {
            setTimeout(() => {
                currentScroll = 0;
                drivesCards.style.transition = 'none';
                drivesCards.style.transform = `translateX(0px)`;
                
                setTimeout(() => {
                    drivesCards.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        } else {
            drivesCards.style.transform = `translateX(-${currentScroll}px)`;
        }
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    // Event listeners
    scrollLeftBtn.addEventListener('click', () => {
        stopAutoScroll();
        scrollLeft();
        setTimeout(startAutoScroll, 2000);
    });

    scrollRightBtn.addEventListener('click', () => {
        stopAutoScroll();
        scrollRight();
        setTimeout(startAutoScroll, 2000);
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;

    drivesCards.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoScroll();
    });

    drivesCards.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    drivesCards.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                scrollRight();
            } else {
                scrollLeft();
            }
        }
        
        isDragging = false;
        setTimeout(startAutoScroll, 2000);
    });

    // Mouse wheel support
    drivesCards.addEventListener('wheel', (e) => {
        e.preventDefault();
        stopAutoScroll();
        
        if (e.deltaY > 0) {
            scrollRight();
        } else {
            scrollLeft();
        }
        
        setTimeout(startAutoScroll, 2000);
    });

    // Start auto-scroll
    startAutoScroll();

    // Pause auto-scroll on hover
    drivesCards.addEventListener('mouseenter', stopAutoScroll);
    drivesCards.addEventListener('mouseleave', startAutoScroll);
}

// Placement Journey Animation
function initPlacementJourney() {
    const pointer = document.getElementById('journey-pointer');
    const points = document.querySelectorAll('.journey-point');
    const launchDrives = document.getElementById('launch-drives');
    const journeyHeading = document.querySelector('.journey-heading');
    
    if (!pointer || points.length === 0) return;

    // Scroll-triggered animation for journey heading
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    if (journeyHeading) {
        headingObserver.observe(journeyHeading);
    }

    // Define the path coordinates (matching the updated CSS positions)
    const pathCoordinates = [
        { x: 10, y: 40 },   // Point A
        { x: 30, y: 35 },   // Point B
        { x: 50, y: 55 },   // Point C
        { x: 70, y: 70 },   // Point E (new roadmap point)
        { x: 85, y: 50 }    // Point D
    ];

    let currentPointIndex = 0;
    let isAnimating = false;

    // Function to move pointer to a specific point
    function movePointerToPoint(pointIndex) {
        if (pointIndex >= pathCoordinates.length) {
            // Show launch drives button
            setTimeout(() => {
                launchDrives.classList.add('show');
            }, 1000);
            return;
        }

        const point = pathCoordinates[pointIndex];
        const containerWidth = document.querySelector('.journey-container').offsetWidth;
        const containerHeight = document.querySelector('.journey-container').offsetHeight;
        
        // Convert percentage to pixels
        const x = (point.x / 100) * containerWidth;
        const y = (point.y / 100) * containerHeight;

        // Animate pointer movement
        pointer.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
        pointer.style.left = x + 'px';
        pointer.style.top = y + 'px';

        // Activate current point
        setTimeout(() => {
            // Deactivate all points
            points.forEach(p => p.classList.remove('active'));
            
            // Activate current point
            if (points[pointIndex]) {
                points[pointIndex].classList.add('active');
            }
        }, 1000);

        // Move to next point after delay
        setTimeout(() => {
            movePointerToPoint(pointIndex + 1);
        }, 3000);
    }

    // Function to create smooth path animation
    function animateAlongPath() {
        const containerWidth = document.querySelector('.journey-container').offsetWidth;
        const containerHeight = document.querySelector('.journey-container').offsetHeight;
        
        // Create intermediate points for smooth movement
        const intermediatePoints = [];
        
        for (let i = 0; i < pathCoordinates.length - 1; i++) {
            const start = pathCoordinates[i];
            const end = pathCoordinates[i + 1];
            
            // Generate smooth curve between points
            for (let t = 0; t <= 1; t += 0.1) {
                const x = start.x + (end.x - start.x) * t;
                const y = start.y + (end.y - start.y) * t;
                intermediatePoints.push({ x, y, pointIndex: i });
            }
        }

        let currentIndex = 0;
        
        function animateStep() {
            if (currentIndex >= intermediatePoints.length) {
                // Animation complete, show launch drives button
                setTimeout(() => {
                    launchDrives.classList.add('show');
                }, 1000);
                return;
            }

            const point = intermediatePoints[currentIndex];
            const x = (point.x / 100) * containerWidth;
            const y = (point.y / 100) * containerHeight;

            pointer.style.left = x + 'px';
            pointer.style.top = y + 'px';

            // Check if we're at a milestone point
            const milestoneIndex = Math.floor(currentIndex / 10);
            if (currentIndex % 10 === 0 && milestoneIndex < points.length) {
                // Deactivate all points
                points.forEach(p => p.classList.remove('active'));
                
                // Activate current milestone
                if (points[milestoneIndex]) {
                    points[milestoneIndex].classList.add('active');
                }
            }

            currentIndex++;
            setTimeout(animateStep, 100);
        }

        animateStep();
    }

    // Start the animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAnimating) {
                isAnimating = true;
                setTimeout(() => {
                    animateAlongPath();
                }, 500);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(document.querySelector('.placement-journey'));

    // Reset animation on section exit
    const resetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                isAnimating = false;
                points.forEach(p => p.classList.remove('active'));
                finalMessage.classList.remove('show');
                pointer.style.left = '5%';
                pointer.style.top = '50%';
            }
        });
    }, {
        threshold: 0
    });

    resetObserver.observe(document.querySelector('.placement-journey'));
}

// GitHub Search Functionality
function initGitHubSearch() {
    const searchInput = document.getElementById('github-search');
    const searchBtn = document.getElementById('search-btn');
    const searchType = document.getElementById('search-type');
    const sortBy = document.getElementById('sort-by');
    const loadingState = document.getElementById('loading-state');
    const resultsContainer = document.getElementById('results-container');

    if (!searchInput || !searchBtn) return;

    let searchTimeout;

    async function performSearch(query) {
        if (!query.trim()) return;

        // Show loading state
        loadingState.style.display = 'block';
        resultsContainer.innerHTML = '';

        try {
            const type = searchType.value;
            const sort = sortBy.value;
            
            let apiUrl = `https://api.github.com/search/${type}?q=${encodeURIComponent(query)}`;
            
            if (sort !== 'best-match') {
                const sortMap = {
                    'stars': 'stars',
                    'updated': 'updated'
                };
                apiUrl += `&sort=${sortMap[sort]}&order=desc`;
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            // Hide loading state
            loadingState.style.display = 'none';

            if (data.items && data.items.length > 0) {
                displayResults(data.items, type);
            } else {
                resultsContainer.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--light-gray);">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>No results found for "${query}"</p>
                    </div>
                `;
            }
        } catch (error) {
            loadingState.style.display = 'none';
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--light-gray);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem; color: #ef4444;"></i>
                    <p>Error searching GitHub. Please try again.</p>
                </div>
            `;
        }
    }

    function displayResults(items, type) {
        resultsContainer.innerHTML = '';
        
        items.slice(0, 10).forEach((item, index) => {
            const resultCard = createResultCard(item, type);
            resultCard.style.opacity = '0';
            resultCard.style.transform = 'translateY(20px)';
            resultsContainer.appendChild(resultCard);
            
            // Stagger animation
            setTimeout(() => {
                resultCard.style.transition = 'all 0.5s ease';
                resultCard.style.opacity = '1';
                resultCard.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    function createResultCard(item, type) {
        const card = document.createElement('div');
        card.className = 'repo-card';

        if (type === 'repositories') {
            card.innerHTML = `
                <div class="repo-header">
                    <a href="${item.html_url}" target="_blank" class="repo-name">
                        <i class="fab fa-github"></i> ${item.full_name}
                    </a>
                    <div class="repo-stats">
                        <span><i class="fas fa-star"></i> ${item.stargazers_count.toLocaleString()}</span>
                        <span><i class="fas fa-code-branch"></i> ${item.forks_count.toLocaleString()}</span>
                        <span><i class="fas fa-eye"></i> ${item.watchers_count.toLocaleString()}</span>
                    </div>
                </div>
                <p class="repo-description">${item.description || 'No description available'}</p>
                <div class="repo-topics">
                    ${item.topics ? item.topics.slice(0, 5).map(topic => 
                        `<span class="topic-tag">${topic}</span>`
                    ).join('') : ''}
                </div>
                <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--light-gray);">
                    <span><i class="fas fa-circle" style="color: ${getLanguageColor(item.language)};"></i> ${item.language || 'Unknown'}</span>
                    <span style="margin-left: 1rem;"><i class="fas fa-calendar"></i> Updated ${new Date(item.updated_at).toLocaleDateString()}</span>
                </div>
            `;
        } else if (type === 'users') {
            card.innerHTML = `
                <div class="repo-header">
                    <img src="${item.avatar_url}" alt="${item.login}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 1rem;">
                    <div>
                        <a href="${item.html_url}" target="_blank" class="repo-name">
                            <i class="fas fa-user"></i> ${item.login}
                        </a>
                        <p style="color: var(--light-gray); margin: 0;">${item.type}</p>
                    </div>
                </div>
                <div style="margin-top: 1rem;">
                    <span style="color: var(--light-gray);"><i class="fas fa-map-marker-alt"></i> ${item.location || 'Location not specified'}</span>
                </div>
            `;
        }

        return card;
    }

    function getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Java': '#b07219',
            'TypeScript': '#2b7489',
            'C++': '#f34b7d',
            'C': '#555555',
            'C#': '#239120',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'HTML': '#e34c26',
            'CSS': '#1572B6'
        };
        return colors[language] || '#6B46C1';
    }

    // Event listeners
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });

    // Real-time search with debounce
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value.trim().length > 2) {
                performSearch(searchInput.value);
            }
        }, 500);
    });

    // Filter change listeners
    searchType.addEventListener('change', () => {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value);
        }
    });

    sortBy.addEventListener('change', () => {
        if (searchInput.value.trim()) {
            performSearch(searchInput.value);
        }
    });
}

// Community Interactions
function initCommunityInteractions() {
    const communityCards = document.querySelectorAll('.community-card');
    const joinButtons = document.querySelectorAll('.community-card .btn-outline');

    communityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate join action
            const originalText = this.textContent;
            this.textContent = 'Joining...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Joined!';
                this.style.background = 'var(--primary-purple)';
                this.style.color = 'var(--white)';
                this.style.borderColor = 'var(--primary-purple)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.background = 'transparent';
                    this.style.color = 'var(--light-purple)';
                    this.style.borderColor = 'var(--primary-purple)';
                }, 2000);
            }, 1000);
        });
    });
}

// About Quadrant Animations
function initAboutQuadrant() {
    const quadrantItems = document.querySelectorAll('.quadrant-item');
    const centralCircle = document.querySelector('.central-circle');
    const connectionLines = document.querySelectorAll('.connection-line');

    // Intersection Observer for quadrant animations
    const quadrantObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate central circle
                if (centralCircle) {
                    centralCircle.style.animation = 'pulse 2s ease-in-out infinite';
                }

                // Animate connection lines with stagger
                connectionLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.animation = `connect 3s ease-in-out infinite`;
                    }, index * 200);
                });

                // Animate quadrant items with stagger
                quadrantItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 300);
                });
            }
        });
    }, { threshold: 0.3 });

    // Observe the quadrant diagram
    const quadrantDiagram = document.querySelector('.quadrant-diagram');
    if (quadrantDiagram) {
        quadrantObserver.observe(quadrantDiagram);
    }

    // Interactive hover effects with enhanced animations
    quadrantItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Central circle interaction with enhanced effects
    if (centralCircle) {
        centralCircle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.9)';
            
            // Enhance connection lines
            connectionLines.forEach(line => {
                line.style.opacity = '1';
                line.style.background = '#10B981';
            });
        });

        centralCircle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.5)';
            
            // Reset connection lines
            connectionLines.forEach(line => {
                line.style.opacity = '0.6';
                line.style.background = '#10B981';
            });
        });
    }
}

// Responsive Features
function initResponsiveFeatures() {
    // Responsive navigation
    function handleResize() {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }

        // Adjust drives scroll for mobile
        const drivesCards = document.getElementById('drives-cards');
        if (drivesCards && window.innerWidth <= 768) {
            drivesCards.style.transform = 'translateX(0)';
        }

        // Handle mobile-specific adjustments
        if (window.innerWidth <= 768) {
            // Ensure mobile menu is properly hidden on resize
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            // Adjust hero section for mobile
            const heroContainer = document.querySelector('.hero-container');
            if (heroContainer) {
                heroContainer.style.flexDirection = 'column';
                heroContainer.style.textAlign = 'center';
            }
            
            // Adjust AI section grid for mobile
            const aiContentGrid = document.querySelector('.ai-content-grid');
            if (aiContentGrid) {
                aiContentGrid.style.gridTemplateColumns = '1fr';
            }
            
            // Adjust GitHub section layout for mobile
            const githubSectionLayout = document.querySelector('.github-section-layout');
            if (githubSectionLayout) {
                githubSectionLayout.style.flexDirection = 'column';
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    // Touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('.btn, .scroll-btn, .search-btn, .cta-button, .ai-btn, .action-btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });

        // Add touch feedback to cards and interactive elements
        const interactiveElements = document.querySelectorAll('.tool-card, .news-item, .gem-item, .quadrant-item, .journey-point');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });

        // Disable hover effects on touch devices
        const hoverElements = document.querySelectorAll('.tool-card, .news-item, .gem-item, .quadrant-item');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.pointerEvents = 'none';
                setTimeout(() => {
                    this.style.pointerEvents = 'auto';
                }, 300);
            });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    });

    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimizations
const optimizedScrollHandler = throttle(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const header = document.getElementById('header');
    
    if (scrolled > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(107, 70, 193, 0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('LUMIX Landing Page Loaded Successfully!');
    });
} else {
    console.log('LUMIX Landing Page Loaded Successfully!');
}

// About Image Cursor Movement
function initAboutImageCursorEffect() {
    const aboutImage = document.querySelector('.about-image-plain');
    if (!aboutImage) return;

    // Set up 3D container
    const container = aboutImage.parentElement;
    container.style.perspective = '1200px';
    container.style.transformStyle = 'preserve-3d';
    
    aboutImage.style.transformStyle = 'preserve-3d';
    aboutImage.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    aboutImage.style.willChange = 'transform';

    aboutImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate normalized position
        const normX = (x - centerX) / centerX;
        const normY = (y - centerY) / centerY;
        
        // Calculate distance for depth
        const distance = Math.sqrt(normX * normX + normY * normY);
        
        // 3D movement with realistic perspective
        const moveX = normX * 30;
        const moveY = normY * 30;
        const moveZ = -distance * 100; // Deep 3D movement
        
        // Realistic 3D rotation
        const rotateX = -normY * 12;
        const rotateY = normX * 12;
        
        // Apply 3D transform
        this.style.transform = `translate3d(${moveX}px, ${moveY}px, ${moveZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Update shadow based on movement
        const shadowX = moveX * 0.5;
        const shadowY = moveY * 0.5;
        const shadowBlur = 20 + distance * 10;
        this.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3))`;
    });

    aboutImage.addEventListener('mouseleave', function() {
        this.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
        this.style.filter = 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))';
    });

    // 3D entrance animation
    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'translate3d(0, 60px, -150px) rotateX(15deg) rotateY(-10deg)';
    
    setTimeout(() => {
        aboutImage.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        aboutImage.style.opacity = '1';
        aboutImage.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
    }, 300);
}

// About Section Scroll Animation
function initAboutScrollAnimation() {
    const aboutSection = document.querySelector('.about-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// Continuous Scrolling Text Animation
function initContinuousScrollingText() {
    const scrollingTextBg = document.querySelector('.scrolling-text-bg');
    if (!scrollingTextBg) return;

    // Ensure animation never stops - ultra aggressive approach
    function ensureAnimationRunning() {
        const computedStyle = window.getComputedStyle(scrollingTextBg);
        const animationPlayState = computedStyle.getPropertyValue('animation-play-state');
        const animationDuration = computedStyle.getPropertyValue('animation-duration');
        const animationIterationCount = computedStyle.getPropertyValue('animation-iteration-count');
        
        // Force animation to run continuously with !important equivalent
        if (animationPlayState !== 'running' || animationIterationCount !== 'infinite') {
            scrollingTextBg.style.setProperty('animation-play-state', 'running', 'important');
            scrollingTextBg.style.setProperty('animation-iteration-count', 'infinite', 'important');
            scrollingTextBg.style.setProperty('animation-duration', '120s', 'important');
            scrollingTextBg.style.setProperty('animation-timing-function', 'linear', 'important');
        }
    }

    // Check animation state very frequently
    setInterval(ensureAnimationRunning, 250);

    // Force animation to start and never stop with !important
    scrollingTextBg.style.setProperty('animation-play-state', 'running', 'important');
    scrollingTextBg.style.setProperty('animation-iteration-count', 'infinite', 'important');
    scrollingTextBg.style.setProperty('animation-duration', '120s', 'important');
    scrollingTextBg.style.setProperty('animation-timing-function', 'linear', 'important');

    // Prevent any interference with the animation
    scrollingTextBg.addEventListener('animationstart', function() {
        this.style.setProperty('animation-play-state', 'running', 'important');
        this.style.setProperty('animation-iteration-count', 'infinite', 'important');
    });

    scrollingTextBg.addEventListener('animationend', function() {
        // Restart immediately if it somehow ends
        this.style.setProperty('animation-play-state', 'running', 'important');
        this.style.setProperty('animation-iteration-count', 'infinite', 'important');
        this.style.setProperty('animation-duration', '120s', 'important');
    });

    scrollingTextBg.addEventListener('animationiteration', function() {
        // Ensure it continues after each iteration
        this.style.setProperty('animation-play-state', 'running', 'important');
    });

    // Ensure animation continues even when element is not in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === scrollingTextBg) {
                // Always keep animation running regardless of visibility
                entry.target.style.setProperty('animation-play-state', 'running', 'important');
                entry.target.style.setProperty('animation-iteration-count', 'infinite', 'important');
                entry.target.style.setProperty('animation-duration', '120s', 'important');
            }
        });
    }, {
        threshold: 0,
        rootMargin: '0px'
    });

    observer.observe(scrollingTextBg);

    // Additional safeguard - restart animation if it stops
    let lastAnimationTime = Date.now();
    setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastAnimationTime > 1000) { // If no animation for 1 second
            // Force restart animation
            scrollingTextBg.style.animation = 'none';
            setTimeout(() => {
                scrollingTextBg.style.setProperty('animation', 'scrollText 120s linear infinite', 'important');
            }, 10);
        }
        lastAnimationTime = currentTime;
    }, 500);

    // Emergency restart every 30 seconds as backup
    setInterval(() => {
        scrollingTextBg.style.setProperty('animation-play-state', 'running', 'important');
        scrollingTextBg.style.setProperty('animation-iteration-count', 'infinite', 'important');
    }, 30000);
}

// 3D Solar System Animation
function initDashboard() {
    const dashboardContainer = document.querySelector('.dashboard-container');
    const panels = document.querySelectorAll('.dashboard-panel');
    
    if (!dashboardContainer || panels.length === 0) return;

    // Scroll-triggered animation for dashboard
    const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate panels with staggered delay
                panels.forEach((panel, index) => {
                    setTimeout(() => {
                        panel.classList.add('animate');
                    }, index * 300);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    const dashboardSection = document.querySelector('.ai-dashboard');
    if (dashboardSection) {
        dashboardObserver.observe(dashboardSection);
    }

    // Reset animation on section exit
    const resetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                panels.forEach(panel => panel.classList.remove('animate'));
            }
        });
    }, {
        threshold: 0
    });

    if (dashboardSection) {
        resetObserver.observe(dashboardSection);
    }

    // Initialize dashboard panel interactions
    function initDashboardPanels() {
        const panels = document.querySelectorAll('.dashboard-panel');
        
        panels.forEach(panel => {
            panel.addEventListener('click', () => {
                // Remove active class from all panels
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked panel
                panel.classList.add('active');
            });
        });
        
        // Reset panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dashboard-panel')) {
                panels.forEach(panel => {
                    panel.classList.remove('active');
                });
            }
        });
    }

    // Sequential Planet Animation
    function animatePlanetsSequentially() {
        const planets = document.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            setTimeout(() => {
                planet.classList.add('animate');
            }, index * 500); // 500ms delay between each planet
        });
    }

    // Dashboard Panel System
    function initDashboardPanels() {
        const panels = document.querySelectorAll('.dashboard-panel');
        
        panels.forEach(panel => {
            panel.addEventListener('click', () => {
                // Remove active class from all panels
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked panel
                panel.classList.add('active');
            });
        });
        
        // Reset panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dashboard-panel')) {
                panels.forEach(panel => {
                    panel.classList.remove('active');
                });
            }
        });
    }

    // Initialize when section is visible
    const initObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    initDashboardPanels();
                }, 1000); // Initialize dashboard panels
            }
        });
    }, {
        threshold: 0.5
    });

    if (dashboardSection) {
        initObserver.observe(dashboardSection);
    }
}

// Hologram Animations
function initHologramAnimations() {
    const hologramSection = document.querySelector('.ai-hologram');
    const hologramTitle = document.querySelector('.hologram-title');
    const orbitals = document.querySelectorAll('.orbital');
    const centralHub = document.querySelector('.central-hub');

    if (!hologramSection) return;

    // Intersection Observer for scroll-triggered animations
    const hologramObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate title
                setTimeout(() => {
                    hologramTitle.classList.add('animate');
                }, 200);

                // Animate orbitals with staggered delay
                orbitals.forEach((orbital, index) => {
                    setTimeout(() => {
                        orbital.classList.add('animate');
                    }, 500 + (index * 200));
                });

                // Animate central hub
                setTimeout(() => {
                    centralHub.style.opacity = '1';
                    centralHub.style.transform = 'scale(1)';
                }, 800);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    hologramObserver.observe(hologramSection);

    // Enhanced cursor effects for orbitals
    orbitals.forEach(orbital => {
        orbital.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) translateZ(20px)';
            this.style.filter = 'brightness(1.2)';
            
            // Add glow effect to ring
            const ring = this.querySelector('.orbital-ring');
            if (ring) {
                ring.style.borderColor = 'rgba(191, 162, 255, 0.9)';
                ring.style.boxShadow = '0 0 30px rgba(191, 162, 255, 0.6), 0 0 60px rgba(191, 162, 255, 0.3)';
            }
        });

        orbital.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'brightness(1)';
            
            // Reset ring glow
            const ring = this.querySelector('.orbital-ring');
            if (ring) {
                ring.style.borderColor = 'rgba(191, 162, 255, 0.4)';
                ring.style.boxShadow = 'none';
            }
        });

        // Smooth click interactions
        orbital.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95) translateZ(10px)';
            setTimeout(() => {
                this.style.transform = 'scale(1.08) translateZ(20px)';
            }, 150);
        });
    });

    // Parallax effect for hologram background
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hologramSection = document.querySelector('.ai-hologram');
                
                if (hologramSection && hologramSection.getBoundingClientRect().top < window.innerHeight) {
                    const parallaxElements = hologramSection.querySelectorAll('.floating-particles, .energy-rings');
                    parallaxElements.forEach(element => {
                        const speed = 0.5;
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translateY(${yPos}px)`;
                    });
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// AI Section Functionality
function initAISection() {
    const newsItems = document.querySelectorAll('.news-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showNewsItem(index) {
        // Hide all news items
        newsItems.forEach(item => {
            item.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current item
        newsItems[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextNews() {
        currentIndex = (currentIndex + 1) % newsItems.length;
        showNewsItem(currentIndex);
    }

    function prevNews() {
        currentIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
        showNewsItem(currentIndex);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextNews);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevNews);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showNewsItem(currentIndex);
        });
    });

    // Auto-rotate news
    setInterval(nextNews, 5000);

    // AI Module hover effects
    const aiModules = document.querySelectorAll('.ai-module');
    aiModules.forEach(module => {
        module.addEventListener('mouseenter', () => {
            module.style.transform = 'translateY(-5px)';
        });
        
        module.addEventListener('mouseleave', () => {
            module.style.transform = 'translateY(0)';
        });
    });

    // Tool cards interaction
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Gem items interaction
    const gemItems = document.querySelectorAll('.mini-gem');
    gemItems.forEach(gem => {
        gem.addEventListener('mouseenter', () => {
            gem.style.transform = 'translateY(-2px)';
        });
        
        gem.addEventListener('mouseleave', () => {
            gem.style.transform = 'translateY(0)';
        });
    });

    // AI Button interactions
    const aiButtons = document.querySelectorAll('.ai-btn');
    aiButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(3px)';
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

// Initialize AI section when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AI section
    initAISection();
});

// Scroll-based Parallax Effect
function initScrollParallax() {
    const aiSection = document.querySelector('.ai-section');
    const githubSection = document.querySelector('.github-hero');
    const bridgeElement = document.querySelector('.ai-github-bridge');
    
    if (!aiSection || !githubSection) return;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Get the position of the AI section
        const aiRect = aiSection.getBoundingClientRect();
        const aiTop = aiRect.top;
        const aiHeight = aiRect.height;
        
        // Calculate scroll progress for AI section
        const aiScrollProgress = Math.max(0, Math.min(1, (windowHeight - aiTop) / windowHeight));
        
        // Apply effects based on scroll position - more subtle for integration
        if (aiScrollProgress > 0.2) {
            aiSection.classList.add('scroll-back');
        } else {
            aiSection.classList.remove('scroll-back');
        }
        
        // Get the position of the GitHub section
        const githubRect = githubSection.getBoundingClientRect();
        const githubTop = githubRect.top;
        
        // Calculate scroll progress for GitHub section
        const githubScrollProgress = Math.max(0, Math.min(1, (windowHeight - githubTop) / windowHeight));
        
        // Apply effects based on scroll position - more subtle for integration
        if (githubScrollProgress > 0.05) {
            githubSection.classList.add('scroll-forward');
        } else {
            githubSection.classList.remove('scroll-forward');
        }
        
        // Bridge element effect for seamless transition
        if (bridgeElement) {
            const bridgeRect = bridgeElement.getBoundingClientRect();
            const bridgeTop = bridgeRect.top;
            const bridgeScrollProgress = Math.max(0, Math.min(1, (windowHeight - bridgeTop) / windowHeight));
            
            // Adjust bridge opacity based on scroll
            bridgeElement.style.opacity = Math.max(0.3, 1 - bridgeScrollProgress);
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set initial state
    handleScroll();
}

// Initialize scroll parallax when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll parallax
    initScrollParallax();
});


