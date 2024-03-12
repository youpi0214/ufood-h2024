import { BASE_URL, convertQueryOptionsToString } from "./api.utility";

export const getAllFavoriteLists = async (options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/favorites${queryString}`, {
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

export const getaSpecificFavoriteList = async (id) => {
  return await fetch(`${BASE_URL}/favorites/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    })
    .then((data) => {
      return [data.id, data.name, data.restaurants, data.owner];
    })
    .catch((error) => console.error("Request failed:", error));
};

export const createFavoriteList = async (token, userId, listName) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: listName }),
  });
  return await response.json();
};

export const renameFavoriteList = async (token, listId, newName) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: newName }),
  });
  return await response.json();
};

export const addRestaurantToFavoriteList = async (
  token,
  listId,
  restaurantId,
) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  });
  return await response.json();
};

export const removeRestaurantFromFavoriteList = async (
  token,
  listId,
  restaurantId,
) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ restaurantId }),
  });
  return await response.json();
};

export const deleteFavoriteList = async (token, listId) => {
  const response = await fetch(`${BASE_URL}/favorites/${listId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
