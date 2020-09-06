import React from 'react';
import {
  Route, Switch, Redirect, useLocation,
} from 'react-router-dom';
import Navigation from '../Navigation/container';
import {
  Unavailable,
  // Landing,
  // Inventory,
  // Profile,
  // Requests,
  // Transactions,
  // InventoryDetails,
  // About,
} from '../../routes';
import {
  MainContainer,
} from './styles';

const Router = () => {
  const { pathname } = useLocation();
  return (
    <React.Suspense fallback={<></>}>
      <MainContainer isLoggedIn={pathname !== '/'}>
        { pathname !== '/' && <Navigation /> }
        <Switch>
          <Route exact path="/" component={Unavailable} />
          {/* <Route exact path="/" component={Landing} /> */}
          {/* <Route exact path="/inventory" component={Inventory} /> */}
          {/* <Route exact path="/inventory/:id" component={InventoryDetails} /> */}
          {/* <Route exact path="/profile" component={Profile} /> */}
          {/* <Route exact path="/request" component={Requests} /> */}
          {/* <Route exact path="/transaction" component={Transactions} /> */}
          {/* <Route exact path="/about" component={About} /> */}
          <Redirect to="/" />
        </Switch>
      </MainContainer>
    </React.Suspense>
  );
};

export default Router;
