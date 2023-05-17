/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*=============== When the user scrolls the page, execute myFunction==============*/
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
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

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-toggle-right";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "bx-toggle-left"
    : "bx-toggle-right";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-toggle-left" ? "add" : "remove"](
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
(function () {
  const result = document.querySelector("#result");

  function initEvent() {
    document.querySelector("#search").addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        if (e.target[0].value) {
          result.innerHTML = "";
          changeTextButton(e.target[1], "SEARCHING...");
          search(e.target);
        }
      },
      false
    );
  }

  function changeTextButton(button, text) {
    button.textContent = text;
  }

  function search(form) {
    const formData = new FormData(form);

    fetch(
      `https://api.edamam.com/api/food-database/parser?app_id=ca747d07&app_key=722fabaee32b8118f7b1cb2e32b137cf&ingr=${formData.get(
        "name"
      )}`
    )
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.hints.length) {
          resp.hints.forEach((hint) => {
            insertCard(hint.food);
          });
        } else {
          changeInput(form[0], "placeholder", "We didn't found any food.");
          resetInput(form[0]);
        }
        changeTextButton(form[1], "SEARCH");
        changeInput(form[0], "value", "");
      })
      .catch(() => {
        changeTextButton(form[1], "SEARCH");
        changeInput(
          form[0],
          "placeholder",
          "An error has occurred. Try again later."
        );
        resetInput(form[0]);
      });
  }

  function resetInput(input) {
    setTimeout(() => {
      changeInput(input, "placeholder", "Type a food or a meal...");
    }, 3000);
  }

  function changeInput(input, prop, value) {
    input[prop] = value;
  }

  function insertCard(food) {
    result.insertAdjacentHTML("beforeend", buildCard(food));
  }

  function buildCard(data) {
    const energy = data.nutrients.ENERC_KCAL
      ? `<li><b>Energy: </b><span>${data.nutrients.ENERC_KCAL.toFixed(
          1
        )}kcal</span></li>`
      : "";
    const carbs = data.nutrients.CHOCDF
      ? `<li><b>Carbs: </b><span>${data.nutrients.CHOCDF.toFixed(
          1
        )}g</span></li>`
      : "";
    const protein = data.nutrients.PROCNT
      ? `<li><b>Protein: </b><span>${data.nutrients.PROCNT.toFixed(
          1
        )}g</span></li>`
      : "";
    const fat = data.nutrients.FAT
      ? `<li><b>Fat: </b><span>${data.nutrients.FAT.toFixed(1)}g</span></li>`
      : "";

    const html = `
    <div class="card">
      <div class="card-header">
        <h3>${data.label}</h3>
        <h4>${data.category}</h4>
      </div>
      <div class="card-body">
        <ul>
          ${energy}
          ${carbs}
          ${protein}
          ${fat}
        </ul>
      </div>
      <div class="card-footer">
        <p><b>Brand: </b><span>${data.brand || "None :("}</span></p>
      </div>
    </div>
    `;

    return html;
  }

  initEvent();
})();
