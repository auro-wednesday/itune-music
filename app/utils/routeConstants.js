export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  Itunes: {
    route: '/itunes',
    props: {
      maxwidth: 500,
      padding: 20
    }
  },
  Tracks: {
    route: '/:trackName/:trackId',

    exact: true
  }
};
