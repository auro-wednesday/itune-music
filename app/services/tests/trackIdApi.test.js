import { trackIdApi } from '../trackIdApi';
import * as axios from 'axios';

jest.mock('axios');
describe('Api tests', () => {
  const trackId = '120954025';

  it('should fetch track data', async () => {
    const response = { data: { results: [{ artistName: 'Jack Johnson' }] } };
    axios.request.mockResolvedValue(response);
    expect(await trackIdApi(trackId)).toEqual(response);
  });
});
