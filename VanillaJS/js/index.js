const cont = document.getElementById("cont");
const form = document.getElementById("form");
const name = document.getElementById("name");

const upperAlert = () => {
  const info = document.createElement("p");
  info.setAttribute("id", "info");
  const msg = document.createTextNode("First character should be Uppercase");
  info.appendChild(msg);
  cont.appendChild(info);
};

const charAlert = () => {
  const info = document.createElement("p");
  info.setAttribute("id", "info");
  const msg = document.createTextNode("Minimum characters is 3");
  info.appendChild(msg);
  cont.appendChild(info);
};

const validateInput = (input) => {
  let inputValue = input.value;
  let inputLenght = inputValue.length;

  if (inputValue[0] === inputValue[0].toUpperCase() && inputLenght >= 3) {
    localStorage.setItem("userName", inputValue);
    name.value = "";
    window.location = "pages/cards.html";
  } else {
    if (inputValue[0] !== inputValue[0].toUpperCase()) {
      upperAlert();
    } else {
      charAlert();
    }
  }
};

const clearInfo = () => {
  let info = document.getElementById("info");
  info.innerHTML = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateInput(name);
});

name.addEventListener("input", (event) => {
  event.preventDefault();
  setTimeout(clearInfo, 5000);
});
