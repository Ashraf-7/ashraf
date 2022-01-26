/*==================== GET ELEMENT HELPER FUNCTION ====================*/
const getElement = (selector, isList) => {
  const elm = isList
    ? [...document.querySelectorAll(selector)]
    : document.querySelector(selector);

  // Check List or not & list is empty or not
  if ((!isList && elm) || (isList && !elm.length < 1)) return elm;
  throw new Error(`Please double Check Selector: ${selector}`);
};

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = getElement("#nav-menu"),
      navToggle = getElement("#nav-toggle"),
      navClose = getElement("#nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show__menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show__menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = getElement(".nav__link", true);

const linkAction = () => {
  const navMenu = getElement("#nav-menu");
  // When we Click on each navLink, Hide the menu
  navMenu.classList.remove("show__menu");
};

navLink.forEach((link) => {
  link.addEventListener("click", linkAction);
});

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = getElement(".skills__content", true),
      skillsHeader =  getElement(".skills__header", true);

// Tohggle Skills Function
function toggleSkills() {
  let itemClass = this.parentNode.className;

  // Set All Skills to Close
  skillsContent.forEach((content) => {
    content.className = "skills__content skills__close";
  });

  // When Click on Skill, Open it
  if (itemClass == "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

// Toggle Skills Lists
skillsHeader.forEach((header) => {
  header.addEventListener("click", toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs        = getElement("[data-target]", true),
      tabContents = getElement("[data-content]", true);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = getElement(tab.dataset.target);

    tabContents.forEach((content) => {
      content.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = getElement(".services__modal", true),
      modalBtns  = getElement(".services__button", true),
      closeBtns  = getElement(".services__modal-close", true);

// Show Modal Page
const showModal = () => {
  modalViews.forEach((view) => {
    view.classList.add("show-modal");
  });
};

// When hit show more
modalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.target).classList.add("show-modal");
    // btn.closest(".services__modal").classList.add("show-modal");
  });
});

// Hide Modal Page
const hideModal = () => {
  modalViews.forEach((view) => {
    view.classList.remove("show-modal");
  });
};

// When hit close button
closeBtns.forEach((btn) => {
  btn.addEventListener("click", hideModal);
});

// When hit Escape from keyboard
const closeModal = (e) => {
  if (e.keyCode === 27 || e.key === "Escape") hideModal();
};

window.addEventListener("keydown", closeModal);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (e) => {
  modalViews.forEach((view) => {
    if (e.target == view) hideModal();
  });
});

/*==================== Skills Progress ====================*/
let skills = getElement('#skills');
let skillsProgress = getElement(".skills__percentage", true);

window.onscroll = () => {
  if(window.scrollY >= skills.offsetTop - 300) {
    skillsProgress.forEach((progress) => {
      progress.style.width = progress.dataset.width;
    })
  }
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = getElement("section[id]", true);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = getElement("#header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = getElement("#scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-Up class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = getElement("#theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiYXNocmFmLTciLCJhIjoiY2t5aG9jYzZqMjRkaDJvbjB0d3BmNjcwbSJ9.q1i2SJzKX-4n3oL4FGrKKg";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([29.955278673635043, 31.09514814236678]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 12,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  map.addControl(directions, "top-left");
}

// Get in Touch Social Panel
const contactBtn  = getElement("#contactBtn");
const socialPanel = getElement("#socialPanel");
const closeBtn    = getElement("#closeBtn");

const showPanel = () => {
  socialPanel.classList.toggle("visible");
};

const hidePanel = () => {
  socialPanel.classList.remove("visible");
}

contactBtn.addEventListener("click", showPanel);
closeBtn.addEventListener("click", hidePanel)

// Setting Button
const settingsMenu = getElement("#settingsMenu");
const settingsBtn = getElement("#settingsBtn");

// Toggle Aside Menu
const toggleMenu = () => {
  settingsMenu.classList.toggle('open');
  
  if (settingsMenu.classList.contains('open')) {
    settingsBtn.innerHTML = '<i class="fas fa-times settings__icon-close"></i>';
  } else {
    settingsBtn.innerHTML =
      '<i class="uil uil-setting settings__icon"></i>';
  }
}

settingsBtn.addEventListener('click', toggleMenu)

// Aside Panel Color Palette
const squares = getElement('.square', true);
const root = getElement(':root');
const rootStyles = getComputedStyle(root);
const hue = rootStyles.getPropertyValue("--hue");
const saturation = rootStyles.getPropertyValue("--saturation");
const lightness = rootStyles.getPropertyValue("--lightness");

squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    const hue = e.target.dataset.hue
    root.style.setProperty("--hue", e.target.dataset.hue);
    // console.log(hue);
    console.log(e.target.dataset.saturation);
    console.log(e.target.dataset.lightness);
    if(hue == "174deg" || hue == "16deg" || hue == "0deg" || hue == "200deg") {
      root.style.setProperty("--saturation", e.target.dataset.saturation);
      root.style.setProperty("--lightness", e.target.dataset.lightness);
    } else {
      root.style.setProperty("--saturation", saturation);
      root.style.setProperty("--lightness", lightness);
    }
  });
});

// Reset to Defaults
const resetBtn = getElement('#reset');

// Reset Function
const resetDefaults = () => {
  root.style.setProperty("--hue", hue);
  root.style.setProperty("--saturation", saturation);
  root.style.setProperty("--lightness", lightness);
}

resetBtn.addEventListener('click', resetDefaults)

// Generate Random Background Color
const randomBtn = getElement("#randomBtn");

const changeColor = () => {
  const hexCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "D", "C", "E", "F"];
  const colorParts = [];

  for (let i = 0; i < 6; i++) {
    colorParts.push(hexCode[Math.floor(Math.random() * hexCode.length)]);
  }
  const finalColor = `#${colorParts.join("")}`;
  
  document.body.style.backgroundColor = finalColor;
}

randomBtn.addEventListener("click", changeColor);

/* =============== Context Menu =============== */
const contextMenu = getElement('#contextMenu');
const contextSubmenu = getElement('#contextSubmenu');

// Show Context Menu
const showContextMenu = () => {
  contextMenu.classList.add('active');
}

// Hide Context Menu
const hideContextMenu = () => {
  contextMenu.classList.remove('active');
}

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  let x = e.pageX;
  let y = e.pageY;
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  let cmWidth = contextMenu.offsetWidth;
  let cmHeight = contextMenu.offsetHeight;

  if (x > (vw - cmWidth - contextSubmenu.offsetWidth - 12)) {
    contextSubmenu.style.right = "100.45%";
    contextSubmenu.style.left = "auto";
  } else {
    contextSubmenu.style.right = "auto";
    contextSubmenu.style.left = "100.45%";
  }


  contextMenu.style.left = `${x > vw - cmWidth ? vw - cmWidth - 12: x}px`;
  contextMenu.style.top = `${y > vh - cmHeight ? vh - cmHeight : y}px`;
  showContextMenu();
});

//======= Close Context Menu Using Esc Keyboard Key or by Clicking on any where else Context Menu =======//
window.addEventListener('click', (e) => {
  if (!e.target.className.includes("context__item")) hideContextMenu();
});

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 27 || e.key === "Escape") hideContextMenu();
});