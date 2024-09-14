//header
const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);
function init() {
  const txtElement = document.querySelector(".header__nav-label");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);
}

/* Open modal video*/
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-video-content");

modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("modal-close")
  ) {
    modal.classList.remove("active");
    modalContent.children[0].remove();
  }
});

function openModalVideo(e) {
  if (e.target.classList.contains("open-modal")) {
    modal.classList.add("active");
    if (e.target.classList.contains("open-modal-video")) {
      const url = e.target.dataset.videourl;

      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
            <video id="info_row__video" preload="none" poster="" controls src="${url}" style="cursor:pointer" autoplay>
            </video>
            `
      );
    }
  }
}

document.querySelector(".school").addEventListener("click", openModalVideo);
document.querySelector(".specialty").addEventListener("click", openModalVideo);
document.querySelector(".accordion").addEventListener("click", openModalVideo);
document.querySelector(".history").addEventListener("click", openModalVideo);

/* Open more chat screens*/
document.querySelector("#chat__more-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelector(".chat__items")
    .classList.toggle("chat__items_collapsed");
  document.querySelector("#chat__more-btn").remove();
});

// Отправка формы курса
document.querySelector("#productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.querySelector(".modal__footer-alert")?.remove();
  e.target.querySelector(".product__form-error")?.remove();
  e.target.querySelector(".product__form-btn-text").textContent =
    "Подождите...";
  e.target
    .querySelector(".product__form-btn-spinner")
    .classList.remove("d-none");
  e.target.parentElement
    .querySelector(".product__form-loading-wrapper")
    ?.classList.remove("d-none");

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Упс... Произошла ошибка. Попробуйте еще раз");

      //При отправке формы отстукиваем в ЯМ
      // Редирект на страницу thankyou.html
      window.location.href = "thankyou-java.html";
    })
    .catch((error) => {
      e.target.querySelector(".product__form-btn").insertAdjacentHTML(
        "beforebegin",
        `<div class="text-danger text-center product__form-error">
			${error.message}
			</div>`
      );
    })
    .finally(() => {
      e.target.querySelector(".product__form-btn-text").textContent =
        "Оставить заявку";
      e.target
        .querySelector(".product__form-btn-spinner")
        .classList.add("d-none");
      e.target
        .querySelector(".product__form-loading-wrapper")
        ?.classList.add("d-none");
    });
});

// slider lesson
$(document).ready(function () {
  $(".lesson__wrapper").slick({
    arrows: true,
    centerPadding: "10px",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    easing: "easeOutElastic",
    arrows: true,
    infinite: true,
    initialSlide: 0,
    draggable: false,
  });
});

//slider testimonials
$(document).ready(function () {
  $(".testimonials__slider").slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 1500,
    easing: "ease",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

//slider projects
$(document).ready(function () {
  $(".slider__projects").slick({
    centerMode: true,
    centerPadding: "30px",
    slidesToShow: 3, // Количество видимых слайдов
    variableWidth: true, // Добавлено для поддержки ширины слайдов с отступами
    arrows: true, // Включение стрелок
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

// button
const btn = document.querySelector(".fixed__btn");
const tooltip = document.querySelector(".fixed__tooltip");
const close = document.querySelector(".fixed__close-wrapper");

btn?.addEventListener("click", showTooltip);

close?.addEventListener("click", hideTooltip);

function showTooltip() {
  tooltip.style.display = "block";
  close.style.display = "block";
  btn.style.display = "none";
}
function hideTooltip() {
  tooltip.style.display = "none";
  close.style.display = "none";
  btn.style.display = "flex";
}

function scrollToSection(selector) {
  const position =
    document.querySelector(selector).getBoundingClientRect().top +
    document.body.scrollTop;
  document.body.scrollTo({
    top: position,
    behavior: "instant",
  });
}

document
  .querySelector("#promo-register-anchor")
  .addEventListener("click", scrollToSection.bind(null, "#productForm"));
document
  .querySelector("#questions-register-anchor")
  .addEventListener("click", scrollToSection.bind(null, "#productForm"));

//Закрытие мобильного модального окна меню по якорю
document
  .querySelector(".header__offcanvas-body")
  ?.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      setTimeout(() => {
        const targetId = e.target.id.split("-")[0];
        scrollToSection("#" + targetId);
      }, 500);
    }
  });
