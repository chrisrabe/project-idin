const initialState = {
  home: {
    userId: '',
    orgId: '',
    isCreatingUser: false,
    isCreatingOrg: false,
  },
  app: {
    users: [],
    items: [],
    orgs: [],
    isFetchingUsers: false,
    isFetchingItems: false,
    isFetchingOrgs: false,
  },
};

export default initialState;
