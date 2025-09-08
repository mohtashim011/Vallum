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
// Select the buttons
const leftBtn = document.querySelector('.key-btn-left');
const rightBtn = document.querySelector('.key-btn-right');

// Save their initial CSS positions
const leftBtnTop = leftBtn.offsetTop;
const rightBtnTop = rightBtn.offsetTop;

// Max movement in pixels (10% of parent container or screen)
const maxMove = leftBtn.parentElement.offsetHeight * 0.22; // 10% of section height

window.addEventListener('scroll', () => {
  // Get the section top and scroll
  const section = document.querySelector('.key-img');
  const sectionTop = section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;

  // Calculate how much of the section is visible (0 → 1)
  let visible = 1 - (sectionTop / windowHeight);
  if (visible < 0) visible = 0;
  if (visible > 1) visible = 1;

  // Move left button down
  leftBtn.style.transform = `translateY(${visible * maxMove}px)`;

  // Move right button up
  rightBtn.style.transform = `translateY(-${visible * maxMove}px)`;
});
