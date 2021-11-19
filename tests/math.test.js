const {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  asyncAdd,
} = require("../src/math");

test("Should convert 32 F to 0 C", () => {
  const res = fahrenheitToCelsius(32);
  expect(res).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const res = celsiusToFahrenheit(0);
  expect(res).toBe(32);
});

test("Async demo", (demo) => {
  asyncAdd(2, 3).then((res) => {
    expect(res).toBe(5);
    demo();
  });
});

test("async await demo", async () => {
  const result = await asyncAdd(0, 0);
  expect(result).toBe(0);
});

// beforeAll(() => console.log("1 - beforeAll"));
// afterAll(() => console.log("1 - afterAll"));
// beforeEach(() => console.log("1 - beforeEach"));
// afterEach(() => console.log("1 - afterEach"));
// test("", () => console.log("1 - test"));
// describe("Scoped / Nested block", () => {
//   beforeAll(() => console.log("2 - beforeAll"));
//   afterAll(() => console.log("2 - afterAll"));
//   beforeEach(() => console.log("2 - beforeEach"));
//   afterEach(() => console.log("2 - afterEach"));
//   test("", () => console.log("2 - test"));
// });
