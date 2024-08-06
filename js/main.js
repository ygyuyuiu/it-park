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

// //set
$(document).ready(function () {
  $(".set__slider").slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 3000,
    // easing: "ease",
    autoplay: true,
  });
});

//testimonials
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

//teachers
$(document).ready(function () {
  $(".teachers__slider").slick({
    arrows: false,
    dots: true,
    variableWidth: true,
    adaptiveHeight: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1500,
    easing: "ease",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

//events
const modal = document.getElementById("event__modal");
const sectionEvents = document.querySelector(".events");
const modalContent = document.querySelector(".event__modal-content");

sectionEvents.addEventListener("click", (e) => {
  if (e.target.classList.contains("event__open-modal")) {
    modal.classList.add("active");
    if (e.target.classList.contains("event__open-modal-video")) {
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
    } else if (e.target.classList.contains("event__open-modal-image")) {
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
    event.target.classList.contains("event__modal-close")
  ) {
    modal.classList.remove("active");
    modalContent.children[0].remove();
  }
});

//Закрытие мобильного модального окна меню по якорю
const offcanvasModal = document.getElementById("offcanvasNavbar");

offcanvasModal.addEventListener("click", (e) => {
  const offcanvasObj = bootstrap.Offcanvas.getInstance(offcanvasModal);
  if (e.target.matches(".nav-link") && offcanvasObj) {
    e.preventDefault();
    offcanvasObj.hide();
    setTimeout(() => {
      const link = e.target.getAttribute("href").substring(1);
      window.location.hash = link;
      document.getElementById(link).scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
});

// Отправка формы курса
document.querySelector(".modal-course").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.matches(".modal__footer-form")) {
    e.target.querySelector(".modal__footer-alert")?.remove();
    e.target.querySelector(".modal__footer-btn-text").textContent =
      "Подождите...";
    e.target.querySelector(".modal__footer-loader").classList.remove("d-none");
    e.target.parentElement
      .querySelector(".modal__footer-loader-wrapper")
      ?.classList.remove("d-none");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    fetch("https://itpark32sys.ru/lk/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        const courseModal = e.target.closest(".modal-course");
        const bootstrapModal = bootstrap.Modal.getInstance(courseModal);
        bootstrapModal.hide();

        const applicationModal = new bootstrap.Modal(
          document.getElementById("thankYou")
        );
        applicationModal.show();
      })
      .catch((error) => {
        e.target.querySelector(".modal__footer-btn").insertAdjacentHTML(
          "beforebegin",
          `<div class="modal__footer-alert alert alert-danger mt-3 align-self-lg-start" role="alert">
           Упс... Произошла ошибка. Попробуйте еще раз
          </div>`
        );
      })
      .finally(() => {
        e.target.querySelector(".modal__footer-btn-text").textContent =
          "Записаться на обучение";
        e.target.querySelector(".modal__footer-loader").classList.add("d-none");
        e.target.parentElement
          .querySelector(".modal__footer-loader-wrapper")
          ?.classList.add("d-none");
      });
  }
});

//Открытие модального окна 
// const modalSubmit = document.querySelector('.modal-submit')

// function openModalFromHash() {
//   const hash = window.location.hash
//   if (hash) {
//     const modalElement = document.querySelector(`[data-bs-target="${hash}"]`)
//     if (modalElement) {
//       const modalId = hash
//       const modal = new bootstrap.Modal(document.querySelector(modalId))
//       modal.show()
//     }
//   }
// }

// setTimeout(() => {
//   if (modalSubmit) {
//     const modal = new bootstrap.Modal(modalSubmit)
//     modal.show()
//   }
// },30000)

// //Отправка формы
// document.querySelector('.modal-submit').addEventListener('submit', e => {
// 	e.preventDefault()
// 	if (e.target.matches('.modal__footer-form')) {
// 		e.target.querySelector('.modal__footer-alert')?.remove()
// 		e.target.querySelector('.modal__footer-btn-text').textContent =
// 			'Подождите...'
// 		e.target.querySelector('.modal__footer-loader').classList.remove('d-none')
// 		e.target.parentElement
// 			.querySelector('.modal__footer-loader-wrapper')
// 			?.classList.remove('d-none')

// 		const formData = new FormData(e.target)
// 		const data = Object.fromEntries(formData)
// 		fetch('https://itpark32sys.ru/lk/api/contact', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(data),
// 		})
// 			.then(response => {
// 				if (!response.ok) throw new Error(response.status)
// 				const courseModal = e.target.closest('.modal-submit')
// 				const bootstrapModal = bootstrap.Modal.getInstance(courseModal)
// 				bootstrapModal.hide()

// 				const applicationModal = new bootstrap.Modal(
// 					document.getElementById('thankYou')
// 				)
// 				applicationModal.show()
// 			})
// 			.catch(error => {
// 				e.target.querySelector('.modal__footer-btn').insertAdjacentHTML(
// 					'beforebegin',
// 					`<div class="modal__footer-alert alert alert-danger mt-3 align-self-lg-start" role="alert">
//            Упс... Произошла ошибка. Попробуйте еще раз
//           </div>`
// 				)
// 			})
// 			.finally(() => {
// 				e.target.querySelector('.modal__footer-btn-text').textContent =
// 					'Получить запись вебинара'
// 				e.target.querySelector('.modal__footer-loader').classList.add('d-none')
// 				e.target.parentElement
// 					.querySelector('.modal__footer-loader-wrapper')
// 					?.classList.add('d-none')
// 			})
// 	}
// })

// Очищаем форму при закрытии модального окна
document
  .querySelector(".modal-course-wrapper")
  .addEventListener("hidden.bs.modal", (e) => {
    if (e.target.matches(".modal-course")) {
      e.target.querySelector(".modal__footer-alert")?.remove();
      const form = e.target.querySelector(".modal__footer-form");
      form.reset();
    }
    // Очистить хеш из урла при закрытии модального окна
    history.pushState(
      null,
      null,
      window.location.pathname + window.location.search
    );
  });

// Подставление якорей в урл при открытии модального окна
document.addEventListener("DOMContentLoaded", function () {
  function openModalFromHash() {
    const hash = window.location.hash;
    if (hash) {
      const modalElement = document.querySelector(`[data-bs-target="${hash}"]`);
      if (modalElement) {
        const modalId = hash;
        const modal = new bootstrap.Modal(document.querySelector(modalId));
        modal.show();
      }
    }
  }

  // Открытие модального окна при загрузке страницы, если есть хеш
  openModalFromHash();

  // Открытие модального окна при изменении хеша
  window.addEventListener("hashchange", openModalFromHash);

  // Обработчик кликов для ссылок, которые открывают модальные окна
  document
    .querySelectorAll('a[data-bs-toggle="modal"]')
    .forEach(function (modalLink) {
      modalLink.addEventListener("click", function () {
        const targetHash = this.getAttribute("href");
        history.pushState(null, null, targetHash);
      });
    });
});

// button
const tooltip = document.querySelector('.fixed__tooltip')
const numMess = document.querySelector('.fixed__num')

 setTimeout(() => {
		tooltip.style.opacity = 1
		numMess.style.opacity = 1
 }, 3000)

const btnActive = document.querySelector('#btn-active')
const btnClose = document.querySelector('#close')
const links = document.querySelectorAll('.fixed__link')

btnClose.addEventListener('click', () => {
	if (btnClose) {
		btnActive.style.display = 'block'
		btnClose.style.display = 'none'

		for (let i = 0; i < links.length; i++) {
			links[0].style.cssText =
				'transform: translate(0px); transition:all 200ms ease-out 300ms; visibility: hidden;'
			links[1].style.cssText =
				'transform: translate(0px); transition:all 200ms ease-out 200ms; visibility: hidden;'
			links[2].style.cssText =
				'transform: translate(0px); transition:all 200ms ease-out 100ms; visibility: hidden;'
		}
	}
})

btnActive.addEventListener('click', () => {
	if (btnActive) {
		tooltip.style.opacity = 0
		numMess.style.opacity = 0
		btnActive.style.display = 'none'
		btnClose.style.display = 'block'

		for (let i = 0; i < links.length; i++) {
			links[0].style.cssText =
				'transform: translate(-220px); transition:all 200ms ease-out 100ms; visibility:visible;'
			links[1].style.cssText =
				'transform: translate(-160px); transition:all 200ms ease-out 200ms; visibility:visible;'
			links[2].style.cssText =
				'transform: translate(-100px); transition:all 200ms ease-out 300ms; visibility:visible;'
		}
	}
})
