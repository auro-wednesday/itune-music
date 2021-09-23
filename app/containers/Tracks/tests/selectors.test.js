import { selectTracksDomain } from '../selectors';

describe('Tracks selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      tracks: {}
    };
  });

  it('should select the user state', () => {
    expect(selectTracksDomain(mockedState)).toEqual(mockedState.tracks);
  });
});
