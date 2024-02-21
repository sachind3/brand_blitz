const startScreen = document.querySelector("#startScreen");
const resultScreen = document.querySelector("#resultScreen");
const bucketContainer = document.querySelector(".bucketContainer");
const scoreText1 = document.querySelector(".scoreText1");
const timeText1 = document.querySelector(".timeText1");
const scoreText2 = document.querySelector(".scoreText2");
const timeText2 = document.querySelector(".timeText2");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");

const clickUi = document.getElementById("clickUi");
const music = document.getElementById("music");
const clap = document.getElementById("clap");
clickUi.pause();
clickUi.currentTime = 0;
music.pause();
music.currentTime = 0;
clap.pause();
clap.currentTime = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let clapPlayed = false;

const brands = [
  {
    id: 1,
    image: "images/logos/01.png",
  },
  {
    id: 2,
    image: "images/logos/02.png",
  },
  {
    id: 3,
    image: "images/logos/03.png",
  },
  {
    id: 4,
    image: "images/logos/04.png",
  },
  {
    id: 5,
    image: "images/logos/05.png",
  },
  {
    id: 6,
    image: "images/logos/06.png",
  },
  {
    id: 7,
    image: "images/logos/07.png",
  },
  {
    id: 8,
    image: "images/logos/08.png",
  },
  {
    id: 9,
    image: "images/logos/09.png",
  },
  {
    id: 10,
    image: "images/logos/10.png",
  },
  {
    id: 11,
    image: "images/logos/11.png",
  },
  {
    id: 12,
    image: "images/logos/12.png",
  },
  {
    id: 13,
    image: "images/logos/13.png",
  },
  {
    id: 14,
    image: "images/logos/14.png",
  },
  {
    id: 15,
    image: "images/logos/15.png",
  },
  {
    id: 16,
    image: "images/logos/16.png",
  },
  {
    id: 17,
    image: "images/logos/17.png",
  },
  {
    id: 18,
    image: "images/logos/18.png",
  },
  {
    id: 19,
    image: "images/logos/19.png",
  },
  {
    id: 20,
    image: "images/logos/20.png",
  },
  {
    id: 21,
    image: "images/logos/21.png",
  },
  {
    id: 22,
    image: "images/logos/22.png",
  },
  {
    id: 23,
    image: "images/logos/23.png",
  },
  {
    id: 24,
    image: "images/logos/24.png",
  },
  {
    id: 25,
    image: "images/logos/25.png",
  },
  {
    id: 26,
    image: "images/logos/26.png",
  },
  {
    id: 27,
    image: "images/logos/27.png",
  },
  {
    id: 28,
    image: "images/logos/28.png",
  },
  {
    id: 29,
    image: "images/logos/29.png",
  },
  {
    id: 30,
    image: "images/logos/30.png",
  },
  {
    id: 31,
    image: "images/logos/31.png",
  },
];
var droppedIn = false;
const dropZone = document.getElementById("drop_zone");

function preloadImage(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${imageSrc}`));
    img.src = imageSrc;
  });
}

function getRandomBrand() {
  return brands[Math.floor(Math.random() * brands.length)];
}

function getRandomX() {
  return Math.floor(Math.random() * (window.innerWidth - 100));
}

function getRandomBucketX() {
  return Math.floor(Math.random() * (bucketContainer.clientWidth - 100));
}

function getRandomBucketY() {
  return Math.floor(Math.random() * (20 - 5 + 1)) + 5;
}

function createBrandDiv() {
  if (timeLeft == -1) {
    return;
  }
  const brandContainer = document.createElement("div");
  const randomBrand = getRandomBrand();

  preloadImage(randomBrand.image)
    .then((img) => {
      const brandImg = document.createElement("img");
      brandImg.src = img.src;
      brandContainer.append(brandImg);
      brandContainer.style.left = getRandomX() + "px";
      game.append(brandContainer);
      brandContainer.classList.add("brandContainer");
      brandContainer.setAttribute("data-id", randomBrand.id);

      let _this = bucketContainer;

      // brandContainer.addEventListener("click", () => {
      //   if (game.contains(brandContainer)) {
      //     score = score + 5;
      //     scoreText1.textContent = `${score}`;
      //     scoreText2.textContent = `${score}`;
      //     const leftPos = getRandomBucketX();
      //     const topPos = getRandomBucketY();
      //     game.removeChild(brandContainer);

      //   }
      // });

      $(".brandContainer").draggable({
        stop: function (event, ui) {
          //game.removeChild(brandContainer);
        },
      });
      $(".bucketContainer").droppable({
        drop: function (event, ui) {
          if (game.contains(brandContainer)) {
            clickUi.play();
            let item = ui.draggable[0];
            let childrenN = $(item).children()[0];
            console.log(childrenN);
            score += 5;
            $(".scoreText1").text(score);
            $(".scoreText2").text(score);
            const leftPos = getRandomBucketX();
            const topPos = getRandomBucketY();
            const clickedBrand = document.createElement("div");
            clickedBrand.className = "clickedBrand";
            clickedBrand.style.left = leftPos + "px";
            clickedBrand.style.top = -topPos + "px";
            clickedBrand.appendChild(childrenN);
            bucketContainer.appendChild(clickedBrand);
            game.removeChild(brandContainer);
            $(".rayContainer").addClass("animateGlow");
            setTimeout(() => {
              $(".rayContainer").removeClass("animateGlow");
            }, 1000);
          }
        },
      });
      setTimeout(() => {
        console.log(brandContainer);
        if (game.contains(brandContainer)) {
          game.removeChild(brandContainer);
        }
      }, 4000);
    })
    .catch((error) => {
      console.error("Failed to preload image:", error);
    });
}

function updateTimer() {
  if (timeLeft == -1) {
    clearInterval(timerInterval);
    setTimeout(() => {
      music.pause();
      music.currentTime = 0;
      resultScreen.classList.add("show");

      // Check if clap has been played
      if (!clapPlayed) {
        clap.play();
        clapPlayed = true; // Set the flag to true
      }

      setTimeout(() => {
        clap.pause();
        clap.currentTime = 0;
      }, 3000);
    }, 1000);

    return;
  }
  timeText1.textContent = `${timeLeft}`;
  timeText2.textContent = `30`;
  timeLeft--;
}

function gameStart() {
  music.play();

  startScreen.classList.add("hide");
  setTimeout(() => {
    setInterval(createBrandDiv, 1000);
    const timerInterval = setInterval(updateTimer, 1000);
  }, 1000);
}
function restartGame() {
  clickUi.play();
  window.location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  startBtn.addEventListener("click", gameStart);
  restartBtn.addEventListener("click", restartGame);
});

// setTimeout(() => {
//   music.pause();
//   music.currentTime = 0;
//   resultScreen.classList.add("show");
//   clap.play();
// }, 1000);
