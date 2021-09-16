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
    expect(selectItunesDomain(mockedState)).toEqual(mockedState.itunes);
  });
  it('should select the itunesName', () => {
    const ituneNameSelector = selectItunesName();
    expect(ituneNameSelector(mockedState)).toEqual(itunesName);
  });

  it('should select the itunesData', () => {
    const ituneDataSelector = selectItunesData();
    expect(ituneDataSelector(mockedState)).toEqual(itunesData);
  });

  it('should select the itunesName', () => {
    const itunesErrorSelector = selectItunesError();
    expect(itunesErrorSelector(mockedState)).toEqual(itunesError);
  });
});
