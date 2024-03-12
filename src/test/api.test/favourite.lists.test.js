import {
  getaSpecificFavoriteList,
  getAllFavoriteLists,
} from "src/api/favorites.lists.js";
import { RestaurantQueryOptions } from "src/api/api.utility.js";
import { test, describe, expect } from "vitest";

describe("getAllFavoriteLists", () => {
  test("get all favorite lists", async () => {
    const queryOptions = [
      [RestaurantQueryOptions.LIMIT, 10],
      [RestaurantQueryOptions.PAGE, 0],
    ];

    const [restaurants, _] = await getAllFavoriteLists(queryOptions);

    console.log(restaurants, _);

    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(Array.isArray(restaurants)).toBe(true);
  });
});

describe("getaSpecificFavoriteList", () => {
  test("get a specific favorite list", async () => {
    const [id, name, restaurants, owner] = await getaSpecificFavoriteList(
      "607b9f6f1fa5370004c71036",
    );

    console.log(id, name, restaurants, owner);

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(restaurants).toBeDefined();
    expect(owner).toBeDefined();
  });
});
