const ball = document.getElementById("ball");
const bounceSound = document.getElementById("bounceSound");

let posX = window.innerWidth / 2 - 30;
let posY = window.innerHeight - 150;
let velX = 0;
let velY = 0;

const gravity = 0.8;
const damping = 0.78;
const bouncePower = 25;
let isDragging = false;
let offsetX, offsetY;

function updatePhysics() {
  if (!isDragging) {
    velY += gravity;
    posY += velY;
    posX += velX;

    const floorY = window.innerHeight - 30 - 60;

    if (posY >= floorY) {
      posY = floorY;
      velY *= -damping;
      if (Math.abs(velY) > 3) bounceSound.play();
    }

    if (posX <= 0 || posX + 60 >= window.innerWidth) {
      velX *= -0.7;
      posX = Math.max(0, Math.min(posX, window.innerWidth - 60));
    }

    velX *= 0.99; 
  }

  ball.style.transform = `translate(${posX}px, ${posY}px)`;
  requestAnimationFrame(updatePhysics);
}
updatePhysics();

function bounce() {
  if (!isDragging) {
    velY = -bouncePower;
    velX = (Math.random() - 0.5) * 16;
  }
}

ball.addEventListener("click", bounce);
ball.addEventListener("touchstart", bounce);

ball.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - posX;
  offsetY = e.clientY - posY;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    posX = e.clientX - offsetX;
    posY = e.clientY - offsetY;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

ball.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - posX;
  offsetY = touch.clientY - posY;
});

document.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const touch = e.touches[0];
    posX = touch.clientX - offsetX;
    posY = touch.clientY - offsetY;
  }
});

document.addEventListener("touchend", () => {
  isDragging = false;
});

window.addEventListener("resize", () => {
  posX = Math.min(posX, window.innerWidth - 60);
  posY = Math.min(posY, window.innerHeight - 150);
});
