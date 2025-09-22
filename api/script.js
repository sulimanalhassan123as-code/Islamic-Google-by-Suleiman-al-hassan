async function performSearch() {
  const query = document.getElementById("searchBox").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Searching...";

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      resultsDiv.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsDiv.innerHTML = "";
    data.items.forEach(item => {
      const div = document.createElement("div");
      div.className = "result";
      div.innerHTML = `
        <a href="${item.link}" target="_blank">${item.title}</a>
        <p>${item.snippet}</p>
      `;
      resultsDiv.appendChild(div);
    });
  } catch (error) {
    resultsDiv.innerHTML = "<p>Error fetching results.</p>";
  }
}
