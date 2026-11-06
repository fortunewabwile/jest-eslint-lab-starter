const { capitalizeWords, filterActiveUsers, logAction } = require('../index')

describe("capitalizeWords", () => {
  // Normal case
  test("capitalizes the first letter of each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  // Edge case: empty string
  test("returns an empty string for empty input", () => {
    expect(capitalizeWords("")).toBe("");
  });

  // Edge case: special characters (only the first letter of the token changes)
  test("handles strings with special characters", () => {
    expect(capitalizeWords("hello-world")).toBe("Hello-World");
  });

  // Edge case: single word
  test("capitalizes a single word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });
});

describe("filterActiveUsers", () => {
  // Mixed active and inactive users
  test("returns only active users from a mixed array", () => {
    const users = [
      { name: "Alice", isActive: true },
      { name: "Bob", isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([{ name: "Alice", isActive: true }]);
  });

  // All users inactive
  test("returns an empty array when all users are inactive", () => {
    const users = [
      { name: "Bob", isActive: false },
      { name: "Carol", isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  // Empty input
  test("returns an empty array for an empty array", () => {
    expect(filterActiveUsers([])).toEqual([]);
  });
});

describe("logAction", () => {
  // Freeze the clock so the timestamp is predictable
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2024-11-27T12:00:00Z"));
  });

  // Restore the real clock after each test
  afterEach(() => {
    jest.useRealTimers();
  });

  // Valid input
  test("generates the correct log string for valid inputs", () => {
    expect(logAction("login", "Alice")).toBe(
      "User Alice performed login at 2024-11-27T12:00:00.000Z"
    );
  });

  // Edge case: empty strings
  test("handles empty strings as inputs", () => {
    expect(logAction("", "")).toBe(
      "User  performed  at 2024-11-27T12:00:00.000Z"
    );
  });

  // Edge case: missing arguments
  test("handles missing arguments without throwing", () => {
    expect(() => logAction()).not.toThrow();
    expect(logAction()).toContain("undefined");
  });
});

