const axios = require('axios');

const getVideoDetails = async (videoId) => {
    let res = await axios.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    return res.data;
}

module.exports = { getVideoDetails };