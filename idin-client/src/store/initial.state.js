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
  transaction: {
    transactions: [],
  },
  requests: {
    requests: [],
  },
};

export default initialState;
