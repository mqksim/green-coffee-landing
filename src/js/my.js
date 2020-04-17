
// Init SLIDERS

var commentsSwiper = new Swiper('.comments-slider-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    slidesPerGroup: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
    },
    breakpoints: {
        1400: {
            slidesPerView: 3,
            slidesPerGroup: 3
        },
        1100: {
            slidesPerView: 2,
            slidesPerGroup: 2
        }
    }
});
var catalogueSwiper = new Swiper('.catalogue-slider-container', {
    slidesPerView: 0,
    grabCursor: false,
    allowTouchMove: false,
    breakpoints: {
        1600: {
            slidesPerView: 4,
            grabCursor: false,
            spaceBetween: 25,
            allowTouchMove: false
        },
        769: {
            slidesPerView: 3,
            spaceBetween: 25,
            grabCursor: true,
            allowTouchMove: true,
        }
    }
});


//ANCHORS
const anchors = document.querySelectorAll('a[href*="#"]');

for(let anchor of anchors) {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}

// Timer

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}
function initializeClock(endtime) {
    var daysSpan = document.querySelectorAll(".days");
    var hoursSpan = document.querySelectorAll(".hours");
    var minutesSpan = document.querySelectorAll(".mins");
    var secondsSpan = document.querySelectorAll(".secs");
    function updateClock() {
        var t = getTimeRemaining(endtime);
        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 30 * 60 * 1000);
            localStorage.timer = deadline;
            initializeClock(deadline);
        }
        for(let i = 0; i < daysSpan.length; i++) {
            daysSpan[i].innerHTML = t.days;
            hoursSpan[i].innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan[i].innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan[i].innerHTML = ("0" + t.seconds).slice(-2);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}
if(!localStorage.timer) {
    deadline = new Date(Date.parse(new Date()) + 30 * 60 * 1000);
    localStorage.timer = deadline;
    initializeClock(deadline);
} else {
    initializeClock(localStorage.timer)
}

// POPUP

let popupCount = 0;
let popup = document.querySelector('.popup-content');
let popupBg = document.querySelector('.popup-bg');

//Костыльный вариант, работающий везде
if (window.innerWidth > 1024) {

    document.addEventListener("mousemove", function (e) {
        if (e.clientY <= 20) {
            if (!popupCount) {
                popupBg.style.display = "block";
                popupCount++;
            }
        }
    });
}

document.getElementById('close-modal').addEventListener('click', function () {
    popupBg.style.display = "none";
});
popupBg.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup-bg'))
        popupBg.style.display = "none";
});

// Вариант идеально работающий только на Chrome
// if(window.innerWidth > 1024) {
//     document.onmouseout = function () {
//         if(!popupCount) {
//             popupBg.style.display = "block";
//             popupCount++;
//         }
//     };
// }

