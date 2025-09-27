// Located at: netlify/functions/search.js

exports.handler = async function (event, context) {
  // Get the search query from the URL (e.g., ?q=islam)
  const query = event.queryStringParameters.q || 'islam';

  // Get your secret keys from environment variables (we will set these up in Netlify)
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch search results.' }),
    };
  }
};
