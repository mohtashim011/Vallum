// Mobile and Tab Header 
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".menu-close"); // new close button

  // Open/close menu with toggle button
  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    toggleBtn.textContent = mobileMenu.classList.contains("active") ? "×" : "☰";
  });

  // Close with dedicated close button
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      toggleBtn.textContent = "☰";
    });
  }

  // Close when clicking a link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      toggleBtn.textContent = "☰";
    });
  });
});




// --- Button movement on scroll ---
  const slider = document.querySelector(".icon-box");

    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse Events
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // drag speed
      slider.scrollLeft = scrollLeft - walk;
    });

    // Touch Events (Mobile Support)
    slider.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("touchend", () => {
      isDown = false;
    });

    slider.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });


//Testimonial Scroll left to right
document.addEventListener("DOMContentLoaded", () => {
  function createMarquee(selector, direction = "left", speed = 1) {
    const track = document.querySelector(selector);
    if (!track) return;

    // Save original width
    const originalWidth = track.scrollWidth;

    // Duplicate for seamless loop
    track.innerHTML += track.innerHTML;

    // Start position
    let position = direction === "right" ? -originalWidth : 0;

    function animate() {
      if (direction === "left") {
        position -= speed;
        if (Math.abs(position) >= originalWidth) {
          position = 0; // reset back to start
        }
      } else {
        position += speed;
        if (position >= 0) {
          position = -originalWidth; // reset to negative offset
        }
      }

      track.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
  }

  // First carousel → right to left
  createMarquee(".story-con2", "left", 0.5);

  // Second carousel → left to right
  createMarquee(".story-con1", "right", 0.5);
});


//footer V Scroll
const logoTrack = document.getElementById('logoTrack');

window.addEventListener('scroll', () => {
  // Get scroll percentage (0 → 1)
  let scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);

  // Move logos max 800px to the RIGHT
  let moveX = scrollPercent * -1200; 
  logoTrack.style.transform = `translateX(${moveX}px)`;
});


///animation trigger

// Select all fade-in and fade-in-up elements
const elements = document.querySelectorAll('.fade-in, .fade-in-up');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active'); // trigger animation
      observer.unobserve(entry.target);     // stop observing
    }
  });
}, { threshold: 0.2 }); // triggers when 20% visible

// Observe each element
elements.forEach(el => observer.observe(el));


// Key Section btn scroll
document.addEventListener("DOMContentLoaded", () => {
  const leftBtn = document.querySelector('.key-btn-left');
  const rightBtn = document.querySelector('.key-btn-right');
  const section = document.querySelector('.key-img');

  if (!leftBtn || !rightBtn || !section) {
    console.error("Required elements not found!");
    return;
  }

  function updateButtonPosition() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress 0 → section top at bottom, 1 → section top at top
    let progress = 1 - rect.top / windowHeight;
    progress = Math.max(0, Math.min(1, progress));

    const maxMove = section.offsetHeight * 0.1;

    leftBtn.style.transform = `translateY(${progress * maxMove}px)`;
    rightBtn.style.transform = `translateY(${-progress * maxMove}px)`;
  }

  // Initial update in case page is refreshed mid-scroll
  updateButtonPosition();

  // Update continuously
  function animate() {
    updateButtonPosition();
    requestAnimationFrame(animate);
  }

  animate();

  // Update maxMove on resize
  window.addEventListener('resize', updateButtonPosition);
});





//logo slider
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slide-track");
  if (track) {
    const logos = [...track.children];
    logos.forEach(logo => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
  }
});



// for carousal movement 

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".icon-box");

  // Create buttons
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "‹";
  prevBtn.className = "carousel-btn prev";

  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "›";
  nextBtn.className = "carousel-btn next";

  // Insert into DOM
  carousel.parentNode.insertBefore(prevBtn, carousel);
  carousel.parentNode.appendChild(nextBtn);

  // Get one card width (including gap)
  const cardWidth = carousel.querySelector(".car-icon-box").offsetWidth + 20;

  // Add listeners
  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
  });
  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
});



//counter

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-num');

  function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target; // exact end
      }
    }
    requestAnimationFrame(step);
  }

  // Trigger when visible
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const countTo = parseInt(el.dataset.count, 10);
        if (!isNaN(countTo) && !el.dataset.animated) {
          animateCounter(el, countTo, 2000);
          el.dataset.animated = 'true';
        }
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => obs.observe(c));
});

//counter of weeks and months

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-num1");

  function animateCounter(el, start, target, duration = 2000) {
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target; // exact end
      }
    }
    requestAnimationFrame(step);
  }

  // Trigger animation when visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const start = parseInt(el.dataset.start, 10);
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(start) && !isNaN(target) && !el.dataset.animated) {
          animateCounter(el, start, target, 2000);
          el.dataset.animated = "true";
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
});