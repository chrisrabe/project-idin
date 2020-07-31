// eslint-disable-next-line import/prefer-default-export
export const abbreviateNumber = (amount, decimalPlaces = 2) => {
  let x = `${amount}`.length;
  if (x < 4) {
    return amount; // no need to abbreviate
  }
  const p = Math.pow;
  const decimal = p(10, decimalPlaces);
  x -= x % 3;
  return Math.round((amount * decimal) / p(10, x)) / decimal + ' kMGTPE'[x / 3];
};
