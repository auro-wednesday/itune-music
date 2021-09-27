import axios from 'axios';

export const trackIdApi = (trackId) => {
  return axios.request({
    method: 'get',
    url: `https://itunes.apple.com/lookup?id=${trackId}`
  });
};
