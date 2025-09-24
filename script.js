const API_KEY = AIzaSyD4hutA0VN9wMgKuOY7PFox9mpRkzlOHv4
const CX = b3e9a30c9419d4590

async function search() {
  const query = document.getElementById("searchBox").value.trim();
  if (!query) {
    showMessage("Please enter a search query.");
    return;
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();
    if (data.items && data.items.length > 0) {
      displayResults(data.items);
    } else {
      showMessage("No results found or quota exceeded.");
    }
  } catch (err) {
    console.error(err);
    showMessage("Something went wrong. Please try again later.");
  }
}

function displayResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("result");
    div.innerHTML = `
      <a href="${item.link}" target="_blank">${item.title}</a>
      <p>${item.snippet}</p>
    `;
    resultsDiv.appendChild(div);
  });
}

function showMessage(msg) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p>${msg}</p>`;
}
