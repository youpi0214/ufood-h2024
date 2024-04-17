import { BASE_URL, convertQueryOptionsToString } from "./api.utility.js";
import Cookies from "js-cookie";

export const getRestaurants = async (options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/restaurants${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    }
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    })
    .then((data) => {
      return [data.items, data.total];
    })
    .catch((error) => console.error("Request failed:", error));
};

export const getRestaurantById = async (id) => {
  return fetch(`${BASE_URL}/restaurants/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    }
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to fetch restaurant with id:${id}`);

      return response.json();
    })
    .then((restaurant) => {
      return restaurant;
    })
    .catch((error) => console.error("Request failed:", error));
};

export const getVisitsByRestaurantId = async (id, options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/restaurants/${id}/visits${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token")
    }
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to fetch visits for restaurant with id:${id}`);

      return response.json();
    })
    .then((restaurantVisits) => {
      return [restaurantVisits.items, restaurantVisits.total];
    })
    .catch((error) => console.error("Request failed:", error));
};
