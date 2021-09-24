import { makeSelectTrack, selectTrackData, selectTrackError, selectTrackId } from '../selectors';

describe('Tracks selector tests', () => {
  let mockedState;
  let trackId;
  let trackData;
  let trackError;

  beforeEach(() => {
    trackId = '120954025';
    trackData = { songName: 'Upside Down' };
    mockedState = {
      tracks: {
        trackData,
        trackId,
        trackError
      }
    };
  });

  it('should select the tracks state', () => {
    const trackSelector = makeSelectTrack();
    expect(trackSelector(mockedState)).toEqual(mockedState.tracks);
  });
  it('should select the trackId', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockedState)).toEqual(trackId);
  });
  it('should select the trackData', () => {
    const trackDataSelector = selectTrackData();
    expect(trackDataSelector(mockedState)).toEqual(trackData);
  });
  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackError();
    expect(trackErrorSelector(mockedState)).toEqual(trackError);
  });
});
