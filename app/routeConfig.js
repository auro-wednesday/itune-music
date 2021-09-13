import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import Itunes from './containers/Itunes/index';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  itunes: {
    component: Itunes,
    route: '/itunes'
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
