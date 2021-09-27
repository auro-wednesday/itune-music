import { itunesApi } from '../itunesApi';

import * as axios from 'axios';

jest.mock('axios');
describe('Api tests', () => {
  it('should fetch Itunes data', async () => {
    const response = { data: { results: [{ artistName: 'adele' }] } };
    axios.request.mockResolvedValue(response);
    expect(await itunesApi('adele')).toEqual(response);
  });
});
