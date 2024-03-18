import {
  getaSpecificFavoriteList,
  getAllFavoriteLists,
  createFavoriteList,
  deleteFavoriteList,
  renameFavoriteList,
  addRestaurantToFavoriteList,
  removeRestaurantFromFavoriteList,
} from "src/api/favorites.lists.js";
import { RestaurantQueryOptions } from "src/api/api.utility.js";
import { test, describe, expect } from "vitest";

describe("getAllFavoriteLists", () => {
  test("get all favorite lists", async () => {
    const queryOptions = [
      [RestaurantQueryOptions.LIMIT, 10],
      [RestaurantQueryOptions.PAGE, 0],
    ];

    const [restaurants, total] = await getAllFavoriteLists(queryOptions);

    console.log(restaurants, total);

    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(Array.isArray(restaurants)).toBe(true);
  });
});

describe("getaSpecificFavoriteList", () => {
  test("get a specific favorite list", async () => {
    // const listID = "607b9f6f1fa5370004c71036"; // dot not delete or change this id!!!!
    const listID = "65f330178df31618b63cad7f";

    const [id, name, restaurants, owner] =
      await getaSpecificFavoriteList(listID);

    console.log(id, name, restaurants, owner);

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(restaurants).toBeDefined();
    expect(owner).toBeDefined();
  });
});

describe("createFavoriteList", () => {
  test("create a favorite list", async () => {
    const userEmail = "felipe@ufood.ca";
    const listName = "My favorite list 123";

    const [id, name, restaurants] = await createFavoriteList(
      userEmail,
      listName,
    );
    console.log(id, name, restaurants);

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(restaurants).toBeDefined();
  });
});

describe("deleteFavoriteList", () => {
  // test("delete a favorite list", async () => {
  //   const listID = "65f0a85e836bc6ed9ccc5fc3"; // change this string with a list id that you have created
  //
  //   const response = await deleteFavoriteList(listID);
  //   console.log(response);
  //
  //   expect(response).toBeDefined();
  //   expect(response.message).contains(`${listID} deleted successfully`);
  // });
});

describe("renameFavoriteList", () => {
  test("rename a favorite list", async () => {
    const listID = "65f0ea3a836bc6ed9cd0cf0e";
    const number = Math.floor(Math.random() * 100);
    const newName = `list with random number ${number}`;
    const userEmail = "felipe@ufood.ca"; // an existing user email so don't change this string

    const [id, name, restaurants] = await renameFavoriteList(
      listID,
      newName,
      userEmail,
    );

    console.log(id, name, restaurants);

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(restaurants).toBeDefined();
    expect(name).toBe(newName);
  });
});

describe("addRestaurantToFavoriteList", () => {
  test("add a restaurant to a favorite list", async () => {
    const listID = "65f0ea3a836bc6ed9cd0cf0e";
    const restaurantID = "5f31fc7155d7790550c08b02";

    const [id, name, restaurants] = await addRestaurantToFavoriteList(
      listID,
      restaurantID,
    );

    console.log(id, name, restaurants);

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(
      restaurants.some(
        (returnedRestaurant_id) => returnedRestaurant_id === restaurantID,
      ),
    );
  });
});

describe("removeRestaurantFromFavoriteList", () => {
  test("remove a restaurant from a favorite list", async () => {
    const listID = "65f0ea3a836bc6ed9cd0cf0e";
    const restaurantID = "5f31fc7155d7790550c08b02";

    const [id, name, restaurants] = await removeRestaurantFromFavoriteList(
      listID,
      restaurantID,
    );

    console.log(id, name, restaurants);

    expect(id).toBeDefined();
    expect(name).toBeDefined();
    expect(restaurants).toBeDefined();
    expect(
      restaurants.every(
        (returnedRestaurant_id) => returnedRestaurant_id !== restaurantID,
      ),
    );
  });
});
