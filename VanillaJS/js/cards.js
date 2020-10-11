const header = document.getElementById("header");
const userName = localStorage.getItem("userName");
header.innerHTML = "Hello, " + userName;
const cardsDiv = document.querySelector(".container");
const searchBar = document.getElementById("searchField");
const spinner = document.getElementById("spinner");
const options = document.getElementById("types");
const colorSelect = document.getElementById("colors");
const colors = ["white", "blue", "black", "red", "green"];
const sort = document.getElementById("nameOrder");
let fetchedCards = [];
let fetchedTypes = [];

const displayCards = (cards) => {
  const htmlString = cards
    .map((card) => {
      return `<div class="card">
        <div class="card-img">
            <img src="${card.imageUrl}">                
          </div>
        <div class="card-body">
            <h2 class="card-title">Name: ${card.name}</h2>
            <p>Types: ${card.types}</p>
            <p>Set Name: ${card.setName}</p>
            <p>Colors: ${card.colors}</p>
          </div>
      </div>`;
    })
    .join("");
  cardsDiv.innerHTML = htmlString;
};

const displayTypes = (types) => {
  const htmlString = types
    .map((type) => {
      return `
      <option value="${type}">${type}</option>`;
    })
    .join("");
  options.innerHTML =
    `  <option disabled selected>Select type</option>` + htmlString;
};

const displayColors = (col) => {
  const htmlString = col
    .map((col) => {
      return `
      <option value="${col}">${col}</option>`;
    })
    .join("");
  colorSelect.innerHTML =
    `<option disabled selected>Select color</option>` + htmlString;
};
displayColors(colors);

const showSpinner = () => {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 6000);
};
showSpinner();

const hideSpinner = () => {
  spinner.className = spinner.className.replace("show", "");
};

const loadCards = async () => {
  try {
    const res = await fetch(
      "https://api.magicthegathering.io/v1/cards?random=true&pageSize=100&language=English"
    );
    const fetched = await res.json();
    fetchedCards = fetched.cards;
    displayCards(fetchedCards);
    hideSpinner();
  } catch (err) {
    console.log(err);
  }
};
loadCards();

const loadTypes = async () => {
  const res = await fetch("https://api.magicthegathering.io/v1/types");
  const fetched = await res.json();
  fetchedTypes = fetched.types;
  displayTypes(fetchedTypes);
};
loadTypes();

searchBar.addEventListener("keyup", (event) => {
  const searchString = event.target.value.toLowerCase();
  const filteredCards = fetchedCards.filter((obj) => {
    return obj.name.toLowerCase().includes(searchString);
  });
  displayCards(filteredCards);
});

options.addEventListener("change", () => {
  const value = options.options[options.selectedIndex].value.toLowerCase();
  const filteredCards = fetchedCards.filter((obj) => {
    for (let i = 0; i < obj.types.length; i++) {
      return obj.types[i].toLowerCase().includes(value);
    }
  });
  displayCards(filteredCards);
});

colorSelect.addEventListener("change", () => {
  const value = colorSelect.options[
    colorSelect.selectedIndex
  ].value.toLowerCase();
  const filteredCards = fetchedCards.filter((obj) => {
    for (let i = 0; i < obj.colors.length; i++) {
      return obj.colors[i].toLowerCase().includes(value);
    }
  });
  displayCards(filteredCards);
});

sort.addEventListener("change", () => {
  const value = sort.options[sort.selectedIndex].value.toLowerCase();

  let filteredCards = [];
  if (value == "ascending") {
    filteredCards = fetchedCards.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  } else {
    filteredCards = fetchedCards.sort((a, b) =>
      a.name > b.name ? -1 : b.name > a.name ? 1 : 0
    );
  }
  displayCards(filteredCards);
});
