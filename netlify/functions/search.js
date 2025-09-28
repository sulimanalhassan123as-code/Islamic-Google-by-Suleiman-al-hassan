exports.handler = async function (event, context) {
  // This is a dummy function. It does not talk to Google.
  // It just proves the connection is working.
  const dummyData = {
    items: [
      {
        title: "Success! The connection is working!",
        link: "#",
        snippet: "This is a fake result. If you see this, it means your website is now talking to the Netlify function correctly.",
        formattedUrl: "test.com"
      },
      {
        title: "Next Step: Check Google API Setup",
        link: "#",
        snippet: "Now we know the problem is likely with the Google Programmable Search Engine setup.",
        formattedUrl: "test.com"
      }
    ]
  };

  return {
    statusCode: 200,
    body: JSON.stringify(dummyData),
  };
};
