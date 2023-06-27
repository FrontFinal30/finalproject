// Function to save item ids in localStorage
const saveItemIdsToLocalStorage = (category, itemIds) => {
  const storedIds = JSON.parse(localStorage.getItem(category)) || [];
  const uniqueIds = [...new Set([...storedIds, ...itemIds])]; // Merge and remove duplicates
  localStorage.setItem(category, JSON.stringify(uniqueIds));
};

// Fetch the JSON data
fetch('../items.json')
  .then(response => response.json())
  .then(data => {
    const catalogWrapper = document.getElementById('catalog-wrapper');
    const container = document.querySelector('.recom-wraper');
    const weeklyContainer = document.querySelector('.weekly-news-wraper');

    const filterItems = (filter) => {
      catalogWrapper.innerHTML = '';
      container.innerHTML = '';
      weeklyContainer.innerHTML = '';

      const filteredItems = data.items.filter(item => {
        if (filter === '.filter-discount') {
          return !item.isFree;
        } else if (filter === '.filter-free') {
          return item.isFree;
        }
        return true;
      });

      const filteredGames = filteredItems.filter(item => item.id >= 1 && item.id <= 6);
      const filteredRecomGames = filteredItems.filter(item => item.id >= 7 && item.id <= 10);
      const filteredWeeklyItems = filteredItems.filter(item => item.id >= 11 && item.id <= 14);

      filteredGames.forEach(item => {
        const catalogItem = document.createElement('div');
        catalogItem.classList.add('catalog-item');
        if (item.isFree) {
          catalogItem.classList.add('filter-free');
        } else {
          catalogItem.classList.add('filter-discount');
        }
        catalogItem.setAttribute('data-aos', 'fade-up');

        catalogItem.innerHTML = `
          <div class="box-wrapper">
            <a href="game-pages/game-template.html" data-id="${item.id}">
              <img src="${item.imageSrc}" alt="catalog-img">
              <h2 class="catalog-game-title medium">${item.title}</h2>
              <div class="buy-box">
                <h3 class="medium">${item.price}</h3>
                <i class="fas fa-shopping-cart"></i>
              </div>
              ${item.discount ? `<h3 class="discount-v medium">${item.discount}</h3>` : ''}
            </a>
          </div>
        `;
        catalogItem.querySelector("a").addEventListener("click", () => {
          localStorage.setItem("selectedItemId", item.id)
        })
        catalogWrapper.appendChild(catalogItem);
      });

      const recomItemsHTML = filteredRecomGames.map(item => {
        return `
          <a class="rec-box shadow" href="game-pages/game-template.html" data-id="${item.id}" data-aos="fade-up">
            <img class="image" src="${item.imageSrc}" alt="${item.title}">
            <div class="description">
              <h3 class="r-title bold">${item.title}</h3>
              <div class="r-count">
                <div class="r-left">
                  <i class="fab fa-windows"></i>
                  <h3 class="r-type regular">${item.platform}</h3>
                </div>
                <div class="r-right">
                  <h3 class="r-cost regular">${item.price}</h3>
                </div>
              </div>
            </div>
          </a>
        `;
      }).join('');
      
      container.innerHTML = recomItemsHTML;
      container.querySelectorAll("a").forEach((item) => {
        item.addEventListener("click", () => {
          localStorage.setItem("selectedItemId", item.getAttribute("data-id"))
        })
      })
      const weeklyItemsHTML = filteredWeeklyItems.map(item => {
        return `
          <div class="w-box shadow" data-aos="fade-up">
            <a href="game-pages/game-template.html" data-id="${item.id}">
              <img class="w-box-cover" src="${item.imageSrc}" alt="${item.title}">
              <div class="w-description">
                <div class="w-left-cont">
                  <h3 class="w-game-title medium">${item.title}</h3>
                  <h3 class="w-game-count regular">${item.price}</h3>
                </div>
                <div class="w-right-cont">
                  <img src="${item.card}" alt="kalati">
                </div>
              </div>
            </a>
          </div>
        `;
      }).join('');

      weeklyContainer.innerHTML = weeklyItemsHTML;
      weeklyContainer.querySelectorAll("a").forEach((item) => {
        item.addEventListener("click", () => {
          localStorage.setItem("selectedItemId", item.getAttribute("data-id"))
        })
      })
      // Retrieve and save item IDs in localStorage
      const filteredItemIds = filteredItems.map(item => item.id);
      saveItemIdsToLocalStorage('items', filteredItemIds);
    };

    const filterButtons = document.querySelectorAll('#catalog-filters .catalog-btn');

    const handleFilterClick = (event) => {
      filterButtons.forEach(button => {
        button.classList.remove('filter-active');
      });

      event.target.parentNode.classList.add('filter-active');

      const filter = event.target.parentNode.getAttribute('data-filter');

      filterItems(filter);
    };

    filterButtons.forEach(button => {
      button.addEventListener('click', handleFilterClick);
    });

    filterItems('.filter-discount, .filter-free');
  })
  .catch(error => {
    console.log('Error:', error);
  });
