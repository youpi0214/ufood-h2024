import { getTokenInfo, login, logout, signup } from "src/api/auth.js";
import { test, describe, expect } from "vitest";

const TEST_PASSWORD = "test"; // DON'T Change its value
const TEST_EMAIL = "testyann@yann.com"; // DON'T Change its value
const TEST_NAME = "testYann"; // DON'T Change its value

describe("login", () => {
  test("logs in a user", async () => {
    const user = await login(TEST_EMAIL, TEST_PASSWORD); // attributes: email, name, token, id, followers [], following [], rating

    console.log(user);

    expect(user.email).toBe(TEST_EMAIL);
  });
});

describe("logout", () => {
  test("logs out a user", async () => {
    const user = await login(TEST_EMAIL, TEST_PASSWORD);
    const result = await logout();

    console.log(result);

    expect(result).toBe("Successfully logged out");
  });
});

describe("signup", () => {
  test("signs up a user", async () => {
    // remove TEST variables and replace them with your own values if you want to create a new user
    const user = await signup(TEST_NAME, TEST_EMAIL, TEST_PASSWORD); // attributes: email, name, id, followers [], following [], rating

    console.log(user);

    expect(user.email).toBe(TEST_EMAIL);
    expect(user.name).toBe(TEST_NAME);
  });
});

describe("getTokenInfo", () => {
  test("gets token info", async () => {
    const user = await login(TEST_EMAIL, TEST_PASSWORD); // attributes: email, name, token, id, followers [], following [], rating
    const userLinkedToToken = await getTokenInfo(user.token); // attributes: email, name, token, id, followers [], following [], rating

    console.log(userLinkedToToken);

    expect(userLinkedToToken.email).toBe(TEST_EMAIL);
  });
});
