document.addEventListener("DOMContentLoaded", function () {
  let tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      for (let sibling of e.target.parentNode.children) {
        sibling.classList.remove("tab--active");
      }
      for (let sibling of e.target.closest(".tabs-wrapper").parentNode
        .children) {
        if (sibling.classList.contains("tabs-container")) {
          sibling.querySelectorAll(".tabs-content").forEach((content) => {
            content.classList.remove("tabs-content--active");
          });
        }
      }
      e.target.classList.add("tab--active");
      document
        .querySelector(e.target.getAttribute("href"))
        .classList.add("tabs-content--active");
    });
  });

  let bulletText = [
    "А1 - начальный уровень",
    "A2 - начальный уровень",
    "B1 - начальный уровень",
    "B2 - начальный уровень",
    "C1 - начальный уровень",
  ];
  let bullets = document.querySelector(
    ".courses__container .swiper-pagination"
  );
  const courseSlider = new Swiper(".courses-slider", {
    slidesPerView: "auto",
    slidesPerGroup: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next-unique",
      prevEl: ".swiper-button-prev-unique",
    },
    pagination: {
      el: ".courses__container .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<span class="' + className + '">' + bulletText[index] + "</span>"
        );
      },
    },
    on: {
      init: function () {
        for (let i = 1; i < bullets.children.length; i++) {
          let text = bullets.children[i].innerText;
          bullets.children[i].innerText = text.split(" ")[0];
        }
      },
      slideChange: function () {
        for (let i = 0; i < bullets.children.length; i++) {
          if (
            !bullets.children[i].classList.contains(
              "swiper-pagination-bullet-active"
            )
          ) {
            let text = bullets.children[i].innerText;
            bullets.children[i].innerText = text.split(" ")[0];
          } else {
            bullets.children[i].innerText = bulletText[i];
          }
        }
      },
    },
    breakpoints: {
      1190: {
        navigation: false,
      },
    },
  });
  const teachersSlider = new Swiper(".teachers-slider", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      526: {
        slidesPerView: 2,
      },
      769: {
        slidesPerView: 3,
      },
    },
  });

  document.querySelectorAll(".open-popup").forEach((openPopup) => {
    openPopup.addEventListener("click", function () {
      let popup = document.querySelector(".popup");
      popup.style.opacity = "1";
      popup.style.visibility = "visible";
      document.body.classList.add("lock");
    });
  });

  document.querySelector(".close-popup").addEventListener("click", function () {
    let popup = document.querySelector(".popup");
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
    document.body.classList.remove("lock");
  });

  document.querySelector(".menu__icon").addEventListener("click", function () {
    document.body.classList.toggle("lock");
    this.classList.toggle("menu__icon--active");
    document
      .querySelector(".menu__body")
      .classList.toggle("menu__body--active");
  });

  var videoBlock = document.querySelector(".video-block");

  if (videoBlock) {
    var video = videoBlock.querySelector("video");
    var playBtn = videoBlock.querySelector(".video-block__play");
    playBtn.addEventListener("click", function () {
      videoBlock.classList.add("video-block--played");
      video.play();
      video.controls = true;
      playBtn.classList.add("video-block__play--played");
    });

    video.onpause = function () {
      videoBlock.classList.remove("video-block--played");
      video.controls = false;
      playBtn.classList.remove("video-block__play--played");
    };
  }
});
