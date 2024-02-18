const bucketContainer = document.querySelector(".bucketContainer");
const scoreContainer = document.querySelector("#scoreContainer");
const timeContainer = document.querySelector("#timeContainer");
let score = 0;
let timeLeft = 20;
let timerInterval;

const brands = [
  {
    id: 1,
    image: "images/logo-1.png",
  },
  {
    id: 2,
    image: "images/logo-2.png",
  },
  {
    id: 3,
    image: "images/logo-3.png",
  },
  {
    id: 4,
    image: "images/logo-4.png",
  },
  {
    id: 5,
    image: "images/logo-5.png",
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
          scoreContainer.textContent = `Score: ${score}`;
          const leftPos = getRandomBucketX();
          const topPos = getRandomBucketY();
          game.removeChild(brandContainer);
          const clickedBrand = document.createElement("div");
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
    return;
  }
  timeContainer.textContent = `Time Left: ${timeLeft} seconds`;
  timeLeft--;
}

document.addEventListener("DOMContentLoaded", function () {
  setInterval(createBrandDiv, 1000);
  const timerInterval = setInterval(updateTimer, 1000);
});
