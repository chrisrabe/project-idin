import moment from 'moment';

const initialState = {
  home: {
    deadline: moment('2020-07-31T13:09:06.708Z').startOf('day').toISOString(),
    timeLeft: '',
  },
};

export default initialState;
