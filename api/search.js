export default async function handler(req, res) {
  const query = req.query.q;
  const apiKey = process.env.API_KEY;
  const cx = process.env.CX;

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
}
