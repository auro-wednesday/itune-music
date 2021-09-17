/**
 *
 * Itunes
 *
 */
import React from 'react';
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
export function Itunes({ intl, itunesData, dispatchRequestItunesList, dispatchClearItunesList, maxwidth, padding }) {
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
          <CustomCard>
            {Object.keys(data).map((item, id) => {
              if (data[item].kind === 'song') {
                return (
                  <div key={id}>
                    <CustomCard>
                      {data[item].artistName}
                      <hr />
                      <span style={{ fontWeight: 'bold' }}>{data[item].trackName}</span>
                    </CustomCard>
                  </div>
                );
              }
            })}
          </CustomCard>
        </div>
      );
    }
  };
  return (
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

      <div>{renderItunesList()}</div>
    </Container>
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
  maxwidth: 500,
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
