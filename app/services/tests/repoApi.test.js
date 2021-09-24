import { itunesApi } from '../itunesApi';
import { trackIdApi } from '../trackIdApi';
import * as axios from 'axios';

jest.mock('axios');
describe('Api tests', () => {
  const trackId = '120954025';
  // const repositoryName = 'mac';
  // it('should make the api call to "/search/repositories?q="', async () => {
  //   const mock = new MockAdapter(getApiClient().axiosInstance);
  //   const data = [
  //     {
  //       totalCount: 1,
  //       items: [{ repositoryName }]
  //     }
  //   ];
  //   mock.onGet(`/search/repositories?q=${repositoryName}`).reply(200, data);
  //   const res = await getRepos(repositoryName);
  //   expect(res.data).toEqual(data);
  // });
  it('should fetch Itunes data', async () => {
    const response = { data: { results: [{ artistName: 'adele' }] } };
    axios.request.mockResolvedValue(response);
    expect(await itunesApi('adele')).toEqual(response);
  });
  it('should fetch track data', async () => {
    const response = { data: { results: [{ artistName: 'Jack Johnson' }] } };
    axios.request.mockResolvedValue(response);
    expect(await trackIdApi(trackId)).toEqual(response);
  });
});
