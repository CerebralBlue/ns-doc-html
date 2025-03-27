const text = document.querySelector(".sec-text");

const textLoad = () => {
  setTimeout(() => {
    text.textContent = "Speed";
  }, 0);
  setTimeout(() => {
    text.textContent = "Simplicity";
  }, 2000);
  setTimeout(() => {
    text.textContent = "Success";
  }, 4000); //1s = 1000 milliseconds
};

textLoad();
setInterval(textLoad, 6000);
