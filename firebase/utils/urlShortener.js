module.exports = async (url) => {
  const axios = require("axios");
  const response = await axios.get(
    `https://www.shareaholic.com/v2/share/shorten_link?apikey=${API_KEY}&url=${url}`,
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );
  return response.data;
};
