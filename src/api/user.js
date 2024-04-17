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
    .then(async (response) => {
      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      return response.json();
    })
    .then((favorites) => {
      return [favorites.items, favorites.total];
    })
    .catch((error) => console.error("Request failed:", error));
};

export const getUserById = async (userId) => {
  return fetch(`${BASE_URL}/users/${userId}`, {
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
    .then((userData) => {
      return userData; // object { email, id, name, followers, following, rating }
    })
    .catch((error) => console.error("Request failed:", error));
};

export const followUser = async (userId) => {
  return fetch(`${BASE_URL}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Cookies.get("token"),
    },
    body: JSON.stringify({ id: userId }),
  })
    .then(async (response) => {
      if (!response.ok) {
        let errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      return response.json();
    })
    .then((userData) => {
      return userData[0]; // object { email, id, name, followers, following, rating }
    })
    .catch((error) => console.error("Request failed:", error));
};

export const unfollowUser = async (userId) => {
  return fetch(`${BASE_URL}/follow/${userId}`, {
    method: "DELETE",
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
    .then((userData) => {
      return userData[0]; // object { email, id, name, followers, following, rating }
    })
    .catch((error) => console.error("Request failed:", error));
};
