//sticky nav-bar making
const nav = document.querySelector(".nav");
const header = document.querySelector("header");

// nav toggle btn
const humburger = document.querySelector(".humburger");

// learn more btn (header)
const btnLearnMore = document.querySelector(".btn--text");
const sectionFeature = document.querySelector("#section--1");

// smooth scrolling of nav links
const navItems = document.querySelectorAll(".nav-items");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");

// section - 2 (operations )
const operations = document.querySelector(".operations");
const operationContent = document.querySelectorAll(".operations-content");
const operationBtnParent = document.querySelector(".btn-parent");
const operationBtn = document.querySelectorAll(".operations .btn");

// Footer  section
const footerLinks = document.querySelector(".links");

/////////////                    ///////////////
//         section - 2 (operations )
////////////                    /////////////////
operationBtnParent.addEventListener("click", (e) => {
  const clicked = e.target.closest(".btn");

  //Guard clause
  if (!clicked) return;

  // removing active classes
  operationBtn.forEach((btn) => btn.classList.remove("operation-btn-active"));
  operationContent.forEach((content) =>
    content.classList.remove("operations-content-active")
  );

  // adding class
  clicked.classList.add("operation-btn-active");
  const activeContent = document.querySelector(
    `.operations-content-${clicked.dataset.btn}`
  );

  activeContent.classList.add("operations-content-active");
  operations.style.backgroundImage = `url(images/btn-${clicked.dataset.btn}.png)`;
});

/////////////                    ///////////////
//         sticky navbar making.....
////////////                    /////////////////

const navHeight = nav.getBoundingClientRect().height;

const sectionOneOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const sectionOneObserver = new IntersectionObserver(
  (entries, sectionOneObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        nav.classList.add("sticky");
      } else {
        nav.classList.remove("sticky");
      }
    });
  },
  sectionOneOptions
);

sectionOneObserver.observe(header);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

/////////////                    ///////////////
//            smooth scrolling
////////////                    /////////////////

// learn more btn (header)
btnLearnMore.addEventListener("click", () => {
  sectionFeature.scrollIntoView({ behavior: "smooth" });
});

/////////////                    ///////////////
//            nav  event listener(click)
////////////                    /////////////////
nav.addEventListener("click", (e) => {
  e.preventDefault();

  // moving target
  if (e.target.classList.contains("nav-link")) {
    //  adding active link a  background
    const activeLink = e.target.closest(".nav-items");
    navItems.forEach((items) => items.classList.remove("link-active"));
    activeLink?.classList.add("link-active");

    // smooth scrolling of links section
    // get href of target
    const sectionId = e.target.getAttribute("href");

    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }

  /////////////                    ///////////////
  //            nav toggle btn(humburger)
  ////////////                    /////////////////

  if (e.target.classList.contains("fa-bars")) {
    navLinks.classList.toggle("drop");
  }

  // logo click
  if (e.target.classList.contains("nav-logo")) {
    // console.log(e.target);
    e.preventDefault();
    const sectionId = e.target.closest(".logo-link").getAttribute("href");
    // console.log(sectionId);
    document.querySelector(sectionId).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////                    ///////////////
//            link HOver effect (nav)
////////////                    /////////////////

const handleHover = function (e) {
  e.preventDefault();

  const clicked = e.target.classList.contains("nav-link");

  //Guard clause
  if (clicked) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav-link");
    const logo = link.closest(".nav").querySelector(".nav-logo");

    siblings.forEach((lin) => {
      if (lin !== link) lin.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const handleHoverd = function (e) {
  e.preventDefault();

  const clicked = e.target.classList.contains("link");

  //Guard clause
  if (clicked) {
    const link = e.target;
    const siblings = link.closest(".links").querySelectorAll(".link");

    siblings.forEach((lin) => {
      if (lin !== link) lin.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

footerLinks.addEventListener("mouseover", handleHoverd.bind(0.5));
footerLinks.addEventListener("mouseout", handleHoverd.bind(1));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

/////////////                    ///////////////
//            sections loading
////////////                    /////////////////

const allSections = document.querySelectorAll(".sectionContent");

const revealSection = function (entries, observer) {
  // as threshhold has one element therefore using array destructuring in this case.

  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

// acrive nav link

// const showActiveNavlink = function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) return;
//     const currentSection = entry.target.closest("section");
//     console.log(entry, currentSection.id);

//     const currentSections = currentSection.getBoundingClientRect();
//     console.log(currentSections);

//     // sectionFeature.getBoundingClientRect();
//     navLink.forEach((link) => {
//       const linkHref = link.getAttribute("href");
//       if (linkHref?.slice(1) === currentSection.id) {
//         console.log("shivam is great");

//         const activeLink = link.closest(".nav-items");
//         navItems.forEach((items) => items.classList.remove("link-active"));
//         activeLink?.classList.add("link-active");
//       }
//     });
//   });
// };

// const navLinkObserver = new IntersectionObserver(showActiveNavlink, {
//   root: null,
//   threshold: [0.5, 0.1],
//   rootMargin: "0px",
// });

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // navLinkObserver.observe(section);
  section.classList.add("section--hidden");
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

/////////////                    ///////////////
//            lazy Img loading
////////////                    /////////////////

const featureImg = document.querySelectorAll(".features img");

const loadImg = function (entries, observer) {
  // as threshhold has one element therefore using array destructuring in this case.

  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove("lazy-img");

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `-250px`,
});

featureImg.forEach((img) => {
  imgObserver.observe(img);
  img.classList.add("lazy-img");
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

// console.log(document.body.children);

// testimonial section

const slider = function () {
  const nextBtn = document.querySelector(".slider .next-btn");
  const prevBtn = document.querySelector(".slider .prev-btn");
  const slides = document.querySelectorAll(".slide");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = function (slide) {
    slides.forEach((sl, i) => {
      sl.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    // removing active dot
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot--active"));

    // adding active dot to active slide
    const dde = document
      .querySelector(`.dots-dot[data-slide = "${slide}"]`)
      .classList.add("dots-dot--active");
  };

  const init = function () {
    createDots();
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  init();

  const commonOperationStep = (slide) => {
    goToSlide(slide);
    activateDot(slide);
  };

  const nextMovement = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    commonOperationStep(currentSlide);
  };

  const prevMovement = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    commonOperationStep(currentSlide);
  };

  nextBtn.addEventListener("click", nextMovement);
  prevBtn.addEventListener("click", prevMovement);
  dotContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dots-dot")) return;

    const slide = e.target.dataset.slide;
    commonOperationStep(slide);
  });

  // target slider
  // slider.addEventListener("click", function (e) {
  //   console.log(e.target);
  //   if (!e.target.classList.contains("testimonial-arrow--btn")) return;

  //   if (e.target.classList.contains("next-btn")) {
  //     currentSlide++;
  //     movc(currentSlide);
  //     console.log("click");
  //   }

  //   if (e.target.classList.contains("prev-btn")) {
  //     currentSlide--;
  //     movc(currentSlide);
  //     console.log("click");
  //   }
  // });
};

slider();
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //
// const alllinks

// MOdal open

const modal = document.querySelector(".modal");
const openModal = document.querySelectorAll(".btn--show-modal");
// const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-model");

const modalopen = function () {
  modal.classList.remove("hidden");
};

const modalclose = function () {
  modal.classList.add("hidden");
};

openModal.forEach((openModal) => {
  openModal.addEventListener("click", (e) => {
    e.preventDefault();
    modalopen();
  });
});
// overlay.addEventListener("click", modalclose);
closeModal.addEventListener("click", modalclose);
