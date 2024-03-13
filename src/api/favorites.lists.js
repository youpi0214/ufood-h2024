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

export const getaSpecificFavoriteList = async (listId) => {
  return await fetch(`${BASE_URL}/favorites/${listId}`, {
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

export const createFavoriteList = async (userEmail, listName) => {
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: listName, owner: userEmail }), // in tp3 the owner will be removed
    //
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    })
    .then((data) => {
      return [data.id, data.name, data.restaurants];
    })
    .catch((error) => console.error("Request failed:", error));
};

export const deleteFavoriteList = async (listId) => {
  return fetch(`${BASE_URL}/favorites/${listId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("Request failed:", error));
};

export const renameFavoriteList = async (listId, newName, userEmail) => {
  return fetch(`${BASE_URL}/favorites/${listId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, owner: userEmail }), // in tp3 the owner will be removed
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    })
    .then((data) => {
      return [data.id, data.name, data.restaurants];
    })
    .catch((error) => console.error("Request failed:", error));
};

export const addRestaurantToFavoriteList = async (listId, restaurantId) => {
  return fetch(`${BASE_URL}/favorites/${listId}/restaurants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: restaurantId }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    })
    .then((data) => {
      return [data.id, data.name, data.restaurants];
    })
    .catch((error) => console.error("Request failed:", error));
};

export const removeRestaurantFromFavoriteList = async (
  listId,
  restaurantId,
) => {
  return fetch(`${BASE_URL}/favorites/${listId}/restaurants/${restaurantId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch");

      return response.json();
    })
    .then((data) => {
      return [data.id, data.name, data.restaurants];
    })
    .catch((error) => console.error("Request failed:", error));
};
