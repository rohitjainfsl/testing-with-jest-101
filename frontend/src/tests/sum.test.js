/* eslint-disable no-undef */
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

/////

test("null is falsy", () => {
  const n = null;
  expect(n).toBeFalsy();
  expect(n).not.toBeTruthy();
  expect(n).toBeNull();
  expect(n).not.toBeUndefined();
});

/////

test("numeric comparisons", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(4);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4);
});

/////

test("string matching", () => {
  expect("team").not.toMatch(/I/);
  expect("Christoph").toMatch(/stop/);
});

/////

test("advanced regex matching", () => {
  // Test for email format
  expect("user@example.com").toMatch(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
  );

  // Test for phone number format (US)
  expect("123-456-7890").toMatch(/^\d{3}-\d{3}-\d{4}$/);

  // Test for date format (DD-MM-YYYY)
  expect("17-10-2024").toMatch(/^\d{2}-\d{2}-\d{4}$/);
});

/////

test("array containing", () => {
  const shoppingList = ["apple", "banana", "orange"];
  expect(shoppingList).toContain("banana");
  expect(new Set(shoppingList)).toContain("orange");
});

/////

function compileAndroidCode() {
  throw new Error("you are using the wrong JDK");
}

/////

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);
  expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK");
});

/////

//THIS WILL COME FROM A SEPARATE FILE IN A REAL WORLD SCENARIO
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("peanut butter"), 100);
  });
};

test("async/await test", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

/////

test("object matching", () => {
  const data = { name: "John", age: 30 };
  expect(data).toEqual({ name: "John", age: 30 });
  expect(data).toMatchObject({ name: "John" });
});

/////

// test("toEqual vs toMatchObject", () => {
//   const data = { name: "John", age: 30, city: "New York" };

//   // toEqual examples
//   expect(data).toEqual({ name: "John", age: 30, city: "New York" }); // Passes
//   expect(data).toEqual({ name: "John", age: 30 }); // Fails - missing 'city'

//   // toMatchObject examples
//   expect(data).toMatchObject({ name: "John", age: 30 }); // Passes
//   expect(data).toMatchObject({ name: "John" }); // Passes
//   expect(data).toMatchObject({ name: "John", pet: "Dog" }); // Fails - 'pet' not in data
// });

/////

test("nested object comparison", () => {
  const data = {
    name: "John",
    address: { city: "New York", zip: "10001" },
  };

  // toEqual requires exact match
  expect(data).toEqual({
    name: "John",
    address: { city: "New York", zip: "10001" },
  }); // Passes

  // toMatchObject allows partial matching
  expect(data).toMatchObject({
    address: { city: "New York" },
  }); // Passes, doesn't care about missing 'name' or 'zip'
});

/////

// it("renders correctly", () => {
//   const tree = renderer
//     .create(<Link page="https://example.com">Example</Link>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
