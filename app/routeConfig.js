import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import Itunes from './containers/Itunes/index';
import routeConstants from '@utils/routeConstants';
import Tracks from './containers/Tracks/index';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: Itunes,
    ...routeConstants.itunes
  },
  tracks: {
    component: Tracks,
    ...routeConstants.tracks
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
