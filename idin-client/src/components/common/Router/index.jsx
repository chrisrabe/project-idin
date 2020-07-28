import React from 'react';
import {
  Route, Switch, Redirect, useLocation,
} from 'react-router-dom';
import Navigation from '../Navigation/container';
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

const Router = () => {
  const { pathname } = useLocation();
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
