import { convertQueryOptionsToString } from "./UtilityAPI.js";

const BASE_URL = "https://ufoodapi.herokuapp.com/unsecure"; // Assuming your API base URL

export const getRestaurants = async (options) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/restaurants${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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
    },
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

export const getVisitsByRestaurantId = async (token, id, options = {}) => {
  const { limit = 10, page = 0 } = options;
  const queryString = `?limit=${limit}&page=${page}`;
  const response = await fetch(
    `${BASE_URL}/restaurants/${id}/visits${queryString}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return await response.json();
};
