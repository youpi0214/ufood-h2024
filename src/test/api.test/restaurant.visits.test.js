import {
  getUserRestaurantVisits,
  getUserRestaurantVisitById,
  createRestaurantVisit,
  getRestaurantVisitsByUserAndRestaurant,
} from "./src/api/restaurant.visits";
import { test, describe, expect } from "vitest";

describe("getUserRestaurantVisits", () => {
  test("fetch user restaurant visits", async () => {
    const userId = "60765a3d505e68000443c7bb";
    const options = [
      ["limit", 10],
      ["page", 0],
    ];

    const visits = await getUserRestaurantVisits(userId, options);

    expect(visits).toBeDefined();
  });
});

describe("getUserRestaurantVisitById", () => {
  test("fetch user restaurant visit by ID", async () => {
    const userId = "60765a3d505e68000443c7bb";
    const visitId = "";

    const visit = await getUserRestaurantVisitById(userId, visitId);

    expect(visit).toBeDefined();
  });
});

describe("createRestaurantVisit", () => {
  test("create restaurant visit", async () => {
    const userId = "60765a3d505e68000443c7bb";
    const visitData = {
      restaurant_id: "5f31fc8f55d7790550c08b09",
      comment: "Great restaurant",
      rating: 5,
      date: "2024-03-12T00:00:00Z",
    };

    const newVisit = await createRestaurantVisit(userId, visitData);

    expect(newVisit).toBeDefined();
  });
});

describe("getRestaurantVisitsByUserAndRestaurant", () => {
  test("fetch restaurant visits by user and restaurant", async () => {
    const userId = "60765a3d505e68000443c7bb";
    const restaurantId = "5f31fc8f55d7790550c08b09";
    const options = [
      ["limit", 10],
      ["page", 0],
    ];

    const visits = await getRestaurantVisitsByUserAndRestaurant(
      userId,
      restaurantId,
      options,
    );

    expect(visits).toBeDefined();
  });
});
