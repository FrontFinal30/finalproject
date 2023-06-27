let errorTimer;

function displayError(message) {
  const errorAlert = document.getElementById('error-alert');
  errorAlert.textContent = message;
  errorAlert.style.display = 'block';
  clearTimeout(errorTimer); // Clear previous timer (if any)
  errorTimer = setTimeout(hideError, 2000); // Set new timer to hide error after 3 seconds (adjust the delay as needed)
}

function hideError() {
  const errorAlert = document.getElementById('error-alert');
  errorAlert.textContent = '';
  errorAlert.style.display = 'none';
}



document.getElementById('input').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const keyword = this.value.toLowerCase();
    search(keyword);
  }
});

function search(keyword) {
  fetch('../items.json')
    .then(response => response.json())
    .then(jsonData => {
      const foundItems = jsonData.items.filter(item => {
        const title = item.title.toLowerCase();
        return title.includes(keyword);
      });

      return [...foundItems];
    })
    .then(results => {
      displayResults(results);
    })
    .catch(error => {
      console.error('Error fetching items.json:', error);
    });
}

function displayResults(results) {
  hideError();
  if (results.length === 0) {
    displayError('შედეგი ვერ მოიძებნა!');
  } else if (results.length === 1) {
    const selectedItem = results[0];
    localStorage.setItem('selectedItemId', selectedItem.id);
    const currentPage = window.location.href;
    if (currentPage.includes('game-template.html')) {
      // Redirect to the same directory
      window.location.href = 'game-template.html';
    } else {
      // Redirect to a different directory
      window.location.href = 'game-pages/game-template.html';
    }
  } else {
    results.forEach(result => {
      const a = document.createElement('a');
      a.textContent = result.title;
      resultsContainer.appendChild(a);
    });
  }
}
 