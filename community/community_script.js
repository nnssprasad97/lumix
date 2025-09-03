// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    const animatedElements = document.querySelectorAll('.section-title, .dashboard-card, .project-card, .hackathon-card');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
        observer.observe(el);
    });
}

// Calendar functionality
function setupCalendar() {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const calendarGrid = document.getElementById('calendar-grid');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;
        calendarGrid.innerHTML = '';

        // Add day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day';
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.color = '#b57edc';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        // Add calendar days
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = date.getDate();

            // Highlight current month
            if (date.getMonth() === month) {
                dayElement.style.color = '#ffffff';
                
                // Add events on specific dates (example)
                if (date.getDate() === 15 || date.getDate() === 20 || date.getDate() === 25) {
                    dayElement.classList.add('has-event');
                    dayElement.title = 'Project deadline';
                }
            } else {
                dayElement.style.color = '#666666';
            }

            calendarGrid.appendChild(dayElement);
        }
    }

    // Initialize calendar
    renderCalendar(currentMonth, currentYear);

    // Navigation buttons
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
}

// Form submission
function setupFormHandling() {
    const pitchForm = document.getElementById('pitch-form');
    pitchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(pitchForm);
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        
        // Show success message (you can replace this with actual submission logic)
        alert(`Idea submitted successfully!\nTitle: ${title}\nDescription: ${description}`);
        pitchForm.reset();
    });
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('.section').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Animation sequence for hero
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.hero-title-discover').classList.add('title-visible');
        setTimeout(() => {
            document.querySelector('.hero-title-communities').classList.add('title-visible');
            setTimeout(() => {
                document.querySelector('.hero-bg-anim-circles').classList.add('circles-visible');
                setTimeout(() => {
                    resetStats();
                    animateStats(() => {
                        // After numbers finish, show blocks
                        setTimeout(() => {
                            document.querySelectorAll('.hero-floating-card').forEach(card => card.classList.add('card-visible'));
                        }, 200);
                    });
                }, 400);
            }, 400);
        }, 400);
    }, 300);
});
// Reset numbers to 0 before animating
function resetStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
        el.textContent = '0';
        el.classList.remove('stat-pop');
    });
}
// Animated counting for stats with custom targets
function animateStats(onComplete) {
    let finished = 0;
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((el, idx) => {
        const target = +el.getAttribute('data-target');
        let count = 0;
        let duration = 1800;
        if (target <= 50) duration = 1200;
        else if (target <= 150) duration = 1400;
        else if (target <= 5000) duration = 1800;
        const step = Math.max(1, Math.floor(target / (duration / 16)));
        function update() {
            count += step;
            if (count >= target) {
                el.textContent = target;
                el.classList.add('stat-pop');
                setTimeout(() => el.classList.remove('stat-pop'), 400);
                finished++;
                if (finished === stats.length && typeof onComplete === 'function') {
                    onComplete();
                }
            } else {
                el.textContent = count;
                requestAnimationFrame(update);
            }
        }
        setTimeout(update, 100);
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupScrollAnimations();
    setupCalendar();
    setupFormHandling();
    setupSmoothScrolling();
    animateStats();
    animateHeroCardsOnScroll();
    animateGlassCardsOnScroll();
    document.querySelector('.hero-scroll').addEventListener('click', () => {
        document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
    });
}); 

// --- Live Dot Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const liveDot = document.getElementById('liveDot');
    const liveTooltip = document.getElementById('liveTooltip');
    if (liveDot && liveTooltip) {
        liveDot.addEventListener('click', () => {
            liveTooltip.classList.add('visible');
            liveDot.style.animationDuration = '0.5s';
            setTimeout(() => {
                liveTooltip.classList.remove('visible');
                liveDot.style.animationDuration = '';
            }, 2000);
        });
    }
}); 

// Animate dashboard cards on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dashboard-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), 400 + i * 200);
    });
}); 

