import React from 'react';
import {
  Route, Switch, Redirect, useLocation, useHistory,
} from 'react-router-dom';
import Navigation from 'components/common/Navigation';
import {
  Landing,
  Inventory,
  Profile,
  Requests,
  Transactions,
} from '../../routes';
import {
  MainContainer,
} from './styles';

const Router = (props) => {
  const { userId, orgId } = props;
  const { pathname } = useLocation();
  const history = useHistory();
  if (pathname !== '/' && (!userId || !orgId)) {
    history.push('/');
  }
  return (
    <React.Suspense fallback={<></>}>
      <MainContainer>
        { pathname !== '/' && <Navigation /> }
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/request" component={Requests} />
          <Route exact path="/transaction" component={Transactions} />
          <Redirect to="/" />
        </Switch>
      </MainContainer>
    </React.Suspense>
  );
};

export default Router;
