import { getUsers } from "src/api/user.js";
import { RestaurantQueryOptions } from "src/api/api.utility.js";
import { test, describe, expect } from "vitest";

describe("getUsers", () => {
  test("get users with a limit on the number of users returned ", async () => {
    const maxNumberOfUsers = 130;
    const options = [[RestaurantQueryOptions.LIMIT, maxNumberOfUsers]];

    const [users, _] = await getUsers(options);

    console.log(users, _);

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeLessThanOrEqual(maxNumberOfUsers);
  });

  test("get users with a characters chain query returns only users with that characters chain in their name", async () => {
    const userName = "John";
    const options = [[RestaurantQueryOptions.Q, userName]];

    const [users, _] = await getUsers(options);
    console.log(users, _);

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
    expect(Array.isArray(users)).toBe(true);
    expect(
      users.every((user) =>
        user.name.toLowerCase().includes(userName.toLowerCase()),
      ),
    ).toBe(true);
  });
});
