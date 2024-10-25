const body = document.querySelector("body");
const header = document.querySelector("header");
const menuOpen = document.querySelector(".fa-bars-staggered");
const navbarCollapse = document.querySelector(".navbar-collapse");

// console.log(menuOpen);

menuOpen.onclick = () => {
  navbarCollapse.classList.toggle("show");
  menuOpen.classList.toggle("fa-xmark");
};

window.onload = function () {
  let elements = document.getElementsByClassName("txt-rotate");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-rotate");
    let period = elements[i].getAttribute("data-rotate");

    if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.8rem solid #F26921}";
  document.body.appendChild(css);
};


var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 100) || 4000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
}

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

   if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length-1);
   } else {
     this.txt = fullTxt.substring(0, this.txt.length + 1);
   }

    this.el.innerHTML = `<span class="wrap"> ${this.txt} </span>`;

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) {
        delta / 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta.isDeleting = true;
        this.isDeleting = true;
    } else if (that.isDeleting  && this.txt === "") {
     this.isDeleting = false;
        this.loopNum++;
        delta = 1000;
    }

    setTimeout( function () {
        that.tick();
    }, delta);
    
};