// Dashboard card scroll-reveal and animated stats (updated for new structure)
function animateDashboardCards() {
  const cards = document.querySelectorAll('.dashboard-card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible', 'show-details');
          animateDashboardStats(entry.target);
        }, idx * 220);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  cards.forEach(card => observer.observe(card));
}

function animateDashboardStats(card) {
  // Animate all .stat-row strong numbers in this card
  card.querySelectorAll('.stat-row strong').forEach(strong => {
    const text = strong.textContent.trim();
    // Only animate if it's a number
    const num = parseFloat(text.replace(/[^\d.]/g, ''));
    if (!isNaN(num)) {
      let suffix = text.replace(/[\d.,\s]/g, '');
      let start = 0;
      let end = num;
      let duration = 900 + Math.random() * 600;
      let startTime = null;
      function animateCount(ts) {
        if (!startTime) startTime = ts;
        let progress = Math.min((ts - startTime) / duration, 1);
        let val = Math.floor(progress * (end - start) + start);
        strong.textContent = val + suffix;
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          strong.textContent = end + suffix;
        }
      }
      requestAnimationFrame(animateCount);
    }
  });
}

// Capsule-driven stats for Live Drives
function setupDriveCapsuleStats() {
  const card = document.getElementById('live-drives');
  if (!card) return;
  const capsules = card.querySelectorAll('.capsule');
  const statActive = card.querySelector('.stat-active');
  const statApplicants = card.querySelector('.stat-applicants');
  const statPackage = card.querySelector('.stat-package');

  function updateStats(capsule) {
    capsules.forEach(c => c.classList.remove('selected'));
    capsule.classList.add('selected');
    statActive.textContent = capsule.getAttribute('data-active');
    statApplicants.textContent = capsule.getAttribute('data-applicants');
    statPackage.textContent = capsule.getAttribute('data-package');
  }

  capsules.forEach(capsule => {
    capsule.addEventListener('mouseenter', () => updateStats(capsule));
    capsule.addEventListener('click', () => updateStats(capsule));
  });

  // Show first capsule's stats by default
  if (capsules.length) updateStats(capsules[0]);
}

// Capsule-driven stats for Live Projects
function setupProjectCapsuleStats() {
  const card = document.getElementById('live-projects');
  if (!card) return;
  const capsules = card.querySelectorAll('.capsule');
  const statActive = card.querySelector('.stat-active');
  const statMembers = card.querySelector('.stat-members');
  const statTech = card.querySelector('.stat-tech');

  function updateStats(capsule) {
    capsules.forEach(c => c.classList.remove('selected'));
    capsule.classList.add('selected');
    statActive.textContent = capsule.getAttribute('data-active');
    statMembers.textContent = capsule.getAttribute('data-members');
    statTech.textContent = capsule.getAttribute('data-tech');
  }

  capsules.forEach(capsule => {
    capsule.addEventListener('mouseenter', () => updateStats(capsule));
    capsule.addEventListener('click', () => updateStats(capsule));
  });

  if (capsules.length) updateStats(capsules[0]);
}

// Capsule-driven stats for Live Events
function setupEventCapsuleStats() {
  const card = document.getElementById('live-events');
  if (!card) return;
  const capsules = card.querySelectorAll('.capsule');
  const statOngoing = card.querySelector('.stat-ongoing');
  const statParticipants = card.querySelector('.stat-participants');
  const statNext = card.querySelector('.stat-next');

  function updateStats(capsule) {
    capsules.forEach(c => c.classList.remove('selected'));
    capsule.classList.add('selected');
    statOngoing.textContent = capsule.getAttribute('data-ongoing');
    statParticipants.textContent = capsule.getAttribute('data-participants');
    statNext.textContent = capsule.getAttribute('data-next');
  }

  capsules.forEach(capsule => {
    capsule.addEventListener('mouseenter', () => updateStats(capsule));
    capsule.addEventListener('click', () => updateStats(capsule));
  });

  if (capsules.length) updateStats(capsules[0]);
}

