import {
  SET_DEADLINE,
  SET_TIME_LEFT,
  DECREASE_TIME,
} from './action.types';

export function setDeadline(deadline) {
  return {
    type: SET_DEADLINE,
    deadline,
  };
}

export function decreaseTime() {
  return {
    type: DECREASE_TIME,
  };
}

export function setTimeLeft(timeLeft) {
  return {
    type: SET_TIME_LEFT,
    timeLeft,
  };
}
