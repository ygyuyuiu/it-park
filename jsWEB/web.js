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

//schools
const modalSchool = document.getElementById("schools__modal");
const sectionSchool = document.querySelector(".school");
const modalContentSchool = document.querySelector(".schools__modal-content");

sectionSchool.addEventListener("click", (e) => {
  if (e.target.classList.contains("schools__open-modal")) {
    modal.classList.add("active");
    if (e.target.classList.contains("schools__open-modal-video")) {
      const url = e.target.dataset.videourl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
            <iframe
              id="youtube-video"
              src="${url}"
              frameborder="0"
              allowfullscreen
            ></iframe>
            `
      );
    } else if (e.target.classList.contains("schools__open-modal-image")) {
      const url = e.target.dataset.imageurl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
              <img src="${url}" />
            `
      );
    }
  }
});

modalSchool.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("schools__modal-close")
  ) {
    modal.classList.remove("active");
    modalContent.children[0].remove();
  }
});

//specialty
const modal = document.getElementById("specialtys__modal");
const sectionSpecialty = document.querySelector(".specialty");
const modalContent = document.querySelector(".specialtys__modal-content");

sectionSpecialty.addEventListener("click", (e) => {
  if (e.target.classList.contains("specialtys__open-modal")) {
    modal.classList.add("active");
    if (e.target.classList.contains("specialtys__open-modal-video")) {
      const url = e.target.dataset.videourl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
            <iframe
              id="youtube-video"
              src="${url}"
              frameborder="0"
              allowfullscreen
            ></iframe>
            `
      );
    } else if (e.target.classList.contains("specialtys__open-modal-image")) {
      const url = e.target.dataset.imageurl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
              <img src="${url}" />
            `
      );
    }
  }
});

modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("specialtys__modal-close")
  ) {
    modal.classList.remove("active");
    modalContent.children[0].remove();
  }
});

//accordion
const modalAccordion = document.getElementById("accordions__modal");
const sectionAccordion = document.querySelector(".accordion");
const modalContentAccordion = document.querySelector(
  ".accordions__modal-content"
);

sectionAccordion.addEventListener("click", (e) => {
  if (e.target.classList.contains("accordions__open-modal")) {
    modal.classList.add("active");
    if (e.target.classList.contains("accordions__open-modal-video")) {
      const url = e.target.dataset.videourl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
            <iframe
              id="youtube-video"
              src="${url}"
              frameborder="0"
              allowfullscreen
            ></iframe>
            `
      );
    } else if (e.target.classList.contains("accordions__open-modal-image")) {
      const url = e.target.dataset.imageurl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
              <img src="${url}" />
            `
      );
    }
  }
});

modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("accordions__modal-close")
  ) {
    modal.classList.remove("active");
    modalContent.children[0].remove();
  }
});

//history
const modalHistory = document.getElementById("histories__modal");
const sectionHistory = document.querySelector(".history");
const modalContentHistory = document.querySelector(".histories__modal-content");

sectionHistory.addEventListener("click", (e) => {
  if (e.target.classList.contains("histories__open-modal")) {
    modal.classList.add("active");
    if (e.target.classList.contains("histories__open-modal-video")) {
      const url = e.target.dataset.videourl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
            <iframe
              id="youtube-video"
              src="${url}"
              frameborder="0"
              allowfullscreen
            ></iframe>
            `
      );
    } else if (e.target.classList.contains("accordions__open-modal-image")) {
      const url = e.target.dataset.imageurl;
      modalContent.insertAdjacentHTML(
        `afterbegin`,
        `
              <img src="${url}" />
            `
      );
    }
  }
});

modal.addEventListener("click", (event) => {
  if (
    event.target === modal ||
    event.target.classList.contains("histories__modal-close")
  ) {
    modal.classList.remove("active");
    modalContent.children[0].remove();
  }
});

document.querySelector("#chat__more-btn").addEventListener("click", (e) => {
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
  console.log(JSON.stringify(data));

  fetch("https://itpark32sys.ru/lk/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Упс... Произошла ошибка. Попробуйте еще раз");
      // Редирект на страницу thankyou.html
      // window.location.href = "thankyou.html";
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

// slider
// $(document).ready(function () {
//   $(".slider__content").slick({
//     arrows: true,
//     // dots: true,
//     centerPadding: "0px",
//     slidesToShow: 3,
//     centerMode: true,
//     slidesToScroll: 1,
//     speed: 200,
//     arrows: true,
//     infinite: true,
//     initialSlide: 0,
//     draggable: false,

//     responsive: [
//       {
//         breakpoint: 1400,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           centerMode: false,
//         },
//       },
//       {
//         breakpoint: 576,
//         settings: {
//           centerPadding: "22px",
//           slidesToShow: 1,
//           centerMode: false,
//         },
//       },
//     ],
//   });
// });

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
          slidesToShow: 2,
          slidesToScroll: 1,
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

//slider__projects
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

//teachers
// $(document).ready(function () {
//   $(".teachers__slider").slick({
//     arrows: false,
//     dots: true,
//     variableWidth: true,
//     adaptiveHeight: true,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     speed: 1500,
//     easing: "ease",
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   });
// });

// button
// const tooltip = document.querySelector('.fixed__tooltip')
// const numMess = document.querySelector('.fixed__num')

//  setTimeout(() => {
// 		tooltip.style.opacity = 1
// 		numMess.style.opacity = 1
//  }, 3000)

// const btnActive = document.querySelector('#btn-active')
// const btnClose = document.querySelector('#close')
// const links = document.querySelectorAll('.fixed__link')

// btnClose.addEventListener('click', () => {
// 	if (btnClose) {
// 		btnActive.style.display = 'block'
// 		btnClose.style.display = 'none'

// 		for (let i = 0; i < links.length; i++) {
// 			links[0].style.cssText =
// 				'transform: translate(0px); transition:all 200ms ease-out 300ms; visibility: hidden;'
// 			links[1].style.cssText =
// 				'transform: translate(0px); transition:all 200ms ease-out 200ms; visibility: hidden;'
// 			links[2].style.cssText =
// 				'transform: translate(0px); transition:all 200ms ease-out 100ms; visibility: hidden;'
// 		}
// 	}
// })

// btnActive.addEventListener('click', () => {
// 	if (btnActive) {
// 		tooltip.style.opacity = 0
// 		numMess.style.opacity = 0
// 		btnActive.style.display = 'none'
// 		btnClose.style.display = 'block'

// 		for (let i = 0; i < links.length; i++) {
// 			links[0].style.cssText =
// 				'transform: translate(-220px); transition:all 200ms ease-out 100ms; visibility:visible;'
// 			links[1].style.cssText =
// 				'transform: translate(-160px); transition:all 200ms ease-out 200ms; visibility:visible;'
// 			links[2].style.cssText =
// 				'transform: translate(-100px); transition:all 200ms ease-out 300ms; visibility:visible;'
// 		}
// 	}
// })
