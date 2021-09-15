import axios from 'axios';

export const itunesApi = (txt) => {
  console.log("API__",txt);
  return axios.request({
    method: 'get',
    url: `https://itunes.apple.com/search?term=${txt}`
  });
};
