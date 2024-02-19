const startScreen = document.querySelector("#startScreen");
const resultScreen = document.querySelector("#resultScreen");
const bucketContainer = document.querySelector(".bucketContainer");
const scoreText1 = document.querySelector(".scoreText1");
const timeText1 = document.querySelector(".timeText1");
const scoreText2 = document.querySelector(".scoreText2");
const timeText2 = document.querySelector(".timeText2");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
let score = 0;
let timeLeft = 30;
let timerInterval;

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
  brandContainer.className = "brandContainer";
  brandContainer.style.left = getRandomX() + "px";
  brandContainer.style.bottom = "-50px";
  const randomBrand = getRandomBrand();

  preloadImage(randomBrand.image)
    .then((img) => {
      const brandImg = document.createElement("img");
      brandImg.src = img.src;
      brandContainer.setAttribute("data-id", randomBrand.id);
      brandContainer.appendChild(brandImg);
      game.appendChild(brandContainer);
      brandContainer.addEventListener("click", () => {
        if (game.contains(brandContainer)) {
          score++;
          scoreText1.textContent = `${score}`;
          scoreText2.textContent = `${score}`;
          const leftPos = getRandomBucketX();
          const topPos = getRandomBucketY();
          game.removeChild(brandContainer);
          const clickedBrand = document.createElement("div");
          clickedBrand.className = "clickedBrand";
          clickedBrand.style.left = leftPos + "px";
          clickedBrand.style.top = -topPos + "px";
          clickedBrand.appendChild(brandImg);
          bucketContainer.append(clickedBrand);
        }
      });
      setTimeout(() => {
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
      resultScreen.classList.add("show");
    }, 1000);
    return;
  }
  timeText1.textContent = `${timeLeft}`;
  timeText2.textContent = `${timeLeft}`;
  timeLeft--;
}

function gameStart() {
  startScreen.classList.add("hide");
  setTimeout(() => {
    setInterval(createBrandDiv, 1000);
    const timerInterval = setInterval(updateTimer, 1000);
  }, 1000);
}
function restartGame() {
  window.location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  startBtn.addEventListener("click", gameStart);
  restartBtn.addEventListener("click", restartGame);
});
