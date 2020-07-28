import React, { useEffect } from 'react';
import Router from 'components/common/Router';

const App = (props) => {
  const {
    orgActions, userActions, itemActions,
  } = props;

  useEffect(() => {
    orgActions.getOrganisationList();
    userActions.getUserList();
    itemActions.getItemList();
  }, [orgActions, userActions, itemActions]);

  return (
    <div>
      <Router />
    </div>
  );
};

export default App;
