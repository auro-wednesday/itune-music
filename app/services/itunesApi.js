import axios from 'axios';

export const itunesApi = (searchTerm) => {
  console.log("API__",searchTerm);
  return axios.request({
    method: 'get',
    url: `https://itunes.apple.com/search?term=${searchTerm}`
  });
};
