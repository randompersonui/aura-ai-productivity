// your code goes here
/* =========================================
   AURA AI
   JAVASCRIPT
========================================= */


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

  mobileMenu.classList.toggle("open");

});


/* Close mobile menu when clicking a link */

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {

  link.addEventListener("click", () => {

    mobileMenu.classList.remove("open");

  });

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================
   PRICING TOGGLE
========================================= */

const billingButtons =
  document.querySelectorAll(".billing-btn");

const priceElements =
  document.querySelectorAll(".price strong");


billingButtons.forEach(button => {

  button.addEventListener("click", () => {

    billingButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const period =
      button.dataset.period;


    priceElements.forEach(price => {

      const newPrice =
        price.dataset[period];

      price.textContent = newPrice;

    });

  });

});


/* =========================================
   BUTTON RIPPLE EFFECT
========================================= */

const buttons =
  document.querySelectorAll(".btn, .pricing-btn");


buttons.forEach(button => {

  button.addEventListener("click", function(e) {

    const ripple =
      document.createElement("span");

    ripple.style.position = "absolute";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,.4)";
    ripple.style.pointerEvents = "none";

    const rect =
      this.getBoundingClientRect();

    ripple.style.left =
      `${e.clientX - rect.left}px`;

    ripple.style.top =
      `${e.clientY - rect.top}px`;

    ripple.style.transform =
      "translate(-50%, -50%)";

    ripple.style.animation =
      "ripple .6s linear";

    this.style.position = "relative";
    this.style.overflow = "hidden";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

  });

});


/* Add ripple animation */

const rippleStyle =
  document.createElement("style");

rippleStyle.innerHTML = `

@keyframes ripple {

  from {
    transform:
      translate(-50%, -50%)
      scale(1);

    opacity: 1;
  }

  to {
    transform:
      translate(-50%, -50%)
      scale(25);

    opacity: 0;
  }

}

`;

document.head.appendChild(rippleStyle);


/* =========================================
   DASHBOARD NUMBER ANIMATION
========================================= */

function animateNumber(element, target, duration = 1200) {

  let start = 0;

  const startTime = performance.now();


  function update(currentTime) {

    const progress =
      Math.min(
        (currentTime - startTime) / duration,
        1
      );

    const eased =
      1 - Math.pow(1 - progress, 3);

    const current =
      Math.floor(
        start + (target - start) * eased
      );

    element.textContent = current;


    if (progress < 1) {

      requestAnimationFrame(update);

    }

  }


  requestAnimationFrame(update);

}


/* =========================================
   PRODUCTIVITY METRIC
========================================= */

const metric =
  document.querySelector(".metric-card strong");

let metricAnimated = false;


const metricObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting &&
          !metricAnimated
        ) {

          metricAnimated = true;

          animateNumber(
            metric,
            128
          );

        }

      });

    },
    {
      threshold: .5
    }
  );


if (metric) {
  metricObserver.observe(metric);
}


/* =========================================
   MOUSE PARALLAX
========================================= */

const heroVisual =
  document.querySelector(".hero-visual");


if (heroVisual && window.innerWidth > 900) {

  heroVisual.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        heroVisual.getBoundingClientRect();

      const x =
        e.clientX - rect.left;

      const y =
        e.clientY - rect.top;

      const centerX =
        rect.width / 2;

      const centerY =
        rect.height / 2;

      const rotateY =
        ((x - centerX) / centerX) * 3;

      const rotateX =
        ((y - centerY) / centerY) * -2;


      const dashboard =
        document.querySelector(
          ".hero-dashboard"
        );


      dashboard.style.transform =
        `
        perspective(1400px)
        rotateY(${rotateY - 5}deg)
        rotateX(${rotateX + 3}deg)
        `;

    }
  );


  heroVisual.addEventListener(
    "mouseleave",
    () => {

      const dashboard =
        document.querySelector(
          ".hero-dashboard"
        );

      dashboard.style.transform =
        `
        perspective(1400px)
        rotateY(-5deg)
        rotateX(3deg)
        `;

    }
  );

}


/* =========================================
   ACTIVE NAV LINK
========================================= */

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );


window.addEventListener("scroll", () => {

  let currentSection = "";


  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 150;

    if (
      window.scrollY >= sectionTop
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navLinks.forEach(link => {

    link.style.color = "";

    if (
      link.getAttribute("href") ===
      `#${currentSection}`
    ) {

      link.style.color = "white";

    }

  });

});


/* =========================================
   SMOOTH ANCHOR HANDLING
========================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      function(e) {

        const targetId =
          this.getAttribute("href");

        if (
          targetId === "#" ||
          targetId === ""
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        e.preventDefault();

        const offset =
          70;

        const position =
          target.getBoundingClientRect().top +
          window.scrollY -
          offset;

        window.scrollTo({
          top: position,
          behavior: "smooth"
        });

      }
    );

  });


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
  "%c AURA AI ",
  `
  background: #8b5cf6;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: bold;
  `
);

console.log(
  "Welcome to the AURA AI frontend project."
);