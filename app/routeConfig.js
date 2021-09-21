import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import Itunes from './containers/Itunes/index';
import routeConstants from '@utils/routeConstants';
import Tracks from './containers/Itunes/Tracks';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: Itunes,
    ...routeConstants.Itunes
  },
  tracks: {
    component: Tracks,
    ...routeConstants.Itunes.routes.route
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
