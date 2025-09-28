const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results-container');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = searchInput.value;
  if (query) {
    fetchResults(query);
  }
});

async function fetchResults(query) {
  resultsContainer.innerHTML = '<p class="loading">Searching...</p>';

  // This is the address of the working function you just tested!
  const apiUrl = `/.netlify/functions/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    resultsContainer.innerHTML = '<p class="error">Failed to fetch search results.</p>';
  }
}

function displayResults(data) {
  resultsContainer.innerHTML = ''; // Clear previous results

  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('search-result-item');

      const titleElement = document.createElement('a');
      titleElement.href = item.link;
      titleElement.textContent = item.title;
      titleElement.target = '_blank';
      titleElement.classList.add('result-title');

      const snippetElement = document.createElement('p');
      snippetElement.textContent = item.snippet;
      snippetElement.classList.add('result-snippet');

      const urlElement = document.createElement('p');
      urlElement.textContent = item.formattedUrl;
      urlElement.classList.add('result-url');

      resultElement.appendChild(titleElement);
      resultElement.appendChild(urlElement);
      resultElement.appendChild(snippetElement);
      resultsContainer.appendChild(resultElement);
    });
  } else {
    resultsContainer.innerHTML = '<p>No results found for your query.</p>';
  }
}
