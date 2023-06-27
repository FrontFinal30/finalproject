console.log(localStorage.getItem('selectedItemId'));

document.addEventListener('DOMContentLoaded', () => {
  const selectedItemId = localStorage.getItem('selectedItemId');
  if (selectedItemId) {
    // Access the game template elements
    const gameTitleElement = document.querySelector('.game-page-title');
    const gameImageElement = document.querySelector('.game-image');
    const gameDescriptionElement = document.querySelector('.game-description');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Fetch the item details based on the selected item ID
    fetch('../items.json')
      .then(response => response.json())
      .then(data => {
        const selectedItem = data.items.find(item => item.id === parseInt(selectedItemId));

        // Update the game template with the item information
        gameTitleElement.innerHTML = selectedItem.title;
        gameImageElement.src = selectedItem.imageSrc;
        gameDescriptionElement.innerHTML = selectedItem.description;

        // Add event listeners to the "Add to Cart" buttons
        addToCartButtons.forEach(button => {
          button.addEventListener('click', () => {
            const itemId = button.dataset.id;
            addToCart(itemId);
          });
        });
      });
  }
});
 