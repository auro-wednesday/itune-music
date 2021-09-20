/**
 *
 * Itunes
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { Helmet } from 'react-helmet';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { Card, Input } from 'antd';
import styled from 'styled-components';
import { injectSaga } from 'redux-injectors';

import T from '@components/T';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { makeSelectItunes, selectItunesData, selectItunesError, selectItunesName } from './selectors';
import { isEmpty } from 'lodash';
import { itunesCreators } from './reducer';

import itunesSaga from './saga';
const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
    text-align: center;
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const ContainerResults = styled.div`
  && {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
    flex-direction: row;
    max-width: 800px;
    width: 100%;

    margin: 0 auto;
    padding: ${(props) => props.padding}px;
    text-align: center;
  }
`;
const CustomCardResults = styled(Card)`
  && {
    margin: 20px 0;

    max-width: 300px;
    height: 100%;
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
    text-align: center;
  }
`;

export function Itunes({ intl, itunesData, dispatchRequestItunesList, dispatchClearItunesList, maxwidth, padding }) {
  useEffect(() => {
    return dispatchClearItunesList();
  }, []);

  const handleOnChange = (inputText) => {
    if (!isEmpty(inputText)) {
      dispatchRequestItunesList(inputText);
    } else {
      dispatchClearItunesList();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderItunesList = () => {
    const data = get(itunesData, 'results');
    if (!isEmpty(data)) {
      return (
        <div>
          <ContainerResults>
            {Object.keys(data).map((item, id) => {
              if (data[item].kind === 'song') {
                return (
                  <div key={id}>
                    <CustomCardResults>
                      <img src={data[item].artworkUrl100}></img>
                      <div>
                        {data[item].artistName}
                        <hr />
                        <span style={{ fontWeight: 'bold' }}>{data[item].trackName}</span>
                        <div>
                          <audio controls id="audio" src={data[item].previewUrl} style={{ width: '100%' }}></audio>
                        </div>
                      </div>
                    </CustomCardResults>
                  </div>
                );
              }
            })}
          </ContainerResults>
        </div>
      );
    }
  };
  return (
    <div>
      <Container maxwidth={maxwidth} paddig={padding}>
        <CustomCard maxwidth={maxwidth} title={intl.formatMessage({ id: 'some_music' })}>
          <T marginBottom={10} id="search_Itunes" />

          <Search
            data-testid="search-bar"
            placeholder="Search"
            type="text"
            onChange={(e) => debouncedHandleOnChange(e.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </Container>
      <ContainerResults>
        <div>{renderItunesList()}</div>
      </ContainerResults>
    </div>
  );
}

Itunes.propTypes = {
  dispatchRequestItunesList: PropTypes.func,
  dispatchClearItunesList: PropTypes.func,
  intl: PropTypes.object,
  itunesData: PropTypes.object,
  itunesError: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};
Itunes.defaultProps = {
  maxwidth: 400,
  padding: 20,
  itunesData: {}
};

const mapStateToProps = createStructuredSelector({
  itunes: makeSelectItunes(),
  itunesData: selectItunesData(),
  itunesError: selectItunesError(),
  ItunesName: selectItunesName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesList, clearItunesList } = itunesCreators;
  return {
    dispatchRequestItunesList: (InputTerm) => dispatch(requestGetItunesList(InputTerm)),
    dispatchClearItunesList: () => dispatch(clearItunesList())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, injectSaga({ key: 'itunes', saga: itunesSaga }))(Itunes);

export const ItunesTest = compose(injectIntl)(Itunes);
