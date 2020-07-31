import React, { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Router from 'components/common/Router';
import AppDialog from 'components/common/AppDialog';

const App = (props) => {
  const {
    orgActions, userActions, itemActions, homeActions, appActions, dialog,
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

  const handleClose = useCallback(() => {
    appActions.closeDialog();
  }, [appActions]);

  return (
    <div>
      <Router />
      <AppDialog
        isOpen={dialog !== undefined}
        title={dialog && dialog.title}
        body={dialog && dialog.body}
        handleClose={handleClose}
      />
    </div>
  );
};

export default App;
