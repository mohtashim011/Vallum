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

// Select buttons
const leftBtn = document.querySelector('.key-btn-left');
const rightBtn = document.querySelector('.key-btn-right');
const section = document.querySelector('.key-img');

// Maximum movement (10% of section height)
const maxMove = section.offsetHeight * 0.1;

window.addEventListener('scroll', () => {
  const sectionRect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if section is visible in viewport
  if (sectionRect.bottom > 0 && sectionRect.top < windowHeight) {
    // Calculate scroll progress through section (0 → 1)
    let progress = (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height);
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    // Move buttons
    leftBtn.style.transform = `translateY(${progress * maxMove}px)`;   // down
    rightBtn.style.transform = `translateY(${-progress * maxMove}px)`; // up
  }
});
