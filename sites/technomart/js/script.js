var mapLink = document.querySelector(".map-link");
var mapWindow = document.querySelector(".map-image-big");

var popup = document.querySelectorAll(".modal-window");
var closeBtn = document.querySelectorAll(".close-btn");

var feedbackBtn = document.querySelector(".feedback-btn");
var feedbackWindow = document.querySelector(".feedback-form");

if (feedbackWindow) {
  var form = feedbackWindow.querySelector("form");
  var nameCust = feedbackWindow.querySelector("[name=customer-name]");
  var emailCust = feedbackWindow.querySelector("[name=customer-email]");
  var messageCust = feedbackWindow.querySelector("[name=customer-message]");
}

if (localStorage) {
  storageNameCust = localStorage.getItem("nameCust");
  storageEmailCust = localStorage.getItem("emailCust");
}

var buyBtn = document.querySelectorAll(".buy");
var cartWindow = document.querySelector(".cart-form");
var closeCart = document.querySelector(".cart-btn.white");

if (mapLink) {
  mapLink.addEventListener("click", function (event) {
    event.preventDefault();
    mapWindow.classList.add("modal-active");
  });
}

if (feedbackBtn) {
  feedbackBtn.addEventListener("click", function (event) {
    event.preventDefault();
    feedbackWindow.classList.add("modal-active");
    if (storageNameCust && storageEmailCust) {
      nameCust.value = storageNameCust;
      emailCust.value = storageEmailCust;
      messageCust.focus();
    } else {
      nameCust.focus();
    }
  });
}

for (var n = 0; n < buyBtn.length; n++) {
  buyBtn[n].addEventListener("click", function (event) {
    event.preventDefault();
    cartWindow.classList.add("modal-active");
  });
}

closeCart.addEventListener("click", function (event) {
  event.preventDefault();
  for (var j = 0; j < popup.length; j++) {
    popup[j].classList.remove("modal-active");    
  }
});

for (var i = 0; i < popup.length; i++) {
  closeBtn[i].addEventListener("click", function (event) {
    event.preventDefault();
    for (var j = 0; j < popup.length; j++) {
      popup[j].classList.remove("modal-active");
      popup[j].classList.remove("modal-error");
    }
  });
}

window.addEventListener("keydown", function (event) {
  if (event.keyCode === 27) {
    for (var j = 0; j < popup.length; j++) {
      if (popup[j].classList.contains("modal-active")) {
        popup[j].classList.remove("modal-active");
        popup[j].classList.remove("modal-error");
      }
    }
  }
});

if (form) {
  form.addEventListener("submit", function (event) {
    if (!nameCust.value || !emailCust.value || !messageCust.value) {
      event.preventDefault();
      feedbackWindow.classList.remove("modal-error");
      feedbackWindow.offsetWidth = feedbackWindow.offsetWidth;
      feedbackWindow.classList.add("modal-error");
    } else {
      localStorage.setItem("nameCust", nameCust.value);
      localStorage.setItem("emailCust", emailCust.value);
    }
  });
}