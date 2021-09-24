import { makeSelectItunes, selectItunesData, selectItunesError, selectItunesName } from '../selectors';

describe('Itunes selector tests', () => {
  let mockedState;
  let itunesName;
  let itunesData;
  let itunesError;

  beforeEach(() => {
    itunesName = 'adele';
    itunesData = { songName: 'adele' };
    mockedState = {
      itunes: {
        itunesData,
        itunesName,
        itunesError
      }
    };
  });

  it('should select the itunes state', () => {
    const itunesSelector = makeSelectItunes();
    expect(itunesSelector(mockedState)).toEqual(mockedState.itunes);
  });
  it('should select the itunesName', () => {
    const ituneNameSelector = selectItunesName();
    expect(ituneNameSelector(mockedState)).toEqual(itunesName);
  });

  it('should select the itunesData', () => {
    const ituneDataSelector = selectItunesData();
    expect(ituneDataSelector(mockedState)).toEqual(itunesData);
  });

  it('should select the itunesError', () => {
    const itunesErrorSelector = selectItunesError();
    expect(itunesErrorSelector(mockedState)).toEqual(itunesError);
  });
});
