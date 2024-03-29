window.addEventListener("DOMContentLoaded", function() {
  "use strict";
  let tab = document.querySelectorAll(".info-header-tab"),
    infoHeader = document.querySelector(".info-header"),
    tabContent = document.querySelectorAll(".info-tabcontent");

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove("show");
      tabContent[i].classList.add("hide");
    }
  }

  hideTabContent(1);

  function showTabContent(b) {
    if (tabContent[b].classList.contains("hide")) {
      tabContent[b].classList.remove("hide");
      tabContent[b].classList.add("show");
    }
  }

  infoHeader.addEventListener("click", function(event) {
    let target = event.target;
    if (target && target.classList.contains("info-header-tab")) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  //Timer

  let deadline = "December 31, 2019 23:59:59";

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor(t / (1000 * 60 * 60));
    // hours = Math.floor((t / 1000 / 60 / 60) % 24);

    if (t <= 0) {
      seconds = 0;
      minutes = 0;
      hours = 0;
    }

    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id),
      hours = timer.querySelector(".hours"),
      minutes = timer.querySelector(".minutes"),
      seconds = timer.querySelector(".seconds"),
      timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);

      for (let key in t) {
        if (key != t.total) {
          if (t[key] < 10) {
            t[key] = "0" + t[key];
          }
        }
      }

      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock("timer", deadline);

  //Modal

  let more = document.querySelector(".more"),
    overlay = document.querySelector(".overlay"),
    close = document.querySelector(".popup-close"),
    info = document.querySelector(".info"),
    descriptionBtn = document.querySelectorAll(".description-btn");

  more.addEventListener("click", function() {
    overlay.style.display = "block";
    this.classList.add("more-splash");
    document.body.style.overflow = "hidden";
  });

  close.addEventListener("click", function() {
    if (more.classList.contains("more-splash")) {
      more.classList.remove("more-splash");
    }
    if (descriptionBtn[0].classList.contains("more-splash")) {
      descriptionBtn.forEach(element => {
        element.classList.remove("more-splash");
      });
    }
    overlay.style.display = "none";
    document.body.style.overflow = "";
  });

  info.addEventListener("click", function(event) {
    let target = event.target;
    if (target && target.classList.contains("description-btn")) {
      descriptionBtn.forEach(element => {
        element.classList.add("more-splash");
      });
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  });
});
