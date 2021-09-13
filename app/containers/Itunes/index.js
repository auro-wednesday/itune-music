/**
 *
 * Itunes
 *
 */

import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { Helmet } from 'react-helmet';
import debounce from 'lodash/debounce';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga'
import makeSelectItunes from './selectors';
// import saga from './saga';

export function Itunes() {
  const [name, SetName] = useState();
  const [data, SetData] = useState('');
  const API = 'https://itunes.apple.com/search?term=';
  // useInjectSaga({ key: 'itunes', saga })

  const handleOnChange = (txt) => {
    SetName(txt);
  };
  const handleOnClick = (txt) => {
    handleApi(txt);
  };
  const handleApi = (txt) => {
    fetch(API + txt)
      .then((res) => res.json())
      .then((data) => SetData(data.results));
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  return (
    <div>
      <input
        type="text"
        className="songNameInput"
        placeholder="search"
        onChange={(e) => {
          debouncedHandleOnChange(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          handleOnClick(name);
        }}
      >
        SEARCH
      </button>
      <div>
        {Object.keys(data).map((item, id) => {
          return (
            <div key={id}>
              <div>
                {data[item].artistName}
                <span style={{ fontWeight: 'bold' }}> {data[item].trackName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

Itunes.propTypes = {};

const mapStateToProps = createStructuredSelector({
  itunes: makeSelectItunes()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Itunes);

export const ItunesTest = compose(injectIntl)(Itunes);
