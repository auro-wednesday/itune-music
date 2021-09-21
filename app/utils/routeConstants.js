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
    },
    routes: [
      {
        route: '/itunes/trackName',
        props: 'itunesData'
      }
    ],
    exact: true
  }
};
