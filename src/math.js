const fahrenheitToCelsius = (temp) => {
  return (temp - 32) / 1.8;
};

const celsiusToFahrenheit = (temp) => {
  return temp * 1.8 + 32;
};

const asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        reject("Numbers should be greater than zero");
      }
      resolve(a + b);
    }, 2000);
  });
};

module.exports = {
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  asyncAdd,
};