document.addEventListener('DOMContentLoaded', () => {
  animateDashboardCards();
  setupDriveCapsuleStats();
  setupProjectCapsuleStats();
  setupEventCapsuleStats();

  // Animate drive card chat messages: all cards animate independently, chat feed style, with staggered start
  function animateDriveCardMessagesAllCards() {
    const driveCards = Array.from(document.querySelectorAll('.drive-card-content'));
    driveCards.forEach((card, i) => {
      const msgBox = card.querySelector('.drive-post-preview');
      let messages = [];
      try { messages = JSON.parse(card.getAttribute('data-messages')); } catch (e) {}
      if (!messages.length || !msgBox) return;
      let idx = 0;
      function showMsg(i) {
        const { user, text } = messages[i];
        // Animate old message out
        msgBox.classList.remove('msg-scroll-in');
        msgBox.classList.add('msg-scroll-up');
        setTimeout(() => {
          msgBox.innerHTML = `<span class='post-user'>${user}:</span> \"${text}\"`;
          msgBox.classList.remove('msg-scroll-up');
          msgBox.classList.add('msg-scroll-in');
        }, 320);
      }
      // Staggered start for each card
      setTimeout(() => {
        setInterval(() => {
          idx = (idx + 1) % messages.length;
          showMsg(idx);
        }, 2000);
      }, i * 200);
    });
  }
  animateDriveCardMessagesAllCards();
}); 

/**
 * Seamless, infinite, smooth vertical scroll for project carousels
 * Applies to both ongoing and upcoming projects
 */
function setupInfiniteVerticalCarousel(carouselSelector, speedPxPerSec = 40) {
  const container = document.querySelector(carouselSelector);
  if (!container) return;
  const inner = container.querySelector('.vertical-carousel-inner');
  if (!inner) return;
  const cards = Array.from(inner.querySelectorAll('.project-card'));
  if (cards.length === 0) return;

  // Clone cards for seamless looping
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('cloned');
    inner.appendChild(clone);
  });

  let scrollY = 0;
  let lastTimestamp = null;
  let cardHeight = cards[0].offsetHeight + parseInt(getComputedStyle(cards[0]).marginBottom);
  let totalHeight = cardHeight * cards.length;

  function animateScroll(ts) {
    if (!lastTimestamp) lastTimestamp = ts;
    const dt = (ts - lastTimestamp) / 1000;
    lastTimestamp = ts;
    scrollY += speedPxPerSec * dt;
    if (scrollY >= totalHeight) {
      scrollY -= totalHeight;
    }
    inner.style.transition = 'none';
    inner.style.transform = `translateY(-${scrollY}px)`;
    requestAnimationFrame(animateScroll);
  }

  // On resize, recalculate heights
  window.addEventListener('resize', () => {
    cardHeight = cards[0].offsetHeight + parseInt(getComputedStyle(cards[0]).marginBottom);
    totalHeight = cardHeight * cards.length;
  });

  requestAnimationFrame(animateScroll);
}

document.addEventListener('DOMContentLoaded', () => {
  setupInfiniteVerticalCarousel('.projects-block:nth-of-type(1) .projects-scrollable', 40); // Ongoing
  setupInfiniteVerticalCarousel('.projects-block:nth-of-type(2) .projects-scrollable', 40); // Upcoming
}); 

