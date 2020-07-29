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
    dialog: undefined,
  },
  inventory: {
    selectedInventory: undefined,
    inventory: [],
  },
};

export default initialState;
