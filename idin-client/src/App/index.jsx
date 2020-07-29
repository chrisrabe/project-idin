import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Router from 'components/common/Router';

const App = (props) => {
  const {
    orgActions, userActions, itemActions, homeActions,
  } = props;

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    orgActions.getOrganisationList();
    userActions.getUserList();
    itemActions.getItemList();
    // check session storage if logged in
    const userId = window.sessionStorage.getItem('userId');
    const orgId = window.sessionStorage.getItem('orgId');
    if (userId && orgId) {
      homeActions.signIn(userId, orgId);
      if (pathname === '/') {
        history.push('/inventory');
      }
    }
  }, [orgActions, userActions, itemActions, homeActions, history, pathname]);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