// 3D Parallax and Futuristic Glow for Illustration
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const illustration = document.querySelector('.reg-illustration');
    const img = document.querySelector('.reg-anim');
    if (!illustration || !img) return;

    img.style.position = 'relative';

    illustration.addEventListener('mousemove', function(e) {
      const rect = illustration.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 18;
      const rotateX = -((y - centerY) / centerY) * 18;
      const scale = 1.09;
      img.style.transform = `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      // Move the glow
      const px = ((x / rect.width) * 100).toFixed(2);
      const py = ((y / rect.height) * 100).toFixed(2);
      img.style.setProperty('--glow-x', `${px}%`);
      img.style.setProperty('--glow-y', `${py}%`);
      img.style.setProperty('--glow-opacity', '1');
    });
    illustration.addEventListener('mouseleave', function() {
      img.style.transform = '';
      img.style.setProperty('--glow-opacity', '0');
    });
  });
})(); 

// Remove 3D Parallax Hover for Cards
(function() {
  document.querySelectorAll('.pro-hackathon-card, .pro-event-card, .challenge-card').forEach(card => {
    card.removeEventListener('mousemove', card._parallaxHandler || (()=>{}));
    card.removeEventListener('mouseleave', card._parallaxReset || (()=>{}));
    card.style.removeProperty('--futuristic-transform');
    card.classList.remove('futuristic-hover');
    delete card._parallaxHandler;
    delete card._parallaxReset;
  });
})(); 

// Animate open chat preview messages on load and when card enters viewport
(function() {
  function animateChatMsgs() {
    var chatMsgs = document.querySelectorAll('.open-chat-preview .chat-msg');
    chatMsgs.forEach(function(msg) {
      msg.style.opacity = '';
      msg.style.transform = '';
      msg.style.animation = 'none';
      // Force reflow to restart animation
      void msg.offsetWidth;
      msg.style.animation = '';
    });
  }
  // On page load
  window.addEventListener('DOMContentLoaded', animateChatMsgs);
  // On scroll/viewport (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    var chatCard = document.querySelector('.open-chat-card');
    if (chatCard) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) animateChatMsgs();
        });
      }, { threshold: 0.2 });
      observer.observe(chatCard);
    }
  }
})(); 

// Sparkle effect for drive aisle cards
function createSparkle(card) {
  const sparkle = document.createElement('div');
  sparkle.className = 'card-sparkle';
  // Random position within card
  const x = Math.random() * 90 + 5; // 5% to 95%
  const y = Math.random() * 80 + 10; // 10% to 90%
  sparkle.style.left = x + '%';
  sparkle.style.top = y + '%';
  sparkle.style.pointerEvents = 'none';
  card.appendChild(sparkle);
  setTimeout(() => {
    sparkle.remove();
  }, 1200);
}

function addSparkleEvents() {
  const cards = document.querySelectorAll('.drive-card.community-card');
  cards.forEach(card => {
    let sparkleInterval;
    card.addEventListener('mouseenter', () => {
      sparkleInterval = setInterval(() => {
        createSparkle(card);
      }, 220);
    });
    card.addEventListener('mouseleave', () => {
      clearInterval(sparkleInterval);
    });
  });
}

document.addEventListener('DOMContentLoaded', addSparkleEvents); 

/**
 * Comprehensive Scroll-Triggered Animations
 * Makes the entire website more lively and engaging
 */
function setupScrollTriggeredAnimations() {
  // Elements to animate with their animation classes
  const animationElements = [
    // Hero section
    { selector: '.hero-title', class: 'scroll-animate' },
    { selector: '.hero-subtitle', class: 'scroll-animate' },
    { selector: '.hero-stats', class: 'scroll-animate' },
    { selector: '.hero-cta', class: 'scroll-animate' },
    { selector: '.hero-floating-card', class: 'scroll-bounce' },
    { selector: '.hero-bg-circle', class: 'scroll-scale' },
    { selector: '.hero-bg-radial', class: 'scroll-scale' },
    { selector: '.bg-anim-circle', class: 'scroll-scale' },
    
    // Dashboard section
    { selector: '.section-title', class: 'scroll-animate' },
    { selector: '.dashboard-card', class: 'scroll-scale' },
    { selector: '.dashboard-grid', class: 'scroll-animate' },
    { selector: '.dashboard-icon svg', class: 'scroll-rotate' },
    { selector: '.stat-number', class: 'scroll-bounce' },
    { selector: '.glass-btn', class: 'scroll-animate' },
    
    // Drive aisles section
    { selector: '.drive-card', class: 'scroll-fade-left' },
    { selector: '.drive-card-content', class: 'scroll-animate' },
    { selector: '.drive-company', class: 'scroll-animate' },
    { selector: '.drive-members', class: 'scroll-animate' },
    { selector: '.drive-post-preview', class: 'scroll-animate' },
    { selector: '.drive-card-actions', class: 'scroll-animate' },
    { selector: '.join-now-btn', class: 'scroll-glow' },
    { selector: '.post-now-btn', class: 'scroll-glow' },
    
    // Projects section
    { selector: '.project-card', class: 'scroll-scale' },
    { selector: '.projects-grid', class: 'scroll-animate' },
    { selector: '.project-header', class: 'scroll-animate' },
    { selector: '.project-people', class: 'scroll-animate' },
    { selector: '.project-stats', class: 'scroll-animate' },
    { selector: '.project-actions', class: 'scroll-animate' },
    { selector: '.progress', class: 'scroll-animate' },
    { selector: '.apply-btn', class: 'scroll-glow' },
    { selector: '.view-btn', class: 'scroll-glow' },
    { selector: '.profile-img', class: 'scroll-rotate' },
    
    // Hackathons section
    { selector: '.pro-hackathon-card', class: 'scroll-fade-right' },
    { selector: '.pro-event-card', class: 'scroll-fade-left' },
    { selector: '.hackathons-grid', class: 'scroll-animate' },
    { selector: '.card-header', class: 'scroll-animate' },
    { selector: '.card-icon', class: 'scroll-rotate' },
    { selector: '.card-type', class: 'scroll-animate' },
    { selector: '.card-meta', class: 'scroll-animate' },
    { selector: '.card-desc', class: 'scroll-animate' },
    { selector: '.card-btn', class: 'scroll-glow' },
    
    // Coding communities section
    { selector: '.challenge-card', class: 'scroll-scale' },
    { selector: '.coding-communities-row', class: 'scroll-animate' },
    { selector: '.community-avatars', class: 'scroll-animate' },
    { selector: '.open-chat-preview', class: 'scroll-animate' },
    { selector: '.chat-msg', class: 'scroll-fade-left' },
    { selector: '.challenge-link', class: 'scroll-glow' },
    
    // Footer
    { selector: '.futuristic-footer', class: 'scroll-animate' },
    { selector: '.footer-nav', class: 'scroll-animate' },
    { selector: '.footer-socials', class: 'scroll-animate' },
    { selector: '.footer-main-row', class: 'scroll-animate' },
    { selector: '.footer-contact', class: 'scroll-animate' },
    { selector: '.footer-newsletter', class: 'scroll-animate' },
    { selector: '.footer-line', class: 'scroll-animate' },
    { selector: '.footer-copy', class: 'scroll-animate' },
    
    // Container animations
    { selector: '.container', class: 'scroll-animate' },
    
    // General elements
    { selector: '.section', class: 'scroll-animate' },
    { selector: '.glass-section', class: 'scroll-animate' }
  ];

  // Apply initial animation classes
  animationElements.forEach(({ selector, class: animClass }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.classList.add(animClass);
      
      // Add stagger delays for multiple elements
      if (elements.length > 1) {
        const staggerClass = `scroll-stagger-${Math.min(index + 1, 6)}`;
        element.classList.add(staggerClass);
      }
    });
  });

  // Intersection Observer for triggering animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Trigger progress bar animations
        if (entry.target.classList.contains('progress')) {
          const progressBar = entry.target;
          const width = progressBar.style.width || '0%';
          progressBar.style.setProperty('--progress-width', width);
        }
        
        // Trigger chat message animations with delays
        if (entry.target.classList.contains('chat-msg')) {
          const chatMsgs = entry.target.parentElement.querySelectorAll('.chat-msg');
          chatMsgs.forEach((msg, index) => {
            setTimeout(() => {
              msg.classList.add('animate-in');
            }, index * 200);
          });
        }
        
        // Trigger stat counter animations
        if (entry.target.classList.contains('stat-number')) {
          const target = parseInt(entry.target.getAttribute('data-target') || '0');
          animateCounter(entry.target, target);
        }
      }
    });
  }, observerOptions);

  // Observe all animated elements
  animationElements.forEach(({ selector }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      observer.observe(element);
    });
  });

  // Special handling for hero section (animate on load)
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-cta, .hero-floating-card, .hero-bg-circle, .hero-bg-radial, .bg-anim-circle');
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-in');
      }, index * 200);
    });
  }, 500);

  // Animate counters with smooth counting
  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 30);
  }

  // Parallax effect for background elements
  function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-bg-circle, .hero-bg-radial, .bg-anim-circle, .hero-floating-card');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${rate * speed}px)`;
      });
    });
  }

  setupParallaxEffects();
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupScrollTriggeredAnimations();
});

