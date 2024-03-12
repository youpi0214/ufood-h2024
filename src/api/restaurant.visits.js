const BASE_URL = "https://ufoodapi.herokuapp.com//unsecure"; // Assuming your API base URL

export const getUserRestaurantVisits = async (token, userId, options = []) => {
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
