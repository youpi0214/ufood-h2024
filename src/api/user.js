export const getUsers = async (token, options = {}) => {
  const { limit = 10, page = 0, q = "" } = options;
  const queryString = `?limit=${limit}&page=${page}&q=${q}`;
  const response = await fetch(`${BASE_URL}/users${queryString}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
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
