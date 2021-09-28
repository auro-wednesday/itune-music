/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider, renderWithIntl } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer, mapDispatchToProps } from '../index';
import { mockHomeContainerRepo } from '@app/utils/mockdata';

jest.unmock('react-router-dom');
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  __esModule: true,

  useHistory: jest.fn().mockReturnValue({
    length: 2,
    action: 'POP',
    location: {
      pathname: '/',
      search: '',
      hash: ''
    },
    push: (route) => mockPush(route)
  })
}));

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<HomeContainer dispatchGithubRepos={submitSpy} repoName="mac" reposData />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render when fetching data and match the snapshot', () => {
    const { baseElement } = renderWithIntl(
      <HomeContainer dispatchGithubRepos={submitSpy} repoName="mac" reposData={mockHomeContainerRepo} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should call renderErrorState on error received', () => {
    const { baseElement } = renderWithIntl(<HomeContainer dispatchGithubRepos={submitSpy} reposError="some error" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGithubRepos on empty change', async () => {
    const getGithubReposSpy = jest.fn();
    const clearGithubReposSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearGithubRepos={clearGithubReposSpy} dispatchGithubRepos={getGithubReposSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getGithubReposSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearGithubReposSpy).toBeCalled();
  });

  it('should call dispatchGithubRepos on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchGithubRepos={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some repo' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
  // it('should call dispatchGithubRepos on submit', async () => {
  //   const { getByTestId } = renderWithIntl(<HomeContainer dispatchGithubRepos={submitSpy} />);
  //   fireEvent.change(getByTestId('search-bar'), {
  //     target: { value: 'some repo' }
  //   });

  //   fireEvent.keyDown(getByTestId('search-bar'), { key: 'Enter', code: 'Enter', charCode: 13 });

  //   await timeout(500);
  //   expect(submitSpy).toBeCalled();
  // });
  it('should go to stories page on click', () => {
    const { getByTestId } = renderWithIntl(<HomeContainer dispatchGithubRepos={submitSpy} />);

    fireEvent.click(getByTestId('clickable'));
    expect(mockPush).toHaveBeenCalled();
  });

  it('dispatches when required', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).dispatchGithubRepos('mac');
    mapDispatchToProps(dispatch).dispatchClearGithubRepos();
    expect(dispatch.mock.calls[0][0]).toEqual({ repoName: 'mac', type: 'REQUEST_GET_GITHUB_REPOS' });
    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'CLEAR_GITHUB_REPOS' });
  });
});
