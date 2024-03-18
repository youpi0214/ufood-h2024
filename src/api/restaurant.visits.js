import { BASE_URL, convertQueryOptionsToString } from "./api.utility.js";

export const getUserRestaurantVisits = async (id, options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/users/${id}/restaurants/visits${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Failed to fetch user restaurant visits");

      return response.json();
    })
    .then((data) => {
      return [data.items, data.total];
    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
};

export const getUserRestaurantVisitById = async (userId, visitId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/restaurants/visits/${visitId}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user restaurant visit with id:${visitId}`,
      );
    }
    const data = await response.json();
    return [data.items, data.total];
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const createRestaurantVisit = async (userId, visitData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/restaurants/visits`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitData),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to create restaurant visit");
    }
    return await response.json();
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const getRestaurantVisitsByUserAndRestaurant = async (
  userId,
  restaurantId,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/restaurants/${restaurantId}/visits`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch restaurant visits for user:${userId} and restaurant:${restaurantId}`,
      );
    }
    const data = await response.json();
    return [data.items, data.total];
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};
