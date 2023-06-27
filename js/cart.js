const addButton = document.getElementById("add-to-card");
const orderWindow = document.querySelector(".game-order-window");
const closeWindow = document.getElementById("xmark");
const gamelist = document.querySelector(".gamelist"); 
const buybtn = document.getElementById("buy-now"); 
const buyalert = document.querySelector(".buy-alert");
let closetime;
buybtn.addEventListener('click', () => {
  // Hide the game-order-window
  buyalert.style.display = "block";
  clearTimeout(closetime); // Clear previous timer (if any)
  closetime = setTimeout(hidealert, 2000);
});
function hidealert() {
  buyalert.style.display = 'none';
}


addButton.addEventListener('click', () => {
  // Get the selected item ID from localStorage
  const selectedItemId = parseInt(localStorage.getItem('selectedItemId'), 10);
  console.log(selectedItemId);
  // Clear the previous content in gamelist
  gamelist.innerHTML = '';

  // Fetch the item details from items.json
  fetch('../items.json')
    .then(response => response.json())
    .then(data => {
      // Get the item details for the selected item
      const itemDetails = getItemDetails(selectedItemId, data);

      // Create the game box element with title and price
      const gameBox = createGameBox(itemDetails);

      // Append the game box to gamelist
      gamelist.appendChild(gameBox);

      // Show the game-order-window
      orderWindow.style.display = "block";
    });
});

closeWindow.addEventListener('click', () => {
  // Hide the game-order-window
  orderWindow.style.display = "none";
});

// Function to fetch item details from the items.json file based on the ID
function getItemDetails(itemId, data) {
  return data.items.find(item => item.id === itemId);
}

// Function to create a game box element with title and price
function createGameBox(itemDetails) {
  const gameBox = document.createElement('div');
  gameBox.classList.add('game-box');

  const title = document.createElement('h2');
  title.classList.add('game-box-title', 'geo');
  title.textContent = itemDetails.title;

  const price = document.createElement('p');
  price.classList.add('game-box-price', 'geo');
  price.textContent = itemDetails.price;

  gameBox.appendChild(title);
  gameBox.appendChild(price);

  return gameBox;
}
