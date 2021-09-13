import { selectItunesDomain } from '../selectors';

describe('Itunes selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      itunes: {}
    };
  });

  it('should select the user state', () => {
    expect(selectItunesDomain(mockedState)).toEqual(mockedState.itunes);
  });
});
