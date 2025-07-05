// SCROLL TO SECTION + ACTIVE NAV
function scrollToSection(sectionId, btn) {
  const sec = document.getElementById(sectionId);
  if (sec) sec.scrollIntoView({ behavior: "smooth" });
  // Set active nav
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ---- CHANGING WORDS EFFECT (LANDING, DESKTOP ONLY) ----
const changingWords = [
  "Innovative", "Protective", "SPF-Ready", "Everyday Glow",
  "Confident", "Effortless", "Fresh", "Stylish", "Radiant"
];
const changingWord = document.getElementById("changingWord");
let lastWordIdx = -1;
if (changingWord) {
  document.addEventListener("mousemove", e => {
    const percentX = (e.clientX / window.innerWidth);
    const idx = Math.floor(percentX * changingWords.length);
    if (idx !== lastWordIdx && changingWords[idx]) {
      changingWord.textContent = changingWords[idx];
      lastWordIdx = idx;
    }
  });
}

// ---- WAVY LINE EFFECT (DESKTOP ONLY) ----
const wavyLine = document.getElementById("wavyLine");
const wavyPath = document.getElementById("wavyPath");
function createWavyPath(mouseX, mouseY) {
  const width = window.innerWidth;
  const height = 80;
  const startY = height / 2;
  const bumpWidth = Math.max(width * 0.28, 330);
  const bumpHeight = -65 * (0.5 - mouseY);
  let centerX = mouseX * width;
  centerX = Math.max(bumpWidth / 2, Math.min(width - bumpWidth / 2, centerX));
  const leftX = centerX - bumpWidth / 2;
  const rightX = centerX + bumpWidth / 2;
  return `
    M 0,${startY}
    C ${leftX / 2},${startY} ${leftX / 2},${startY} ${leftX},${startY}
    C ${leftX + bumpWidth / 4},${startY} ${centerX - bumpWidth / 8},${startY + bumpHeight} ${centerX},${startY + bumpHeight}
    C ${centerX + bumpWidth / 8},${startY + bumpHeight} ${rightX - bumpWidth / 4},${startY} ${rightX},${startY}
    C ${rightX + (width - rightX) / 2},${startY} ${rightX + (width - rightX) / 2},${startY} ${width},${startY}
  `.replace(/\s+/g, ' ').trim();
}
function updateWavy(e) {
  if (!wavyLine || !wavyPath) return;
  let percentX = 0.5;
  let percentY = 0.5;
  if (e && e.clientX !== undefined) {
    percentX = e.clientX / window.innerWidth;
    percentY = e.clientY / window.innerHeight;
  }
  wavyLine.setAttribute("viewBox", `0 0 ${window.innerWidth} 80`);
  wavyPath.setAttribute('d', createWavyPath(percentX, percentY));
}
if (wavyLine && wavyPath) {
  document.addEventListener("mousemove", updateWavy);
  window.addEventListener("resize", () => updateWavy());
  updateWavy();
}

// ---- FADE OUT LANDING CONTENT ON SCROLL (DESKTOP ONLY) ----
const landing = document.getElementById("landing");
const centerpiece = document.getElementById("centerpiece");
const landingLetters = document.querySelector(".landing-letters");
window.addEventListener('scroll', function () {
  if (!centerpiece || !landingLetters) return;
  const fadeStart = 0, fadeEnd = window.innerHeight * 0.5;
  let opacity = 1 - (window.scrollY - fadeStart) / (fadeEnd - fadeStart);
  opacity = Math.max(0, Math.min(1, opacity));
  centerpiece.style.opacity = opacity;
  landingLetters.style.opacity = opacity;
  if (opacity <= 0.01) {
    landing.classList.add("fade-out");
  } else {
    landing.classList.remove("fade-out");
  }
});

// ---- PARALLAX BG ----
const parallaxBgs = document.querySelectorAll('.parallax-bg');
window.addEventListener('scroll', () => {
  let scrollTop = window.scrollY;
  parallaxBgs.forEach(bg => {
    let speed = parseFloat(bg.getAttribute('data-speed')) || 0.4;
    bg.style.transform = `translateY(${scrollTop * speed}px)`;
  });
});

// ---- POPUP LOGIC + VIDEO HOVER ----
document.addEventListener("DOMContentLoaded", function () {
  // Popup logic
  const overlay = document.getElementById('popupOverlay');
  const popupSunstick = document.getElementById('popupSunstick');
  const popupCap = document.getElementById('popupCap');
  const btns = document.querySelectorAll('.learn-more-btn');

  function closePopups() {
    overlay.classList.remove('active');
    popupSunstick.classList.remove('active');
    popupCap.classList.remove('active');
    document.body.style.overflow = ''; // Allow scrolling again
  }

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      closePopups();
      overlay.classList.add('active');
      if (btn.dataset.popup === 'sunstick') {
        popupSunstick.classList.add('active');
      } else if (btn.dataset.popup === 'cap') {
        popupCap.classList.add('active');
      }
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
  });

  overlay.addEventListener('click', closePopups);

  // VIDEO HOVER SWAP FOR PRODUCT CARDS (desktop)
  document.querySelectorAll('.media-container').forEach(container => {
    const img = container.querySelector('img');
    const video = container.querySelector('video');
    if (img && video) {
      container.addEventListener('mouseenter', () => {
        img.style.display = 'none';
        video.style.display = 'block';
        video.currentTime = 0;
        video.play();
      });
      container.addEventListener('mouseleave', () => {
        video.pause();
        video.style.display = 'none';
        img.style.display = 'block';
      });
    }
  });
});

// ---- NAV HAMBURGER LOGIC ----
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      hamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
  }
  const mobileHamburgerBtn = document.getElementById('mobileHamburgerBtn');
  if (mobileHamburgerBtn) {
    mobileHamburgerBtn.addEventListener('click', function () {
      mobileHamburgerBtn.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
  }
  window.handleMobileNav = function(sectionId, btn) {
    mobileNav.classList.remove('open');
    if (mobileHamburgerBtn) mobileHamburgerBtn.classList.remove('active');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    scrollToSection(sectionId, btn);
    mobileNav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };
  window.addEventListener('resize', function() {
    if(window.innerWidth > 700){
      mobileNav.classList.remove('open');
      if (hamburgerBtn) hamburgerBtn.classList.remove('active');
      if (mobileHamburgerBtn) mobileHamburgerBtn.classList.remove('active');
    }
  });
});

// ---- MOBILE LANDING VIDEO: AUDIO/MUTE LOGIC ----
document.addEventListener("DOMContentLoaded", function () {
  const landingVideo = document.getElementById('mobileLandingVideo');
  let isMobile = window.innerWidth <= 700;
  if (landingVideo && isMobile) {
    // ONLY set to muted, do not change volume
    landingVideo.muted = true;
    landingVideo.removeAttribute("controls");
    landingVideo.play().catch(()=>{});

    // Optionally pause when scrolled away or tab not visible
    function checkVideoVisibility() {
      const landing = document.getElementById('landing');
      if (!landing) return;
      const rect = landing.getBoundingClientRect();
      const fullyVisible = rect.top <= 0 && rect.bottom > window.innerHeight * 0.2;
      if (document.hidden || !fullyVisible) {
        landingVideo.pause();
      } else {
        landingVideo.play().catch(()=>{});
      }
    }
    document.addEventListener("visibilitychange", checkVideoVisibility);
    window.addEventListener("scroll", checkVideoVisibility, { passive: true });
    window.addEventListener("resize", checkVideoVisibility);
    checkVideoVisibility();
  }
});
