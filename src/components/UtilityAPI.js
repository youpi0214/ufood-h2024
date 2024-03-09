const BASE_URL = "/unsecure"; // Assuming your API base URL

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  });
  return await response.json();
};

export const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  });
  return await response.json();
};

export const signup = async (name, email, password) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  });
  return await response.json();
};

export const getTokenInfo = async (token) => {
  const response = await fetch(`${BASE_URL}/tokenInfo`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};

export const getRestaurants = async (token, options = {}) => {
  const {
    limit = 10,
    page = 0,
    q = "",
    genres = "",
    price_range = "",
    lon = "",
    lat = "",
  } = options;
  const queryString = `?limit=${limit}&page=${page}&q=${encodeURIComponent(q)}&genres=${encodeURIComponent(genres)}&price_range=${encodeURIComponent(price_range)}&lon=${lon}&lat=${lat}`;
  const response = await fetch(`${BASE_URL}/restaurants${queryString}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
};

export const getRestaurantById = async (token, id) => {
  const response = await fetch(`${BASE_URL}/restaurants/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return await response.json();
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

export const getUserRestaurantVisits = async (token, userId, options = {}) => {
  const { limit = 10, page = 0 } = options;
  const queryString = `?limit=${limit}&page=${page}`;
  const response = await fetch(
    `${BASE_URL}/users/${userId}/restaurants/visits${queryString}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return await response.json();
};

export const getUserRestaurantVisitById = async (token, userId, visitId) => {
  const response = await fetch(
    `${BASE_URL}/users/${userId}/restaurants/visits/${visitId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return await response.json();
};

export const createRestaurantVisit = async (token, userId, visitData) => {
  const response = await fetch(
    `${BASE_URL}/users/${userId}/restaurants/visits`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(visitData),
    },
  );
  return await response.json();
};

export const getRestaurantVisitsByUser = async (
  token,
  userId,
  restaurantId,
  options = {},
) => {
  const { limit = 10, page = 0 } = options;
  const queryString = `?limit=${limit}&page=${page}`;
  const response = await fetch(
    `${BASE_URL}/users/${userId}/restaurants/${restaurantId}/visits${queryString}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return await response.json();
};
