import { BASE_URL, convertQueryOptionsToString } from "./api.utility.js";
import Cookies from "js-cookie";

export const getUserRestaurantVisits = async (id, options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/users/${id}/restaurants/visits${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

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
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      },
    );
    if (!response.ok) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.message);
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
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(visitData),
      },
    );
    if (!response.ok) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.message);
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
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      },
    );
    if (!response.ok) {
      let errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }
    const data = await response.json();
    return [data.items, data.total];
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};
