import { BASE_URL, convertQueryOptionsToString } from "./api.utility.js";

export const getUsers = async (options = []) => {
  const queryString = convertQueryOptionsToString(options);

  return fetch(`${BASE_URL}/users${queryString}`, {
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

export const getUserById = async (token, userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};

export const getUserFavoriteLists = async (token, userId, options = {}) => {
  const { limit = 10, page = 0 } = options;
  const queryString = `?limit=${limit}&page=${page}`;
  const response = await fetch(
    `${BASE_URL}/users/${userId}/favorites${queryString}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return await response.json();
};

export const followUser = async (token, userIdToFollow) => {
  const response = await fetch(`${BASE_URL}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ id: userIdToFollow }),
  });
  return await response.json();
};

export const unfollowUser = async (token, userIdToUnfollow) => {
  const response = await fetch(`${BASE_URL}/follow/${userIdToUnfollow}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};
