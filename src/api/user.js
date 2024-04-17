import { BASE_URL, convertQueryOptionsToString } from "./api.utility.js";
import Cookies from "js-cookie";

export const getUsers = async (options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/users${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
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

export const getUserFavoriteLists = async (userId, options = []) => {
  const queryString = convertQueryOptionsToString(options);
  return fetch(`${BASE_URL}/users/${userId}/favorites${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Failed to fetch restaurant with id:${id}`);

      return response.json();
    })
    .then((favorites) => {
      return [favorites.items, favorites.total];
    })
    .catch((error) => console.error("Request failed:", error));
};
