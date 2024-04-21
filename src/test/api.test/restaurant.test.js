import { getRestaurantById, getRestaurants } from "src/api/restaurant.js";
import { RestaurantQueryOptions } from "src/api/api.utility.js";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { login, logout } from "src/api/auth";

const TEST_PASSWORD = "test"; // DON'T Change its value
const TEST_EMAIL = "testyann@yann.com"; // DON'T Change its value
const TEST_NAME = "testYann"; // DON'T Change its value
let token, user;

beforeEach(async () => {
  [token, user] = await login(TEST_EMAIL, TEST_PASSWORD);
});

afterEach(async () => {
  await logout();
});

describe("getRestaurants", () => {
  test("get restaurants with a limit on the number of restaurant returned ", async () => {
    const maxNumberOfRestaurants = 3;
    const options = [[RestaurantQueryOptions.LIMIT, maxNumberOfRestaurants]];

    const [restaurants, _] = await getRestaurants(options);
    console.log(token, user);
    console.log(restaurants);

    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(Array.isArray(restaurants)).toBe(true);
    expect(restaurants.length).toBeLessThanOrEqual(maxNumberOfRestaurants);
  });

  test("get restaurants of a genre returns restaurants of the specified genres", async () => {
    const restaurantGenre = ["ambiance", "asiatique"];
    const options = [[RestaurantQueryOptions.GENRES, restaurantGenre]];

    const [restaurants, _] = await getRestaurants(options);

    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(Array.isArray(restaurants)).toBe(true);
    expect(
      restaurants.every((restaurant) =>
        restaurantGenre.some((genre) => restaurant.genres.includes(genre)),
      ),
    ).toBe(true);
  });

  test(
    "get restaurants with a characters chain query returns only restaurants with that characters chain in their" +
      " name",
    async () => {
      const restaurantName = "McDonald";
      const options = [[RestaurantQueryOptions.Q, restaurantName]];

      const [restaurants, _] = await getRestaurants(options);
      console.log(restaurants);

      expect(restaurants).toBeDefined();
      expect(restaurants.length).toBeGreaterThan(0);
      expect(Array.isArray(restaurants)).toBe(true);
      expect(
        restaurants.every((restaurant) =>
          restaurant.name.includes(restaurantName),
        ),
      ).toBe(true);
    },
  );

  test("get restaurants with a price range query returns only restaurants with that price range", async () => {
    const priceRange = 1;
    const options = [[RestaurantQueryOptions.PRICE_RANGE, priceRange]];

    const [restaurants, _] = await getRestaurants(options);

    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(Array.isArray(restaurants)).toBe(true);
    expect(
      restaurants.every((restaurant) => restaurant.price_range === priceRange),
    ).toBe(true);
  });

  test("get restaurant with user location returns only restaurants near that location", async () => {
    const userLocation = { lat: 45.53526917261689, lon: -73.627993156728 }; // Piscine Jarry, Rue Saint-Roch, Montreal,
    // QC H3N 2B7, Canada
    const options = [
      [RestaurantQueryOptions.LAT, userLocation.lat],
      [RestaurantQueryOptions.LON, userLocation.lon],
    ];

    const [restaurants, _] = await getRestaurants(options);

    expect(restaurants).toBeDefined();
    expect(restaurants.length).toBeGreaterThan(0);
    expect(Array.isArray(restaurants)).toBe(true);
    expect(
      restaurants.every((restaurant) => {
        return (
          (Math.abs(restaurant.location.coordinates[0] - userLocation.lon) /
            userLocation.lat) *
            100 <=
            1 &&
          (Math.abs(restaurant.location.coordinates[1] - userLocation.lat) /
            userLocation.lon) *
            100 <=
            1
        );
      }),
    ).toBe(true);
  });
});

describe("getRestaurantById", () => {
  test("get a restaurant by id returns a restaurant with that id", async () => {
    const id = "5f31fc7155d7790550c08b02";

    const restaurant = await getRestaurantById(id);
    console.log(restaurant);

    expect(restaurant).toBeDefined();
    expect(restaurant.id).toBe(id);
  });
});