// Re-initialize animations on window resize
window.addEventListener('resize', () => {
  // Re-trigger animations for elements that might have changed position
  const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-fade-left, .scroll-fade-right, .scroll-scale, .scroll-rotate, .scroll-slide-glow, .scroll-bounce');
  animatedElements.forEach(element => {
    if (element.classList.contains('animate-in')) {
      element.classList.remove('animate-in');
      setTimeout(() => {
        element.classList.add('animate-in');
      }, 100);
    }
  });
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Any additional scroll-based effects can be added here
}, 16)); // ~60fps 

// === Cursor-Based Distortion, Floating Layers, Scroll Parallax, Smooth Easing ===
(function() {
  // Only enable on desktop
  if (window.innerWidth < 900) return;
  const cursor = document.querySelector('.custom-cursor');
  const layers = [
    document.querySelector('.parallax-layer.layer-1'),
    document.querySelector('.parallax-layer.layer-2'),
    document.querySelector('.parallax-layer.layer-3')
  ];
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let targetX = mouseX, targetY = mouseY;
  let scrollY = window.scrollY;
  let lastScrollY = scrollY;
  // Cursor movement
  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (cursor) {
      cursor.classList.add('active');
      setTimeout(() => cursor.classList.remove('active'), 120);
    }
  });
  // Parallax and distortion animation
  function animate() {
    // Smooth cursor
    mouseX += (targetX - mouseX) * 0.18;
    mouseY += (targetY - mouseY) * 0.18;
    if (cursor) {
      cursor.style.transform = `translate(${mouseX - 24}px, ${mouseY - 24}px) scale(1)`;
    }
    // Parallax layers: move based on cursor and scroll
    const scrollDelta = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    layers.forEach((layer, i) => {
      if (!layer) return;
      // Parallax: scroll and cursor
      const parallaxX = (mouseX - window.innerWidth / 2) * (0.01 + i * 0.012);
      const parallaxY = (mouseY - window.innerHeight / 2) * (0.012 + i * 0.014) + window.scrollY * (0.08 + i * 0.04);
      // Layer floating: add a subtle oscillation
      const float = Math.sin(Date.now() / (2200 + i * 800)) * (10 + i * 6);
      layer.style.transform = `translate(${parallaxX}px, ${parallaxY + float}px) scale(${1 + i * 0.04})`;
      // Distortion: if cursor is near, increase blur/brightness
      const dx = mouseX - (window.innerWidth / 2 + (i - 1) * 120);
      const dy = mouseY - (window.innerHeight / 2 + (i - 1) * 80);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const blur = 60 + Math.max(0, 120 - dist / 4);
      const bright = 1.08 + Math.max(0, 80 - dist / 8) * 0.004;
      layer.style.filter = `blur(${blur}px) brightness(${bright})`;
      layer.style.opacity = 0.13 + 0.08 * (1 - Math.min(dist / 600, 1));
    });
    requestAnimationFrame(animate);
  }
  animate();
  // Scroll-based layering (z-index swap for depth)
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    layers.forEach((layer, i) => {
      if (!layer) return;
      // As you scroll, change z-index for depth illusion
      layer.style.zIndex = 1 + Math.floor((y / 400 + i) % 3);
    });
  });
})(); 