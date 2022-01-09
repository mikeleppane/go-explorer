import { LocalStorage } from "../services/localStorage";

describe("LocalStorage", () => {
  test("should work for String type", () => {
    const localStorage = new LocalStorage<string>("", "key");
    expect(localStorage.state).toBe("");
    localStorage.state = "new state";
    expect(localStorage.state).toBe("new state");
  });

  test("should work for Number type", () => {
    const localStorage = new LocalStorage<number>(1, "value");
    expect(localStorage.state).toBe(1);
    localStorage.state = 5;
    expect(localStorage.state).toBe(5);
  });
});
